const drinkService = require("../../services/drinks");

const fallbackMoodData = {
  mode: "微醺模式",
  drinks: [
    { name: "梅见青梅酒", abv: "12%vol", liked: true, tone: "", id: "" },
    { name: "RIO 微醺系列", abv: "3%vol", liked: false, tone: "red", id: "" },
    { name: "百利甜酒", abv: "17%vol", liked: false, tone: "dark", id: "" }
  ]
};

Page({
  data: {
    mode: "微醺模式",
    drinks: fallbackMoodData.drinks
  },
  onLoad(options) {
    const mood = (options && options.mood) || "微醺";
    this.loadRecommendations(mood);
  },
  async loadRecommendations(mood) {
    try {
      const result = await drinkService.getMoodRecommendations(mood);
      if (result.drinks && result.drinks.length) {
        this.setData({
          mode: `${mood}模式`,
          drinks: result.drinks
        });
      } else {
        this.setData({ mode: `${mood}模式`, drinks: fallbackMoodData.drinks });
      }
    } catch (error) {
      this.setData({ mode: `${mood}模式`, drinks: fallbackMoodData.drinks });
    }
  },
  goDetail(e) {
    const index = e.currentTarget.dataset.index;
    const drink = this.data.drinks[index];
    if (drink && drink._id) {
      wx.navigateTo({ url: `/pages/detail/detail?id=${drink._id}` });
    } else {
      wx.navigateTo({ url: "/pages/detail/detail" });
    }
  },
  toggleLike(e) {
    const index = e.currentTarget.dataset.index;
    const drinks = this.data.drinks;
    drinks[index].liked = !drinks[index].liked;
    this.setData({ drinks });
  },
  loadMore() {
    wx.showToast({ title: "加载更多推荐...", icon: "none" });
  }
});
