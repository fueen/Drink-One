# Drink One CRUD Completion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Complete user-facing CRUD flows so Mini Program data can be created, queried, updated, and deleted through CloudBase cloud functions and service wrappers.

**Architecture:** Keep seed-managed catalog data read-only in the app and complete CRUD for user-owned data. All writes resolve identity from `OPENID` inside cloud functions; frontend service wrappers call cloud functions only. Existing fallback UI remains available when CloudBase is unavailable.

**Tech Stack:** WeChat Native Mini Program, JavaScript cloud functions, CloudBase MongoDB, Node.js structural validation.

---

## CRUD Module Checklist

- [ ] `users`: create/read via `login`, read via `getUserProfileData`, update via `updateUserProfile`.
- [ ] `drinks`: list via `getHomeData`, read via `getDrinkDetail`, create/delete favorite relation via `toggleDrinkFavorite`, query favorites via `getDrinkFavorites`.
- [ ] `drink_records`: create via `saveDrinkRecord`, read via `getDrinkRecords`, update via `updateDrinkRecord`, delete via `deleteDrinkRecord`.
- [ ] `recipes`: create via `createRecipe`, read via `getRecipeDetail` and `getMyRecipes`, update own pending/rejected recipe via `updateRecipe`, delete own non-approved recipe via `deleteRecipe`.
- [ ] `recipe_likes`: create/delete relation via `toggleRecipeLike`.
- [ ] `recipe_favorites`: create/delete relation via `toggleRecipeFavorite`, query favorites via `getRecipeFavorites`.
- [ ] `report_records`: create via `reportContent`, read own reports via `getMyReports`.

## Implementation Tasks

### Task 1: Validation Contract

**Files:**
- Modify: `tests/validate-miniprogram.js`

- [ ] Add required cloud function assertions for `updateUserProfile`, `getDrinkFavorites`, `updateDrinkRecord`, `deleteDrinkRecord`, `getMyRecipes`, `updateRecipe`, `deleteRecipe`, `getRecipeFavorites`, and `getMyReports`.
- [ ] Add service export assertions for matching methods in `services/user.js`, `services/drinks.js`, `services/records.js`, and `services/recipes.js`.
- [ ] Run `npm.cmd test` and verify it fails before implementation.

### Task 2: User And Favorites CRUD

**Files:**
- Create: `cloudfunctions/updateUserProfile/index.js`
- Create: `cloudfunctions/updateUserProfile/package.json`
- Create: `cloudfunctions/getDrinkFavorites/index.js`
- Create: `cloudfunctions/getDrinkFavorites/package.json`
- Modify: `services/user.js`
- Modify: `services/drinks.js`

- [ ] Implement `updateUserProfile` with allowlisted profile fields and `OPENID` ownership.
- [ ] Implement `getDrinkFavorites` joining `user_favorites` to `drinks`.
- [ ] Expose `updateUserProfile` and `getDrinkFavorites` from service wrappers.

### Task 3: Drink Record CRUD

**Files:**
- Create: `cloudfunctions/updateDrinkRecord/index.js`
- Create: `cloudfunctions/updateDrinkRecord/package.json`
- Create: `cloudfunctions/deleteDrinkRecord/index.js`
- Create: `cloudfunctions/deleteDrinkRecord/package.json`
- Modify: `services/records.js`

- [ ] Implement ownership-checked record update for `rating`, `scene`, and `note`.
- [ ] Implement ownership-checked record delete and decrement aggregate counters.
- [ ] Expose update/delete functions from records service.

### Task 4: Recipe CRUD And Lists

**Files:**
- Create: `cloudfunctions/getMyRecipes/index.js`
- Create: `cloudfunctions/getMyRecipes/package.json`
- Create: `cloudfunctions/updateRecipe/index.js`
- Create: `cloudfunctions/updateRecipe/package.json`
- Create: `cloudfunctions/deleteRecipe/index.js`
- Create: `cloudfunctions/deleteRecipe/package.json`
- Create: `cloudfunctions/getRecipeFavorites/index.js`
- Create: `cloudfunctions/getRecipeFavorites/package.json`
- Modify: `services/recipes.js`

- [ ] Implement own recipe list query.
- [ ] Implement ownership-checked recipe update with ingredient validation and content scan.
- [ ] Implement ownership-checked recipe delete for non-approved recipes and cleanup relation rows.
- [ ] Implement recipe favorite list query.
- [ ] Expose all new recipe methods from service wrapper.

### Task 5: Report Query

**Files:**
- Create: `cloudfunctions/getMyReports/index.js`
- Create: `cloudfunctions/getMyReports/package.json`
- Modify: `services/user.js`

- [ ] Implement ownership-checked own report list query.
- [ ] Expose `getMyReports` from user service.

### Task 6: Verification And Review

**Files:**
- Read all modified files.

- [ ] Run `npm.cmd test`.
- [ ] Check `git diff --stat`.
- [ ] Review cloud functions for identity checks, allowlisted writes, and aggregate counter consistency.
