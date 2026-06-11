const ENV = require("./config/env");
const userService = require("./services/user");

App({
  async onLaunch() {
    if (wx.cloud) {
      const cloudInitOptions = {
        traceUser: true
      };

      if (ENV.cloudEnvId) {
        cloudInitOptions.env = ENV.cloudEnvId;
      }

      wx.cloud.init(cloudInitOptions);

      try {
        const result = await userService.login();
        this.globalData.user = result.user;
      } catch (error) {
        // Login is non-blocking — app works with anonymous fallback
        this.globalData.user = null;
      }
    }
  },
  globalData: {
    appName: "Drink One",
    user: null
  }
});
