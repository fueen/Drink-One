const { callFunction } = require("./cloud");

function getRanking(type) {
  return callFunction("getRanking", { type });
}

module.exports = {
  getRanking
};
