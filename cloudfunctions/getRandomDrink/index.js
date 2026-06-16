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
    id: drink._id,
    image: drink.image || drink.imageUrl || "/assets/drinks/kakubin.png",
    tags: drink.tags || drink.tasteTags || [],
    abv: typeof drink.abv === "number" ? `${drink.abv}%vol` : drink.abv
  };
}

exports.main = async (event = {}) => {
  const query = db.collection("drinks").where({ enabled: true, status: _.neq("hidden") });
  const countResult = await query.count();
  const total = countResult.total;

  if (!total) {
    return { drink: null };
  }

  const excludeId = event.excludeId;
  let result = { data: [] };

  for (let attempt = 0; attempt < 3; attempt += 1) {
    const skip = Math.floor(Math.random() * total);
    result = await query.skip(skip).limit(1).get();

    if (total <= 1 || !excludeId || result.data[0]._id !== excludeId) {
      break;
    }
  }

  return {
    drink: normalizeDrink(result.data[0])
  };
};
