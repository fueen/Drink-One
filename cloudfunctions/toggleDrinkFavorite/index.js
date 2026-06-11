const cloud = require("wx-server-sdk");

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

const db = cloud.database();

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

exports.main = async (event) => {
  const { drinkId } = event;
  if (!drinkId) {
    throw new Error("drinkId is required");
  }

  const userId = await getCurrentUserId();
  const existing = await db.collection("user_favorites").where({ drinkId, userId }).limit(1).get();
  const favorited = existing.data.length === 0;

  if (favorited) {
    await db.collection("user_favorites").add({
      data: {
        drinkId,
        userId,
        createdAt: new Date()
      }
    });
  } else {
    await db.collection("user_favorites").doc(existing.data[0]._id).remove();
  }

  await db.collection("drinks").doc(drinkId).update({
    data: {
      favoriteCount: db.command.inc(favorited ? 1 : -1)
    }
  });

  return {
    favorited
  };
};
