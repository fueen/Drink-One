const drinkService = require("../../services/drinks");

const normalizeDrink = (drink = {}) => ({
  ...drink,
  _id: drink._id || drink.id,
  name: drink.name || "麦卡伦 12年",
  englishName: drink.englishName || "",
  category: drink.category || drink.categoryName || "威士忌",
  abv: typeof drink.abv === "number" ? `${drink.abv}%vol` : drink.abv || "40%vol",
  image: drink.image || drink.imageUrl || "/assets/drinks/kakubin.png",
  favoriteCount: drink.favoriteCount || drink.likes || "965"
});

const fallbackLibraryData = {
  categories: ["全部", "威士忌", "白酒", "葡萄酒", "鸡尾酒", "啤酒"],
  drinks: [
    { _id: "drink_macallan_12", name: "麦卡伦 12年", englishName: "Macallan 12", category: "威士忌", abv: "40%vol", image: "/assets/drinks/kakubin.png", favoriteCount: "2.3k", liked: true },
    { _id: "drink_cognac", name: "轩尼诗 VSOP", englishName: "Hennessy VSOP", category: "白酒", abv: "40%vol", image: "/assets/drinks/beer-red.png", favoriteCount: "1.8k" },
    { _id: "drink_gin", name: "绝对伏特加", englishName: "Absolut Vodka", category: "鸡尾酒", abv: "40%vol", image: "/assets/drinks/beer-yellow.png", favoriteCount: "1.2k" },
    { _id: "drink_bud", name: "百威啤酒", englishName: "Budweiser", category: "啤酒", abv: "5.0%vol", image: "/assets/drinks/beer-red.png", favoriteCount: "965" },
    { _id: "drink_jager", name: "野格利口酒", englishName: "Jagermeister", category: "鸡尾酒", abv: "35%vol", image: "/assets/drinks/beer-green.png", favoriteCount: "765" },
    { _id: "drink_baileys", name: "贝礼诗奶酒", englishName: "Baileys", category: "鸡尾酒", abv: "17%vol", image: "/assets/drinks/beer-yellow.png", favoriteCount: "632" }
  ].map(normalizeDrink)
};

Page({
  data: {
    categories: fallbackLibraryData.categories,
    drinks: fallbackLibraryData.drinks,
    filteredDrinks: fallbackLibraryData.drinks,
    activeCategory: "全部",
    searchKeyword: ""
  },
  onLoad() {
    this.loadLibraryData();
  },
  async loadLibraryData() {
    try {
      const data = await drinkService.getHomeData();
      const drinks = data.drinks && data.drinks.length
        ? data.drinks.map(normalizeDrink)
        : fallbackLibraryData.drinks;
      const categoryNames = data.categories && data.categories.length
        ? data.categories.map((item) => item.name || item).filter(Boolean)
        : fallbackLibraryData.categories.slice(1);
      this.setData({
        drinks,
        categories: ["全部", ...categoryNames.filter((name, index, list) => list.indexOf(name) === index)]
      });
      this.applyFilters();
    } catch (error) {
      this.setData(fallbackLibraryData);
      this.applyFilters();
    }
  },
  applyFilters() {
    const keyword = (this.data.searchKeyword || "").trim().toLowerCase();
    const activeCategory = this.data.activeCategory;
    const filteredDrinks = this.data.drinks.filter((drink) => {
      const categoryMatched = activeCategory === "全部" || drink.category === activeCategory || drink.categoryName === activeCategory;
      const keywordMatched = !keyword || `${drink.name}${drink.englishName}${drink.category}`.toLowerCase().includes(keyword);
      return categoryMatched && keywordMatched;
    });
    this.setData({ filteredDrinks });
  },
  selectCategory(e) {
    this.setData({ activeCategory: e.currentTarget.dataset.category });
    this.applyFilters();
  },
  goDetail(e) {
    const index = e.currentTarget.dataset.index;
    const drink = this.data.filteredDrinks[index];
    const drinkId = drink && (drink._id || drink.id);
    wx.navigateTo({ url: drinkId ? `/pages/detail/detail?id=${drinkId}` : "/pages/detail/detail" });
  },
  toggleLike(e) {
    const index = e.currentTarget.dataset.index;
    const drink = this.data.filteredDrinks[index];
    if (!drink) {
      return;
    }
    const drinks = this.data.drinks.map((item) => {
      if ((item._id || item.id) === (drink._id || drink.id)) {
        return { ...item, liked: !item.liked };
      }
      return item;
    });
    this.setData({ drinks });
    this.applyFilters();
  },
  onSearchInput(e) {
    this.setData({ searchKeyword: e.detail.value });
    this.applyFilters();
  }
});
