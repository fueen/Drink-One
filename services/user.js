const { callFunction } = require("./cloud");

function login() {
  return callFunction("login");
}

function getUserProfileData() {
  return callFunction("getUserProfileData");
}

function updateUserProfile(profile) {
  return callFunction("updateUserProfile", profile);
}

function getAchievements() {
  return callFunction("getAchievements");
}

function getMyReports() {
  return callFunction("getMyReports");
}

module.exports = {
  login,
  getUserProfileData,
  updateUserProfile,
  getAchievements,
  getMyReports
};
