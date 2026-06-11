const userService = require("../../services/user");

Page({
  data: {
    unlocked: "12/36",
    achievements: [
      { name: "微醺新人", desc: "解锁时间：2024.05.01", active: true },
      { name: "酒馆学徒", desc: "解锁时间：2024.05.10", active: true },
      { name: "调酒新人", desc: "解锁时间：2024.05.15", active: true },
      { name: "酒类收藏家", desc: "记录 30 种酒", active: false },
      { name: "品鉴达人", desc: "记录 50 种酒", active: false },
      { name: "微醺大师", desc: "记录 100 种酒", active: false }
    ]
  },
  onShow() {
    this.loadAchievements();
  },
  async loadAchievements() {
    try {
      const result = await userService.getAchievements();
      this.setData({
        unlocked: result.unlocked,
        achievements: result.achievements
      });
    } catch (error) {
      // Keep fallback achievement data.
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
  goProfile() {
    wx.switchTab({ url: "/pages/profile/profile" });
  }
});
