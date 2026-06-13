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
  const { recordId } = event;
  if (!recordId) {
    throw new Error("recordId is required");
  }

  const userId = await getCurrentUserId();
  const existing = await db.collection("drink_records").doc(recordId).get();
  if (!existing.data || existing.data.userId !== userId) {
    throw new Error("record not found");
  }

  await db.collection("drink_records").doc(recordId).remove();
  await db.collection("users").doc(userId).update({
    data: {
      totalDrinkRecord: db.command.inc(-1),
      updatedAt: new Date()
    }
  }).catch(() => {});

  if (existing.data.drinkId) {
    await db.collection("drinks").doc(existing.data.drinkId).update({
      data: {
        recordCount: db.command.inc(-1)
      }
    }).catch(() => {});
  }

  return {
    deleted: true,
    recordId
  };
};
