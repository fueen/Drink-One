const drinkService = require("../../services/drinks");
const { getFriendlyErrorMessage } = require("../../services/cloud");
const { resolveDrinkImage } = require("../../utils/ui-v3-assets");

const normalizeDrink = (drink = {}) => ({
  ...drink,
  _id: drink._id || drink.id || "drink_macallan_12",
  id: drink.id || drink._id || "drink_macallan_12",
  name: drink.name || "麦卡伦 12年",
  englishName: drink.englishName || "Macallan 12 Years Old",
  image: resolveDrinkImage(drink, 0, "detail"),
  abv: typeof drink.abv === "number" ? `${drink.abv}%vol` : drink.abv || "40%vol",
  country: drink.country || "苏格兰",
  category: drink.category || "威士忌",
  capacity: drink.capacity || "700ml",
  basicTags: drink.basicTags || [drink.category || "威士忌", drink.country || "苏格兰"].filter(Boolean),
  tags: drink.tags || drink.tasteTags || ["香草", "蜂蜜", "果干", "橡木"],
  scenes: drink.scenes || drink.recommendScenes || ["独自小酌", "朋友聚会", "节日庆祝", "商务宴请"],
  description: drink.description || "经典雪莉桶风格，口感圆润顺滑，带有香草、蜂蜜与果干的味道，余味悠长。"
});

const fallbackDrink = normalizeDrink();

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
        this.setData({ drink: normalizeDrink(result.drink) });
      }
    } catch (error) {
      this.setData({ drink: fallbackDrink });
    }
  },
  goBack() {
    wx.navigateBack();
  },
  async toggleFavorite() {
    const drinkId = this.data.drink._id || this.data.drink.id || "drink_macallan_12";
    try {
      const result = await drinkService.toggleDrinkFavorite(drinkId);
      wx.showToast({ title: result.favorited ? "已收藏" : "已取消", icon: "success" });
    } catch (error) {
      wx.showToast({ title: getFriendlyErrorMessage(error, "收藏失败，请稍后再试"), icon: "none" });
    }
  },
  goRecord() {
    const drinkId = this.data.drink._id || this.data.drink.id || "drink_macallan_12";
    wx.navigateTo({ url: `/pages/record/record?id=${drinkId}` });
  }
});
