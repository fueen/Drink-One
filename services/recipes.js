const { callFunction } = require("./cloud");

function createRecipe(recipe) {
  return callFunction("createRecipe", recipe);
}

module.exports = {
  createRecipe
};
