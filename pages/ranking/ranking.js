const rankingService = require("../../services/ranking");

const fallbackRankingData = {
  tabs: ["酒谱榜"],
  top: [
    { rank: 2, name: "失恋特调", likes: "1.8k", image: "/assets/drinks/beer-red.png" },
    { rank: 1, name: "深夜程序员", likes: "2.3k", image: "/assets/drinks/beer-green.png" },
    { rank: 3, name: "夏日海风", likes: "1.5k", image: "/assets/drinks/beer-yellow.png" }
  ],
  list: [
    { rank: 4, name: "星辰大海", likes: 987, image: "/assets/drinks/kakubin.png" },
    { rank: 5, name: "薄荷莫吉托", likes: 865, image: "/assets/drinks/beer-green.png" },
    { rank: 6, name: "柠檬气泡酒", likes: 754, image: "/assets/drinks/beer-yellow.png" },
    { rank: 7, name: "西柚微醺", likes: 623, image: "/assets/drinks/beer-red.png" }
  ],
  activeType: "hot"
};

const tabTypes = ["recipe"];
const normalizeType = (type) => (type === "recipe" ? "hot" : type || "hot");
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
          name: item.recipeName || item.name,
          likes: item.likeCount != null ? `${item.likeCount}` : "0",
          image: item.coverImage || item.image || "/assets/drinks/kakubin.png"
        }));
        const list = result.list.slice(3).map((item, index) => ({
          rank: index + 4,
          name: item.recipeName || item.name,
          likes: item.likeCount != null ? item.likeCount : 0,
          image: item.coverImage || item.image || "/assets/drinks/kakubin.png"
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
  }
});
