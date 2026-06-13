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
  toggleDrinkFavorite,
  getDrinkFavorites
};
