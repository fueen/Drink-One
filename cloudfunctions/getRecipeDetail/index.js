const cloud = require("wx-server-sdk");

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

const db = cloud.database();
const _ = db.command;

function normalizeRecipe(recipe, ingredients) {
  return {
    ...recipe,
    id: recipe._id,
    name: recipe.recipeName,
    cover: recipe.coverImage || "/assets/drinks/beer-yellow.png",
    author: recipe.author || "Drink One",
    likes: recipe.likeCount || 0,
    favorites: recipe.favoriteCount || 0,
    ingredients: ingredients.map((item) => item.name)
  };
}

exports.main = async (event) => {
  const { recipeId } = event;

  if (!recipeId) {
    throw new Error("recipeId is required");
  }

  const recipeResult = await db.collection("recipes").doc(recipeId).get();
  if (!recipeResult.data) {
    throw new Error("recipe not found");
  }

  const recipe = recipeResult.data;
  const ingredientsResult = await db
    .collection("ingredients")
    .where({
      _id: _.in(recipe.ingredientIds || [])
    })
    .get();

  await db
    .collection("recipes")
    .doc(recipeId)
    .update({
      data: {
        viewCount: db.command.inc(1)
      }
    })
    .catch(() => {});

  return {
    recipe: normalizeRecipe(recipe, ingredientsResult.data)
  };
};
