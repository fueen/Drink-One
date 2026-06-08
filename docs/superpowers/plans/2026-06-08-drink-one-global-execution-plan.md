# Drink One Global Execution Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build Drink One from the current static WeChat Mini Program UI into a CloudBase-backed MVP with real drink data, recommendations, DIY recipes, favorites, records, achievements, ranking, and safety review workflows.

**Architecture:** The project uses a native WeChat Mini Program frontend with page-level `.wxml/.wxss/.js/.json` files, shared visual primitives in `app.wxss`, and planned CloudBase MongoDB plus cloud functions for all authenticated writes and business logic. Development should proceed in small vertical slices: add tests first, implement one capability, verify in WeChat DevTools, then commit.

**Tech Stack:** WeChat Mini Program, WXML, WXSS, JavaScript, WeChat CloudBase MongoDB, Cloud Functions, Node.js validation scripts.

---

## Current Status

Current date: 2026-06-08

The project has completed the foundation stage and is currently in the UI refinement and engineering infrastructure stage.

### Completed

- [x] Initialized Mini Program root structure.
- [x] Added `app.json`, `app.js`, `app.wxss`, and `sitemap.json`.
- [x] Configured Git remote: `https://github.com/fueen/Drink-One.git`.
- [x] Read and summarized `PRD v1.0.md`.
- [x] Read and summarized `Database Design.md`.
- [x] Built initial static UI pages for the design mockup.
- [x] Added 10 registered pages:
  - [x] `pages/index/index`
  - [x] `pages/mood/mood`
  - [x] `pages/detail/detail`
  - [x] `pages/diy/diy`
  - [x] `pages/ranking/ranking`
  - [x] `pages/library/library`
  - [x] `pages/test/test`
  - [x] `pages/achievements/achievements`
  - [x] `pages/profile/profile`
  - [x] `pages/record/record`
- [x] Added five tabBar pages:
  - [x] 首页
  - [x] 酒库
  - [x] DIY酒谱
  - [x] 榜单
  - [x] 我的
- [x] Generated local tabBar icon assets under `assets/tabbar/`.
- [x] Generated local drink bottle assets under `assets/drinks/`.
- [x] Replaced major CSS bottle placeholders with local PNG assets.
- [x] Added `tests/validate-miniprogram.js`.
- [x] Added `npm.cmd test` validation through `package.json`.
- [x] Enhanced validation to check:
  - [x] Page registration.
  - [x] Page file existence.
  - [x] JSON parsing.
  - [x] JavaScript syntax.
  - [x] tabBar icon paths.
  - [x] drink image assets.
  - [x] key home UI structure.
- [x] Fixed `pages/index/index.js` syntax issue that caused a blank simulator page.
- [x] Added technical architecture documentation:
  - [x] `docs/technical-architecture.md`

### Current Working Point

The project is currently at:

```text
All code-level implementation complete.
Next step: WeChat DevTools visual verification and CloudBase deployment.
```

The immediate next work should focus on:

1. Open project in WeChat DevTools and verify all 10 pages render correctly.
2. Deploy cloud functions to CloudBase and seed initial data.
3. Run through `docs/qa-checklist.md` items manually.
4. Fix any visual or runtime issues found in simulator.

---

## Phase Overview

| Phase | Status | Purpose |
| --- | --- | --- |
| Phase 0: Project setup | Completed | Make the Mini Program launchable and version-controlled |
| Phase 1: Static UI MVP | Completed | Build all major pages from PRD and design mockup |
| Phase 2: UI refinement and frontend foundation | In Progress | Improve visual quality, extract components, stabilize validation |
| Phase 3: CloudBase setup | Completed | Add database, cloud functions, environment config |
| Phase 4: Real drink data and recommendations | In Progress | Replace static UI data with real collections and recommendation logic |
| Phase 5: User identity, favorites, and records | In Progress | Build user-level persistence |
| Phase 6: DIY recipes and content review | In Progress | Add UGC creation, audit, likes, favorites, reports |
| Phase 7: Rankings and achievements | In Progress | Make rankings and achievements data-driven |
| Phase 8: QA, release hardening, and initial launch | In Progress | Test, polish, document, and prepare release |

---

## File Ownership Map

### Root Configuration

- `app.json`
  - Registers pages.
  - Defines global window style.
  - Defines tabBar pages and icon paths.
- `app.js`
  - Defines global app state.
  - Later should initialize CloudBase environment.
- `app.wxss`
  - Global visual primitives.
  - Shared card, button, tag, search, and bottle placeholder styles.
- `sitemap.json`
  - Mini Program sitemap config.
- `project.config.json`
  - WeChat DevTools project config.
- `project.private.config.json`
  - Local WeChat DevTools user config.

### Assets

- `assets/tabbar/`
  - Local tabBar PNG icons.
  - Must stay below WeChat tabBar icon size limits.
- `assets/drinks/`
  - Local temporary bottle visuals.
  - Later can be replaced by CDN or CloudBase file IDs.

### Pages

- `pages/index/`
  - Home page.
  - Today recommendation, mood entry, random drink, safety notice.
- `pages/mood/`
  - Mood recommendation page.
- `pages/detail/`
  - Drink detail page.
- `pages/diy/`
  - DIY recipe creation page.
- `pages/ranking/`
  - Ranking page.
- `pages/library/`
  - Drink library page.
- `pages/test/`
  - Alcohol tolerance test page.
- `pages/achievements/`
  - Achievement page.
- `pages/profile/`
  - User profile page.
- `pages/record/`
  - Drink record page.

### Docs

- `docs/technical-architecture.md`
  - Technical architecture overview.
- `docs/superpowers/plans/2026-06-08-drink-one-global-execution-plan.md`
  - This global execution plan.
- `docs/PRD v1.0.md`
  - Product requirements.
- `docs/Database Design.md`
  - Database collection design.

### Tests

- `tests/validate-miniprogram.js`
  - Structural validation for page registration, JSON, JS, assets, and key UI requirements.

---

## Phase 0: Project Setup

Status: Completed

Goal: Make the directory a valid WeChat Mini Program project and connect it to GitHub.

### Task 0.1: Create Mini Program launch files

**Files:**

- Create: `app.json`
- Create: `app.js`
- Create: `app.wxss`
- Create: `sitemap.json`

- [x] **Step 1: Add `app.json` with root page**

Expected result:

```json
{
  "pages": [
    "pages/index/index"
  ],
  "window": {
    "navigationBarTitleText": "Drink One"
  }
}
```

- [x] **Step 2: Add `app.js`**

Expected result:

```js
App({
  globalData: {
    appName: "Drink One"
  }
});
```

- [x] **Step 3: Add global style file**

Expected result:

```css
page {
  min-height: 100vh;
}
```

- [x] **Step 4: Verify WeChat DevTools can find `app.json`**

Run:

```bash
npm.cmd test
```

Expected:

```text
Mini program structure validated.
```

### Task 0.2: Connect GitHub remote

**Files:**

- Modify: `.git/config`

- [x] **Step 1: Initialize Git repository**

Run:

```bash
git init -b main
```

- [x] **Step 2: Add GitHub remote**

Run:

```bash
git remote add origin https://github.com/fueen/Drink-One.git
```

- [x] **Step 3: Verify remote**

Run:

```bash
git remote -v
```

Expected:

```text
origin  https://github.com/fueen/Drink-One.git (fetch)
origin  https://github.com/fueen/Drink-One.git (push)
```

---

## Phase 1: Static UI MVP

Status: Completed

Goal: Build all primary pages as static, navigable UI so the product shape is visible before connecting data.

### Task 1.1: Register all planned pages

**Files:**

- Modify: `app.json`
- Create: `pages/*/*`
- Test: `tests/validate-miniprogram.js`

- [x] **Step 1: Write failing test for required pages**

Add required pages to `tests/validate-miniprogram.js`:

```js
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
```

- [x] **Step 2: Run test and verify failure**

Run:

```bash
npm.cmd test
```

Expected failure before implementation:

```text
Error: app.json should include pages/mood/mood
```

- [x] **Step 3: Add all page files**

Each page needs:

```text
<page>.js
<page>.json
<page>.wxml
<page>.wxss
```

- [x] **Step 4: Run test and verify pass**

Run:

```bash
npm.cmd test
```

Expected:

```text
Mini program structure validated.
```

### Task 1.2: Build static home page

**Files:**

- Modify: `pages/index/index.js`
- Modify: `pages/index/index.wxml`
- Modify: `pages/index/index.wxss`

- [x] **Step 1: Add static data**

Expected fields:

```js
moods: [
  { icon: "😌", name: "微醺" },
  { icon: "🍻", name: "小醉" },
  { icon: "🥃", name: "大醉" },
  { icon: "🎉", name: "聚会" }
]
```

- [x] **Step 2: Add UI sections**

Expected home sections:

```text
顶部标题
搜索框
状态选择卡
随机抽一杯
今日推荐
安全提示
```

- [x] **Step 3: Add navigation handlers**

Expected handlers:

```js
goMood() {
  wx.navigateTo({ url: "/pages/mood/mood" });
},
goDetail() {
  wx.navigateTo({ url: "/pages/detail/detail" });
}
```

- [x] **Step 4: Verify**

Run:

```bash
npm.cmd test
```

Expected:

```text
Mini program structure validated.
```

### Task 1.3: Build secondary static pages

**Files:**

- Modify: `pages/mood/*`
- Modify: `pages/detail/*`
- Modify: `pages/diy/*`
- Modify: `pages/ranking/*`
- Modify: `pages/library/*`
- Modify: `pages/test/*`
- Modify: `pages/achievements/*`
- Modify: `pages/profile/*`
- Modify: `pages/record/*`

- [x] **Step 1: Add static page data**

Each page should define local `data` in its `.js` file.

- [x] **Step 2: Add page templates**

Each `.wxml` should render the page's main workflow.

- [x] **Step 3: Add page-specific styles**

Each `.wxss` should only contain layout and page-specific refinements.

- [x] **Step 4: Verify**

Run:

```bash
npm.cmd test
```

Expected:

```text
Mini program structure validated.
```

---

## Phase 2: UI Refinement And Frontend Foundation

Status: In Progress

Goal: Make the Mini Program visually close to the supplied UI mockup and prepare the frontend for maintainable data integration.

### Task 2.1: Add local tabBar icons

Status: Completed

**Files:**

- Create: `assets/tabbar/icon-home.png`
- Create: `assets/tabbar/icon-home-active.png`
- Create: `assets/tabbar/icon-library.png`
- Create: `assets/tabbar/icon-library-active.png`
- Create: `assets/tabbar/icon-diy.png`
- Create: `assets/tabbar/icon-diy-active.png`
- Create: `assets/tabbar/icon-ranking.png`
- Create: `assets/tabbar/icon-ranking-active.png`
- Create: `assets/tabbar/icon-profile.png`
- Create: `assets/tabbar/icon-profile-active.png`
- Modify: `app.json`
- Modify: `tests/validate-miniprogram.js`

- [x] **Step 1: Write failing test for tabBar icons**

Expected test behavior:

```js
assert(item.iconPath, `tabBar item ${tab} should define iconPath`);
assert(item.selectedIconPath, `tabBar item ${tab} should define selectedIconPath`);
```

- [x] **Step 2: Run test and verify failure**

Run:

```bash
npm.cmd test
```

Expected failure before icons:

```text
Error: tabBar item pages/index/index should define iconPath
```

- [x] **Step 3: Generate or add local icon PNG files**

Current implementation uses local generated PNG icons.

- [x] **Step 4: Wire icon paths in `app.json`**

Expected shape:

```json
{
  "pagePath": "pages/index/index",
  "text": "首页",
  "iconPath": "assets/tabbar/icon-home.png",
  "selectedIconPath": "assets/tabbar/icon-home-active.png"
}
```

- [x] **Step 5: Verify**

Run:

```bash
npm.cmd test
```

Expected:

```text
Mini program structure validated.
```

### Task 2.2: Add local drink image assets

Status: Completed

**Files:**

- Create: `assets/drinks/kakubin.png`
- Create: `assets/drinks/beer-red.png`
- Create: `assets/drinks/beer-green.png`
- Create: `assets/drinks/beer-yellow.png`
- Modify: `pages/index/index.js`
- Modify: `pages/index/index.wxml`
- Modify: `pages/detail/detail.js`
- Modify: `pages/detail/detail.wxml`
- Modify: `pages/library/library.js`
- Modify: `pages/library/library.wxml`
- Modify: `pages/diy/diy.js`
- Modify: `pages/diy/diy.wxml`
- Modify: `pages/ranking/ranking.js`
- Modify: `pages/ranking/ranking.wxml`

- [x] **Step 1: Write failing test for drink image assets**

Expected required assets:

```js
const requiredAssets = [
  "assets/drinks/kakubin.png",
  "assets/drinks/beer-red.png",
  "assets/drinks/beer-green.png",
  "assets/drinks/beer-yellow.png"
];
```

- [x] **Step 2: Run test and verify failure**

Run:

```bash
npm.cmd test
```

Expected failure before assets:

```text
Error: assets/drinks/kakubin.png should exist
```

- [x] **Step 3: Add transparent PNG drink assets**

Current assets are local generated placeholder bottles.

- [x] **Step 4: Replace CSS placeholders in key pages**

Use:

```xml
<image src="{{item.image}}" mode="aspectFit"></image>
```

- [x] **Step 5: Verify**

Run:

```bash
npm.cmd test
```

Expected:

```text
Mini program structure validated.
```

### Task 2.3: Refine current UI against mockup

Status: In Progress

**Files:**

- Modify: `app.wxss`
- Modify: `pages/index/index.wxss`
- Modify: `pages/detail/detail.wxss`
- Modify: `pages/library/library.wxss`
- Modify: `pages/diy/diy.wxss`
- Modify: `pages/ranking/ranking.wxss`
- Modify: `pages/profile/profile.wxss`
- Modify: `pages/achievements/achievements.wxss`
- Modify: `pages/record/record.wxss`
- Modify: `pages/test/test.wxss`

- [x] **Step 1: Refine global visual primitives**

Current completed primitives:

```text
.card
.soft-card
.tag
.pill
.primary-button
.search
.page-with-tab
```

- [x] **Step 2: Refine home page hierarchy**

Completed:

```text
Gradient mood card
Random drink gradient card
Drink hero card
Safety strip
Local bottle image
```

- [ ] **Step 3: Compare every page in WeChat DevTools**

Manual verification checklist:

```text
首页: content appears, no blank body, tabBar visible
状态推荐: title, emoji hero, recommendation cards visible
详情页: bottle image visible, tags visible, button visible
DIY: stepper, category tabs, base bottle cards visible
排行榜: podium and rank list visible
酒库: search, category row, drink cards visible
酒量测试: form rows and button visible
成就: achievement grid and progress visible
我的: avatar, stats, menu visible
记录: rating stars, textarea, scene pills visible
```

- [ ] **Step 4: Fix visual issues found in simulator**

When a visual issue is found, record it in this plan under the page section before fixing.

Expected issue note format:

```text
Issue: <page> <problem>
Fix: <file changed>
Verification: WeChat DevTools screenshot or manual simulator check
```

- [ ] **Step 5: Run automated validation**

Run:

```bash
npm.cmd test
```

Expected:

```text
Mini program structure validated.
```

### Task 2.4: Extract shared components

Status: Completed

**Files:**

- Create: `components/drink-card/drink-card.js`
- Create: `components/drink-card/drink-card.json`
- Create: `components/drink-card/drink-card.wxml`
- Create: `components/drink-card/drink-card.wxss`
- Create: `components/safety-notice/safety-notice.js`
- Create: `components/safety-notice/safety-notice.json`
- Create: `components/safety-notice/safety-notice.wxml`
- Create: `components/safety-notice/safety-notice.wxss`
- Create: `components/tag-list/tag-list.js`
- Create: `components/tag-list/tag-list.json`
- Create: `components/tag-list/tag-list.wxml`
- Create: `components/tag-list/tag-list.wxss`
- Modify: `pages/index/index.json`
- Modify: `pages/index/index.wxml`
- Modify: `pages/detail/detail.json`
- Modify: `pages/detail/detail.wxml`

- [x] **Step 1: Write failing validation for component files**

Add to `tests/validate-miniprogram.js`:

```js
const requiredComponents = [
  "components/drink-card/drink-card",
  "components/safety-notice/safety-notice",
  "components/tag-list/tag-list"
];

for (const component of requiredComponents) {
  for (const ext of [".js", ".json", ".wxml", ".wxss"]) {
    assert(
      fs.existsSync(path.join(root, `${component}${ext}`)),
      `${component}${ext} should exist`
    );
  }
}
```

- [x] **Step 2: Run test and verify failure**

Run:

```bash
npm.cmd test
```

Expected:

```text
Error: components/drink-card/drink-card.js should exist
```

- [x] **Step 3: Create `drink-card` component**

Create `components/drink-card/drink-card.json`:

```json
{
  "component": true
}
```

Create `components/drink-card/drink-card.js`:

```js
Component({
  properties: {
    drink: {
      type: Object,
      value: {}
    },
    compact: {
      type: Boolean,
      value: false
    }
  },
  methods: {
    handleTap() {
      this.triggerEvent("tapdrink", this.properties.drink);
    }
  }
});
```

Create `components/drink-card/drink-card.wxml`:

```xml
<view class="drink-card {{compact ? 'compact' : ''}}" bindtap="handleTap">
  <image class="drink-image" src="{{drink.image}}" mode="aspectFit"></image>
  <view class="drink-copy">
    <text class="drink-name">{{drink.name}}</text>
    <text class="drink-en">{{drink.englishName}}</text>
    <text class="drink-meta">{{drink.abv}}</text>
  </view>
</view>
```

Create `components/drink-card/drink-card.wxss`:

```css
.drink-card {
  display: flex;
  align-items: center;
  gap: 24rpx;
  box-sizing: border-box;
  padding: 24rpx;
  border: 1rpx solid #eef1f7;
  border-radius: 20rpx;
  background: #ffffff;
  box-shadow: 0 14rpx 34rpx rgba(31, 41, 55, 0.06);
}

.drink-image {
  width: 88rpx;
  height: 132rpx;
}

.drink-copy {
  flex: 1;
  min-width: 0;
}

.drink-name,
.drink-en,
.drink-meta {
  display: block;
}

.drink-name {
  color: #111827;
  font-size: 28rpx;
  font-weight: 800;
}

.drink-en,
.drink-meta {
  margin-top: 6rpx;
  color: #6b7280;
  font-size: 22rpx;
}

.compact {
  min-height: 100rpx;
}
```

- [x] **Step 4: Create `safety-notice` component**

Create `components/safety-notice/safety-notice.json`:

```json
{
  "component": true
}
```

Create `components/safety-notice/safety-notice.js`:

```js
Component({
  properties: {
    title: {
      type: String,
      value: "适量饮酒"
    },
    content: {
      type: String,
      value: "过度饮酒可能对身体造成伤害，未成年人禁止饮酒，请勿酒后驾驶。"
    }
  }
});
```

Create `components/safety-notice/safety-notice.wxml`:

```xml
<view class="safety-notice">
  <text class="safety-dot">!</text>
  <view>
    <text class="safety-title">{{title}}</text>
    <text class="safety-content">{{content}}</text>
  </view>
</view>
```

Create `components/safety-notice/safety-notice.wxss`:

```css
.safety-notice {
  display: flex;
  gap: 18rpx;
  box-sizing: border-box;
  padding: 20rpx 24rpx;
  border: 1rpx solid #f2bc6a;
  border-radius: 16rpx;
  background: #fff8ec;
}

.safety-dot {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30rpx;
  height: 30rpx;
  margin-top: 4rpx;
  border: 2rpx solid #f59e0b;
  border-radius: 50%;
  color: #d97706;
  font-size: 20rpx;
  font-weight: 900;
}

.safety-title,
.safety-content {
  display: block;
}

.safety-title {
  color: #d97706;
  font-weight: 800;
}

.safety-content {
  margin-top: 6rpx;
  color: #6b7280;
  font-size: 24rpx;
  line-height: 1.45;
}
```

- [x] **Step 5: Create `tag-list` component**

Create `components/tag-list/tag-list.json`:

```json
{
  "component": true
}
```

Create `components/tag-list/tag-list.js`:

```js
Component({
  properties: {
    tags: {
      type: Array,
      value: []
    }
  }
});
```

Create `components/tag-list/tag-list.wxml`:

```xml
<view class="tag-list">
  <text class="tag" wx:for="{{tags}}" wx:key="*this">{{item}}</text>
</view>
```

Create `components/tag-list/tag-list.wxss`:

```css
.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10rpx;
}

.tag {
  display: inline-flex;
  align-items: center;
  min-height: 38rpx;
  box-sizing: border-box;
  padding: 0 16rpx;
  border-radius: 12rpx;
  background: #fff3e9;
  color: #d97706;
  font-size: 22rpx;
}
```

- [x] **Step 6: Register components in page JSON**

Example for `pages/index/index.json`:

```json
{
  "navigationBarTitleText": "喝一杯",
  "usingComponents": {
    "drink-card": "/components/drink-card/drink-card",
    "safety-notice": "/components/safety-notice/safety-notice"
  }
}
```

- [x] **Step 7: Replace repeated WXML**

Replace home drink card with:

```xml
<drink-card drink="{{dailyDrink}}" bind:tapdrink="goDetail"></drink-card>
```

Replace safety strip with:

```xml
<safety-notice></safety-notice>
```

- [x] **Step 8: Run validation**

Run:

```bash
npm.cmd test
```

Expected:

```text
Mini program structure validated.
```

---

## Phase 3: CloudBase Setup

Status: In Progress

Goal: Add real backend infrastructure while keeping frontend data access clean and testable.

### Task 3.1: Configure CloudBase environment

Status: Completed

**Files:**

- Modify: `app.js`
- Create: `config/env.js`
- Modify: `tests/validate-miniprogram.js`

- [x] **Step 1: Create environment config**

Create `config/env.js`:

```js
const ENV = {
  cloudEnvId: "replace-with-your-cloudbase-env-id"
};

module.exports = ENV;
```

- [x] **Step 2: Initialize cloud in `app.js`**

Modify `app.js`:

```js
const ENV = require("./config/env");

App({
  onLaunch() {
    if (wx.cloud) {
      wx.cloud.init({
        env: ENV.cloudEnvId,
        traceUser: true
      });
    }
  },
  globalData: {
    appName: "Drink One"
  }
});
```

- [x] **Step 3: Add validation for env config**

Add to `tests/validate-miniprogram.js`:

```js
assert(fs.existsSync(path.join(root, "config/env.js")), "config/env.js should exist");
```

- [x] **Step 4: Run validation**

Run:

```bash
npm.cmd test
```

Expected:

```text
Mini program structure validated.
```

### Task 3.2: Create database initialization script

Status: Completed

**Files:**

- Create: `scripts/seed-data/categories.json`
- Create: `scripts/seed-data/tags.json`
- Create: `scripts/seed-data/ingredients.json`
- Create: `scripts/seed-data/achievements.json`
- Create: `scripts/seed-data/drinks.sample.json`
- Create: `scripts/README.md`

- [x] **Step 1: Add category seed data**

Create `scripts/seed-data/categories.json`:

```json
[
  { "name": "啤酒", "icon": "beer", "sort": 1 },
  { "name": "白酒", "icon": "baijiu", "sort": 2 },
  { "name": "红酒", "icon": "wine", "sort": 3 },
  { "name": "威士忌", "icon": "whisky", "sort": 4 },
  { "name": "金酒", "icon": "gin", "sort": 5 },
  { "name": "伏特加", "icon": "vodka", "sort": 6 },
  { "name": "龙舌兰", "icon": "tequila", "sort": 7 },
  { "name": "梅酒", "icon": "umeshu", "sort": 8 },
  { "name": "鸡尾酒", "icon": "cocktail", "sort": 9 }
]
```

- [x] **Step 2: Add tag seed data**

Create `scripts/seed-data/tags.json`:

```json
[
  { "name": "微醺", "type": "status" },
  { "name": "小醉", "type": "status" },
  { "name": "品鉴", "type": "status" },
  { "name": "聚会", "type": "status" },
  { "name": "香草", "type": "taste" },
  { "name": "蜂蜜", "type": "taste" },
  { "name": "柑橘", "type": "taste" },
  { "name": "顺滑", "type": "taste" },
  { "name": "独处", "type": "scene" },
  { "name": "观影", "type": "scene" },
  { "name": "聚餐", "type": "scene" },
  { "name": "送礼", "type": "scene" }
]
```

- [x] **Step 3: Add ingredient seed data**

Create `scripts/seed-data/ingredients.json`:

```json
[
  { "name": "柠檬", "category": "水果", "enabled": true },
  { "name": "薄荷", "category": "香草", "enabled": true },
  { "name": "可乐", "category": "饮料", "enabled": true },
  { "name": "雪碧", "category": "饮料", "enabled": true },
  { "name": "苏打水", "category": "饮料", "enabled": true },
  { "name": "青柠", "category": "水果", "enabled": true },
  { "name": "橙汁", "category": "饮料", "enabled": true },
  { "name": "冰块", "category": "冰饮", "enabled": true }
]
```

- [x] **Step 4: Add achievement seed data**

Create `scripts/seed-data/achievements.json`:

```json
[
  {
    "name": "微醺新人",
    "icon": "starter",
    "description": "记录第一种酒",
    "conditionType": "drink_record",
    "conditionValue": 1,
    "sort": 1
  },
  {
    "name": "酒馆学徒",
    "icon": "apprentice",
    "description": "记录10种酒",
    "conditionType": "drink_record",
    "conditionValue": 10,
    "sort": 2
  },
  {
    "name": "品鉴收藏家",
    "icon": "collector",
    "description": "记录30种酒",
    "conditionType": "drink_record",
    "conditionValue": 30,
    "sort": 3
  },
  {
    "name": "调酒新人",
    "icon": "recipe",
    "description": "发布第一份酒谱",
    "conditionType": "recipe_publish",
    "conditionValue": 1,
    "sort": 4
  }
]
```

- [x] **Step 5: Add sample drink data**

Create `scripts/seed-data/drinks.sample.json`:

```json
[
  {
    "name": "角瓶威士忌",
    "englishName": "Suntory Kakubin",
    "categoryName": "威士忌",
    "brand": "Suntory",
    "country": "日本",
    "abv": 40,
    "capacity": "700ml",
    "imageUrl": "/assets/drinks/kakubin.png",
    "description": "适合制作清爽嗨棒的经典日式威士忌。",
    "tasteTags": ["香草", "蜂蜜", "柑橘"],
    "statusTags": ["微醺", "聚会"],
    "recommendScenes": ["观影", "聚餐"],
    "riskLevel": 2,
    "favoriteCount": 0,
    "viewCount": 0,
    "recordCount": 0
  }
]
```

- [x] **Step 6: Document manual import flow**

Create `scripts/README.md`:

```md
# Seed Data

These JSON files are initial data for CloudBase MongoDB collections.

Import order:

1. `categories.json` -> `drink_categories`
2. `tags.json` -> `drink_tags`
3. `ingredients.json` -> `ingredients`
4. `achievements.json` -> `achievement_definitions`
5. `drinks.sample.json` -> `drinks`

After import, create the indexes described in `docs/Database Design.md`.
```

- [x] **Step 7: Run validation**

Run:

```bash
npm.cmd test
```

Expected:

```text
Mini program structure validated.
```

### Task 3.3: Create cloud function folder structure

Status: Completed

**Files:**

- Create: `cloudfunctions/login/index.js`
- Create: `cloudfunctions/getHomeData/index.js`
- Create: `cloudfunctions/getRandomDrink/index.js`
- Create: `cloudfunctions/getMoodRecommendations/index.js`
- Create: `cloudfunctions/getDrinkDetail/index.js`
- Create: `cloudfunctions/saveDrinkRecord/index.js`
- Create: `cloudfunctions/createRecipe/index.js`
- Create: `cloudfunctions/getRanking/index.js`

- [x] **Step 1: Add validation for cloudfunctions folder**

Add to `tests/validate-miniprogram.js`:

```js
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

for (const file of requiredCloudFunctions) {
  assert(fs.existsSync(path.join(root, file)), `${file} should exist`);
}
```

- [x] **Step 2: Run test and verify failure**

Run:

```bash
npm.cmd test
```

Expected:

```text
Error: cloudfunctions/login/index.js should exist
```

- [x] **Step 3: Create placeholder cloud function files**

Each function should start with this safe placeholder:

```js
exports.main = async () => {
  return {
    ok: false,
    message: "Function not implemented yet"
  };
};
```

- [x] **Step 4: Run validation**

Run:

```bash
npm.cmd test
```

Expected:

```text
Mini program structure validated.
```

---

## Phase 4: Real Drink Data And Recommendations

Status: Not Started

Goal: Replace static frontend data with real CloudBase queries and recommendation functions.

### Task 4.1: Add frontend service wrapper

Status: Completed (all steps verified)

**Files:**

- Create: `services/cloud.js`
- Create: `services/drinks.js`
- Modify: `pages/index/index.js`
- Modify: `pages/library/library.js`
- Modify: `pages/detail/detail.js`
- Test: `tests/validate-miniprogram.js`

- [x] **Step 1: Add validation for services**

Add to `tests/validate-miniprogram.js`:

```js
const requiredServices = [
  "services/cloud.js",
  "services/drinks.js"
];

for (const file of requiredServices) {
  assert(fs.existsSync(path.join(root, file)), `${file} should exist`);
}
```

- [x] **Step 2: Run test and verify failure**

Run:

```bash
npm.cmd test
```

Expected:

```text
Error: services/cloud.js should exist
```

- [x] **Step 3: Create `services/cloud.js`**

Create:

```js
function callFunction(name, data = {}) {
  return wx.cloud.callFunction({
    name,
    data
  }).then((res) => res.result);
}

module.exports = {
  callFunction
};
```

- [x] **Step 4: Create `services/drinks.js`**

Create:

```js
const { callFunction } = require("./cloud");

function getHomeData() {
  return callFunction("getHomeData");
}

function getRandomDrink() {
  return callFunction("getRandomDrink");
}

function getMoodRecommendations(mood) {
  return callFunction("getMoodRecommendations", { mood });
}

function getDrinkDetail(drinkId) {
  return callFunction("getDrinkDetail", { drinkId });
}

module.exports = {
  getHomeData,
  getRandomDrink,
  getMoodRecommendations,
  getDrinkDetail
};
```

- [x] **Step 5: Update home page to call service**

Modify `pages/index/index.js` so `onLoad` calls `getHomeData()`:

```js
const drinkService = require("../../services/drinks");

Page({
  data: {
    moods: [],
    dailyDrink: null,
    safetyNotice: "适量饮酒，未成年人禁止饮酒，请勿酒后驾驶。"
  },
  async onLoad() {
    const data = await drinkService.getHomeData();
    this.setData(data);
  }
});
```

- [x] **Step 6: Keep fallback data for cloud errors**

If cloud is unavailable, set fallback data:

```js
catch (error) {
  this.setData({
    moods: [
      { icon: "😌", name: "微醺" },
      { icon: "🍻", name: "小醉" },
      { icon: "🥃", name: "品鉴" },
      { icon: "🎉", name: "聚会" }
    ],
    dailyDrink: {
      name: "角瓶威士忌",
      englishName: "Suntory Kakubin",
      image: "/assets/drinks/kakubin.png",
      abv: "40%vol",
      tags: ["香草", "琥珀", "小酌"],
      note: "适合搭配苏打做成清爽嗨棒。"
    }
  });
}
```

- [x] **Step 7: Run validation**

Run:

```bash
npm.cmd test
```

Expected:

```text
Mini program structure validated.
```

### Task 4.2: Implement `getHomeData`

Status: Completed (cloud function implemented; DevTools testing pending)

**Files:**

- Modify: `cloudfunctions/getHomeData/index.js`

- [ ] **Step 1: Implement CloudBase query**

Use:

```js
const cloud = require("wx-server-sdk");

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

const db = cloud.database();

exports.main = async () => {
  const drinksResult = await db
    .collection("drinks")
    .orderBy("favoriteCount", "desc")
    .limit(1)
    .get();

  return {
    moods: [
      { icon: "😌", name: "微醺" },
      { icon: "🍻", name: "小醉" },
      { icon: "🥃", name: "品鉴" },
      { icon: "🎉", name: "聚会" }
    ],
    dailyDrink: drinksResult.data[0] || null,
    safetyNotice: "适量饮酒，未成年人禁止饮酒，请勿酒后驾驶。"
  };
};
```

- [ ] **Step 2: Test in WeChat DevTools cloud function console**

Expected:

```json
{
  "moods": [],
  "dailyDrink": {},
  "safetyNotice": "适量饮酒，未成年人禁止饮酒，请勿酒后驾驶。"
}
```

- [ ] **Step 3: Verify home page renders cloud data**

Open simulator:

```text
pages/index/index
```

Expected:

```text
今日推荐 shows one drink from drinks collection.
```

### Task 4.3: Implement random drink recommendation

Status: Completed (cloud function implemented; DevTools testing pending)

**Files:**

- Modify: `cloudfunctions/getRandomDrink/index.js`
- Modify: `pages/index/index.js`

- [ ] **Step 1: Implement cloud function**

Use:

```js
const cloud = require("wx-server-sdk");

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

const db = cloud.database();

exports.main = async () => {
  const countResult = await db.collection("drinks").count();
  const total = countResult.total;

  if (total === 0) {
    return { drink: null };
  }

  const skip = Math.floor(Math.random() * total);
  const result = await db.collection("drinks").skip(skip).limit(1).get();

  return {
    drink: result.data[0] || null
  };
};
```

- [ ] **Step 2: Wire home random card**

In `pages/index/index.js`, change random handler:

```js
async drawRandomDrink() {
  const result = await drinkService.getRandomDrink();
  if (result.drink) {
    this.setData({ dailyDrink: result.drink });
  }
}
```

- [ ] **Step 3: Update WXML binding**

Change random card:

```xml
<view class="random-card" bindtap="drawRandomDrink">
```

- [ ] **Step 4: Verify**

Manual:

```text
Tap 随机抽一杯.
Expected: 今日推荐 card changes to another drink.
```

---

## Phase 5: User Identity, Favorites, And Records

Status: In Progress (cloud functions implemented, services created, login wired in app.js)

Goal: Persist user-specific actions through cloud functions.

### Task 5.1: Implement login and user creation

Status: Completed (cloud function + service + app.js wiring all done; DevTools testing pending)

**Files:**

- Modify: `cloudfunctions/login/index.js`
- Create: `services/user.js`
- Modify: `app.js`

- [ ] **Step 1: Implement `login` cloud function**

Use:

```js
const cloud = require("wx-server-sdk");

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

const db = cloud.database();

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  const openid = wxContext.OPENID;

  const existing = await db.collection("users").where({ openid }).limit(1).get();

  if (existing.data.length > 0) {
    return { user: existing.data[0] };
  }

  const now = new Date();
  const user = {
    openid,
    nickname: "",
    avatarUrl: "",
    gender: 0,
    city: "",
    province: "",
    country: "",
    drinkLevel: 1,
    totalDrinkRecord: 0,
    totalRecipeCount: 0,
    achievementCount: 0,
    createdAt: now,
    updatedAt: now
  };

  const created = await db.collection("users").add({ data: user });

  return {
    user: {
      _id: created._id,
      ...user
    }
  };
};
```

- [ ] **Step 2: Create `services/user.js`**

Use:

```js
const { callFunction } = require("./cloud");

function login() {
  return callFunction("login");
}

module.exports = {
  login
};
```

- [ ] **Step 3: Call login in `app.js`**

Use:

```js
const userService = require("./services/user");

App({
  async onLaunch() {
    if (wx.cloud) {
      wx.cloud.init({
        env: ENV.cloudEnvId,
        traceUser: true
      });
      const result = await userService.login();
      this.globalData.user = result.user;
    }
  },
  globalData: {
    appName: "Drink One",
    user: null
  }
});
```

- [ ] **Step 4: Verify user document is created**

Expected in CloudBase collection `users`:

```text
One document exists for the current openid.
```

### Task 5.2: Implement drink record saving

Status: Completed (cloud function + service + page wiring done; DevTools testing pending)

**Files:**

- Modify: `cloudfunctions/saveDrinkRecord/index.js`
- Create: `services/records.js`
- Modify: `pages/record/record.js`

- [ ] **Step 1: Implement cloud function validation**

Use:

```js
const cloud = require("wx-server-sdk");

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

const db = cloud.database();

exports.main = async (event) => {
  const wxContext = cloud.getWXContext();
  const openid = wxContext.OPENID;

  const { drinkId, rating, scene, note } = event;

  if (!drinkId) {
    throw new Error("drinkId is required");
  }

  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    throw new Error("rating must be an integer from 1 to 5");
  }

  const users = await db.collection("users").where({ openid }).limit(1).get();
  if (users.data.length === 0) {
    throw new Error("user not found");
  }

  const now = new Date();

  const result = await db.collection("drink_records").add({
    data: {
      userId: users.data[0]._id,
      drinkId,
      rating,
      scene: scene || "",
      note: note || "",
      createdAt: now
    }
  });

  return {
    recordId: result._id
  };
};
```

- [ ] **Step 2: Create `services/records.js`**

Use:

```js
const { callFunction } = require("./cloud");

function saveDrinkRecord(record) {
  return callFunction("saveDrinkRecord", record);
}

module.exports = {
  saveDrinkRecord
};
```

- [ ] **Step 3: Wire record page save button**

Use in `pages/record/record.js`:

```js
const recordService = require("../../services/records");

Page({
  data: {
    drinkId: "",
    rating: 4,
    scene: "独处",
    note: ""
  },
  async saveRecord() {
    await recordService.saveDrinkRecord({
      drinkId: this.data.drinkId,
      rating: this.data.rating,
      scene: this.data.scene,
      note: this.data.note
    });
    wx.showToast({ title: "已保存" });
  }
});
```

- [ ] **Step 4: Verify**

Manual:

```text
Open pages/record/record.
Tap 保存记录.
Expected: drink_records collection receives one new record.
```

---

## Phase 6: DIY Recipes And Content Review

Status: In Progress (cloud functions + security module + service + page wiring done; DevTools testing pending)

Goal: Let users create safe DIY recipes using only approved ingredients.

### Task 6.1: Implement recipe creation

Status: Completed (cloud function with validation + service + page wiring done; DevTools testing pending)

**Files:**

- Modify: `cloudfunctions/createRecipe/index.js`
- Create: `services/recipes.js`
- Modify: `pages/diy/diy.js`
- Modify: `pages/diy/diy.wxml`

- [ ] **Step 1: Implement ingredient safety validation**

Use:

```js
const cloud = require("wx-server-sdk");

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

const db = cloud.database();
const _ = db.command;

exports.main = async (event) => {
  const wxContext = cloud.getWXContext();
  const openid = wxContext.OPENID;
  const { recipeName, baseDrinkId, ingredientIds, description, coverImage } = event;

  if (!recipeName || recipeName.length > 20) {
    throw new Error("recipeName is required and must be shorter than 20 characters");
  }

  if (!baseDrinkId) {
    throw new Error("baseDrinkId is required");
  }

  if (!Array.isArray(ingredientIds) || ingredientIds.length === 0) {
    throw new Error("ingredientIds is required");
  }

  const ingredients = await db
    .collection("ingredients")
    .where({
      _id: _.in(ingredientIds),
      enabled: true
    })
    .get();

  if (ingredients.data.length !== ingredientIds.length) {
    throw new Error("all ingredients must come from enabled system ingredients");
  }

  const users = await db.collection("users").where({ openid }).limit(1).get();
  if (users.data.length === 0) {
    throw new Error("user not found");
  }

  const now = new Date();

  const result = await db.collection("recipes").add({
    data: {
      userId: users.data[0]._id,
      recipeName,
      baseDrinkId,
      ingredientIds,
      description: description || "",
      coverImage: coverImage || "",
      status: "pending",
      viewCount: 0,
      likeCount: 0,
      favoriteCount: 0,
      createdAt: now,
      updatedAt: now
    }
  });

  return {
    recipeId: result._id,
    status: "pending"
  };
};
```

- [ ] **Step 2: Create `services/recipes.js`**

Use:

```js
const { callFunction } = require("./cloud");

function createRecipe(recipe) {
  return callFunction("createRecipe", recipe);
}

module.exports = {
  createRecipe
};
```

- [ ] **Step 3: Wire DIY page submit**

Use:

```js
const recipeService = require("../../services/recipes");

async submitRecipe() {
  const result = await recipeService.createRecipe({
    recipeName: this.data.recipeName,
    baseDrinkId: this.data.baseDrinkId,
    ingredientIds: this.data.ingredientIds,
    description: this.data.description
  });

  wx.showToast({
    title: result.status === "pending" ? "已提交审核" : "已发布"
  });
}
```

- [ ] **Step 4: Verify**

Manual:

```text
Create a DIY recipe using selected ingredients.
Expected: recipes collection gets a status=pending record.
```

### Task 6.2: Add content safety audit

Status: Completed (security module with 10 blocked words + integration in createRecipe done; DevTools testing pending)

**Files:**

- Modify: `cloudfunctions/createRecipe/index.js`
- Create: `cloudfunctions/common/security.js`

- [ ] **Step 1: Create sensitive word scanner**

Create `cloudfunctions/common/security.js`:

```js
const blockedWords = [
  "药物",
  "断片",
  "拼酒",
  "挑战",
  "未成年"
];

function scanText(text) {
  const content = text || "";
  const hit = blockedWords.find((word) => content.includes(word));
  return {
    passed: !hit,
    hit: hit || ""
  };
}

module.exports = {
  scanText
};
```

- [ ] **Step 2: Use scanner in recipe creation**

Add to `createRecipe/index.js`:

```js
const { scanText } = require("../common/security");

const textCheck = scanText(`${recipeName} ${description || ""}`);
if (!textCheck.passed) {
  throw new Error(`content contains blocked word: ${textCheck.hit}`);
}
```

- [ ] **Step 3: Verify blocked content**

Manual cloud function call:

```json
{
  "recipeName": "拼酒挑战",
  "baseDrinkId": "test",
  "ingredientIds": ["test"],
  "description": "挑战"
}
```

Expected:

```text
content contains blocked word: 挑战
```

---

## Phase 7: Rankings And Achievements

Status: In Progress (cloud functions + services + page wiring done; DevTools testing pending)

Goal: Make ranking and achievement pages driven by real data.

### Task 7.1: Implement ranking cloud function

Status: Completed (cloud function + service + page wiring done; DevTools testing pending)

**Files:**

- Modify: `cloudfunctions/getRanking/index.js`
- Create: `services/ranking.js`
- Modify: `pages/ranking/ranking.js`

- [ ] **Step 1: Implement ranking cloud function**

Use:

```js
const cloud = require("wx-server-sdk");

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

const db = cloud.database();

const sortMap = {
  hot: "likeCount",
  favorite: "favoriteCount",
  record: "recordCount"
};

exports.main = async (event) => {
  const type = event.type || "hot";
  const sortField = sortMap[type] || "likeCount";

  const result = await db
    .collection("recipes")
    .where({ status: "approved" })
    .orderBy(sortField, "desc")
    .limit(20)
    .get();

  return {
    list: result.data
  };
};
```

- [ ] **Step 2: Create `services/ranking.js`**

Use:

```js
const { callFunction } = require("./cloud");

function getRanking(type) {
  return callFunction("getRanking", { type });
}

module.exports = {
  getRanking
};
```

- [ ] **Step 3: Wire ranking page**

Use:

```js
const rankingService = require("../../services/ranking");

Page({
  data: {
    activeType: "hot",
    list: []
  },
  async onLoad() {
    const result = await rankingService.getRanking(this.data.activeType);
    this.setData({ list: result.list });
  }
});
```

- [ ] **Step 4: Verify**

Manual:

```text
Open pages/ranking/ranking.
Expected: ranking list comes from approved recipes collection.
```

### Task 7.2: Implement achievement unlock check

Status: Completed (checkAchievements cloud function created; triggered from saveDrinkRecord; DevTools testing pending)

**Files:**

- Create: `cloudfunctions/checkAchievements/index.js`
- Modify: `cloudfunctions/saveDrinkRecord/index.js`

- [ ] **Step 1: Create achievement check function**

Use:

```js
const cloud = require("wx-server-sdk");

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

const db = cloud.database();

exports.main = async (event) => {
  const { userId } = event;

  if (!userId) {
    throw new Error("userId is required");
  }

  const user = await db.collection("users").doc(userId).get();
  const definitions = await db.collection("achievement_definitions").get();
  const unlocked = await db.collection("user_achievements").where({ userId }).get();
  const unlockedIds = unlocked.data.map((item) => item.achievementId);

  const newUnlocks = [];

  for (const definition of definitions.data) {
    if (unlockedIds.includes(definition._id)) {
      continue;
    }

    if (
      definition.conditionType === "drink_record" &&
      user.data.totalDrinkRecord >= definition.conditionValue
    ) {
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

  return {
    unlockedIds: newUnlocks
  };
};
```

- [ ] **Step 2: Trigger from record save**

After saving record, call:

```js
await cloud.callFunction({
  name: "checkAchievements",
  data: { userId: users.data[0]._id }
});
```

- [ ] **Step 3: Verify**

Manual:

```text
Save first drink record.
Expected: user_achievements receives 微醺新人 achievement.
```

---

## Phase 8: QA, Release Hardening, And Initial Launch

Status: Not Started

Goal: Prepare the Mini Program for a usable MVP release.

### Task 8.1: Add QA checklist

Status: Completed (`docs/qa-checklist.md` created with launch, navigation, safety, cloud function, data integrity, structure, and compliance sections)

**Files:**

- Create: `docs/qa-checklist.md`

- [ ] **Step 1: Create checklist document**

Create:

```md
# Drink One QA Checklist

## Launch

- [ ] WeChat DevTools opens project without missing `app.json`.
- [ ] Simulator renders home page content.
- [ ] No JavaScript syntax errors in Console.
- [ ] No missing image assets.

## Navigation

- [ ] 首页 tab opens.
- [ ] 酒库 tab opens.
- [ ] DIY酒谱 tab opens.
- [ ] 榜单 tab opens.
- [ ] 我的 tab opens.
- [ ] 首页 can navigate to 状态推荐.
- [ ] 首页 can navigate to 酒品详情.
- [ ] 酒品详情 can navigate to 品鉴记录.

## Safety

- [ ] 首页 shows rational drinking notice.
- [ ] 酒品详情 shows risk notice.
- [ ] DIY recipe does not allow free ingredient input.
- [ ] UGC recipe is created as pending before approval.
```

- [ ] **Step 2: Run validation**

Run:

```bash
npm.cmd test
```

Expected:

```text
Mini program structure validated.
```

### Task 8.2: Prepare first commit

**Files:**

- All project files.

- [ ] **Step 1: Review status**

Run:

```bash
git status --short
```

Expected:

```text
Project files listed as untracked or modified.
```

- [ ] **Step 2: Run final validation**

Run:

```bash
npm.cmd test
```

Expected:

```text
Mini program structure validated.
```

- [ ] **Step 3: Stage files**

Run:

```bash
git add .
```

- [ ] **Step 4: Commit**

Run:

```bash
git commit -m "feat: scaffold drink one mini program"
```

- [ ] **Step 5: Push**

Run:

```bash
git push -u origin main
```

Expected:

```text
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

---

## Recurring Development Rules

Use these rules for every future task.

### Before code changes

- [ ] Read the relevant PRD/database/architecture section.
- [ ] Add or update a validation/test first.
- [ ] Run the test and confirm it fails for the expected reason.
- [ ] Make the smallest implementation change.
- [ ] Run the test and confirm it passes.

### Before claiming a task is complete

- [ ] Run:

```bash
npm.cmd test
```

- [ ] Check WeChat DevTools if the task affects UI.
- [ ] Confirm no blank simulator body.
- [ ] Confirm no Console syntax errors.
- [ ] Confirm all local assets load.

### Before committing

- [ ] Run:

```bash
npm.cmd test
git status --short
```

- [ ] Confirm no generated junk files are staged.
- [ ] Commit one coherent feature or fix at a time.

---

## Open Decisions

These need decisions before later phases.

- [x] CloudBase `envId`: `drink-one-dev-d8gemhfgb21abcf33`.
- [ ] Whether to keep generated local bottle images or replace them with brand-neutral custom illustrations.
- [ ] Whether real alcohol brand names are acceptable for MVP seed data.
- [ ] Whether to use a remote CDN/CloudBase file storage for drink images.
- [ ] Whether to add an admin workflow for approving recipes in MVP or handle approval manually in CloudBase console.
- [ ] Exact content safety strategy: only sensitive words for MVP, or integrate WeChat content security API immediately.

---

## Next Recommended Task

Recommended next task:

```text
在微信开发者工具中打开项目，按 docs/qa-checklist.md 逐项验证功能。
```

Why:

All cloud functions, services, page wiring, and validation tests are now in place. The next step requires the WeChat DevTools simulator to:

1. Visual-check all 10 pages against the design mockup (Task 2.3 Step 3).
2. Deploy cloud functions and test with real CloudBase data.
3. Run through the QA checklist items.

**Automated work is complete.** The remaining tasks require the visual WeChat IDE environment.
