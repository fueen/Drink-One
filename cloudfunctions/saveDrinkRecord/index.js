const cloud = require("wx-server-sdk");

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

const db = cloud.database();

exports.main = async (event) => {
  const wxContext = cloud.getWXContext();
  const openid = wxContext.OPENID;

  if (!openid) {
    throw new Error("unable to resolve user identity");
  }

  const { drinkId, rating, scene, note } = event;

  if (!drinkId) {
    throw new Error("drinkId is required");
  }

  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    throw new Error("rating must be an integer from 1 to 5");
  }

  const users = await db.collection("users").where({ openid }).limit(1).get();
  if (users.data.length === 0) {
    throw new Error("user not found — please login first");
  }

  const userId = users.data[0]._id;
  const now = new Date();

  const result = await db.collection("drink_records").add({
    data: {
      userId,
      drinkId,
      rating,
      scene: scene || "",
      note: note || "",
      createdAt: now
    }
  });

  // Update user and drink stats
  await db
    .collection("users")
    .doc(userId)
    .update({
      data: {
        totalDrinkRecord: db.command.inc(1),
        updatedAt: now
      }
    });

  await db
    .collection("drinks")
    .doc(drinkId)
    .update({
      data: {
        recordCount: db.command.inc(1)
      }
    });

  // Trigger achievement check
  await cloud.callFunction({
    name: "checkAchievements",
    data: { userId }
  }).catch(() => {
    // achievement check is non-critical — ignore failures
  });

  return {
    recordId: result._id
  };
};
