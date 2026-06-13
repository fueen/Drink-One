const app = getApp();
const userService = require("../../services/user");
const drinkService = require("../../services/drinks");
const recordService = require("../../services/records");
const recipeService = require("../../services/recipes");

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
      { icon: "♡", name: "我的收藏", action: "favorites" },
      { icon: "◴", name: "浏览历史", action: "records" },
      { icon: "♧", name: "我的酒谱", action: "recipes" },
      { icon: "⚙", name: "设置", url: "/pages/settings/settings" },
      { icon: "ⓘ", name: "关于我们", url: "" }
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
  async goMenu(e) {
    const index = e.currentTarget.dataset.index;
    const menu = this.data.menus[index];
    if (menu && menu.action) {
      await this.handleDataMenu(menu.action);
      return;
    }
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
  async handleDataMenu(action) {
    wx.showLoading({ title: "读取中..." });
    let toastTitle = "";
    try {
      if (action === "favorites") {
        const [drinkFavorites, recipeFavorites] = await Promise.all([
          drinkService.getDrinkFavorites(),
          recipeService.getRecipeFavorites()
        ]);
        const total = (drinkFavorites.drinks || []).length + (recipeFavorites.recipes || []).length;
        toastTitle = `收藏 ${total} 条`;
      }
      if (action === "records") {
        const result = await recordService.getDrinkRecords();
        toastTitle = `记录 ${((result && result.records) || []).length} 条`;
      }
      if (action === "recipes") {
        const result = await recipeService.getMyRecipes();
        toastTitle = `酒谱 ${((result && result.recipes) || []).length} 条`;
      }
    } catch (error) {
      toastTitle = error.message || "读取失败";
    } finally {
      wx.hideLoading();
      wx.showToast({ title: toastTitle || "读取完成", icon: "none" });
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
