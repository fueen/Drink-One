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

function normalizeDrinkInput(data = {}) {
  const payload = filterAllowedFields(data, allowedFields);

  if (!payload.name) {
    throw new Error("name is required");
  }

  if (!payload.categoryId) {
    throw new Error("categoryId is required");
  }

  if (payload.abv != null) {
    const abv = Number(payload.abv);
    if (!Number.isFinite(abv) || abv < 0 || abv > 96) {
      throw new Error("abv must be between 0 and 96");
    }
    payload.abv = abv;
  }

  payload.tasteTags = Array.isArray(payload.tasteTags) ? payload.tasteTags : [];
  payload.statusTags = Array.isArray(payload.statusTags) ? payload.statusTags : [];
  payload.recommendScenes = Array.isArray(payload.recommendScenes) ? payload.recommendScenes : [];
  payload.gallery = Array.isArray(payload.gallery) ? payload.gallery : [];
  payload.favoriteCount = 0;
  payload.viewCount = 0;
  payload.recordCount = 0;
  payload.enabled = payload.enabled !== false;
  payload.status = payload.status || "published";
  payload.createdAt = new Date();
  payload.updatedAt = new Date();

  return payload;
}

exports.main = async (event = {}) => {
  try {
    await getCurrentUser(db, { requireUser: true });

    const data = event.data || event;
    const payload = normalizeDrinkInput(data);
    const result = await db.collection("drinks").add({ data: payload });
    const created = await db.collection("drinks").doc(result._id).get();

    return ok({
      drinkId: result._id,
      drink: created.data
    });
  } catch (error) {
    return fail(handleCloudError(error));
  }
};
