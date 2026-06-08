const { callFunction } = require("./cloud");

function getHomeData() {
  return callFunction("getHomeData");
}

function getRandomDrink() {
  return callFunction("getRandomDrink");
}

function getMoodRecommendations(mood) {
  return callFunction("getMoodRecommendations", { mood });
}

function getDrinkDetail(drinkId) {
  return callFunction("getDrinkDetail", { drinkId });
}

module.exports = {
  getHomeData,
  getRandomDrink,
  getMoodRecommendations,
  getDrinkDetail
};
