const cloud = require("wx-server-sdk");

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

const db = cloud.database();

const sortMap = {
  hot: "likeCount",
  favorite: "favoriteCount",
  creative: "likeCount",
  record: "recordCount"
};

exports.main = async (event) => {
  const type = event.type || "hot";
  const sortField = sortMap[type] || "likeCount";

  const result = await db
    .collection("recipes")
    .where({ status: "approved" })
    .orderBy(sortField, "desc")
    .limit(20)
    .get();

  return {
    type,
    list: result.data
  };
};
