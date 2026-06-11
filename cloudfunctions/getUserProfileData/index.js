const cloud = require("wx-server-sdk");

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

const db = cloud.database();

exports.main = async () => {
  const wxContext = cloud.getWXContext();
  const openid = wxContext.OPENID;
  if (!openid) {
    throw new Error("unable to resolve OPENID");
  }

  const users = await db.collection("users").where({ openid }).limit(1).get();
  if (users.data.length === 0) {
    throw new Error("user not found");
  }

  const user = users.data[0];
  const userId = user._id;
  const [favorites, records, recipeFavorites] = await Promise.all([
    db.collection("user_favorites").where({ userId }).count(),
    db.collection("drink_records").where({ userId }).count(),
    db.collection("recipe_favorites").where({ userId }).count()
  ]);

  return {
    user,
    stats: [
      { value: records.total || user.totalDrinkRecord || 0, label: "记录酒品" },
      { value: favorites.total || 0, label: "收藏酒品" },
      { value: user.totalRecipeCount || 0, label: "DIY酒谱" },
      { value: user.achievementCount || 0, label: "成就数" }
    ],
    recipeFavoriteCount: recipeFavorites.total || 0
  };
};
