const drinkService = require("../../services/drinks");

const fallbackDrink = {
  _id: "drink_kakubin",
  id: "drink_kakubin",
  name: "角瓶威士忌",
  englishName: "Suntory Kakubin",
  image: "/assets/drinks/kakubin.png",
  abv: "40",
  category: "威士忌",
  country: "日本",
  basicTags: ["威士忌", "日本"],
  tags: ["香草", "蜂蜜", "柑橘", "顺滑"],
  scenes: ["独处", "聚会", "餐后", "送礼"]
};

Page({
  data: {
    drink: fallbackDrink
  },
  async onLoad(options) {
    if (!options || !options.id) {
      return;
    }

    try {
      const result = await drinkService.getDrinkDetail(options.id);
      if (result.drink) {
        this.setData({ drink: result.drink });
      }
    } catch (error) {
      this.setData({ drink: fallbackDrink });
    }
  },
  async toggleFavorite() {
    const drinkId = this.data.drink._id || this.data.drink.id || "drink_kakubin";
    try {
      const result = await drinkService.toggleDrinkFavorite(drinkId);
      wx.showToast({ title: result.favorited ? "已收藏" : "已取消", icon: "success" });
    } catch (error) {
      wx.showToast({ title: error.message || "收藏失败", icon: "none" });
    }
  },
  goRecord() {
    const drinkId = this.data.drink._id || this.data.drink.id || "drink_kakubin";
    wx.navigateTo({ url: `/pages/record/record?id=${drinkId}` });
  }
});
