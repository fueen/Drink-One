function ensureCloudAvailable() {
  return Boolean(wx && wx.cloud && wx.cloud.callFunction);
}

const FRIENDLY_CLOUD_ERROR = "云端数据暂不可用，请稍后再试";

function getFriendlyErrorMessage(error, fallback = "操作失败，请稍后再试") {
  const message = error && (error.message || error.errMsg || String(error));
  const raw = message || "";
  const infrastructurePatterns = [
    "CloudBase is not available",
    "cloud.callFunction",
    "functions execute fail",
    "DATABASE_COLLECTION_NOT_EXIST",
    "collection.get:fail",
    "collection not exists",
    "Db or Table not exist",
    "ResourceNotFound",
    "errCode:-504002",
    "-502005"
  ];

  if (!raw) {
    return fallback;
  }

  if (infrastructurePatterns.some((pattern) => raw.includes(pattern)) || raw.length > 48) {
    return FRIENDLY_CLOUD_ERROR;
  }

  return raw;
}

function callFunction(name, data = {}) {
  if (!ensureCloudAvailable()) {
    return Promise.reject(new Error(FRIENDLY_CLOUD_ERROR));
  }

  return wx.cloud
    .callFunction({
      name,
      data
    })
    .then((res) => {
      const result = res.result || {};

      if (result.ok === false) {
        throw new Error(result.message || `${name} failed`);
      }

      return result;
    })
    .catch((error) => {
      throw new Error(getFriendlyErrorMessage(error, FRIENDLY_CLOUD_ERROR));
    });
}

module.exports = {
  callFunction,
  ensureCloudAvailable,
  getFriendlyErrorMessage
};
