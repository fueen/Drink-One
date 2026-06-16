const cloud = require("wx-server-sdk");

function ok(data) {
  return { ok: true, data };
}

function fail(message) {
  return { ok: false, message };
}

async function getCurrentUser(db, options = {}) {
  const wxContext = cloud.getWXContext();
  const openid = wxContext.OPENID;

  if (!openid) {
    throw new Error("unable to resolve OPENID");
  }

  const users = await db.collection("users").where({ openid }).limit(1).get();
  const user = users.data[0] || null;

  if (options.requireUser && !user) {
    throw new Error("user not found");
  }

  return {
    openid,
    user,
    userId: user && user._id
  };
}

function filterAllowedFields(data = {}, allowedFields = []) {
  const filtered = {};
  const blockedFields = new Set(["_openid", "openid"]);

  for (const field of allowedFields) {
    if (!blockedFields.has(field) && Object.prototype.hasOwnProperty.call(data, field)) {
      filtered[field] = data[field];
    }
  }

  return filtered;
}

function normalizePagination(event = {}) {
  const page = Math.max(parseInt(event.page, 10) || 1, 1);
  const pageSize = Math.min(Math.max(parseInt(event.pageSize, 10) || 20, 1), 100);

  return {
    page,
    pageSize,
    skip: (page - 1) * pageSize
  };
}

function safeInc(db, amount) {
  const value = Number(amount);

  if (!Number.isFinite(value) || value === 0) {
    return 0;
  }

  return db.command.inc(value);
}

function handleCloudError(error) {
  const raw = error && (error.message || error.errMsg || String(error));
  if (!raw) {
    return "operation failed";
  }

  if (
    raw.includes("DATABASE_COLLECTION_NOT_EXIST") ||
    raw.includes("collection not exists") ||
    raw.includes("Db or Table not exist") ||
    raw.includes("ResourceNotFound")
  ) {
    return "collection does not exist, run initSeedData with createEmptyCollections first";
  }

  return raw.length > 96 ? "cloud database operation failed" : raw;
}

module.exports = {
  ok,
  fail,
  getCurrentUser,
  filterAllowedFields,
  normalizePagination,
  safeInc,
  handleCloudError
};
