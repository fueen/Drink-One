const cloud = require("wx-server-sdk");

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

const db = cloud.database();

exports.main = async () => {
  const wxContext = cloud.getWXContext();
  const openid = wxContext.OPENID;
  if (!openid) {
    throw new Error("unable to resolve OPENID");
  }

  const users = await db.collection("users").where({ openid }).limit(1).get();
  if (users.data.length === 0) {
    throw new Error("user not found");
  }

  const userId = users.data[0]._id;
  const [definitions, unlocked] = await Promise.all([
    db.collection("achievement_definitions").orderBy("sort", "asc").get(),
    db.collection("user_achievements").where({ userId }).get()
  ]);

  const unlockedMap = {};
  for (const item of unlocked.data) {
    unlockedMap[item.achievementId] = item;
  }

  const achievements = definitions.data.map((definition) => ({
    ...definition,
    active: Boolean(unlockedMap[definition._id]),
    desc: unlockedMap[definition._id]
      ? `解锁时间：${new Date(unlockedMap[definition._id].unlockedAt).toISOString().slice(0, 10)}`
      : definition.description
  }));

  return {
    unlocked: `${unlocked.data.length}/${definitions.data.length}`,
    achievements
  };
};
