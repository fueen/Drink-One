const drinkService = require("../../services/drinks");

const fallbackDrink = {
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
  goRecord() {
    wx.navigateTo({ url: "/pages/record/record" });
  }
});
