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
    abv: typeof drink.abv === "number" ? `${drink.abv}%vol` : drink.abv
  };
}

exports.main = async () => {
  const drinksResult = await db
    .collection("drinks")
    .orderBy("favoriteCount", "desc")
    .limit(1)
    .get();

  return {
    moods: [
      { icon: "😌", name: "微醺" },
      { icon: "🍻", name: "小醉" },
      { icon: "🥃", name: "品鉴" },
      { icon: "🎉", name: "聚会" }
    ],
    dailyDrink: normalizeDrink(drinksResult.data[0]),
    safetyNotice: "适量饮酒，未成年人禁止饮酒，请勿酒后驾驶。"
  };
};
