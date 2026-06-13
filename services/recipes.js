const { callFunction } = require("./cloud");

function createRecipe(recipe) {
  return callFunction("createRecipe", recipe);
}

function getRecipeDetail(recipeId) {
  return callFunction("getRecipeDetail", { recipeId });
}

function getMyRecipes() {
  return callFunction("getMyRecipes");
}

function updateRecipe(recipeId, recipe) {
  return callFunction("updateRecipe", { recipeId, ...recipe });
}

function deleteRecipe(recipeId) {
  return callFunction("deleteRecipe", { recipeId });
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

function getRecipeFavorites() {
  return callFunction("getRecipeFavorites");
}

module.exports = {
  createRecipe,
  getRecipeDetail,
  getMyRecipes,
  updateRecipe,
  deleteRecipe,
  toggleRecipeLike,
  toggleRecipeFavorite,
  getRecipeFavorites,
  reportContent
};
