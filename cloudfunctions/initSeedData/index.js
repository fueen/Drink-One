const cloud = require("wx-server-sdk");

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

const db = cloud.database();

const seedCollections = {
  drink_categories: require("./seed-data/categories.json"),
  drink_tags: require("./seed-data/tags.json"),
  ingredients: require("./seed-data/ingredients.json"),
  achievement_definitions: require("./seed-data/achievements.json"),
  drinks: require("./seed-data/drinks.sample.json"),
  recipes: require("./seed-data/recipes.sample.json"),
  system_configs: require("./seed-data/system-configs.json")
};

const allCollections = [
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

const BATCH_SIZE = 10;

function buildStableId(collectionName, item, index) {
  if (item._id) {
    return item._id;
  }

  if (collectionName === "drink_categories") {
    return `cat_${item.icon || index + 1}`;
  }

  if (collectionName === "drink_tags") {
    return `tag_${item.type || "common"}_${index + 1}`;
  }

  return `${collectionName}_${index + 1}`;
}

async function upsertDocument(collectionName, item, index) {
  const _id = buildStableId(collectionName, item, index);
  const data = {
    ...item,
    updatedAt: new Date()
  };

  delete data._id;

  await db.collection(collectionName).doc(_id).set({ data });

  return _id;
}

async function ensureCollection(collectionName) {
  if (!db.createCollection) {
    return;
  }

  try {
    await db.createCollection(collectionName);
  } catch (error) {
    // Collection already exists or current environment does not allow creation.
    // Continue with document upsert so repeated seed runs stay idempotent.
  }
}

async function verifyCollections(collectionNames = allCollections) {
  const missingCollections = [];

  for (const collectionName of collectionNames) {
    try {
      await db.collection(collectionName).limit(1).get();
    } catch (error) {
      const message = (error && (error.message || error.errMsg || String(error))) || "";
      if (
        message.includes("DATABASE_COLLECTION_NOT_EXIST") ||
        message.includes("collection not exists") ||
        message.includes("Db or Table not exist") ||
        message.includes("ResourceNotFound")
      ) {
        missingCollections.push(collectionName);
      } else {
        throw error;
      }
    }
  }

  return {
    missingCollections,
    complete: missingCollections.length === 0
  };
}

async function upsertCollection(collectionName, items) {
  const ids = [];

  for (let start = 0; start < items.length; start += BATCH_SIZE) {
    const batch = items.slice(start, start + BATCH_SIZE);
    const batchIds = await Promise.all(
      batch.map((item, offset) => upsertDocument(collectionName, item, start + offset))
    );
    ids.push(...batchIds);
  }

  return ids;
}

exports.main = async (event = {}) => {
  const targetCollection = event.collection;
  const verifyOnly = event.verifyOnly || event.action === "verifyCollections";
  const createEmptyCollections = Boolean(event.createEmptyCollections);

  if (targetCollection && !allCollections.includes(targetCollection)) {
    throw new Error(`unknown collection: ${targetCollection}`);
  }

  const targetCollections = targetCollection ? [targetCollection] : allCollections;

  if (createEmptyCollections) {
    for (const collectionName of targetCollections) {
      await ensureCollection(collectionName);
    }
  }

  if (verifyOnly) {
    const verification = await verifyCollections(targetCollections);
    return {
      ok: true,
      ...verification
    };
  }

  const entries = targetCollection
    ? [[targetCollection, seedCollections[targetCollection]]]
    : Object.entries(seedCollections);

  const summary = {};

  for (const [collectionName, items] of entries) {
    if (!Array.isArray(items)) {
      if (createEmptyCollections) {
        summary[collectionName] = {
          count: 0,
          ids: []
        };
        continue;
      }

      throw new Error(`unknown seed collection: ${collectionName}`);
    }

    await ensureCollection(collectionName);

    const ids = await upsertCollection(collectionName, items);

    summary[collectionName] = {
      count: ids.length,
      ids
    };
  }

  return {
    ok: true,
    summary
  };
};
