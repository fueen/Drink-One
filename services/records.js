const { callFunction } = require("./cloud");

function saveDrinkRecord(record) {
  return callFunction("saveDrinkRecord", record);
}

function getDrinkRecords() {
  return callFunction("getDrinkRecords");
}

module.exports = {
  saveDrinkRecord,
  getDrinkRecords
};
