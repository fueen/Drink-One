const cloud = require("wx-server-sdk");

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

const db = cloud.database();

function normalizeDrink(drink) {
  if (!drink) {
    return null;
  }

  return {
    ...drink,
    image: drink.image || drink.imageUrl || "/assets/drinks/kakubin.png",
    tags: drink.tags || drink.tasteTags || [],
    abv: typeof drink.abv === "number" ? `${drink.abv}%vol` : drink.abv,
    id: drink._id
  };
}

function normalizeRecipe(recipe) {
  if (!recipe) {
    return null;
  }

  return {
    ...recipe,
    id: recipe._id,
    name: recipe.recipeName || recipe.name,
    cover: recipe.coverImage || recipe.cover || "/assets/drinks/beer-yellow.png",
    author: recipe.author || "Drink One",
    likes: recipe.likeCount || 0
  };
}

exports.main = async () => {
  const [drinksResult, categoriesResult, recipesResult, ingredientsResult] = await Promise.all([
    db.collection("drinks").orderBy("favoriteCount", "desc").limit(20).get(),
    db.collection("drink_categories").orderBy("sort", "asc").get(),
    db.collection("recipes").where({ status: "approved" }).orderBy("likeCount", "desc").limit(10).get(),
    db.collection("ingredients").where({ enabled: true }).limit(50).get()
  ]);

  const drinks = drinksResult.data.map(normalizeDrink);
  const recipes = recipesResult.data.map(normalizeRecipe);
  const categories = categoriesResult.data.map((item) => item.name);
  const ingredients = ingredientsResult.data.map((item) => ({
    ...item,
    id: item._id
  }));

  return {
    moods: [
      { icon: "😌", name: "微醺" },
      { icon: "🍻", name: "小醉" },
      { icon: "🥃", name: "品鉴" },
      { icon: "🎉", name: "聚会" }
    ],
    categories: ["全部", ...categories],
    drinks,
    ingredients,
    recipes,
    achievement: {
      icon: "🏅",
      name: "微醺新人",
      progress: "1/3",
      desc: "记录第一种酒，开启品鉴旅程。"
    },
    dailyDrink: drinks[0] || null,
    safetyNotice: "适量饮酒，未成年人禁止饮酒，请勿酒后驾驶。"
  };
};
