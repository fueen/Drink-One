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
  const countResult = await db.collection("drinks").count();
  const total = countResult.total;

  if (!total) {
    return { drink: null };
  }

  const skip = Math.floor(Math.random() * total);
  const result = await db.collection("drinks").skip(skip).limit(1).get();

  return {
    drink: normalizeDrink(result.data[0])
  };
};
