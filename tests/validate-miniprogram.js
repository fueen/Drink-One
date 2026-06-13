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
const readPngSize = (file) => {
  const buffer = fs.readFileSync(path.join(root, file));
  const isPng = buffer.slice(0, 8).toString("hex") === "89504e470d0a1a0a";
  assert(isPng, `${file} should be a PNG image`);
  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20)
  };
};

const app = readJson("app.json");
const cloudbaseConfig = readJson("cloudbaserc.json");
const jsonFiles = [
  "app.json",
  "cloudbaserc.json",
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
  "pages/recipe-detail/recipe-detail",
  "pages/diy/diy",
  "pages/ranking/ranking",
  "pages/library/library",
  "pages/test/test",
  "pages/achievements/achievements",
  "pages/profile/profile",
  "pages/settings/settings",
  "pages/record/record"
];

const requiredTabs = [
  "pages/index/index",
  "pages/library/library",
  "pages/diy/diy",
  "pages/achievements/achievements",
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
  "components/tag-list/tag-list",
  "components/DrinkCard/DrinkCard",
  "components/StatusCard/StatusCard",
  "components/GlassCard/GlassCard",
  "components/AchievementCard/AchievementCard",
  "components/RecipeCard/RecipeCard",
  "components/TagChip/TagChip",
  "components/RandomDrinkModal/RandomDrinkModal",
  "components/ProgressRing/ProgressRing",
  "components/SafeNotice/SafeNotice",
  "components/EmptyState/EmptyState"
];
const requiredSeedDataFiles = [
  "scripts/seed-data/categories.json",
  "scripts/seed-data/tags.json",
  "scripts/seed-data/ingredients.json",
  "scripts/seed-data/achievements.json",
  "scripts/seed-data/drinks.sample.json",
  "scripts/seed-data/recipes.sample.json",
  "scripts/seed-data/system-configs.json"
];
const requiredCloudFunctions = [
  "cloudfunctions/login/index.js",
  "cloudfunctions/getHomeData/index.js",
  "cloudfunctions/getRandomDrink/index.js",
  "cloudfunctions/getMoodRecommendations/index.js",
  "cloudfunctions/getDrinkDetail/index.js",
  "cloudfunctions/saveDrinkRecord/index.js",
  "cloudfunctions/createRecipe/index.js",
  "cloudfunctions/getRanking/index.js",
  "cloudfunctions/initSeedData/index.js",
  "cloudfunctions/getRecipeDetail/index.js",
  "cloudfunctions/getMyRecipes/index.js",
  "cloudfunctions/updateRecipe/index.js",
  "cloudfunctions/deleteRecipe/index.js",
  "cloudfunctions/getRecipeFavorites/index.js",
  "cloudfunctions/toggleRecipeLike/index.js",
  "cloudfunctions/toggleRecipeFavorite/index.js",
  "cloudfunctions/toggleDrinkFavorite/index.js",
  "cloudfunctions/getDrinkFavorites/index.js",
  "cloudfunctions/reportContent/index.js",
  "cloudfunctions/getMyReports/index.js",
  "cloudfunctions/updateUserProfile/index.js",
  "cloudfunctions/getUserProfileData/index.js",
  "cloudfunctions/getAchievements/index.js",
  "cloudfunctions/getDrinkRecords/index.js",
  "cloudfunctions/updateDrinkRecord/index.js",
  "cloudfunctions/deleteDrinkRecord/index.js"
];
const requiredServices = [
  "services/cloud.js",
  "services/drinks.js"
];
const requiredFoundationDirectories = [
  "components",
  "services",
  "store",
  "types",
  "utils",
  "constants",
  "assets"
];
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

for (const directory of requiredFoundationDirectories) {
  assert(fs.existsSync(path.join(root, directory)), `${directory}/ should exist`);
}

for (const file of requiredSeedDataFiles) {
  assert(fs.existsSync(path.join(root, file)), `${file} should exist`);
  const data = readJson(file);
  assert(Array.isArray(data), `${file} should contain a JSON array`);
  assert(data.length > 0, `${file} should contain at least one item`);
  assert(!JSON.stringify(data).includes("?"), `${file} should not contain broken encoding placeholders`);
}
const seedDrinks = readJson("scripts/seed-data/drinks.sample.json");
const seedIngredients = readJson("scripts/seed-data/ingredients.json");
const seedAchievements = readJson("scripts/seed-data/achievements.json");
const seedRecipes = readJson("scripts/seed-data/recipes.sample.json");
assert(seedDrinks.length >= 50, "drinks seed should contain at least 50 preset drinks");
assert(seedIngredients.length >= 20, "ingredients seed should contain at least 20 preset ingredients");
assert(seedAchievements.length >= 12, "achievements seed should contain at least 12 preset achievements");
assert(seedRecipes.length >= 4, "recipes seed should contain at least 4 approved recipes");
for (const drink of seedDrinks) {
  assert(drink._id, `drink ${drink.name} should define stable _id`);
  assert(drink.imageUrl, `drink ${drink.name} should define imageUrl`);
  assert(Array.isArray(drink.statusTags) && drink.statusTags.length > 0, `drink ${drink.name} should define statusTags`);
  assert(Array.isArray(drink.tasteTags) && drink.tasteTags.length > 0, `drink ${drink.name} should define tasteTags`);
}
for (const ingredient of seedIngredients) {
  assert(ingredient._id, `ingredient ${ingredient.name} should define stable _id`);
}
for (const recipe of seedRecipes) {
  assert(recipe._id, `recipe ${recipe.recipeName} should define stable _id`);
  assert(recipe.status === "approved", `recipe ${recipe.recipeName} should be approved seed content`);
  assert(recipe.baseDrinkId, `recipe ${recipe.recipeName} should define baseDrinkId`);
  assert(Array.isArray(recipe.ingredientIds) && recipe.ingredientIds.length > 0, `recipe ${recipe.recipeName} should define ingredientIds`);
}
assert(fs.existsSync(path.join(root, "scripts/README.md")), "scripts/README.md should exist");

for (const file of requiredCloudFunctions) {
  assert(fs.existsSync(path.join(root, file)), `${file} should exist`);
}

assert(
  cloudbaseConfig.envId === "cloud1-d6gkgmp1a475bc9b5",
  "cloudbaserc.json should target the active CloudBase environment"
);
assert(
  cloudbaseConfig.functionRoot === "cloudfunctions",
  "cloudbaserc.json should set functionRoot to cloudfunctions"
);
assert(
  Array.isArray(cloudbaseConfig.functions),
  "cloudbaserc.json should define functions"
);
for (const file of requiredCloudFunctions) {
  const functionName = file.split("/")[1];
  const functionConfig = cloudbaseConfig.functions.find((item) => item.name === functionName);
  assert(functionConfig, `cloudbaserc.json should configure ${functionName}`);
  assert(functionConfig.runtime === "Nodejs18.15", `${functionName} runtime should be Nodejs18.15`);
  assert(functionConfig.handler === "index.main", `${functionName} handler should be index.main`);
}

for (const file of requiredCloudFunctions) {
  const functionDir = path.dirname(file);
  const packageFile = path.join(functionDir, "package.json");
  const packagePath = path.join(root, packageFile);
  assert(fs.existsSync(packagePath), `${packageFile} should exist`);
  const cloudFunctionPackage = readJson(packageFile);
  assert(
    cloudFunctionPackage.dependencies && cloudFunctionPackage.dependencies["wx-server-sdk"],
    `${packageFile} should declare wx-server-sdk dependency`
  );
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
assert(
  envSource.includes('cloudEnvId: "cloud1-d6gkgmp1a475bc9b5"'),
  "config/env.js should target the active CloudBase environment"
);

const appJs = fs.readFileSync(path.join(root, "app.js"), "utf8");
assert(appJs.includes("wx.cloud.init"), "app.js should initialize wx.cloud");
assert(appJs.includes("cloudInitOptions"), "app.js should build CloudBase init options");
assert(appJs.includes("if (ENV.cloudEnvId)"), "app.js should only pass env when a real CloudBase envId is configured");
assert(appJs.includes("traceUser: true"), "app.js should enable CloudBase traceUser");
assert(appJs.includes("userService.login"), "app.js should call userService.login on launch");
assert(appJs.includes("globalData.user"), "app.js should store user in globalData");

const appWxss = fs.readFileSync(path.join(root, "app.wxss"), "utf8");
for (const token of [
  "--color-bg: #F8F9FB",
  "--color-card: rgba(255,255,255,0.72)",
  "--color-primary: #FFB85C",
  "--color-secondary: #7A73FF",
  "--radius-large: 32px",
  ".safe-area",
  ".page-header",
  ".page-content",
  ".glass-card",
  "font-weight: 600"
]) {
  assert(appWxss.includes(token), `app.wxss should include ${token}`);
}

const projectConfig = readJson("project.config.json");
assert(
  projectConfig.cloudfunctionRoot === "cloudfunctions/",
  "project.config.json should set cloudfunctionRoot to cloudfunctions/"
);
const packIgnoreValues = projectConfig.packOptions && Array.isArray(projectConfig.packOptions.ignore)
  ? projectConfig.packOptions.ignore.map((item) => `${item.type}:${item.value}`)
  : [];
assert(
  packIgnoreValues.includes("glob:*.png"),
  "project.config.json should ignore root-level PNG design references from preview package"
);

const indexJs = fs.readFileSync(path.join(root, "pages/index/index.js"), "utf8");
assert(indexJs.includes("../../services/drinks"), "index page should use drinks service");
assert(indexJs.includes("fallbackHomeData"), "index page should keep fallback home data");
assert(indexJs.includes("randomLoading"), "index page should track random drink loading state");
assert(indexJs.includes("wx.showLoading"), "random drink action should show a loading indicator");
assert(indexJs.includes("wx.hideLoading"), "random drink action should hide the loading indicator");
assert(indexJs.includes("wx.showToast"), "random drink action should show feedback when it fails or returns no drink");
assert(indexJs.includes("finally"), "random drink action should reset loading state in finally");

assert(app.tabBar && Array.isArray(app.tabBar.list), "app.json should define tabBar");
for (const tab of requiredTabs) {
  const item = app.tabBar.list.find((entry) => entry.pagePath === tab);
  assert(item, `tabBar should include ${tab}`);
  for (const iconField of ["iconPath", "selectedIconPath"]) {
    assert(item[iconField], `tabBar item ${tab} should define ${iconField}`);
    const iconPath = path.join(root, item[iconField]);
    assert(fs.existsSync(iconPath), `${item[iconField]} should exist`);
    assert(fs.statSync(iconPath).size < 40 * 1024, `${item[iconField]} should be smaller than 40KB`);
    const iconSize = readPngSize(item[iconField]);
    assert(iconSize.width === 81 && iconSize.height === 81, `${item[iconField]} should be 81x81`);
  }
}

const homeWxml = fs.readFileSync(path.join(root, "pages/index/index.wxml"), "utf8");
const homeJs = fs.readFileSync(path.join(root, "pages/index/index.js"), "utf8");
const safetyNoticeWxml = fs.readFileSync(path.join(root, "components/safety-notice/safety-notice.wxml"), "utf8");
const homeRenderableMarkup = `${homeWxml}\n${safetyNoticeWxml}`;
for (const text of ["喝一杯", "Drink One", "今晚想喝什么？", "随机抽一杯", "热门酒谱", "最近成就", "适量饮酒"]) {
  assert(homeRenderableMarkup.includes(text), `home should render ${text}`);
}
for (const className of ["app-shell", "status-cards", "random-cta", "recipe-strip", "achievement-strip", "safety-notice"]) {
  assert(homeRenderableMarkup.includes(className), `home should use refined UI class ${className}`);
}
for (const page of requiredPages) {
  const wxmlFile = `${page}.wxml`;
  const source = fs.readFileSync(path.join(root, wxmlFile), "utf8");
  assert(!source.includes("mock-status"), `${wxmlFile} should not render custom mock status bar`);
}
assert(homeWxml.includes("<random-drink-modal"), "home should render RandomDrinkModal component");
assert(!homeWxml.includes("今日推荐"), "home should remove the Today Recommendation section");
assert(homeWxml.includes('bindtap="goRecipeRanking"'), "home more recipes action should navigate to recipe ranking");
assert(homeJs.includes("randomModalVisible"), "index page should track random modal visibility");
assert(homeJs.includes("pendingRandomDrink"), "index page should stage random drink results until drawing finishes");
assert(homeJs.includes("randomProgress"), "index page should expose random draw progress");
assert(homeJs.includes("withTimeout"), "index page should timeout slow random cloud calls and use fallback");
assert(homeJs.includes("openRandomModal"), "index page should open the random modal from CTA");
assert(homeJs.includes("force: true"), "opening random modal should force the first draw instead of being blocked by loading state");
assert(homeJs.includes("closeRandomModal"), "index page should close the random modal");
assert(homeJs.includes("tryAnotherDrink"), "index page should support drawing another drink inside the modal");
assert(homeJs.includes("getFallbackRandomDrink"), "index page should provide a fallback random drink when CloudBase fails");
assert(homeJs.includes("shouldShowRandomError"), "index page should avoid noisy random errors during silent modal draws");
assert(homeJs.includes("goRecipeRanking"), "index page should route recipe more action to ranking page");
assert(homeJs.includes("/pages/ranking/ranking?type=recipe"), "recipe more action should target recipe ranking route");

const randomDrinkModalWxml = fs.readFileSync(path.join(root, "components/RandomDrinkModal/RandomDrinkModal.wxml"), "utf8");
const randomDrinkModalJs = fs.readFileSync(path.join(root, "components/RandomDrinkModal/RandomDrinkModal.js"), "utf8");
assert(randomDrinkModalWxml.includes("drawing-panel"), "random modal should show a drawing progress panel before result");
assert(randomDrinkModalWxml.includes("progress-fill"), "random modal should render a draw progress bar");
assert(randomDrinkModalWxml.includes("wx:else"), "random modal should hide result content until drawing completes");
assert(randomDrinkModalJs.includes("drawing"), "random modal should accept drawing state");
assert(randomDrinkModalJs.includes("progress"), "random modal should accept progress value");
for (const file of [
  "pages/index/index.wxml",
  "pages/library/library.wxml",
  "pages/achievements/achievements.wxml",
  "pages/profile/profile.wxml"
]) {
  const source = fs.readFileSync(path.join(root, file), "utf8");
  assert(!source.includes("bottom-tab"), `${file} should use the native tabBar only`);
}
assert(homeWxml.includes("safety-card"), "home should render the screenshot-style safety card");

const diyJs = fs.readFileSync(path.join(root, "pages/diy/diy.js"), "utf8");
assert(diyJs.includes("steps"), "DIY page should expose creation steps");
assert(diyJs.includes("baseDrinks"), "DIY page should expose selectable base drinks");
assert(diyJs.includes("ingredients"), "DIY page should expose selectable ingredients");
assert(diyJs.includes("goNextStep"), "DIY page should implement next-step button behavior");
assert(diyJs.includes("viewMode"), "DIY page should default to recipe list mode before entering create flow");
assert(diyJs.includes("myRecipes"), "DIY page should display created recipes by default");
assert(diyJs.includes("startCreateFlow"), "DIY page should enter create flow from the bottom DIY action");
assert(diyJs.includes("finishCreateFlow"), "DIY page should return to list mode after submit");
assert(diyJs.includes("submitting"), "DIY page should track submit loading state");
assert(diyJs.includes("submitRecipeLocally"), "DIY page should provide local submit fallback when CloudBase is unavailable");

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

const achievementWxml = fs.readFileSync(path.join(root, "pages/achievements/achievements.wxml"), "utf8");
const achievementWxss = fs.readFileSync(path.join(root, "pages/achievements/achievements.wxss"), "utf8");
assert(achievementWxml.includes("<progress-ring"), "achievement page should use ProgressRing component");
assert(achievementWxss.includes("repeat(2, 1fr)"), "achievement grid should use two columns");

const recipeDetailWxml = fs.readFileSync(path.join(root, "pages/recipe-detail/recipe-detail.wxml"), "utf8");
for (const text of ["点赞", "收藏", "举报"]) {
  assert(recipeDetailWxml.includes(text), `recipe detail should render ${text}`);
}

const moodWxml = fs.readFileSync(path.join(root, "pages/mood/mood.wxml"), "utf8");
for (const text of ["状态推荐", "选择你的此刻状态", "微醺模式", "小酌模式", "重口感模式", "聚会模式", "我的状态记录"]) {
  assert(moodWxml.includes(text), `mood page should render ${text}`);
}

const detailWxml = fs.readFileSync(path.join(root, "pages/detail/detail.wxml"), "utf8");
for (const text of ["人气推荐", "酒品简介", "记录品鉴", "加入收藏"]) {
  assert(detailWxml.includes(text), `detail page should render ${text}`);
}

const diyWxml = fs.readFileSync(path.join(root, "pages/diy/diy.wxml"), "utf8");
for (const text of ["创建酒谱", "选择基酒", "选择配料", "命名", "完成", "下一步"]) {
  assert(diyWxml.includes(text), `DIY create page should render ${text}`);
}
assert(diyWxml.includes("myRecipes"), "DIY page should render recipe list by default");
assert(diyWxml.includes("handleBottomAction"), "DIY page should render bottom DIY action");
assert(diyWxml.includes("'DIY'"), "DIY page bottom action should show DIY in list mode");
assert(diyWxml.includes("提交中"), "DIY create page should show submitting button text");
assert(!diyWxml.includes("提交审核"), "DIY create page should not mention submit review");
assert(!diyWxml.includes("审核中"), "DIY create page should not mention reviewing state");
const diyWxss = fs.readFileSync(path.join(root, "pages/diy/diy.wxss"), "utf8");
assert(diyWxss.includes("repeat(2, 1fr)"), "DIY base drink grid should use two columns");

const libraryWxml = fs.readFileSync(path.join(root, "pages/library/library.wxml"), "utf8");
for (const text of ["酒库", "搜索酒品、品牌、类型", "全部", "威士忌"]) {
  assert(libraryWxml.includes(text), `library page should render ${text}`);
}
assert(libraryWxml.includes("drink-grid"), "library page should use a two-column drink grid");

const rankingWxml = fs.readFileSync(path.join(root, "pages/ranking/ranking.wxml"), "utf8");
for (const text of ["排行榜", "酒谱榜"]) {
  assert(rankingWxml.includes(text), `ranking page should render ${text}`);
}
for (const text of ["收藏榜", "创意榜", "品鉴榜"]) {
  assert(!rankingWxml.includes(text), `ranking page should not render ${text}`);
}
const rankingJs = fs.readFileSync(path.join(root, "pages/ranking/ranking.js"), "utf8");
assert(rankingJs.includes("initialType"), "ranking page should read initial ranking type from route options");
assert(rankingJs.includes("recipe"), "ranking page should support recipe ranking entry from home");

const recordWxml = fs.readFileSync(path.join(root, "pages/record/record.wxml"), "utf8");
for (const text of ["记录品鉴", "我的评分", "饮用场景", "口感标签", "个人笔记", "保存"]) {
  assert(recordWxml.includes(text), `record page should render ${text}`);
}
const recordJs = fs.readFileSync(path.join(root, "pages/record/record.js"), "utf8");
assert(recordJs.includes("updateDrinkRecord"), "record page should update an existing drink record when recordId is present");
assert(recordJs.includes("deleteDrinkRecord"), "record page should delete an existing drink record");

const profileJs = fs.readFileSync(path.join(root, "pages/profile/profile.js"), "utf8");
for (const text of ["我的收藏", "浏览历史", "我的酒谱", "设置", "关于我们"]) {
  assert(profileJs.includes(text), `profile menu should include ${text}`);
}
for (const text of ["记录酒品", "收藏酒品", "DIY酒谱", "成就数"]) {
  assert(profileJs.includes(text), `profile stats should include ${text}`);
}
assert(profileJs.includes("wx.switchTab"), "profile should use switchTab for tabBar pages");
assert(profileJs.includes("/pages/settings/settings"), "profile settings menu should navigate to settings page");
assert(profileJs.includes("getDrinkFavorites"), "profile should query drink favorites from CloudBase");
assert(profileJs.includes("getRecipeFavorites"), "profile should query recipe favorites from CloudBase");
assert(profileJs.includes("getDrinkRecords"), "profile should query drink records from CloudBase");
assert(profileJs.includes("getMyRecipes"), "profile should query current user recipes from CloudBase");

const settingsWxml = fs.readFileSync(path.join(root, "pages/settings/settings.wxml"), "utf8");
for (const text of ["设置", "消息通知", "隐私设置", "清除缓存", "意见反馈", "关于我们", "退出登录"]) {
  assert(settingsWxml.includes(text), `settings page should render ${text}`);
}

const getHomeDataSource = fs.readFileSync(path.join(root, "cloudfunctions/getHomeData/index.js"), "utf8");
assert(getHomeDataSource.includes("wx-server-sdk"), "getHomeData should use wx-server-sdk");
assert(getHomeDataSource.includes('collection("drinks")'), "getHomeData should query drinks collection");
assert(getHomeDataSource.includes('collection("drink_categories")'), "getHomeData should query drink_categories collection");
assert(getHomeDataSource.includes('collection("recipes")'), "getHomeData should query approved recipes collection");
assert(getHomeDataSource.includes('collection("ingredients")'), "getHomeData should query ingredients collection");
assert(getHomeDataSource.includes("dailyDrink"), "getHomeData should return dailyDrink");
assert(getHomeDataSource.includes("recipes"), "getHomeData should return recipes");
assert(getHomeDataSource.includes("ingredients"), "getHomeData should return ingredients");

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
assert(createRecipeSource.includes('"approved"'), "createRecipe should save recipe as approved for MVP direct publishing");
assert(!createRecipeSource.includes('"pending"'), "createRecipe should not create pending recipes in MVP direct publishing mode");

// — Phase 7: rankings —
const getRankingSource = fs.readFileSync(path.join(root, "cloudfunctions/getRanking/index.js"), "utf8");
assert(getRankingSource.includes("wx-server-sdk"), "getRanking should use wx-server-sdk");
assert(getRankingSource.includes('collection("recipes")'), "getRanking should query recipes collection");
assert(getRankingSource.includes("likeCount"), "getRanking should support likeCount sort");

// — Seed data initializer —
const initSeedSource = fs.readFileSync(path.join(root, "cloudfunctions/initSeedData/index.js"), "utf8");
assert(initSeedSource.includes("wx-server-sdk"), "initSeedData should use wx-server-sdk");
assert(initSeedSource.includes("seedCollections"), "initSeedData should define seedCollections");
assert(initSeedSource.includes(".doc(_id).set"), "initSeedData should upsert documents by stable _id");
assert(initSeedSource.includes("Promise.all"), "initSeedData should batch document upserts to avoid cloud function timeout");
const initSeedConfig = readJson("cloudfunctions/initSeedData/config.json");
assert(initSeedConfig.timeout >= 20, "initSeedData cloud function timeout should be at least 20 seconds");
for (const collectionName of [
  "drink_categories",
  "drink_tags",
  "ingredients",
  "achievement_definitions",
  "drinks",
  "recipes",
  "system_configs"
]) {
  assert(initSeedSource.includes(collectionName), `initSeedData should seed ${collectionName}`);
}

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
assert(userServiceSource.includes("updateUserProfile"), "user service should export updateUserProfile function");
assert(userServiceSource.includes("getMyReports"), "user service should export getMyReports function");
const recordsServiceSource = fs.readFileSync(path.join(root, "services/records.js"), "utf8");
assert(recordsServiceSource.includes("saveDrinkRecord"), "records service should export saveDrinkRecord function");
assert(recordsServiceSource.includes("getDrinkRecords"), "records service should export getDrinkRecords function");
assert(recordsServiceSource.includes("updateDrinkRecord"), "records service should export updateDrinkRecord function");
assert(recordsServiceSource.includes("deleteDrinkRecord"), "records service should export deleteDrinkRecord function");
const recipesServiceSource = fs.readFileSync(path.join(root, "services/recipes.js"), "utf8");
assert(recipesServiceSource.includes("createRecipe"), "recipes service should export createRecipe function");
assert(recipesServiceSource.includes("getRecipeDetail"), "recipes service should export getRecipeDetail function");
assert(recipesServiceSource.includes("getMyRecipes"), "recipes service should export getMyRecipes function");
assert(recipesServiceSource.includes("updateRecipe"), "recipes service should export updateRecipe function");
assert(recipesServiceSource.includes("deleteRecipe"), "recipes service should export deleteRecipe function");
assert(recipesServiceSource.includes("toggleRecipeLike"), "recipes service should export toggleRecipeLike function");
assert(recipesServiceSource.includes("toggleRecipeFavorite"), "recipes service should export toggleRecipeFavorite function");
assert(recipesServiceSource.includes("getRecipeFavorites"), "recipes service should export getRecipeFavorites function");
assert(recipesServiceSource.includes("reportContent"), "recipes service should export reportContent function");
const rankingServiceSource = fs.readFileSync(path.join(root, "services/ranking.js"), "utf8");
assert(rankingServiceSource.includes("getRanking"), "ranking service should export getRanking function");
const drinksServiceSource = fs.readFileSync(path.join(root, "services/drinks.js"), "utf8");
assert(drinksServiceSource.includes("toggleDrinkFavorite"), "drinks service should export toggleDrinkFavorite function");
assert(drinksServiceSource.includes("getDrinkFavorites"), "drinks service should export getDrinkFavorites function");
const profileServiceSource = fs.readFileSync(path.join(root, "services/user.js"), "utf8");
assert(profileServiceSource.includes("getUserProfileData"), "user service should export getUserProfileData function");
assert(profileServiceSource.includes("getAchievements"), "user service should export getAchievements function");

for (const [file, checks] of Object.entries({
  "cloudfunctions/getRecipeDetail/index.js": ['collection("recipes")', 'collection("ingredients")', 'recipeId'],
  "cloudfunctions/getMyRecipes/index.js": ['collection("recipes")', "OPENID", "userId"],
  "cloudfunctions/updateRecipe/index.js": ['collection("recipes")', 'collection("ingredients")', "scanText", "status"],
  "cloudfunctions/deleteRecipe/index.js": ['collection("recipes")', 'collection("recipe_likes")', 'collection("recipe_favorites")'],
  "cloudfunctions/getRecipeFavorites/index.js": ['collection("recipe_favorites")', 'collection("recipes")', "OPENID"],
  "cloudfunctions/toggleRecipeLike/index.js": ['collection("recipe_likes")', 'likeCount', 'OPENID'],
  "cloudfunctions/toggleRecipeFavorite/index.js": ['collection("recipe_favorites")', 'favoriteCount', 'OPENID'],
  "cloudfunctions/toggleDrinkFavorite/index.js": ['collection("user_favorites")', 'favoriteCount', 'OPENID'],
  "cloudfunctions/getDrinkFavorites/index.js": ['collection("user_favorites")', 'collection("drinks")', "OPENID"],
  "cloudfunctions/reportContent/index.js": ['collection("report_records")', 'targetType', 'reason'],
  "cloudfunctions/getMyReports/index.js": ['collection("report_records")', "OPENID", "userId"],
  "cloudfunctions/updateUserProfile/index.js": ['collection("users")', "OPENID", "allowedFields"],
  "cloudfunctions/getUserProfileData/index.js": ['collection("users")', 'collection("user_favorites")', 'collection("drink_records")'],
  "cloudfunctions/getAchievements/index.js": ['collection("achievement_definitions")', 'collection("user_achievements")'],
  "cloudfunctions/getDrinkRecords/index.js": ['collection("drink_records")', 'collection("drinks")'],
  "cloudfunctions/updateDrinkRecord/index.js": ['collection("drink_records")', "rating", "OPENID"],
  "cloudfunctions/deleteDrinkRecord/index.js": ['collection("drink_records")', "recordCount", "OPENID"]
})) {
  const source = fs.readFileSync(path.join(root, file), "utf8");
  assert(source.includes("wx-server-sdk"), `${file} should use wx-server-sdk`);
  for (const check of checks) {
    assert(source.includes(check), `${file} should include ${check}`);
  }
}

// — Content safety module —
assert(
  fs.existsSync(path.join(root, "cloudfunctions/common/security.js")),
  "cloudfunctions/common/security.js should exist"
);
const securitySource = fs.readFileSync(path.join(root, "cloudfunctions/common/security.js"), "utf8");
assert(securitySource.includes("scanText"), "security module should export scanText");
assert(securitySource.includes("blockedWords"), "security module should define blockedWords");

console.log("Mini program structure validated.");
