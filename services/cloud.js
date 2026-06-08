function ensureCloudAvailable() {
  return Boolean(wx && wx.cloud && wx.cloud.callFunction);
}

function callFunction(name, data = {}) {
  if (!ensureCloudAvailable()) {
    return Promise.reject(new Error("CloudBase is not available"));
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
    });
}

module.exports = {
  callFunction,
  ensureCloudAvailable
};
