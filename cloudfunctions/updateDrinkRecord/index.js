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
  const { recordId, rating, scene, note } = event;
  if (!recordId) {
    throw new Error("recordId is required");
  }
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    throw new Error("rating must be an integer from 1 to 5");
  }

  const userId = await getCurrentUserId();
  const existing = await db.collection("drink_records").doc(recordId).get();
  if (!existing.data || existing.data.userId !== userId) {
    throw new Error("record not found");
  }

  await db.collection("drink_records").doc(recordId).update({
    data: {
      rating,
      scene: scene || "",
      note: note || "",
      updatedAt: new Date()
    }
  });

  const updated = await db.collection("drink_records").doc(recordId).get();
  return {
    record: updated.data
  };
};
