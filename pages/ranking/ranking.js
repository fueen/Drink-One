const rankingService = require("../../services/ranking");

const fallbackRankingData = {
  tabs: ["酒谱榜"],
  top: [
    { rank: 2, name: "Lemonade", likes: "986", image: "/assets/ui-v3/icons/profile-avatar.svg" },
    { rank: 1, name: "深夜程序员", likes: "1.2k", image: "/assets/ui-v3/icons/bottle-dark.svg" },
    { rank: 3, name: "WhiskyMan", likes: "872", image: "/assets/ui-v3/icons/profile-avatar.svg" }
  ],
  list: [
    { rank: 4, name: "CocktailMan", likes: 768, image: "/assets/ui-v3/icons/profile-avatar.svg" },
    { rank: 5, name: "NightCat", likes: 612, image: "/assets/ui-v3/icons/profile-avatar.svg" },
    { rank: 6, name: "Ares", likes: 540, image: "/assets/ui-v3/icons/profile-avatar.svg" }
  ],
  activeType: "recipe"
};

const tabTypes = ["recipe"];
const normalizeType = (type) => (type === "recipe" ? "recipe" : type || "recipe");
const getTabIndex = (type) => {
  const initialType = type || "recipe";
  const index = tabTypes.indexOf(initialType);
  return index >= 0 ? index : 0;
};

Page({
  data: {
    ...fallbackRankingData,
    activeTab: 0
  },
  onLoad(options = {}) {
    const initialType = options.type || "recipe";
    const activeTab = getTabIndex(initialType);
    const activeType = normalizeType(initialType);
    this.setData({ activeTab, activeType });
    this.loadRanking(activeType);
  },
  async loadRanking(type) {
    try {
      const result = await rankingService.getRanking(type);
      if (result.list && result.list.length) {
        const top = result.list.slice(0, 3).map((item, index) => ({
          rank: index + 1,
          id: item._id || item.id,
          name: item.recipeName || item.name,
          likes: item.likeCount != null ? `${item.likeCount}` : "0",
          image: item.coverImage || item.image || "/assets/ui-v3/icons/bottle-dark.svg"
        }));
        const list = result.list.slice(3).map((item, index) => ({
          rank: index + 4,
          id: item._id || item.id,
          name: item.recipeName || item.name,
          likes: item.likeCount != null ? item.likeCount : 0,
          image: item.coverImage || item.image || "/assets/ui-v3/icons/profile-avatar.svg"
        }));
        this.setData({ top, list });
      }
    } catch (error) {
      this.setData(fallbackRankingData);
    }
  },
  switchTab(e) {
    const index = 0;
    const selectedType = "recipe";
    const activeType = normalizeType(selectedType);
    this.setData({ activeTab: index, activeType });
    this.loadRanking(activeType);
  },
  goRecipeDetail(e) {
    const recipeId = e.currentTarget.dataset.id;
    wx.navigateTo({ url: recipeId ? `/pages/recipe-detail/recipe-detail?id=${recipeId}` : "/pages/recipe-detail/recipe-detail" });
  }
});
