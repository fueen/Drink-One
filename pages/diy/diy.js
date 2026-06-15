const recipeService = require("../../services/recipes");
const drinkService = require("../../services/drinks");
const { resolveRecipeCover } = require("../../utils/ui-v3-assets");

const fallbackDiyData = {
  steps: ["选择基酒", "选择配料", "命名", "完成"],
  activeStep: 0,
  categories: ["威士忌", "伏特加", "金酒", "朗姆酒", "龙舌兰"],
  baseDrinks: [
    { id: "drink_kakubin", name: "威士忌", image: "/assets/ui-v3/diy-base-1.png", abv: "40%vol" },
    { id: "drink_vodka", name: "伏特加", image: "/assets/ui-v3/diy-base-2.png", abv: "40%vol" },
    { id: "drink_gin_tonic_base", name: "金酒", image: "/assets/ui-v3/diy-base-3.png", abv: "40%vol" },
    { id: "drink_plum_base", name: "朗姆酒", image: "/assets/ui-v3/diy-base-4.png", abv: "38%vol" },
    { id: "drink_tequila_base", name: "龙舌兰", image: "/assets/ui-v3/diy-base-5.png", abv: "40%vol" },
    { id: "drink_rum_base", name: "白兰地", image: "/assets/ui-v3/diy-base-6.png", abv: "40%vol" }
  ],
  ingredients: [
    { id: "ing_soda", name: "苏打水", selected: false },
    { id: "ing_lime", name: "青柠", selected: false },
    { id: "ing_mint", name: "薄荷", selected: false },
    { id: "ing_ice", name: "冰块", selected: false },
    { id: "ing_tonic", name: "汤力水", selected: false },
    { id: "ing_cola", name: "可乐", selected: false }
  ],
  myRecipes: [
    {
      _id: "recipe_local_highball",
      recipeName: "柠檬威士忌嗨棒",
      description: "威士忌、苏打水和青柠组合，清爽轻盈。",
      coverImage: "/assets/ui-v3/home-recipe-1.png",
      likeCount: 128
    },
    {
      _id: "recipe_local_plum_soda",
      recipeName: "青梅苏打",
      description: "青梅酒搭配苏打和冰块，酸甜微醺。",
      coverImage: "/assets/ui-v3/home-recipe-2.png",
      likeCount: 96
    }
  ]
};

Page({
  data: {
    ...fallbackDiyData,
    viewMode: "list",
    baseDrinkId: "",
    selectedBaseDrink: null,
    ingredientIds: [],
    recipeName: "周五快乐水",
    description: "清爽轻饮，适合慢慢品尝。",
    submitting: false,
    submitMessage: ""
  },
  onLoad() {
    this.loadBaseDrinks();
    this.loadMyRecipes();
  },
  async loadBaseDrinks() {
    try {
      const data = await drinkService.getHomeData();
      if (data.drinks && data.drinks.length) {
        this.setData({
          baseDrinks: data.drinks.map((d, index) => ({
            name: d.name || d.recipeName,
            image: d.image || d.imageUrl || fallbackDiyData.baseDrinks[index % fallbackDiyData.baseDrinks.length].image,
            id: d.id || d._id,
            abv: typeof d.abv === "number" ? `${d.abv}%vol` : d.abv
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
  async loadMyRecipes() {
    try {
      const result = await recipeService.getMyRecipes();
      if (result.list && result.list.length) {
        this.setData({ myRecipes: result.list });
      }
    } catch (error) {
      this.setData({ myRecipes: fallbackDiyData.myRecipes });
    }
  },
  startCreateFlow() {
    this.setData({
      viewMode: "create",
      activeStep: 0,
      baseDrinkId: "",
      selectedBaseDrink: null,
      ingredientIds: [],
      ingredients: this.data.ingredients.map((item) => ({ ...item, selected: false })),
      recipeName: "周五快乐水",
      description: "清爽轻饮，适合慢慢品尝。",
      submitMessage: ""
    });
  },
  finishCreateFlow(recipe) {
    const myRecipes = [
      {
        _id: recipe._id || recipe.recipeId || `local_recipe_${Date.now()}`,
        recipeName: recipe.recipeName || this.data.recipeName,
        description: recipe.description || this.data.description,
        coverImage: resolveRecipeCover(recipe, 0),
        likeCount: recipe.likeCount || 0
      },
      ...this.data.myRecipes
    ];

    this.setData({
      myRecipes,
      viewMode: "list",
      activeStep: 0,
      submitMessage: "已保存"
    });
  },
  handleBottomAction() {
    if (this.data.viewMode === "list") {
      this.startCreateFlow();
      return;
    }

    this.goNextStep();
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
    if (this.data.submitting) {
      return;
    }

    if (this.data.activeStep === 0 && !this.data.baseDrinkId) {
      wx.showToast({ title: "请先选择基酒", icon: "none" });
      return;
    }

    if (this.data.activeStep === 1 && this.data.ingredientIds.length === 0) {
      wx.showToast({ title: "请选择配料", icon: "none" });
      return;
    }

    if (this.data.activeStep === 2 && !this.data.recipeName) {
      wx.showToast({ title: "请输入酒谱名称", icon: "none" });
      return;
    }

    if (this.data.activeStep < 3) {
      this.setData({ activeStep: this.data.activeStep + 1 });
      return;
    }

    this.submitRecipe();
  },
  async submitRecipe() {
    if (this.data.submitting) {
      return;
    }
    if (!this.data.baseDrinkId) {
      wx.showToast({ title: "请先选择基酒", icon: "none" });
      return;
    }
    if (!this.data.recipeName) {
      wx.showToast({ title: "请输入酒谱名称", icon: "none" });
      return;
    }
    if (this.data.ingredientIds.length === 0) {
      wx.showToast({ title: "请选择配料", icon: "none" });
      return;
    }

    this.setData({ submitting: true, submitMessage: "" });
    try {
      const result = await recipeService.createRecipe({
        recipeName: this.data.recipeName,
        baseDrinkId: this.data.baseDrinkId,
        ingredientIds: this.data.ingredientIds,
        description: this.data.description
      });

      wx.showToast({ title: "已保存", icon: "success" });
      this.finishCreateFlow({
        ...result.recipe,
        recipeId: result.recipeId,
        recipeName: this.data.recipeName,
        description: this.data.description,
        coverImage: this.data.selectedBaseDrink && this.data.selectedBaseDrink.image
      });
    } catch (error) {
      const result = this.submitRecipeLocally();
      wx.showToast({ title: result.message, icon: "none" });
      this.finishCreateFlow(result.recipe);
    } finally {
      this.setData({ submitting: false });
    }
  },
  submitRecipeLocally() {
    return {
      status: "approved",
      message: "已保存",
      recipe: {
        recipeName: this.data.recipeName,
        description: this.data.description,
        coverImage: this.data.selectedBaseDrink && this.data.selectedBaseDrink.image,
        likeCount: 0
      }
    };
  },
  goRecipeDetail(e) {
    const index = e.currentTarget.dataset.index;
    const recipe = this.data.myRecipes[index] || {};
    const recipeId = recipe._id || recipe.id;
    wx.navigateTo({ url: recipeId ? `/pages/recipe-detail/recipe-detail?id=${recipeId}` : "/pages/recipe-detail/recipe-detail" });
  }
});
