const cloud = require("wx-server-sdk");

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

const db = cloud.database();
const _ = db.command;
const { scanText } = require("../common/security");

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
  const { recipeId, recipeName, baseDrinkId, ingredientIds, description, coverImage } = event;
  if (!recipeId) {
    throw new Error("recipeId is required");
  }
  if (!recipeName || recipeName.length > 20) {
    throw new Error("recipeName is required and must be 20 characters or fewer");
  }
  if (!baseDrinkId) {
    throw new Error("baseDrinkId is required");
  }
  if (!Array.isArray(ingredientIds) || ingredientIds.length === 0) {
    throw new Error("ingredientIds is required and must contain at least one ingredient");
  }

  const textCheck = scanText(`${recipeName} ${description || ""}`);
  if (!textCheck.passed) {
    throw new Error(`content contains blocked word: ${textCheck.hit}`);
  }

  const userId = await getCurrentUserId();
  const existing = await db.collection("recipes").doc(recipeId).get();
  if (!existing.data || existing.data.userId !== userId) {
    throw new Error("recipe not found");
  }
  if (existing.data.status === "approved") {
    throw new Error("approved recipes cannot be edited directly");
  }

  const ingredients = await db.collection("ingredients").where({
    _id: _.in(ingredientIds),
    enabled: true
  }).get();
  if (ingredients.data.length !== ingredientIds.length) {
    throw new Error("all ingredients must come from enabled system ingredients");
  }

  const baseDrink = await db.collection("drinks").doc(baseDrinkId).get();
  if (!baseDrink.data) {
    throw new Error("baseDrinkId does not reference a valid drink");
  }

  await db.collection("recipes").doc(recipeId).update({
    data: {
      recipeName,
      baseDrinkId,
      ingredientIds,
      description: description || "",
      coverImage: coverImage || existing.data.coverImage || "",
      status: "pending",
      updatedAt: new Date()
    }
  });

  const updated = await db.collection("recipes").doc(recipeId).get();
  return {
    recipe: updated.data,
    status: "pending"
  };
};
