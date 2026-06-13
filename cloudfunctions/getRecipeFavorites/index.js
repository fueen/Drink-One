const cloud = require("wx-server-sdk");

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

const db = cloud.database();
const _ = db.command;

async function getCurrentUserId() {
  const wxContext = cloud.getWXContext();
  const openid = wxContext.OPENID;
  if (!openid) {
    throw new Error("unable to resolve OPENID");
  }

  const users = await db.collection("users").where({ openid }).limit(1).get();
  if (users.data.length === 0) {
    throw new Error("user not found");
  }
  return users.data[0]._id;
}

function normalizeRecipe(recipe, favorite) {
  return {
    ...recipe,
    id: recipe._id,
    name: recipe.recipeName,
    cover: recipe.coverImage || "/assets/drinks/beer-yellow.png",
    likes: recipe.likeCount || 0,
    favorites: recipe.favoriteCount || 0,
    favoritedAt: favorite.createdAt
  };
}

exports.main = async () => {
  const userId = await getCurrentUserId();
  const favorites = await db.collection("recipe_favorites").where({ userId }).orderBy("createdAt", "desc").limit(50).get();
  const recipeIds = favorites.data.map((item) => item.recipeId).filter(Boolean);
  const recipes = recipeIds.length
    ? await db.collection("recipes").where({ _id: _.in(recipeIds) }).get()
    : { data: [] };

  const recipeMap = {};
  for (const recipe of recipes.data) {
    recipeMap[recipe._id] = recipe;
  }

  return {
    recipes: favorites.data
      .filter((favorite) => recipeMap[favorite.recipeId])
      .map((favorite) => normalizeRecipe(recipeMap[favorite.recipeId], favorite))
  };
};
