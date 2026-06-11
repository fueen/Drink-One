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
  const { targetType, targetId, reason } = event;
  if (!targetType || !targetId) {
    throw new Error("targetType and targetId are required");
  }

  const userId = await getCurrentUserId();
  const result = await db.collection("report_records").add({
    data: {
      targetType,
      targetId,
      userId,
      reason: reason || "用户举报",
      status: "pending",
      createdAt: new Date()
    }
  });

  return {
    reportId: result._id,
    status: "pending"
  };
};
