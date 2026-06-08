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
  }
};

Page({
  data: {
    moods: [
      { icon: "😌", name: "微醺" },
      { icon: "🍻", name: "小醉" },
      { icon: "🥃", name: "品鉴" },
      { icon: "🎉", name: "聚会" }
    ],
    dailyDrink: fallbackHomeData.dailyDrink
  },
  onLoad() {
    this.loadHomeData();
  },
  async loadHomeData() {
    try {
      const data = await drinkService.getHomeData();
      this.setData({
        moods: data.moods && data.moods.length ? data.moods : fallbackHomeData.moods,
        dailyDrink: data.dailyDrink || fallbackHomeData.dailyDrink
      });
    } catch (error) {
      this.setData(fallbackHomeData);
    }
  },
  async drawRandomDrink() {
    try {
      const result = await drinkService.getRandomDrink();
      if (result.drink) {
        this.setData({ dailyDrink: result.drink });
      }
    } catch (error) {
      this.setData({ dailyDrink: fallbackHomeData.dailyDrink });
    }
  },
  goMood() {
    wx.navigateTo({ url: "/pages/mood/mood" });
  },
  goDetail() {
    wx.navigateTo({ url: "/pages/detail/detail" });
  }
});
