# Drink One QA Checklist

Version: v1.0
Last updated: 2026-06-08

---

## Launch

- [ ] WeChat DevTools opens project without missing `app.json`.
- [ ] Simulator renders home page content (no blank body).
- [ ] No JavaScript syntax errors in Console.
- [ ] No missing image assets (check Network / Console tabs).

## Navigation

- [ ] 首页 tab opens with gradient mood card, random draw card, daily recommendation.
- [ ] 酒库 tab opens with search bar, category grid, drink list.
- [ ] DIY酒谱 tab opens with step indicators and base drink selection.
- [ ] 榜单 tab opens with podium and ranked list.
- [ ] 我的 tab opens with avatar placeholder, stats, and menu.
- [ ] 首页 → tap mood icon → navigates to 状态推荐 (`pages/mood/mood`).
- [ ] 首页 → tap drink card → navigates to 酒品详情 (`pages/detail/detail`).
- [ ] 酒品详情 → tap 记录 → navigates to 品鉴记录 (`pages/record/record`).

## Safety

- [ ] 首页 renders rational drinking notice via `<safety-notice>` component.
- [ ] 酒品详情 shows risk/warning notice.
- [ ] DIY recipe requires base drink selection (cannot submit empty).
- [ ] DIY recipe name max length enforced (20 characters).
- [ ] UGC recipe cloud function sets `status: "pending"` on creation.
- [ ] Recipe creation rejects blocked words (拼酒, 挑战, 药物, etc.).

## Cloud Functions

- [ ] `login` returns or creates user document based on openid.
- [ ] `getHomeData` returns moods array, dailyDrink object, safetyNotice string.
- [ ] `getRandomDrink` returns a different drink on each call (non-empty `drinks` collection).
- [ ] `getMoodRecommendations` filters by mood and returns drink list.
- [ ] `getDrinkDetail` returns drink by id and increments viewCount.
- [ ] `saveDrinkRecord` validates rating 1-5 and inserts into `drink_records`.
- [ ] `createRecipe` validates ingredients are enabled and blocks unsafe text.
- [ ] `getRanking` returns approved recipes sorted by the requested type.
- [ ] `checkAchievements` unlocks achievements when conditions are met.

## Data Integrity

- [ ] `users` collection has unique index on `openid`.
- [ ] `drinks` collection has indexes on `categoryId`, `favoriteCount`.
- [ ] `recipes` collection has indexes on `status`, `likeCount`.
- [ ] `drink_records` collection has indexes on `userId`, `drinkId`.
- [ ] `user_achievements` collection has compound unique index on `userId + achievementId`.
- [ ] Seed data JSON files are valid and importable.

## Structure & Validation

- [ ] `npm.cmd test` exits with `Mini program structure validated.`
- [ ] All 10 pages registered in `app.json`.
- [ ] All 5 tabBar pages configured with valid icon paths.
- [ ] All 3 shared components (`drink-card`, `safety-notice`, `tag-list`) exist.
- [ ] All 4 service files (`cloud`, `drinks`, `user`, `records`, `recipes`, `ranking`) exist.
- [ ] All 9 cloud function directories exist with `index.js`.
- [ ] `config/env.js` contains valid CloudBase envId.
- [ ] `.gitignore` excludes `config/secrets.local.js`.

## Content & Compliance

- [ ] No content that encourages binge drinking, drinking challenges, or blackout culture.
- [ ] Rational drinking notice present on all relevant pages.
- [ ] All UGC paths go through security scanning before publication.
- [ ] Ingredient selection is limited to system-approved ingredients only.
