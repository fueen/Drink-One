const cloud = require("wx-server-sdk");

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

const db = cloud.database();
const _ = db.command;

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

  const userId = users.data[0]._id;
  const records = await db.collection("drink_records").where({ userId }).orderBy("createdAt", "desc").limit(50).get();
  const drinkIds = records.data.map((item) => item.drinkId).filter(Boolean);
  const drinks = drinkIds.length
    ? await db.collection("drinks").where({ _id: _.in(drinkIds) }).get()
    : { data: [] };

  const drinkMap = {};
  for (const drink of drinks.data) {
    drinkMap[drink._id] = drink;
  }

  return {
    records: records.data.map((record) => ({
      ...record,
      drink: drinkMap[record.drinkId] || null
    }))
  };
};
