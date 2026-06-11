const app = getApp();
const userService = require("../../services/user");

Page({
  data: {
    user: null,
    stats: [
      { value: 23, label: "记录酒品" },
      { value: 12, label: "收藏酒品" },
      { value: 4, label: "DIY酒谱" },
      { value: 8, label: "成就数" }
    ],
    menus: [
      { name: "我的收藏", url: "/pages/library/library", tab: true },
      { name: "浏览历史", url: "/pages/library/library", tab: true },
      { name: "我的酒谱", url: "/pages/diy/diy", tab: true },
      { name: "设置", url: "" },
      { name: "关于我们", url: "" }
    ]
  },
  onShow() {
    if (app && app.globalData && app.globalData.user) {
      this.setData({ user: app.globalData.user });
    }
    this.loadProfileData();
  },
  async loadProfileData() {
    try {
      const result = await userService.getUserProfileData();
      this.setData({
        user: result.user,
        stats: result.stats
      });
    } catch (error) {
      // Keep fallback profile data.
    }
  },
  goMenu(e) {
    const index = e.currentTarget.dataset.index;
    const menu = this.data.menus[index];
    if (menu && menu.url) {
      if (menu.tab) {
        wx.switchTab({ url: menu.url });
      } else {
        wx.navigateTo({ url: menu.url });
      }
    } else {
      wx.showToast({ title: "功能开发中", icon: "none" });
    }
  },
  goHome() {
    wx.switchTab({ url: "/pages/index/index" });
  },
  goLibrary() {
    wx.switchTab({ url: "/pages/library/library" });
  },
  goDiy() {
    wx.switchTab({ url: "/pages/diy/diy" });
  },
  goAchievements() {
    wx.switchTab({ url: "/pages/achievements/achievements" });
  }
});
