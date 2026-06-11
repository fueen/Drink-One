const drinkService = require("../../services/drinks");

const fallbackHomeData = {
  moods: [
    { icon: "😌", name: "微醺" },
    { icon: "🍻", name: "小醉" },
    { icon: "🥃", name: "品鉴" },
    { icon: "🎉", name: "聚会" }
  ],
  dailyDrink: {
    name: "角瓶威士忌",
    englishName: "Suntory Kakubin",
    image: "/assets/drinks/kakubin.png",
    abv: "40%vol",
    tags: ["香草", "琥珀", "小酌"],
    note: "非泥煤思路的轻快威士忌，适合搭配苏打做成清爽嗨棒。"
  },
  achievement: {
    icon: "🏅",
    name: "微醺新人",
    progress: "1/3",
    desc: "记录第一种酒，开启品鉴旅程。"
  },
  recipes: [
    {
      name: "周五快乐水",
      author: "Drink One",
      likes: 128,
      cover: "/assets/drinks/beer-yellow.png"
    },
    {
      name: "微醺时刻",
      author: "Drink One",
      likes: 96,
      cover: "/assets/drinks/beer-green.png"
    }
  ]
};

Page({
  data: {
    moods: [
      { icon: "😌", name: "微醺" },
      { icon: "🍻", name: "小醉" },
      { icon: "🥃", name: "品鉴" },
      { icon: "🎉", name: "聚会" }
    ],
    dailyDrink: fallbackHomeData.dailyDrink,
    achievement: fallbackHomeData.achievement,
    recipes: fallbackHomeData.recipes,
    randomLoading: false
  },
  onLoad() {
    this.loadHomeData();
  },
  async loadHomeData() {
    try {
      const data = await drinkService.getHomeData();
      this.setData({
        moods: data.moods && data.moods.length ? data.moods : fallbackHomeData.moods,
        dailyDrink: data.dailyDrink || fallbackHomeData.dailyDrink,
        achievement: data.achievement || fallbackHomeData.achievement,
        recipes: data.recipes && data.recipes.length ? data.recipes : fallbackHomeData.recipes
      });
    } catch (error) {
      this.setData(fallbackHomeData);
    }
  },
  async drawRandomDrink() {
    if (this.data.randomLoading) {
      return;
    }

    this.setData({ randomLoading: true });
    wx.showLoading({ title: "抽取中..." });

    try {
      const currentDrinkId = this.data.dailyDrink && (this.data.dailyDrink.id || this.data.dailyDrink._id);
      const result = await drinkService.getRandomDrink(currentDrinkId);
      if (result.drink) {
        this.setData({ dailyDrink: result.drink });
        wx.showToast({ title: "已换一杯", icon: "success" });
      } else {
        wx.showToast({ title: "暂无可推荐酒品", icon: "none" });
      }
    } catch (error) {
      wx.showToast({ title: error.message || "随机抽取失败", icon: "none" });
    } finally {
      wx.hideLoading();
      this.setData({ randomLoading: false });
    }
  },
  goMood() {
    wx.navigateTo({ url: "/pages/mood/mood" });
  },
  goDetail() {
    wx.navigateTo({ url: "/pages/detail/detail" });
  },
  goAchievements() {
    wx.switchTab({ url: "/pages/achievements/achievements" });
  },
  goRecipeDetail() {
    wx.navigateTo({ url: "/pages/recipe-detail/recipe-detail" });
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
