const cloud = require("wx-server-sdk");
const { ok, fail, getCurrentUser, handleCloudError } = require("../common/crud-utils");

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

const db = cloud.database();

exports.main = async (event = {}) => {
  try {
    await getCurrentUser(db, { requireUser: true });

    const drinkId = event.drinkId || event.id;
    if (!drinkId) {
      throw new Error("drinkId is required");
    }

    await db.collection("drinks").doc(drinkId).update({
      data: {
        enabled: false,
        status: "hidden",
        updatedAt: new Date()
      }
    });

    return ok({
      deleted: true,
      softDeleted: true,
      drinkId
    });
  } catch (error) {
    return fail(handleCloudError(error));
  }
};
