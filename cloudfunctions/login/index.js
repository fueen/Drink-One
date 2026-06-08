const cloud = require("wx-server-sdk");

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

const db = cloud.database();

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  const openid = wxContext.OPENID;

  if (!openid) {
    throw new Error("unable to resolve openid from WXContext");
  }

  const existing = await db.collection("users").where({ openid }).limit(1).get();

  if (existing.data.length > 0) {
    return { user: existing.data[0] };
  }

  const now = new Date();
  const user = {
    openid,
    nickname: "",
    avatarUrl: "",
    gender: 0,
    city: "",
    province: "",
    country: "",
    drinkLevel: 1,
    totalDrinkRecord: 0,
    totalRecipeCount: 0,
    achievementCount: 0,
    createdAt: now,
    updatedAt: now
  };

  const created = await db.collection("users").add({ data: user });

  return {
    user: {
      _id: created._id,
      ...user
    }
  };
};
