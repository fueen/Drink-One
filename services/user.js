const { callFunction } = require("./cloud");

function login() {
  return callFunction("login");
}

function getUserProfileData() {
  return callFunction("getUserProfileData");
}

function getAchievements() {
  return callFunction("getAchievements");
}

module.exports = {
  login,
  getUserProfileData,
  getAchievements
};
