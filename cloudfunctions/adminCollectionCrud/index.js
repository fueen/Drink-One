const cloud = require("wx-server-sdk");
const {
  ok,
  fail,
  getCurrentUser,
  filterAllowedFields,
  normalizePagination,
  handleCloudError
} = require("../common/crud-utils");

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

const db = cloud.database();

const allowedCollections = [
  "users",
  "drink_categories",
  "drinks",
  "drink_tags",
  "ingredients",
  "recipes",
  "recipe_likes",
  "recipe_favorites",
  "drink_records",
  "user_favorites",
  "user_achievements",
  "achievement_definitions",
  "recommend_logs",
  "system_configs",
  "report_records"
];

const fieldAllowlists = {
  users: ["nickname", "avatarUrl", "gender", "city", "province", "country", "totalRecipeCount", "totalDrinkRecord", "updatedAt"],
  drink_categories: ["name", "icon", "sortOrder", "enabled", "updatedAt"],
  drinks: ["name", "englishName", "categoryId", "brand", "origin", "abv", "description", "imageUrl", "statusTags", "tasteTags", "enabled", "updatedAt"],
  drink_tags: ["name", "type", "sortOrder", "enabled", "updatedAt"],
  ingredients: ["name", "type", "imageUrl", "enabled", "sortOrder", "updatedAt"],
  recipes: ["recipeName", "baseDrinkId", "ingredientIds", "description", "coverImage", "status", "updatedAt"],
  recipe_likes: ["userId", "recipeId", "createdAt"],
  recipe_favorites: ["userId", "recipeId", "createdAt"],
  drink_records: ["userId", "drinkId", "rating", "scene", "note", "createdAt", "updatedAt"],
  user_favorites: ["userId", "drinkId", "createdAt"],
  user_achievements: ["userId", "achievementId", "unlockedAt", "progress", "updatedAt"],
  achievement_definitions: ["name", "description", "icon", "condition", "sortOrder", "enabled", "updatedAt"],
  recommend_logs: ["userId", "drinkId", "source", "mood", "createdAt"],
  system_configs: ["key", "value", "description", "enabled", "updatedAt"],
  report_records: ["userId", "targetType", "targetId", "reason", "description", "status", "createdAt", "updatedAt"]
};

const actions = ["list", "get", "create", "update", "delete", "count"];

function assertAllowed(action, collection) {
  if (!actions.includes(action)) {
    throw new Error("unsupported action");
  }

  if (!allowedCollections.includes(collection)) {
    throw new Error("collection is not allowed");
  }
}

function buildWhere(collection, where = {}) {
  const allowedWhereFields = ["_id", ...fieldAllowlists[collection]];
  return filterAllowedFields(where, allowedWhereFields);
}

async function getItem(collection, id) {
  if (!id) {
    throw new Error("id is required");
  }

  const result = await db.collection(collection).doc(id).get();
  if (!result.data) {
    throw new Error("item not found");
  }

  return result.data;
}

async function list(collection, event) {
  const { page, pageSize, skip } = normalizePagination(event);
  const where = buildWhere(collection, event.where);
  const query = db.collection(collection).where(where);
  const [items, totalResult] = await Promise.all([
    query.skip(skip).limit(pageSize).get(),
    query.count()
  ]);

  return {
    items: items.data,
    total: totalResult.total,
    page,
    pageSize
  };
}

async function create(collection, data = {}) {
  const now = new Date();
  const payload = filterAllowedFields(data, fieldAllowlists[collection]);

  if (Object.keys(payload).length === 0) {
    throw new Error("data has no allowed fields");
  }

  payload.createdAt = data.createdAt || now;
  payload.updatedAt = now;

  const result = await db.collection(collection).add({ data: payload });
  return {
    item: await getItem(collection, result._id)
  };
}

async function update(collection, id, data = {}) {
  const payload = filterAllowedFields(data, fieldAllowlists[collection]);

  if (Object.keys(payload).length === 0) {
    throw new Error("data has no allowed fields");
  }

  payload.updatedAt = new Date();
  await db.collection(collection).doc(id).update({ data: payload });

  return {
    item: await getItem(collection, id)
  };
}

async function remove(collection, id) {
  if (!id) {
    throw new Error("id is required");
  }

  await db.collection(collection).doc(id).remove();
  return {
    deleted: true,
    id
  };
}

async function count(collection, event) {
  const where = buildWhere(collection, event.where);
  const result = await db.collection(collection).where(where).count();

  return {
    total: result.total
  };
}

exports.main = async (event = {}) => {
  const { action, collection, id, data } = event;

  try {
    assertAllowed(action, collection);
    await getCurrentUser(db);

    if (action === "list") {
      return ok(await list(collection, event));
    }

    if (action === "get") {
      return ok({ item: await getItem(collection, id) });
    }

    if (action === "create") {
      return ok(await create(collection, data));
    }

    if (action === "update") {
      return ok(await update(collection, id, data));
    }

    if (action === "delete") {
      return ok(await remove(collection, id));
    }

    if (action === "count") {
      return ok(await count(collection, event));
    }
  } catch (error) {
    return fail(handleCloudError(error));
  }

  return fail("unsupported action");
};
