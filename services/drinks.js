const { callFunction } = require("./cloud");

function getHomeData() {
  return callFunction("getHomeData");
}

function getRandomDrink(excludeId) {
  return callFunction("getRandomDrink", { excludeId });
}

function getMoodRecommendations(mood) {
  return callFunction("getMoodRecommendations", { mood });
}

function getDrinkDetail(drinkId) {
  return callFunction("getDrinkDetail", { drinkId });
}

function createDrink(drink) {
  return callFunction("createDrink", { data: drink });
}

function updateDrink(drinkId, drink) {
  return callFunction("updateDrink", { drinkId, data: drink });
}

function deleteDrink(drinkId) {
  return callFunction("deleteDrink", { drinkId });
}

function toggleDrinkFavorite(drinkId) {
  return callFunction("toggleDrinkFavorite", { drinkId });
}

function getDrinkFavorites() {
  return callFunction("getDrinkFavorites");
}

module.exports = {
  getHomeData,
  getRandomDrink,
  getMoodRecommendations,
  getDrinkDetail,
  createDrink,
  updateDrink,
  deleteDrink,
  toggleDrinkFavorite,
  getDrinkFavorites
};
