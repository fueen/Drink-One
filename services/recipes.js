const { callFunction } = require("./cloud");

function createRecipe(recipe) {
  return callFunction("createRecipe", recipe);
}

function getRecipeDetail(recipeId) {
  return callFunction("getRecipeDetail", { recipeId });
}

function toggleRecipeLike(recipeId) {
  return callFunction("toggleRecipeLike", { recipeId });
}

function toggleRecipeFavorite(recipeId) {
  return callFunction("toggleRecipeFavorite", { recipeId });
}

function reportContent(targetType, targetId, reason) {
  return callFunction("reportContent", { targetType, targetId, reason });
}

module.exports = {
  createRecipe,
  getRecipeDetail,
  toggleRecipeLike,
  toggleRecipeFavorite,
  reportContent
};
