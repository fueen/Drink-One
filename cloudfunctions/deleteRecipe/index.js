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

async function removeAll(collection, where) {
  let removed = 0;
  while (true) {
    const result = await collection.where(where).limit(100).get();
    if (result.data.length === 0) {
      return removed;
    }
    await Promise.all(result.data.map((item) => collection.doc(item._id).remove()));
    removed += result.data.length;
  }
}

exports.main = async (event) => {
  const { recipeId } = event;
  if (!recipeId) {
    throw new Error("recipeId is required");
  }

  const userId = await getCurrentUserId();
  const existing = await db.collection("recipes").doc(recipeId).get();
  if (!existing.data || existing.data.userId !== userId) {
    throw new Error("recipe not found");
  }
  if (existing.data.status === "approved") {
    throw new Error("approved recipes cannot be deleted directly");
  }

  await db.collection("recipes").doc(recipeId).remove();
  await Promise.all([
    removeAll(db.collection("recipe_likes"), { recipeId }),
    removeAll(db.collection("recipe_favorites"), { recipeId }),
    db.collection("users").doc(userId).update({
      data: {
        totalRecipeCount: db.command.inc(-1),
        updatedAt: new Date()
      }
    }).catch(() => {})
  ]);

  return {
    deleted: true,
    recipeId
  };
};
