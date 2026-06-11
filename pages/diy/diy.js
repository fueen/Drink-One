const recipeService = require("../../services/recipes");
const drinkService = require("../../services/drinks");

const fallbackDiyData = {
  steps: ["基酒", "配料", "命名"],
  activeStep: 0,
  categories: ["威士忌", "伏特加", "金酒", "朗姆酒", "龙舌兰"],
  baseDrinks: [
    { id: "drink_kakubin", name: "角瓶威士忌", image: "/assets/drinks/kakubin.png", abv: "40%vol" },
    { id: "drink_jack_daniels", name: "黑方威士忌", image: "/assets/drinks/beer-red.png", abv: "40%vol" },
    { id: "drink_gin_tonic_base", name: "金酒", image: "/assets/drinks/beer-green.png", abv: "40%vol" },
    { id: "drink_rum_base", name: "白朗姆", image: "/assets/drinks/beer-yellow.png", abv: "40%vol" }
  ],
  ingredients: [
    { id: "ing_soda", name: "苏打水", selected: false },
    { id: "ing_lime", name: "青柠", selected: false },
    { id: "ing_mint", name: "薄荷", selected: false },
    { id: "ing_ice", name: "冰块", selected: false },
    { id: "ing_tonic", name: "汤力水", selected: false },
    { id: "ing_cola", name: "可乐", selected: false }
  ]
};

Page({
  data: {
    ...fallbackDiyData,
    baseDrinkId: "",
    selectedBaseDrink: null,
    ingredientIds: [],
    recipeName: "周五快乐水",
    description: "清爽轻饮，适合慢慢品尝。"
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
            id: d.id || d._id,
            abv: d.abv
          })),
          ingredients: data.ingredients && data.ingredients.length
            ? data.ingredients.map((item) => ({
                id: item.id || item._id,
                name: item.name,
                selected: false
              }))
            : fallbackDiyData.ingredients
        });
      }
    } catch (error) {
      this.setData({
        baseDrinks: fallbackDiyData.baseDrinks,
        ingredients: fallbackDiyData.ingredients
      });
    }
  },
  selectStep(e) {
    const step = e.currentTarget.dataset.index;
    this.setData({ activeStep: step });
  },
  selectBaseDrink(e) {
    const index = e.currentTarget.dataset.index;
    const drink = this.data.baseDrinks[index];
    this.setData({
      baseDrinkId: drink.id || "",
      selectedBaseDrink: drink,
      activeStep: 1
    });
  },
  selectIngredient(e) {
    const ingredientId = e.currentTarget.dataset.id;
    const ingredientIds = this.data.ingredientIds.slice();
    const ingredients = this.data.ingredients.map((item) => ({ ...item }));
    const existingIndex = ingredientIds.indexOf(ingredientId);

    if (existingIndex >= 0) {
      ingredientIds.splice(existingIndex, 1);
    } else {
      ingredientIds.push(ingredientId);
    }

    for (const ingredient of ingredients) {
      ingredient.selected = ingredientIds.includes(ingredient.id);
    }

    this.setData({ ingredientIds, ingredients });
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
  goNextStep() {
    if (this.data.activeStep === 0 && !this.data.baseDrinkId) {
      wx.showToast({ title: "请先选择基酒", icon: "none" });
      return;
    }

    if (this.data.activeStep === 1 && this.data.ingredientIds.length === 0) {
      wx.showToast({ title: "请选择配料", icon: "none" });
      return;
    }

    if (this.data.activeStep < 2) {
      this.setData({ activeStep: this.data.activeStep + 1 });
      return;
    }

    this.submitRecipe();
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
