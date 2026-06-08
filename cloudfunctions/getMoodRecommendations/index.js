const cloud = require("wx-server-sdk");

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

const db = cloud.database();
const _ = db.command;

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

exports.main = async (event) => {
  const { mood } = event;

  if (!mood) {
    throw new Error("mood is required");
  }

  const result = await db
    .collection("drinks")
    .where({
      statusTags: _.in([mood])
    })
    .orderBy("favoriteCount", "desc")
    .limit(20)
    .get();

  return {
    mood,
    drinks: result.data.map(normalizeDrink).filter(Boolean)
  };
};
