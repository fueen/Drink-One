const { callFunction } = require("./cloud");

function saveDrinkRecord(record) {
  return callFunction("saveDrinkRecord", record);
}

module.exports = {
  saveDrinkRecord
};
