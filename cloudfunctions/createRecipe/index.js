const cloud = require("wx-server-sdk");

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

const db = cloud.database();
const _ = db.command;
const { scanText } = require("../common/security");

exports.main = async (event) => {
  const wxContext = cloud.getWXContext();
  const openid = wxContext.OPENID;

  if (!openid) {
    throw new Error("unable to resolve user identity");
  }

  const { recipeName, baseDrinkId, ingredientIds, description, coverImage } = event;

  if (!recipeName || recipeName.length > 20) {
    throw new Error("recipeName is required and must be 20 characters or fewer");
  }

  if (!baseDrinkId) {
    throw new Error("baseDrinkId is required");
  }

  if (!Array.isArray(ingredientIds) || ingredientIds.length === 0) {
    throw new Error("ingredientIds is required and must contain at least one ingredient");
  }

  // Sensitive word scan
  const textCheck = scanText(`${recipeName} ${description || ""}`);
  if (!textCheck.passed) {
    throw new Error(`content contains blocked word: ${textCheck.hit}`);
  }

  // Validate all ingredients exist and are enabled
  const ingredients = await db
    .collection("ingredients")
    .where({
      _id: _.in(ingredientIds),
      enabled: true
    })
    .get();

  if (ingredients.data.length !== ingredientIds.length) {
    throw new Error("all ingredients must come from enabled system ingredients");
  }

  // Validate base drink exists
  const baseDrink = await db.collection("drinks").doc(baseDrinkId).get();
  if (!baseDrink.data) {
    throw new Error("baseDrinkId does not reference a valid drink");
  }

  const users = await db.collection("users").where({ openid }).limit(1).get();
  if (users.data.length === 0) {
    throw new Error("user not found — please login first");
  }

  const now = new Date();

  const result = await db.collection("recipes").add({
    data: {
      userId: users.data[0]._id,
      recipeName,
      baseDrinkId,
      ingredientIds,
      description: description || "",
      coverImage: coverImage || "",
      status: "pending",
      viewCount: 0,
      likeCount: 0,
      favoriteCount: 0,
      createdAt: now,
      updatedAt: now
    }
  });

  return {
    recipeId: result._id,
    status: "pending"
  };
};
