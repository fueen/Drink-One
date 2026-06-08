const cloud = require("wx-server-sdk");

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

const db = cloud.database();

exports.main = async (event) => {
  const { userId } = event;

  if (!userId) {
    throw new Error("userId is required");
  }

  const user = await db.collection("users").doc(userId).get();
  if (!user.data) {
    throw new Error("user not found");
  }

  const definitions = await db.collection("achievement_definitions").get();
  const unlocked = await db.collection("user_achievements").where({ userId }).get();
  const unlockedIds = new Set(unlocked.data.map((item) => item.achievementId));

  const newUnlocks = [];

  for (const definition of definitions.data) {
    if (unlockedIds.has(definition._id)) {
      continue;
    }

    let shouldUnlock = false;

    if (
      definition.conditionType === "drink_record" &&
      user.data.totalDrinkRecord >= definition.conditionValue
    ) {
      shouldUnlock = true;
    }

    if (
      definition.conditionType === "recipe_publish" &&
      user.data.totalRecipeCount >= definition.conditionValue
    ) {
      shouldUnlock = true;
    }

    if (shouldUnlock) {
      const result = await db.collection("user_achievements").add({
        data: {
          userId,
          achievementId: definition._id,
          unlockedAt: new Date()
        }
      });
      newUnlocks.push(result._id);
    }
  }

  if (newUnlocks.length > 0) {
    await db
      .collection("users")
      .doc(userId)
      .update({
        data: {
          achievementCount: db.command.inc(newUnlocks.length),
          updatedAt: new Date()
        }
      });
  }

  return {
    unlockedIds: newUnlocks
  };
};
