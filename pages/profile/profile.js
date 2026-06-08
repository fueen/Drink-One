const app = getApp();

Page({
  data: {
    user: null,
    stats: [
      { value: 23, label: "记录酒品" },
      { value: 12, label: "收藏酒谱" },
      { value: 56, label: "获得点赞" }
    ],
    menus: [
      { name: "我的酒谱", url: "/pages/diy/diy" },
      { name: "收藏的酒谱", url: "/pages/library/library" },
      { name: "浏览记录", url: "/pages/library/library" },
      { name: "我的成就", url: "/pages/achievements/achievements" },
      { name: "设置", url: "" }
    ]
  },
  onShow() {
    if (app && app.globalData && app.globalData.user) {
      this.setData({ user: app.globalData.user });
    }
  },
  goMenu(e) {
    const index = e.currentTarget.dataset.index;
    const menu = this.data.menus[index];
    if (menu && menu.url) {
      wx.navigateTo({ url: menu.url });
    } else {
      wx.showToast({ title: "功能开发中", icon: "none" });
    }
  }
});
