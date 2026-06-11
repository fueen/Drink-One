const drinkService = require("../../services/drinks");

const fallbackLibraryData = {
  categories: ["全部", "啤酒", "白酒", "红酒", "威士忌"],
  drinks: [
    { name: "百威啤酒", englishName: "Budweiser", abv: "4.8%vol", image: "/assets/drinks/beer-red.png", liked: true },
    { name: "喜力啤酒", englishName: "Heineken", abv: "5.0%vol", image: "/assets/drinks/beer-green.png", liked: false },
    { name: "科罗娜", englishName: "Corona Extra", abv: "4.5%vol", image: "/assets/drinks/beer-yellow.png", liked: false }
  ]
};

Page({
  data: {
    ...fallbackLibraryData,
    activeCategory: "全部",
    searchKeyword: ""
  },
  onLoad() {
    this.loadLibraryData();
  },
  async loadLibraryData() {
    try {
      const data = await drinkService.getHomeData();
      if (data.drinks && data.drinks.length) {
        this.setData({
          drinks: data.drinks,
          categories: data.categories || fallbackLibraryData.categories
        });
      }
    } catch (error) {
      this.setData(fallbackLibraryData);
    }
  },
  selectCategory(e) {
    const category = e.currentTarget.dataset.category;
    this.setData({ activeCategory: category });
    wx.showToast({ title: `筛选: ${category}`, icon: "none" });
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
  onSearchInput(e) {
    this.setData({ searchKeyword: e.detail.value });
  },
  onSearch() {
    const kw = this.data.searchKeyword;
    if (kw) {
      wx.showToast({ title: `搜索: ${kw}`, icon: "none" });
    }
  },
  goHome() {
    wx.switchTab({ url: "/pages/index/index" });
  },
  goDiy() {
    wx.switchTab({ url: "/pages/diy/diy" });
  },
  goAchievements() {
    wx.switchTab({ url: "/pages/achievements/achievements" });
  },
  goProfile() {
    wx.switchTab({ url: "/pages/profile/profile" });
  }
});
