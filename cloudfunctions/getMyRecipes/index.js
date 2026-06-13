const cloud = require("wx-server-sdk");

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

const db = cloud.database();

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

function normalizeRecipe(recipe) {
  return {
    ...recipe,
    id: recipe._id,
    name: recipe.recipeName,
    cover: recipe.coverImage || "/assets/drinks/beer-yellow.png",
    likes: recipe.likeCount || 0,
    favorites: recipe.favoriteCount || 0
  };
}

exports.main = async () => {
  const userId = await getCurrentUserId();
  const recipes = await db.collection("recipes").where({ userId }).orderBy("createdAt", "desc").limit(50).get();

  return {
    recipes: recipes.data.map(normalizeRecipe)
  };
};
