const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const readJson = (file) => {
  try {
    return JSON.parse(fs.readFileSync(path.join(root, file), "utf8"));
  } catch (error) {
    throw new Error(`${file} is not valid JSON: ${error.message}`);
  }
};

const app = readJson("app.json");
const jsonFiles = [
  "app.json",
  "sitemap.json",
  ...fs
    .readdirSync(path.join(root, "pages"), { recursive: true })
    .filter((file) => file.endsWith(".json"))
    .map((file) => path.join("pages", file)),
  ...(fs.existsSync(path.join(root, "components"))
    ? fs
        .readdirSync(path.join(root, "components"), { recursive: true })
        .filter((file) => file.endsWith(".json"))
        .map((file) => path.join("components", file))
    : [])
];
const jsFiles = [
  "app.js",
  ...(fs.existsSync(path.join(root, "config"))
    ? fs
        .readdirSync(path.join(root, "config"), { recursive: true })
        .filter((file) => file.endsWith(".js"))
        .filter((file) => file !== "secrets.local.js")
        .map((file) => path.join("config", file))
    : []),
  ...(fs.existsSync(path.join(root, "services"))
    ? fs
        .readdirSync(path.join(root, "services"), { recursive: true })
        .filter((file) => file.endsWith(".js"))
        .map((file) => path.join("services", file))
    : []),
  ...fs
    .readdirSync(path.join(root, "pages"), { recursive: true })
    .filter((file) => file.endsWith(".js"))
    .map((file) => path.join("pages", file)),
  ...(fs.existsSync(path.join(root, "components"))
    ? fs
        .readdirSync(path.join(root, "components"), { recursive: true })
        .filter((file) => file.endsWith(".js"))
        .map((file) => path.join("components", file))
    : []),
  ...(fs.existsSync(path.join(root, "cloudfunctions"))
    ? fs
        .readdirSync(path.join(root, "cloudfunctions"), { recursive: true })
        .filter((file) => file.endsWith(".js"))
        .map((file) => path.join("cloudfunctions", file))
    : [])
];

const requiredPages = [
  "pages/index/index",
  "pages/mood/mood",
  "pages/detail/detail",
  "pages/diy/diy",
  "pages/ranking/ranking",
  "pages/library/library",
  "pages/test/test",
  "pages/achievements/achievements",
  "pages/profile/profile",
  "pages/record/record"
];

const requiredTabs = [
  "pages/index/index",
  "pages/library/library",
  "pages/diy/diy",
  "pages/ranking/ranking",
  "pages/profile/profile"
];
const requiredAssets = [
  "assets/drinks/kakubin.png",
  "assets/drinks/beer-red.png",
  "assets/drinks/beer-green.png",
  "assets/drinks/beer-yellow.png"
];
const requiredComponents = [
  "components/drink-card/drink-card",
  "components/safety-notice/safety-notice",
  "components/tag-list/tag-list"
];
const requiredSeedDataFiles = [
  "scripts/seed-data/categories.json",
  "scripts/seed-data/tags.json",
  "scripts/seed-data/ingredients.json",
  "scripts/seed-data/achievements.json",
  "scripts/seed-data/drinks.sample.json"
];
const requiredCloudFunctions = [
  "cloudfunctions/login/index.js",
  "cloudfunctions/getHomeData/index.js",
  "cloudfunctions/getRandomDrink/index.js",
  "cloudfunctions/getMoodRecommendations/index.js",
  "cloudfunctions/getDrinkDetail/index.js",
  "cloudfunctions/saveDrinkRecord/index.js",
  "cloudfunctions/createRecipe/index.js",
  "cloudfunctions/getRanking/index.js"
];
const requiredServices = [
  "services/cloud.js",
  "services/drinks.js"
];
const expectedCloudEnvId = "drink-one-dev-d8gemhfgb21abcf33";

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

for (const file of jsonFiles) {
  readJson(file);
}

for (const file of jsFiles) {
  const source = fs.readFileSync(path.join(root, file), "utf8");
  try {
    new Function("App", "Page", "Component", "wx", "exports", source);
  } catch (error) {
    throw new Error(`${file} is not valid JavaScript: ${error.message}`);
  }
}

for (const asset of requiredAssets) {
  const assetPath = path.join(root, asset);
  assert(fs.existsSync(assetPath), `${asset} should exist`);
  assert(fs.statSync(assetPath).size < 200 * 1024, `${asset} should be smaller than 200KB`);
}

for (const page of requiredPages) {
  assert(app.pages.includes(page), `app.json should include ${page}`);
  for (const ext of [".js", ".json", ".wxml", ".wxss"]) {
    assert(
      fs.existsSync(path.join(root, `${page}${ext}`)),
      `${page}${ext} should exist`
    );
  }
}

for (const component of requiredComponents) {
  for (const ext of [".js", ".json", ".wxml", ".wxss"]) {
    assert(
      fs.existsSync(path.join(root, `${component}${ext}`)),
      `${component}${ext} should exist`
    );
  }
}

for (const file of requiredSeedDataFiles) {
  assert(fs.existsSync(path.join(root, file)), `${file} should exist`);
  const data = readJson(file);
  assert(Array.isArray(data), `${file} should contain a JSON array`);
  assert(data.length > 0, `${file} should contain at least one item`);
}
assert(fs.existsSync(path.join(root, "scripts/README.md")), "scripts/README.md should exist");

for (const file of requiredCloudFunctions) {
  assert(fs.existsSync(path.join(root, file)), `${file} should exist`);
}

for (const file of requiredServices) {
  assert(fs.existsSync(path.join(root, file)), `${file} should exist`);
}

assert(fs.existsSync(path.join(root, "config/env.js")), "config/env.js should exist");
assert(fs.existsSync(path.join(root, "config/secrets.example.js")), "config/secrets.example.js should exist");
const gitignore = fs.existsSync(path.join(root, ".gitignore"))
  ? fs.readFileSync(path.join(root, ".gitignore"), "utf8")
  : "";
assert(gitignore.includes("config/secrets.local.js"), ".gitignore should ignore config/secrets.local.js");
if (fs.existsSync(path.join(root, "config/secrets.local.js"))) {
  const secretsSource = fs.readFileSync(path.join(root, "config/secrets.local.js"), "utf8");
  try {
    new Function("module", "exports", secretsSource);
  } catch (error) {
    throw new Error(`config/secrets.local.js is not valid JavaScript: ${error.message}`);
  }
}
const envSource = fs.readFileSync(path.join(root, "config/env.js"), "utf8");
assert(envSource.includes(expectedCloudEnvId), "config/env.js should include the CloudBase envId");

const appJs = fs.readFileSync(path.join(root, "app.js"), "utf8");
assert(appJs.includes("wx.cloud.init"), "app.js should initialize wx.cloud");
assert(appJs.includes("traceUser: true"), "app.js should enable CloudBase traceUser");
assert(appJs.includes("userService.login"), "app.js should call userService.login on launch");
assert(appJs.includes("globalData.user"), "app.js should store user in globalData");

const projectConfig = readJson("project.config.json");
assert(
  projectConfig.cloudfunctionRoot === "cloudfunctions/",
  "project.config.json should set cloudfunctionRoot to cloudfunctions/"
);

const indexJs = fs.readFileSync(path.join(root, "pages/index/index.js"), "utf8");
assert(indexJs.includes("../../services/drinks"), "index page should use drinks service");
assert(indexJs.includes("fallbackHomeData"), "index page should keep fallback home data");

assert(app.tabBar && Array.isArray(app.tabBar.list), "app.json should define tabBar");
for (const tab of requiredTabs) {
  const item = app.tabBar.list.find((entry) => entry.pagePath === tab);
  assert(item, `tabBar should include ${tab}`);
  for (const iconField of ["iconPath", "selectedIconPath"]) {
    assert(item[iconField], `tabBar item ${tab} should define ${iconField}`);
    const iconPath = path.join(root, item[iconField]);
    assert(fs.existsSync(iconPath), `${item[iconField]} should exist`);
    assert(fs.statSync(iconPath).size < 40 * 1024, `${item[iconField]} should be smaller than 40KB`);
  }
}

const homeWxml = fs.readFileSync(path.join(root, "pages/index/index.wxml"), "utf8");
const safetyNoticeWxml = fs.readFileSync(path.join(root, "components/safety-notice/safety-notice.wxml"), "utf8");
const homeRenderableMarkup = `${homeWxml}\n${safetyNoticeWxml}`;
for (const text of ["今晚想要什么状态", "随机抽一杯", "今日推荐", "适量饮酒"]) {
  assert(homeRenderableMarkup.includes(text), `home should render ${text}`);
}
for (const className of ["phone-page", "mood-orb", "drink-hero-card", "safety-notice"]) {
  assert(homeRenderableMarkup.includes(className), `home should use refined UI class ${className}`);
}
assert(homeWxml.includes("<drink-card"), "home should use drink-card component");
assert(homeWxml.includes("<safety-notice"), "home should use safety-notice component");

const diyJs = fs.readFileSync(path.join(root, "pages/diy/diy.js"), "utf8");
assert(diyJs.includes("steps"), "DIY page should expose creation steps");
assert(diyJs.includes("baseDrinks"), "DIY page should expose selectable base drinks");

const indexPageConfig = readJson("pages/index/index.json");
assert(
  indexPageConfig.usingComponents && indexPageConfig.usingComponents["drink-card"],
  "index page should register drink-card component"
);
assert(
  indexPageConfig.usingComponents && indexPageConfig.usingComponents["safety-notice"],
  "index page should register safety-notice component"
);

const detailPageConfig = readJson("pages/detail/detail.json");
assert(
  detailPageConfig.usingComponents && detailPageConfig.usingComponents["tag-list"],
  "detail page should register tag-list component"
);

const getHomeDataSource = fs.readFileSync(path.join(root, "cloudfunctions/getHomeData/index.js"), "utf8");
assert(getHomeDataSource.includes("wx-server-sdk"), "getHomeData should use wx-server-sdk");
assert(getHomeDataSource.includes('collection("drinks")'), "getHomeData should query drinks collection");
assert(getHomeDataSource.includes("dailyDrink"), "getHomeData should return dailyDrink");

const getRandomDrinkSource = fs.readFileSync(path.join(root, "cloudfunctions/getRandomDrink/index.js"), "utf8");
assert(getRandomDrinkSource.includes("wx-server-sdk"), "getRandomDrink should use wx-server-sdk");
assert(getRandomDrinkSource.includes('collection("drinks")'), "getRandomDrink should query drinks collection");
assert(getRandomDrinkSource.includes("Math.random"), "getRandomDrink should pick a random drink");

// — Phase 5: login and user creation —
const loginSource = fs.readFileSync(path.join(root, "cloudfunctions/login/index.js"), "utf8");
assert(loginSource.includes("wx-server-sdk"), "login should use wx-server-sdk");
assert(loginSource.includes('collection("users")'), "login should query users collection");
assert(loginSource.includes("getWXContext"), "login should resolve user identity from WXContext");
assert(loginSource.includes("OPENID"), "login should use OPENID to find or create user");

// — Phase 4: mood recommendations —
const getMoodSource = fs.readFileSync(path.join(root, "cloudfunctions/getMoodRecommendations/index.js"), "utf8");
assert(getMoodSource.includes("wx-server-sdk"), "getMoodRecommendations should use wx-server-sdk");
assert(getMoodSource.includes('collection("drinks")'), "getMoodRecommendations should query drinks collection");
assert(getMoodSource.includes("statusTags"), "getMoodRecommendations should filter by statusTags");

// — Phase 4: drink detail —
const getDrinkDetailSource = fs.readFileSync(path.join(root, "cloudfunctions/getDrinkDetail/index.js"), "utf8");
assert(getDrinkDetailSource.includes("wx-server-sdk"), "getDrinkDetail should use wx-server-sdk");
assert(getDrinkDetailSource.includes('collection("drinks")'), "getDrinkDetail should query drinks collection");
assert(getDrinkDetailSource.includes("drinkId"), "getDrinkDetail should accept drinkId parameter");

// — Phase 5: drink record —
const saveRecordSource = fs.readFileSync(path.join(root, "cloudfunctions/saveDrinkRecord/index.js"), "utf8");
assert(saveRecordSource.includes("wx-server-sdk"), "saveDrinkRecord should use wx-server-sdk");
assert(saveRecordSource.includes('collection("drink_records")'), "saveDrinkRecord should insert into drink_records");
assert(saveRecordSource.includes("rating"), "saveDrinkRecord should validate rating 1-5");

// — Phase 6: recipe creation —
const createRecipeSource = fs.readFileSync(path.join(root, "cloudfunctions/createRecipe/index.js"), "utf8");
assert(createRecipeSource.includes("wx-server-sdk"), "createRecipe should use wx-server-sdk");
assert(createRecipeSource.includes('collection("ingredients")'), "createRecipe should validate ingredients");
assert(createRecipeSource.includes('collection("recipes")'), "createRecipe should insert into recipes");
assert(createRecipeSource.includes('"pending"'), "createRecipe should set status to pending");

// — Phase 7: rankings —
const getRankingSource = fs.readFileSync(path.join(root, "cloudfunctions/getRanking/index.js"), "utf8");
assert(getRankingSource.includes("wx-server-sdk"), "getRanking should use wx-server-sdk");
assert(getRankingSource.includes('collection("recipes")'), "getRanking should query recipes collection");
assert(getRankingSource.includes("likeCount"), "getRanking should support likeCount sort");

// — Service files for phases 5-7 —
const requiredLaterServices = [
  "services/user.js",
  "services/records.js",
  "services/recipes.js",
  "services/ranking.js"
];
for (const file of requiredLaterServices) {
  assert(fs.existsSync(path.join(root, file)), `${file} should exist`);
}
const userServiceSource = fs.readFileSync(path.join(root, "services/user.js"), "utf8");
assert(userServiceSource.includes("login"), "user service should export login function");
const recordsServiceSource = fs.readFileSync(path.join(root, "services/records.js"), "utf8");
assert(recordsServiceSource.includes("saveDrinkRecord"), "records service should export saveDrinkRecord function");
const recipesServiceSource = fs.readFileSync(path.join(root, "services/recipes.js"), "utf8");
assert(recipesServiceSource.includes("createRecipe"), "recipes service should export createRecipe function");
const rankingServiceSource = fs.readFileSync(path.join(root, "services/ranking.js"), "utf8");
assert(rankingServiceSource.includes("getRanking"), "ranking service should export getRanking function");

// — Content safety module —
assert(
  fs.existsSync(path.join(root, "cloudfunctions/common/security.js")),
  "cloudfunctions/common/security.js should exist"
);
const securitySource = fs.readFileSync(path.join(root, "cloudfunctions/common/security.js"), "utf8");
assert(securitySource.includes("scanText"), "security module should export scanText");
assert(securitySource.includes("blockedWords"), "security module should define blockedWords");

console.log("Mini program structure validated.");
