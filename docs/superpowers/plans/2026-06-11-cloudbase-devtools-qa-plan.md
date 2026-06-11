# CloudBase DevTools QA Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Verify Drink One in WeChat DevTools, deploy CloudBase functions and seed data, and turn the code-complete MVP into a simulator-verified CloudBase-backed MVP.

**Architecture:** The Mini Program already has pages, components, services, cloud functions, and seed JSON files. This plan focuses on runtime validation in the real WeChat Mini Program environment, CloudBase deployment, collection/index setup, and documentation of defects found during manual QA.

**Tech Stack:** WeChat Native Mini Program, WeChat DevTools, CloudBase MongoDB, Cloud Functions, PowerShell, Node.js validation script.

---

## Current Context

Current branch:

```text
develop
```

CloudBase environment:

```text
drink-one-dev-d8gemhfgb21abcf33
```

Preflight command:

```powershell
npm.cmd test
```

Expected output:

```text
Mini program structure validated.
```

Relevant files:

- `app.js`: initializes `wx.cloud` and calls `userService.login()`.
- `config/env.js`: stores the CloudBase `envId`.
- `project.config.json`: points `cloudfunctionRoot` to `cloudfunctions/`.
- `cloudfunctions/*/index.js`: CloudBase cloud functions.
- `services/*.js`: Mini Program service wrappers around `wx.cloud.callFunction`.
- `scripts/seed-data/*.json`: starter data for categories, tags, ingredients, achievements, and drinks.
- `docs/qa-checklist.md`: existing manual QA checklist.
- `memory.md`: project progress log to update after this phase.

---

## File Ownership Map

### Manual Runtime Verification

- WeChat DevTools project root: `D:\workspace\Drink One`
- Verification source: `docs/qa-checklist.md`
- Defect log target: `docs/qa-checklist.md`

### CloudBase Setup

- `scripts/seed-data/categories.json`: import into `drink_categories`
- `scripts/seed-data/tags.json`: import into `drink_tags`
- `scripts/seed-data/ingredients.json`: import into `ingredients`
- `scripts/seed-data/achievements.json`: import into `achievement_definitions`
- `scripts/seed-data/drinks.sample.json`: import into `drinks`

### Cloud Functions

- `cloudfunctions/login`
- `cloudfunctions/getHomeData`
- `cloudfunctions/getRandomDrink`
- `cloudfunctions/getMoodRecommendations`
- `cloudfunctions/getDrinkDetail`
- `cloudfunctions/saveDrinkRecord`
- `cloudfunctions/createRecipe`
- `cloudfunctions/getRanking`
- `cloudfunctions/checkAchievements`

### Documentation Updates

- `docs/qa-checklist.md`: record QA evidence and defects.
- `docs/superpowers/plans/2026-06-08-drink-one-global-execution-plan.md`: update current working point after verification.
- `memory.md`: append a dated progress entry.

---

## Task 1: Local Preflight And Project Open

**Files:**

- Read: `package.json`
- Read: `tests/validate-miniprogram.js`
- Read: `project.config.json`
- Read: `config/env.js`
- Modify after verification: `docs/qa-checklist.md`

- [ ] **Step 1: Confirm working branch and status**

Run:

```powershell
git status --short --branch
```

Expected:

```text
## develop...origin/develop
```

If extra modified files appear, record them before continuing:

```powershell
git status --short
```

- [ ] **Step 2: Run automated structure validation**

Run:

```powershell
npm.cmd test
```

Expected:

```text
Mini program structure validated.
```

- [ ] **Step 3: Confirm CloudBase environment config**

Open `config/env.js` and verify it contains:

```js
const ENV = {
  cloudEnvId: "drink-one-dev-d8gemhfgb21abcf33"
};

module.exports = ENV;
```

- [ ] **Step 4: Open the project in WeChat DevTools**

Manual action:

```text
WeChat DevTools -> Import Project -> Directory: D:\workspace\Drink One
```

Expected:

```text
DevTools loads the project.
The simulator opens the home page.
No "app.json not found" error appears.
```

- [ ] **Step 5: Record preflight result**

Modify `docs/qa-checklist.md` under the Launch section so the checked items match this format:

```md
- [x] WeChat DevTools opens project without missing `app.json`.
- [x] Simulator renders home page content.
- [x] `npm.cmd test` passes with `Mini program structure validated.`
```

- [ ] **Step 6: Commit preflight QA notes**

Run:

```powershell
git add docs/qa-checklist.md
git commit -m "docs: record devtools preflight qa"
```

Expected:

```text
[develop <sha>] docs: record devtools preflight qa
```

---

## Task 2: Visual QA For All 10 Pages

**Files:**

- Modify: `docs/qa-checklist.md`
- Potential fixes if defects are found:
  - `pages/index/index.wxml`
  - `pages/index/index.wxss`
  - `pages/mood/mood.wxml`
  - `pages/mood/mood.wxss`
  - `pages/detail/detail.wxml`
  - `pages/detail/detail.wxss`
  - `pages/diy/diy.wxml`
  - `pages/diy/diy.wxss`
  - `pages/ranking/ranking.wxml`
  - `pages/ranking/ranking.wxss`
  - `pages/library/library.wxml`
  - `pages/library/library.wxss`
  - `pages/test/test.wxml`
  - `pages/test/test.wxss`
  - `pages/achievements/achievements.wxml`
  - `pages/achievements/achievements.wxss`
  - `pages/profile/profile.wxml`
  - `pages/profile/profile.wxss`
  - `pages/record/record.wxml`
  - `pages/record/record.wxss`

- [ ] **Step 1: Open every page in simulator**

Use these DevTools compile paths one by one:

```text
pages/index/index
pages/mood/mood
pages/detail/detail
pages/diy/diy
pages/ranking/ranking
pages/library/library
pages/test/test
pages/achievements/achievements
pages/profile/profile
pages/record/record
```

- [ ] **Step 2: Verify page-level expected UI**

For each page, verify:

```text
首页: content appears, no blank body, tabBar visible, 今日推荐 visible, 随机抽一杯 visible.
状态推荐: title visible, mood hero visible, recommendation cards visible.
详情页: bottle image visible, tags visible, safety notice visible, record button visible.
DIY: stepper visible, base bottle cards visible, ingredient choices visible, submit button visible.
排行榜: category tabs visible, top ranked area visible, rank list visible.
酒库: search visible, category row visible, drink cards visible.
酒量测试: form rows visible, options selectable, start/result button visible.
成就: achievement grid visible, locked/unlocked states visible, progress visible.
我的: avatar area visible, stats visible, menu items visible.
记录: rating stars visible, textarea visible, scene pills visible, save button visible.
```

- [ ] **Step 3: Record pass/fail status**

Append this section to `docs/qa-checklist.md`:

```md
## Visual QA Evidence

Date: 2026-06-11
Environment: WeChat DevTools simulator, CloudBase env `drink-one-dev-d8gemhfgb21abcf33`

- [ ] 首页: renders without blank body.
- [ ] 状态推荐: renders recommendation cards.
- [ ] 酒品详情: renders bottle, tags, safety notice, and record button.
- [ ] DIY 酒谱: renders stepper, base drinks, ingredients, and submit button.
- [ ] 排行榜: renders tabs and rank list.
- [ ] 酒库: renders search, categories, and drink cards.
- [ ] 酒量测试: renders form rows and result action.
- [ ] 成就: renders achievement grid and progress.
- [ ] 我的: renders profile header, stats, and menu.
- [ ] 品鉴记录: renders rating, note input, scene pills, and save button.
```

- [ ] **Step 4: If a visual defect is found, record it before fixing**

Use this exact format in `docs/qa-checklist.md`:

```md
### Defect: <page> - <short title>

- Symptom: <what is visible in simulator>
- Console: <exact error text, or `No console error`>
- File to fix: `<path>`
- Verification path: `<page route>`
- Status: Open
```

- [ ] **Step 5: Fix one defect at a time**

For layout-only fixes, keep changes inside the affected page `.wxss`. For shared card, tag, button, or safety notice fixes, use `app.wxss` or the relevant component style file.

After each fix, run:

```powershell
npm.cmd test
```

Expected:

```text
Mini program structure validated.
```

- [ ] **Step 6: Mark fixed defects**

Change each fixed defect entry to:

```md
- Status: Fixed
- Verification: Reopened `<page route>` in WeChat DevTools simulator and confirmed the symptom is gone.
```

- [ ] **Step 7: Commit visual QA notes and fixes**

Run:

```powershell
git add docs/qa-checklist.md app.wxss pages components
git commit -m "fix: resolve devtools visual qa issues"
```

Expected if fixes were made:

```text
[develop <sha>] fix: resolve devtools visual qa issues
```

If no fixes were needed, commit only the QA notes:

```powershell
git add docs/qa-checklist.md
git commit -m "docs: record visual qa results"
```

---

## Task 3: CloudBase Collections, Indexes, And Seed Data

**Files:**

- Read: `docs/Database Design.md`
- Read: `scripts/README.md`
- Read: `scripts/seed-data/categories.json`
- Read: `scripts/seed-data/tags.json`
- Read: `scripts/seed-data/ingredients.json`
- Read: `scripts/seed-data/achievements.json`
- Read: `scripts/seed-data/drinks.sample.json`
- Modify after verification: `docs/qa-checklist.md`

- [ ] **Step 1: Create required CloudBase collections**

In WeChat DevTools CloudBase console, create these collections:

```text
users
drink_categories
drinks
drink_tags
ingredients
recipes
recipe_likes
recipe_favorites
drink_records
user_favorites
achievement_definitions
user_achievements
recommend_logs
system_configs
report_records
```

- [ ] **Step 2: Create indexes**

Create these indexes in CloudBase console:

```text
users: openid unique
drinks: categoryId
drinks: abv
drinks: favoriteCount
drinks: recordCount
recipes: status
recipes: likeCount
recipes: favoriteCount
recipes: createdAt
drink_records: userId
drink_records: drinkId
drink_records: createdAt
user_achievements: userId + achievementId unique
recipe_likes: recipeId + userId unique
```

- [ ] **Step 3: Import seed JSON files**

Import these files into matching collections:

```text
scripts/seed-data/categories.json -> drink_categories
scripts/seed-data/tags.json -> drink_tags
scripts/seed-data/ingredients.json -> ingredients
scripts/seed-data/achievements.json -> achievement_definitions
scripts/seed-data/drinks.sample.json -> drinks
```

- [ ] **Step 4: Verify imported counts**

In CloudBase console, verify each collection has at least one record:

```text
drink_categories > 0
drink_tags > 0
ingredients > 0
achievement_definitions > 0
drinks > 0
```

- [ ] **Step 5: Record CloudBase data setup**

Append this to `docs/qa-checklist.md`:

```md
## CloudBase Data Setup

- [ ] Created required collections.
- [ ] Created required indexes.
- [ ] Imported `scripts/seed-data/categories.json` into `drink_categories`.
- [ ] Imported `scripts/seed-data/tags.json` into `drink_tags`.
- [ ] Imported `scripts/seed-data/ingredients.json` into `ingredients`.
- [ ] Imported `scripts/seed-data/achievements.json` into `achievement_definitions`.
- [ ] Imported `scripts/seed-data/drinks.sample.json` into `drinks`.
- [ ] Verified seed collections contain records.
```

- [ ] **Step 6: Commit CloudBase setup notes**

Run:

```powershell
git add docs/qa-checklist.md
git commit -m "docs: record cloudbase data setup"
```

Expected:

```text
[develop <sha>] docs: record cloudbase data setup
```

---

## Task 4: Deploy And Smoke-Test Cloud Functions

**Files:**

- Read: `cloudfunctions/login/index.js`
- Read: `cloudfunctions/getHomeData/index.js`
- Read: `cloudfunctions/getRandomDrink/index.js`
- Read: `cloudfunctions/getMoodRecommendations/index.js`
- Read: `cloudfunctions/getDrinkDetail/index.js`
- Read: `cloudfunctions/saveDrinkRecord/index.js`
- Read: `cloudfunctions/createRecipe/index.js`
- Read: `cloudfunctions/getRanking/index.js`
- Read: `cloudfunctions/checkAchievements/index.js`
- Modify after verification: `docs/qa-checklist.md`

- [ ] **Step 1: Deploy cloud functions**

In WeChat DevTools:

```text
Cloud Functions panel -> right click each function -> Upload and deploy: cloud installation dependencies
```

Deploy:

```text
login
getHomeData
getRandomDrink
getMoodRecommendations
getDrinkDetail
saveDrinkRecord
createRecipe
getRanking
checkAchievements
```

- [ ] **Step 2: Smoke-test `login`**

Invoke `login` with:

```json
{}
```

Expected result shape:

```json
{
  "user": {
    "_id": "<created-or-existing-user-id>",
    "openid": "<current-openid>",
    "drinkLevel": 1,
    "totalDrinkRecord": 0,
    "totalRecipeCount": 0,
    "achievementCount": 0
  }
}
```

- [ ] **Step 3: Smoke-test `getHomeData`**

Invoke `getHomeData` with:

```json
{}
```

Expected result shape:

```json
{
  "moods": [
    { "icon": "😌", "name": "微醺" },
    { "icon": "🍻", "name": "小醉" },
    { "icon": "🥃", "name": "品鉴" },
    { "icon": "🎉", "name": "聚会" }
  ],
  "dailyDrink": {
    "_id": "<drink-id>",
    "name": "<drink-name>"
  },
  "safetyNotice": "适量饮酒，未成年人禁止饮酒，请勿酒后驾驶。"
}
```

- [ ] **Step 4: Smoke-test `getRandomDrink`**

Invoke `getRandomDrink` with:

```json
{}
```

Expected result shape:

```json
{
  "drink": {
    "_id": "<drink-id>",
    "name": "<drink-name>"
  }
}
```

- [ ] **Step 5: Smoke-test `getMoodRecommendations`**

Invoke `getMoodRecommendations` with:

```json
{
  "mood": "微醺"
}
```

Expected result shape:

```json
{
  "list": [
    {
      "_id": "<drink-id>",
      "name": "<drink-name>",
      "statusTags": ["微醺"]
    }
  ]
}
```

- [ ] **Step 6: Smoke-test `getDrinkDetail`**

Pick one `_id` from the `drinks` collection and invoke:

```json
{
  "drinkId": "<existing-drink-id>"
}
```

Expected result shape:

```json
{
  "drink": {
    "_id": "<existing-drink-id>",
    "name": "<drink-name>"
  }
}
```

- [ ] **Step 7: Smoke-test `saveDrinkRecord`**

Use an existing drink id:

```json
{
  "drinkId": "<existing-drink-id>",
  "rating": 4,
  "scene": "独处",
  "note": "DevTools smoke test record"
}
```

Expected result shape:

```json
{
  "recordId": "<created-record-id>",
  "unlockedAchievements": []
}
```

Also verify:

```text
drink_records contains the new record.
users.totalDrinkRecord increments.
```

- [ ] **Step 8: Smoke-test `createRecipe` allowed content**

Use one existing drink id and one or more existing ingredient ids:

```json
{
  "recipeName": "周五快乐水",
  "baseDrinkId": "<existing-drink-id>",
  "ingredientIds": ["<existing-ingredient-id>"],
  "description": "清爽口感，适合慢慢品尝。"
}
```

Expected result shape:

```json
{
  "recipeId": "<created-recipe-id>",
  "status": "pending"
}
```

Also verify:

```text
recipes contains the new record with status=pending.
```

- [ ] **Step 9: Smoke-test `createRecipe` blocked content**

Invoke:

```json
{
  "recipeName": "拼酒挑战",
  "baseDrinkId": "<existing-drink-id>",
  "ingredientIds": ["<existing-ingredient-id>"],
  "description": "挑战断片"
}
```

Expected:

```text
Function fails with a blocked-word error.
No approved recipe is created.
```

- [ ] **Step 10: Smoke-test `getRanking`**

Invoke:

```json
{
  "type": "hot"
}
```

Expected result shape:

```json
{
  "list": []
}
```

The list can be empty until an approved recipe exists. If a test recipe is manually changed to `approved`, the list should include it.

- [ ] **Step 11: Record cloud function smoke-test results**

Append this to `docs/qa-checklist.md`:

```md
## Cloud Function Smoke Tests

- [ ] `login` returns or creates the current user.
- [ ] `getHomeData` returns moods, safety notice, and a seeded drink.
- [ ] `getRandomDrink` returns one seeded drink.
- [ ] `getMoodRecommendations` returns drinks for `微醺`.
- [ ] `getDrinkDetail` returns an existing drink and increments view data if implemented.
- [ ] `saveDrinkRecord` creates a drink record.
- [ ] `createRecipe` creates safe content as `pending`.
- [ ] `createRecipe` blocks unsafe content.
- [ ] `getRanking` returns an array.
- [ ] `checkAchievements` runs through `saveDrinkRecord`.
```

- [ ] **Step 12: Commit smoke-test notes**

Run:

```powershell
git add docs/qa-checklist.md
git commit -m "docs: record cloud function smoke tests"
```

Expected:

```text
[develop <sha>] docs: record cloud function smoke tests
```

---

## Task 5: End-To-End Simulator QA

**Files:**

- Modify: `docs/qa-checklist.md`
- Potential fixes:
  - `services/cloud.js`
  - `services/drinks.js`
  - `services/user.js`
  - `services/records.js`
  - `services/recipes.js`
  - `services/ranking.js`
  - `pages/*/*.js`

- [ ] **Step 1: Verify launch login flow**

Manual action:

```text
Open simulator home page.
Open DevTools Console and CloudBase users collection.
```

Expected:

```text
No uncaught launch error appears.
users contains one document for the current openid.
```

- [ ] **Step 2: Verify home data flow**

Manual action:

```text
Open 首页.
Tap 随机抽一杯.
```

Expected:

```text
今日推荐 updates to a drink.
If CloudBase call fails, fallback drink data still renders and no blank page appears.
```

- [ ] **Step 3: Verify mood recommendation flow**

Manual action:

```text
首页 -> tap 微醺.
```

Expected:

```text
状态推荐 page opens.
Recommendation cards render.
Tapping a card navigates to 酒品详情.
```

- [ ] **Step 4: Verify detail and record flow**

Manual action:

```text
Open 酒品详情.
Tap record action.
Select rating 4.
Select scene 独处.
Enter note: DevTools end-to-end record.
Tap 保存.
```

Expected:

```text
Toast shows save success.
drink_records collection contains the saved record.
```

- [ ] **Step 5: Verify library filtering and search**

Manual action:

```text
Open 酒库.
Tap one category.
Type a keyword that exists in seeded drinks.
Tap a drink card.
```

Expected:

```text
List filters without blank state unless no match exists.
Drink card opens 酒品详情.
```

- [ ] **Step 6: Verify DIY recipe flow**

Manual action:

```text
Open DIY 酒谱.
Select a base drink.
Select at least one ingredient.
Enter recipe name: 周五快乐水.
Enter description: 轻松慢饮，适合聚会分享。
Tap submit.
```

Expected:

```text
Toast shows 已提交审核.
recipes collection contains one status=pending record.
```

- [ ] **Step 7: Verify ranking flow**

Manual action:

```text
Open 排行榜.
Switch all ranking tabs.
```

Expected:

```text
Each tab renders a list or an empty state.
No console error appears.
```

- [ ] **Step 8: Verify profile navigation**

Manual action:

```text
Open 我的.
Tap 收藏, 浏览记录, 成就, 设置 if shown.
```

Expected:

```text
Configured menu items navigate or show an intentional toast.
No dead tap with console error appears.
```

- [ ] **Step 9: Record end-to-end QA result**

Append this to `docs/qa-checklist.md`:

```md
## End-To-End Simulator QA

- [ ] Launch login creates or loads user.
- [ ] 首页 loads CloudBase or fallback data.
- [ ] 随机抽一杯 updates recommendation.
- [ ] 状态推荐 opens and navigates to detail.
- [ ] 酒品详情 opens record page.
- [ ] 品鉴记录 saves one record.
- [ ] 酒库 category and search work.
- [ ] DIY 酒谱 submits one pending recipe.
- [ ] 排行榜 tabs render without console errors.
- [ ] 我的 menu actions do not produce console errors.
```

- [ ] **Step 10: Run final local validation**

Run:

```powershell
npm.cmd test
```

Expected:

```text
Mini program structure validated.
```

- [ ] **Step 11: Commit simulator QA notes and fixes**

Run:

```powershell
git add docs/qa-checklist.md services pages components app.js app.wxss
git commit -m "fix: resolve simulator qa issues"
```

Expected if fixes were made:

```text
[develop <sha>] fix: resolve simulator qa issues
```

If no fixes were needed:

```powershell
git add docs/qa-checklist.md
git commit -m "docs: record simulator qa results"
```

---

## Task 6: Update Project Memory And Phase Status

**Files:**

- Modify: `memory.md`
- Modify: `README.md`
- Modify: `docs/superpowers/plans/2026-06-08-drink-one-global-execution-plan.md`

- [ ] **Step 1: Update `memory.md`**

Append:

```md
---

## 2026-06-11 | 项目进展-Drink One

### 一句话概述
完成微信开发者工具视觉 QA、CloudBase 数据初始化、云函数部署验证和端到端模拟器 QA，Drink One 进入 CloudBase-backed MVP 验证完成阶段。

### 当前进度 / 关键结论
- 微信开发者工具可以打开 `D:\workspace\Drink One` 并渲染首页。
- `npm.cmd test` 输出 `Mini program structure validated.`
- CloudBase 环境为 `drink-one-dev-d8gemhfgb21abcf33`。
- 已创建核心集合并导入分类、标签、原料、成就和酒品样例数据。
- 已部署并 smoke-test 云函数：login、getHomeData、getRandomDrink、getMoodRecommendations、getDrinkDetail、saveDrinkRecord、createRecipe、getRanking、checkAchievements。
- 已按 `docs/qa-checklist.md` 完成 10 页视觉和端到端模拟器验证。

### 下一步
- 扩充 300-500 条真实酒品数据。
- 接入微信内容安全 API 替代本地敏感词扫描。
- 决定 UGC 酒谱审核后台方案：CloudBase 控制台手动审核或新增管理页面。
```

- [ ] **Step 2: Update README current status**

In `README.md`, replace the current status paragraph with:

```md
当前项目已经完成微信小程序页面、公共组件、服务层、云函数和 CloudBase MVP 连线。代码层面已通过结构校验，下一阶段重点是扩充真实酒品数据、完善内容安全审核和准备 MVP 发布。
```

Set current stage to:

```text
CloudBase-backed MVP validation complete
```

- [ ] **Step 3: Update global execution plan current working point**

In `docs/superpowers/plans/2026-06-08-drink-one-global-execution-plan.md`, update the current working point to:

```text
CloudBase-backed MVP validation complete.
Next step: expand real drink data, integrate WeChat content security API, and decide UGC approval workflow.
```

- [ ] **Step 4: Run validation after docs update**

Run:

```powershell
npm.cmd test
```

Expected:

```text
Mini program structure validated.
```

- [ ] **Step 5: Commit documentation updates**

Run:

```powershell
git add memory.md README.md docs/superpowers/plans/2026-06-08-drink-one-global-execution-plan.md
git commit -m "docs: update project status after cloudbase qa"
```

Expected:

```text
[develop <sha>] docs: update project status after cloudbase qa
```

---

## Task 7: Final Verification And Handoff

**Files:**

- Read: `docs/qa-checklist.md`
- Read: `memory.md`
- Read: `README.md`
- Read: `docs/superpowers/plans/2026-06-08-drink-one-global-execution-plan.md`

- [ ] **Step 1: Run final automated validation**

Run:

```powershell
npm.cmd test
```

Expected:

```text
Mini program structure validated.
```

- [ ] **Step 2: Check final git status**

Run:

```powershell
git status --short --branch
```

Expected:

```text
## develop...origin/develop [ahead <n>]
```

or:

```text
## develop...origin/develop
```

- [ ] **Step 3: Summarize handoff**

Prepare a handoff summary with:

```text
Validated:
- Local structure test result.
- WeChat DevTools visual QA result.
- CloudBase data setup result.
- Cloud function smoke-test result.
- End-to-end simulator QA result.

Remaining:
- Real drink data expansion.
- WeChat content security API integration.
- UGC approval workflow decision.
```

- [ ] **Step 4: Push if requested**

Only push after explicit confirmation from the project owner:

```powershell
git push origin develop
```

Expected:

```text
Everything up-to-date
```

or:

```text
develop -> develop
```

---

## Self-Review

Spec coverage:

- Covers local validation before runtime work.
- Covers WeChat DevTools page-by-page visual QA.
- Covers CloudBase collection, index, and seed data setup.
- Covers cloud function deployment and smoke tests.
- Covers end-to-end simulator flows.
- Covers project memory and status updates after verification.

Placeholder scan:

- No `TBD`.
- No `TODO`.
- No unspecified test command.
- No unnamed files.

Type and field consistency:

- CloudBase env id matches `config/env.js`.
- Collection names match `docs/Database Design.md`.
- Cloud function names match `cloudfunctions/` directories.
- Seed file names match `scripts/seed-data/`.

