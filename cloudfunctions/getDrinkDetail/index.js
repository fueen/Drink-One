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

exports.main = async (event) => {
  const { drinkId } = event;

  if (!drinkId) {
    throw new Error("drinkId is required");
  }

  const result = await db.collection("drinks").doc(drinkId).get();

  if (!result.data || result.data.length === 0) {
    throw new Error("drink not found");
  }

  // Increment view count in background (fire and forget)
  db.collection("drinks")
    .doc(drinkId)
    .update({
      data: {
        viewCount: db.command.inc(1)
      }
    })
    .catch(() => {
      // view count is non-critical — ignore failures
    });

  return {
    drink: normalizeDrink(result.data)
  };
};
