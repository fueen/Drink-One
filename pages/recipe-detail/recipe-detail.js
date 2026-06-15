const recipeService = require("../../services/recipes");
const { resolveRecipeCover } = require("../../utils/ui-v3-assets");

Page({
  data: {
    recipeId: "recipe_mojito_programmer",
    recipe: {
      id: "recipe_mojito_programmer",
      name: "周五快乐水",
      author: "Drink One",
      cover: "/assets/ui-v3/recipe-cocktail.png",
      baseDrink: "角瓶威士忌",
      ingredients: ["苏打水", "青柠", "冰块"],
      description: "清爽明亮的轻饮配方，适合慢慢品尝。",
      likes: 128,
      favorites: 42
    }
  },
  onLoad(options) {
    const recipeId = (options && options.id) || this.data.recipeId;
    this.setData({ recipeId });
    this.loadRecipe(recipeId);
  },
  async loadRecipe(recipeId) {
    try {
      const result = await recipeService.getRecipeDetail(recipeId);
      if (result.recipe) {
        this.setData({ recipe: { ...result.recipe, cover: resolveRecipeCover(result.recipe, 0) } });
      }
    } catch (error) {
      // Keep fallback recipe.
    }
  },
  goBack() {
    wx.navigateBack({
      fail() {
        wx.switchTab({ url: "/pages/index/index" });
      }
    });
  },
  async likeRecipe() {
    try {
      const result = await recipeService.toggleRecipeLike(this.data.recipeId);
      wx.showToast({ title: result.liked ? "已点赞" : "已取消", icon: "success" });
    } catch (error) {
      wx.showToast({ title: "点赞暂不可用", icon: "none" });
    }
  },
  async favoriteRecipe() {
    try {
      const result = await recipeService.toggleRecipeFavorite(this.data.recipeId);
      wx.showToast({ title: result.favorited ? "已收藏" : "已取消", icon: "success" });
    } catch (error) {
      wx.showToast({ title: "收藏暂不可用", icon: "none" });
    }
  },
  async reportRecipe() {
    try {
      await recipeService.reportContent("recipe", this.data.recipeId, "用户举报");
      wx.showToast({ title: "已收到举报", icon: "none" });
    } catch (error) {
      wx.showToast({ title: "举报暂不可用", icon: "none" });
    }
  }
});
