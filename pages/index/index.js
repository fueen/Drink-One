const drinkService = require("../../services/drinks");
const { resolveDrinkImage, resolveRecipeCover } = require("../../utils/ui-v3-assets");

const normalizeDrink = (drink = {}, index = 0) => ({
  ...drink,
  _id: drink._id || drink.id || "drink_kakubin",
  name: drink.name || "麦卡伦 12年",
  englishName: drink.englishName || "Macallan 12 Years Old",
  image: resolveDrinkImage(drink, index, "modal"),
  abv: typeof drink.abv === "number" ? `${drink.abv}%vol` : drink.abv || "40%vol",
  tags: drink.tags || drink.tasteTags || ["香草", "蜂蜜", "果干"],
  note: drink.note || drink.description || "经典雪莉桶风格，口感圆润顺滑，带有香草、蜂蜜与果干的味道。"
});

const normalizeRecipe = (recipe = {}, index = 0) => ({
  ...recipe,
  _id: recipe._id || recipe.id || "",
  name: recipe.name || recipe.recipeName || ["柠檬金汤力", "蜜桃乌龙茶酒"][index % 2],
  likes: recipe.likes || recipe.likeCount || (index === 0 ? "2.3k" : "1.8k"),
  cover: resolveRecipeCover(recipe, index)
});

const fallbackHomeData = {
  moods: [
    { icon: "😌", name: "微醺", desc: "放松心情" },
    { icon: "🍻", name: "小酌", desc: "轻松自在" },
    { icon: "🥃", name: "品鉴", desc: "细品慢饮" },
    { icon: "🎉", name: "聚会", desc: "多人畅饮" }
  ],
  dailyDrink: normalizeDrink({
    _id: "drink_macallan_12",
    name: "麦卡伦 12年",
    englishName: "Macallan 12 Years Old",
    image: "/assets/ui-v3/detail-macallan.png",
    abv: "40%vol",
    tags: ["香草", "蜂蜜", "果干"],
    note: "经典雪莉桶风格，口感圆润顺滑，带有香草、蜂蜜与果干的味道。"
  }),
  randomVisual: "/assets/ui-v3/home-random-cocktail.png",
  achievement: {
    icon: "🏅",
    name: "品鉴新手",
    progress: "1/3",
    desc: "记录第一杯酒，开启微醺档案。"
  },
  recipes: [
    {
      name: "柠檬金汤力",
      author: "WhiskyMan",
      likes: "2.3k",
      cover: "/assets/ui-v3/home-recipe-1.png"
    },
    {
      name: "蜜桃乌龙茶酒",
      author: "Lemonade",
      likes: "1.8k",
      cover: "/assets/ui-v3/home-recipe-2.png"
    }
  ].map(normalizeRecipe)
};

const fallbackRandomDrinks = [
  fallbackHomeData.dailyDrink,
  normalizeDrink({
    _id: "drink_kakubin",
    name: "角瓶威士忌",
    englishName: "Suntory Kakubin",
    image: "/assets/ui-v3/modal-kakubin.png",
    abv: "40%vol",
    tags: ["清爽", "蜂蜜", "嗨棒"],
    note: "适合加苏打水做成轻盈嗨棒，入口清爽，适合慢慢品尝。"
  }),
  normalizeDrink({
    _id: "drink_lager",
    name: "精酿拉格",
    englishName: "Craft Lager",
    image: "/assets/ui-v3/library-bottle-4.png",
    abv: "5%vol",
    tags: ["麦芽", "清爽", "聚会"],
    note: "麦芽香气直接，口感干净，适合作为轻松聚会的低负担选择。"
  }),
  normalizeDrink({
    _id: "drink_plum",
    name: "青梅酒",
    englishName: "Umeshu",
    image: "/assets/ui-v3/library-bottle-5.png",
    abv: "12%vol",
    tags: ["酸甜", "果香", "微醺"],
    note: "果香明显，酸甜柔和，适合加冰或兑苏打水饮用。"
  })
];

Page({
  data: {
    moods: fallbackHomeData.moods,
    dailyDrink: fallbackHomeData.dailyDrink,
    achievement: fallbackHomeData.achievement,
    recipes: fallbackHomeData.recipes,
    randomLoading: false,
    randomProgress: 0,
    pendingRandomDrink: null,
    randomModalVisible: false
  },
  onLoad() {
    this.loadHomeData();
  },
  async loadHomeData() {
    try {
      const data = await drinkService.getHomeData();
      this.setData({
        moods: this.normalizeMoods(data.moods),
        dailyDrink: normalizeDrink(data.dailyDrink || fallbackHomeData.dailyDrink, 0),
        achievement: data.achievement || fallbackHomeData.achievement,
        recipes: data.recipes && data.recipes.length ? data.recipes.map(normalizeRecipe) : fallbackHomeData.recipes
      });
    } catch (error) {
      this.setData(fallbackHomeData);
    }
  },
  normalizeMoods(moods) {
    const descMap = {
      微醺: "放松心情",
      小醉: "轻松自在",
      小酌: "轻松自在",
      品鉴: "细品慢饮",
      聚会: "多人畅饮"
    };
    const source = moods && moods.length ? moods : fallbackHomeData.moods;
    return source.map((item) => ({
      ...item,
      desc: item.desc || descMap[item.name] || "随心一杯"
    }));
  },
  getFallbackRandomDrink(excludeId) {
    const candidates = fallbackRandomDrinks.filter((drink) => drink._id !== excludeId && drink.id !== excludeId);
    const source = candidates.length ? candidates : fallbackRandomDrinks;
    const index = Math.floor(Math.random() * source.length);
    return normalizeDrink(source[index]);
  },
  shouldShowRandomError(options = {}) {
    return !options.silent;
  },
  runRandomProgress() {
    this.stopRandomProgress();
    this.setData({ randomProgress: 8 });
    this.randomProgressTimer = setInterval(() => {
      const next = Math.min(this.data.randomProgress + 12, 88);
      this.setData({ randomProgress: next });
    }, 120);
  },
  stopRandomProgress() {
    if (this.randomProgressTimer) {
      clearInterval(this.randomProgressTimer);
      this.randomProgressTimer = null;
    }
  },
  wait(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  },
  withTimeout(promise, ms) {
    return Promise.race([
      promise,
      new Promise((resolve) => {
        setTimeout(() => resolve({ drink: null, timeout: true }), ms);
      })
    ]);
  },
  async drawRandomDrink(options = {}) {
    if (this.data.randomLoading && !options.force) {
      return null;
    }

    this.setData({
      randomLoading: true,
      randomProgress: 0,
      pendingRandomDrink: null
    });
    this.runRandomProgress();
    if (!options.silent) {
      wx.showLoading({ title: "抽取中..." });
    }

    try {
      const currentDrinkId = this.data.dailyDrink && (this.data.dailyDrink.id || this.data.dailyDrink._id);
      const [result] = await Promise.all([
        this.withTimeout(drinkService.getRandomDrink(currentDrinkId), 2600),
        this.wait(900)
      ]);
      if (result.drink) {
        const dailyDrink = normalizeDrink(result.drink);
        this.setData({
          pendingRandomDrink: dailyDrink,
          randomProgress: 100
        });
        await this.wait(220);
        this.setData({ dailyDrink });
        return dailyDrink;
      }
      const fallbackDrink = this.getFallbackRandomDrink(currentDrinkId);
      this.setData({
        pendingRandomDrink: fallbackDrink,
        randomProgress: 100
      });
      await this.wait(220);
      this.setData({ dailyDrink: fallbackDrink });
      return fallbackDrink;
    } catch (error) {
      const currentDrinkId = this.data.dailyDrink && (this.data.dailyDrink.id || this.data.dailyDrink._id);
      const dailyDrink = this.getFallbackRandomDrink(currentDrinkId);
      await this.wait(720);
      this.setData({
        pendingRandomDrink: dailyDrink,
        randomProgress: 100
      });
      await this.wait(220);
      this.setData({ dailyDrink });

      if (this.shouldShowRandomError(options)) {
        wx.showToast({ title: "云环境暂不可用，已使用本地推荐", icon: "none" });
      }

      return dailyDrink;
    } finally {
      if (!options.silent) {
        wx.hideLoading();
      }
      this.stopRandomProgress();
      this.setData({ randomLoading: false, randomProgress: 100 });
    }
  },
  async openRandomModal() {
    this.setData({
      randomModalVisible: true,
      randomLoading: true,
      randomProgress: 0
    });
    await this.drawRandomDrink({ silent: true, force: true });
  },
  closeRandomModal() {
    this.setData({ randomModalVisible: false });
  },
  tryAnotherDrink() {
    this.drawRandomDrink({ silent: true });
  },
  goMood(e) {
    const mood = e.currentTarget.dataset.mood || "";
    wx.navigateTo({ url: `/pages/mood/mood?mood=${encodeURIComponent(mood)}` });
  },
  goDetail() {
    const drinkId = this.data.dailyDrink && (this.data.dailyDrink._id || this.data.dailyDrink.id);
    wx.navigateTo({ url: drinkId ? `/pages/detail/detail?id=${drinkId}` : "/pages/detail/detail" });
  },
  goAchievements() {
    wx.switchTab({ url: "/pages/achievements/achievements" });
  },
  goRecipeDetail(e) {
    const index = e.currentTarget.dataset.index;
    const recipe = this.data.recipes[index] || {};
    const recipeId = recipe._id || recipe.id;
    wx.navigateTo({ url: recipeId ? `/pages/recipe-detail/recipe-detail?id=${recipeId}` : "/pages/recipe-detail/recipe-detail" });
  },
  goLibrary() {
    wx.switchTab({ url: "/pages/library/library" });
  },
  goRecipeRanking() {
    wx.navigateTo({ url: "/pages/ranking/ranking?type=recipe" });
  },
  goDiy() {
    wx.switchTab({ url: "/pages/diy/diy" });
  },
  goProfile() {
    wx.switchTab({ url: "/pages/profile/profile" });
  }
});
