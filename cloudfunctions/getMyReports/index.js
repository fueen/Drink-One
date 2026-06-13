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

exports.main = async () => {
  const userId = await getCurrentUserId();
  const reports = await db.collection("report_records").where({ userId }).orderBy("createdAt", "desc").limit(50).get();

  return {
    reports: reports.data
  };
};
