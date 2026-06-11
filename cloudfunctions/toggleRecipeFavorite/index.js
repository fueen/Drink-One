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
  const { recipeId } = event;
  if (!recipeId) {
    throw new Error("recipeId is required");
  }

  const userId = await getCurrentUserId();
  const existing = await db.collection("recipe_favorites").where({ recipeId, userId }).limit(1).get();
  const favorited = existing.data.length === 0;

  if (favorited) {
    await db.collection("recipe_favorites").add({
      data: {
        recipeId,
        userId,
        createdAt: new Date()
      }
    });
  } else {
    await db.collection("recipe_favorites").doc(existing.data[0]._id).remove();
  }

  await db.collection("recipes").doc(recipeId).update({
    data: {
      favoriteCount: db.command.inc(favorited ? 1 : -1),
      updatedAt: new Date()
    }
  });

  return {
    favorited
  };
};
