Page({
  data: {
    cacheSize: "12.4MB",
    version: "1.0.0",
    settings: [
      { icon: "♧", name: "消息通知", value: "" },
      { icon: "♙", name: "隐私设置", value: "" },
      { icon: "♻", name: "清除缓存", value: "12.4MB" },
      { icon: "✎", name: "意见反馈", value: "" },
      { icon: "?", name: "关于我们", value: "版本 1.0.0" }
    ]
  },
  goBack() {
    wx.navigateBack();
  },
  tapSetting(e) {
    const name = e.currentTarget.dataset.name;
    if (name === "清除缓存") {
      wx.showToast({ title: "缓存已清理", icon: "success" });
      this.setData({ cacheSize: "0MB" });
      return;
    }
    wx.showToast({ title: "功能开发中", icon: "none" });
  },
  logout() {
    wx.showToast({ title: "已退出登录", icon: "none" });
  }
});
