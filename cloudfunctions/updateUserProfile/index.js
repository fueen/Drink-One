const cloud = require("wx-server-sdk");

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

const db = cloud.database();
const allowedFields = ["nickname", "avatarUrl", "gender", "city", "province", "country"];

exports.main = async (event) => {
  const wxContext = cloud.getWXContext();
  const openid = wxContext.OPENID;
  if (!openid) {
    throw new Error("unable to resolve OPENID");
  }

  const users = await db.collection("users").where({ openid }).limit(1).get();
  if (users.data.length === 0) {
    throw new Error("user not found");
  }

  const data = {};
  for (const field of allowedFields) {
    if (Object.prototype.hasOwnProperty.call(event, field)) {
      data[field] = event[field];
    }
  }

  if (Object.keys(data).length === 0) {
    throw new Error("no updatable profile fields provided");
  }

  data.updatedAt = new Date();
  const userId = users.data[0]._id;
  await db.collection("users").doc(userId).update({ data });
  const updated = await db.collection("users").doc(userId).get();

  return {
    user: updated.data
  };
};
