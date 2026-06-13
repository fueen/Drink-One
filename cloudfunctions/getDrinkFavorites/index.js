const cloud = require("wx-server-sdk");

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

const db = cloud.database();
const _ = db.command;

async function getCurrentUserId() {
  const wxContext = cloud.getWXContext();
  const openid = wxContext.OPENID;
  if (!openid) {
    throw new Error("unable to resolve OPENID");
  }

  const users = await db.collection("users").where({ openid }).limit(1).get();
  if (users.data.length === 0) {
    throw new Error("user not found");
  }
  return users.data[0]._id;
}

function normalizeDrink(drink, favorite) {
  return {
    ...drink,
    id: drink._id,
    image: drink.image || drink.imageUrl || "/assets/drinks/kakubin.png",
    tags: drink.tags || drink.tasteTags || [],
    abv: typeof drink.abv === "number" ? `${drink.abv}%vol` : drink.abv,
    favoritedAt: favorite.createdAt
  };
}

exports.main = async () => {
  const userId = await getCurrentUserId();
  const favorites = await db.collection("user_favorites").where({ userId }).orderBy("createdAt", "desc").limit(50).get();
  const drinkIds = favorites.data.map((item) => item.drinkId).filter(Boolean);
  const drinks = drinkIds.length
    ? await db.collection("drinks").where({ _id: _.in(drinkIds) }).get()
    : { data: [] };

  const drinkMap = {};
  for (const drink of drinks.data) {
    drinkMap[drink._id] = drink;
  }

  return {
    drinks: favorites.data
      .filter((favorite) => drinkMap[favorite.drinkId])
      .map((favorite) => normalizeDrink(drinkMap[favorite.drinkId], favorite))
  };
};
