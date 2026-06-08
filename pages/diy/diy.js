const recipeService = require("../../services/recipes");
const drinkService = require("../../services/drinks");

const fallbackDiyData = {
  steps: ["基酒", "配料", "命名"],
  activeStep: 0,
  categories: ["威士忌", "伏特加", "金酒", "朗姆酒", "龙舌兰"],
  baseDrinks: [
    { name: "角瓶威士忌", image: "/assets/drinks/kakubin.png" },
    { name: "Jack Daniel's", image: "/assets/drinks/beer-red.png" },
    { name: "芝华士12年", image: "/assets/drinks/beer-yellow.png" },
    { name: "祖兰草莓12年", image: "/assets/drinks/beer-green.png" }
  ]
};

Page({
  data: {
    ...fallbackDiyData,
    baseDrinkId: "",
    ingredientIds: [],
    recipeName: "",
    description: ""
  },
  onLoad() {
    this.loadBaseDrinks();
  },
  async loadBaseDrinks() {
    try {
      const data = await drinkService.getHomeData();
      if (data.drinks && data.drinks.length) {
        this.setData({
          baseDrinks: data.drinks.map((d) => ({
            name: d.name || d.recipeName,
            image: d.image || "/assets/drinks/kakubin.png",
            id: d._id
          }))
        });
      }
    } catch (error) {
      this.setData({ baseDrinks: fallbackDiyData.baseDrinks });
    }
  },
  selectStep(e) {
    const step = e.currentTarget.dataset.index;
    this.setData({ activeStep: step });
  },
  selectBaseDrink(e) {
    const index = e.currentTarget.dataset.index;
    const drink = this.data.baseDrinks[index];
    this.setData({ baseDrinkId: drink.id || "", activeStep: 1 });
  },
  selectCategory(e) {
    const category = e.currentTarget.dataset.category;
    this.setData({ activeCategory: category });
  },
  onNameInput(e) {
    this.setData({ recipeName: e.detail.value });
  },
  onDescInput(e) {
    this.setData({ description: e.detail.value });
  },
  async submitRecipe() {
    if (!this.data.baseDrinkId) {
      wx.showToast({ title: "请先选择基酒", icon: "none" });
      return;
    }
    if (!this.data.recipeName) {
      wx.showToast({ title: "请输入酒谱名称", icon: "none" });
      return;
    }

    try {
      const result = await recipeService.createRecipe({
        recipeName: this.data.recipeName,
        baseDrinkId: this.data.baseDrinkId,
        ingredientIds: this.data.ingredientIds,
        description: this.data.description
      });

      wx.showToast({
        title: result.status === "pending" ? "已提交审核" : "已发布"
      });
    } catch (error) {
      wx.showToast({ title: error.message || "提交失败", icon: "none" });
    }
  }
});
