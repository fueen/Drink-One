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
    ],
    recentAchievements: [
      { name: "品鉴新手", desc: "记录第一种酒" },
      { name: "酒馆达人", desc: "发布第一个酒谱" }
    ]
  },
  onShow() {
    this.loadAchievements();
  },
  async loadAchievements() {
    try {
      const result = await userService.getAchievements();
      const achievements = result.achievements || this.data.achievements;
      this.setData({
        unlocked: result.unlocked,
        achievements,
        recentAchievements: achievements.slice(0, 2)
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
