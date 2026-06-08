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
    .map((file) => path.join("pages", file))
];
const jsFiles = [
  "app.js",
  ...fs
    .readdirSync(path.join(root, "pages"), { recursive: true })
    .filter((file) => file.endsWith(".js"))
    .map((file) => path.join("pages", file))
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
    new Function("App", "Page", "wx", source);
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
for (const text of ["今晚想要什么状态", "随机抽一杯", "今日推荐", "适量饮酒"]) {
  assert(homeWxml.includes(text), `home should render ${text}`);
}
for (const className of ["phone-page", "mood-orb", "drink-hero-card", "safety-strip"]) {
  assert(homeWxml.includes(className), `home should use refined UI class ${className}`);
}

const diyJs = fs.readFileSync(path.join(root, "pages/diy/diy.js"), "utf8");
assert(diyJs.includes("steps"), "DIY page should expose creation steps");
assert(diyJs.includes("baseDrinks"), "DIY page should expose selectable base drinks");

console.log("Mini program structure validated.");
