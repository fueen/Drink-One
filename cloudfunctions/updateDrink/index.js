const cloud = require("wx-server-sdk");
const { ok, fail, getCurrentUser, filterAllowedFields, handleCloudError } = require("../common/crud-utils");

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

const db = cloud.database();

const allowedFields = [
  "name",
  "englishName",
  "categoryId",
  "brand",
  "origin",
  "country",
  "abv",
  "capacity",
  "description",
  "imageUrl",
  "gallery",
  "tasteTags",
  "statusTags",
  "recommendScenes",
  "riskLevel",
  "enabled",
  "status"
];

function normalizeDrinkPatch(data = {}) {
  const payload = filterAllowedFields(data, allowedFields);

  if (payload.abv != null) {
    const abv = Number(payload.abv);
    if (!Number.isFinite(abv) || abv < 0 || abv > 96) {
      throw new Error("abv must be between 0 and 96");
    }
    payload.abv = abv;
  }

  for (const field of ["tasteTags", "statusTags", "recommendScenes", "gallery"]) {
    if (payload[field] != null && !Array.isArray(payload[field])) {
      throw new Error(`${field} must be an array`);
    }
  }

  if (Object.keys(payload).length === 0) {
    throw new Error("data has no allowed fields");
  }

  payload.updatedAt = new Date();
  return payload;
}

exports.main = async (event = {}) => {
  try {
    await getCurrentUser(db, { requireUser: true });

    const drinkId = event.drinkId || event.id;
    if (!drinkId) {
      throw new Error("drinkId is required");
    }

    const payload = normalizeDrinkPatch(event.data || event);
    await db.collection("drinks").doc(drinkId).update({ data: payload });
    const updated = await db.collection("drinks").doc(drinkId).get();

    return ok({
      drinkId,
      drink: updated.data
    });
  } catch (error) {
    return fail(handleCloudError(error));
  }
};
