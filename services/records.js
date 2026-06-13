const { callFunction } = require("./cloud");

function saveDrinkRecord(record) {
  return callFunction("saveDrinkRecord", record);
}

function getDrinkRecords() {
  return callFunction("getDrinkRecords");
}

function updateDrinkRecord(recordId, record) {
  return callFunction("updateDrinkRecord", { recordId, ...record });
}

function deleteDrinkRecord(recordId) {
  return callFunction("deleteDrinkRecord", { recordId });
}

module.exports = {
  saveDrinkRecord,
  getDrinkRecords,
  updateDrinkRecord,
  deleteDrinkRecord
};
