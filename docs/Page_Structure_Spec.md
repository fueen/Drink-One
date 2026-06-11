# Drink One

# Page Structure Specification

Platform:

WeChat Mini Program

Framework:

Native Mini Program + TypeScript

Style:

Glassmorphism + Flat Design

---

# Global Layout

Every Page

```html
<view class="page">

  <view class="safe-area"></view>

  <view class="page-header"></view>

  <view class="page-content"></view>

</view>
```

---

WXSS

```css
.page {
  min-height: 100vh;
  background: #F8F9FB;
  padding: 0 24rpx;
}

.page-content {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}
```

---

# Reusable Components

components

DrinkCard

StatusCard

GlassCard

AchievementCard

RecipeCard

TagChip

ProgressRing

SafeNotice

EmptyState

---

# Home Page

pages/home

---

Structure

```html
<view class="page">

  <SafeNotice />

  <Header />

  <StatusSection />

  <RandomDrinkButton />

  <RecommendationSection />

  <AchievementSection />

  <RecipeSection />

</view>
```

---

Header

```html
<view class="header">

  <text class="hero-title">
    今晚喝什么？
  </text>

  <text class="subtitle">
    适量饮酒，理性饮酒
  </text>

</view>
```

---

Status Section

```html
<scroll-view scroll-x>

  <StatusCard />

  <StatusCard />

  <StatusCard />

  <StatusCard />

</scroll-view>
```

Cards

微醺

小醉

品鉴

聚会

---

Random Drink

```html
<button class="random-button">

  随机抽一杯

</button>
```

---

Recommendation

```html
<GlassCard>

  <DrinkCard />

</GlassCard>
```

---

Achievement Section

```html
<GlassCard>

  <AchievementCard />

</GlassCard>
```

---

Recipe Section

```html
<view class="recipe-list">

  <RecipeCard />

  <RecipeCard />

</view>
```

---

# Drink Library Page

pages/drinks

---

Structure

```html
<view class="page">

  <SearchBar />

  <CategoryTabs />

  <DrinkGrid />

</view>
```

---

Search

```html
<input
placeholder="搜索酒品"
/>
```

---

Category Tabs

```html
<scroll-view scroll-x>

  啤酒

  白酒

  红酒

  威士忌

  鸡尾酒

</scroll-view>
```

---

Drink Grid

```html
<view class="drink-grid">

  <DrinkCard />

</view>
```

---

Grid

2 Columns

---

# Drink Detail Page

pages/drink-detail

---

Structure

```html
<view class="page">

  <BottleHero />

  <DrinkInfo />

  <DrinkTags />

  <DrinkScenes />

  <RiskWarning />

</view>
```

---

Bottle Hero

```html
<view class="hero">

  <image />

</view>
```

---

Info Card

```html
<GlassCard>

  酒名称

  酒精度

  类型

  国家

</GlassCard>
```

---

Tag Area

```html
<view class="tag-list">

  <TagChip />

</view>
```

---

Risk Warning

```html
<GlassCard>

  饮酒有风险

  请理性饮酒

</GlassCard>
```

---

# DIY Recipe Create

pages/recipe-create

---

Structure

```html
<view class="page">

  <StepIndicator />

  <BaseDrinkSelector />

  <IngredientSelector />

  <RecipeNameInput />

  <SubmitButton />

</view>
```

---

Base Drink Selector

```html
<view class="base-grid">

  <DrinkCard />

</view>
```

Grid

2 Columns

---

Ingredient Selector

```html
<view class="ingredient-tags">

  <TagChip />

</view>
```

---

Name Input

```html
<input
maxlength="20"
/>
```

---

# Recipe Detail

pages/recipe-detail

---

Structure

```html
<view class="page">

  <RecipeCover />

  <RecipeInfo />

  <RecipeIngredients />

  <ActionBar />

</view>
```

---

ActionBar

```html
<view>

  点赞

  收藏

  举报

</view>
```

---

# Achievement Page

pages/achievement

---

Structure

```html
<view class="page">

  <HeroProgress />

  <AchievementGrid />

</view>
```

---

Hero Progress

```html
<ProgressRing />
```

---

Achievement Grid

```html
<view class="achievement-grid">

  <AchievementCard />

</view>
```

Grid

2 Columns

---

# Profile Page

pages/profile

---

Structure

```html
<view class="page">

  <UserHeader />

  <Statistics />

  <MenuList />

</view>
```

---

User Header

```html
<GlassCard>

  Avatar

  Nickname

</GlassCard>
```

---

Statistics

```html
记录酒品

收藏酒品

DIY酒谱

成就数
```

---

Menu

```html
我的收藏

浏览历史

我的酒谱

设置

关于我们
```

---

# Global Glass Card

```html
<view class="glass-card">

  content

</view>
```

---

WXSS

```css
.glass-card {

  background:
  rgba(255,255,255,0.72);

  backdrop-filter:
  blur(24px);

  border:
  1px solid rgba(255,255,255,0.8);

  border-radius: 32rpx;

  padding: 24rpx;

  box-shadow:
  0 12rpx 40rpx
  rgba(0,0,0,0.06);
}
```

---

# Component Naming Rules

PascalCase

Examples

DrinkCard

RecipeCard

AchievementCard

StatusCard

TagChip

ProgressRing

GlassCard

---

# Folder Structure

```text
src

pages

home

drinks

drink-detail

recipe-create

recipe-detail

achievement

profile

components

DrinkCard

RecipeCard

GlassCard

StatusCard

AchievementCard

TagChip

ProgressRing

services

drinkService

recipeService

achievementService

userService

store

userStore

drinkStore

recipeStore

utils

constants

types
```
