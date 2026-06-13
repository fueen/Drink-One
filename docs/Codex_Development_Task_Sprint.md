# Drink One V2

ROLE

You are a senior WeChat Mini Program engineer.

Build a production-ready mini program.

Stack:

- WXML

- WXSS

- JavaScript

- JSON

- CloudBase

Do NOT use:

- React

- Vue

- Taro

- UniApp

Only native mini program.

---

DESIGN GOAL

Style:

Apple Fitness

Apple Wallet

Glassmorphism

Modern Flat

Premium Lifestyle

Light Theme

---

LATEST UI STRUCTURE

Bottom Tabs:

Home

Library

DIY

Achievement

Profile

---

HOME

Sections:

SafeNotice

StatusCards

RandomDrinkCTA

PopularRecipes

RecentAchievements

---

REMOVE:

Today Recommendation

---

RANDOM DRINK FEATURE

Click CTA

Open Modal

Modal Contents:

Bottle Image

Drink Name

English Name

ABV

Tags

Description

Buttons:

View Detail

Try Another One

Use smooth scale animation.

Duration:

300ms

---

LIBRARY

Search

Category Tabs

Drink Grid

2 Columns

Infinite Scroll

---

DRINK DETAIL

Large Bottle Hero

Drink Info

ABV

Country

Tags

Scenes

Risk Warning

Favorite Button

Record Button

---

DIY

Step Wizard

1 Choose Base Drink

2 Choose Ingredients

3 Input Name

4 Publish

---

ACHIEVEMENT

Progress Ring

Achievement Grid

Unlock Animation

---

PROFILE

Avatar

Statistics

My Favorites

My Recipes

History

Settings

---

COMPONENTS

GlassCard

StatusCard

DrinkCard

RecipeCard

AchievementCard

TagChip

RandomDrinkModal

SafeNotice

ProgressRing

---

ANIMATION

Card Hover

translateY(-4px)

Duration 300ms

---

Button Press

scale(0.96)

Duration 200ms

---

Modal Open

scale 0.9 -> 1

opacity 0 -> 1

Duration 300ms

---

GLASS STYLE

background:  
rgba(255,255,255,0.72)

blur:  
24px

radius:  
32rpx

shadow:  
0 12rpx 40rpx rgba(0,0,0,0.05)

---

CONTENT SAFETY

Show on Home:

适量饮酒

未成年人禁止饮酒

请勿酒后驾驶

Do not encourage excessive drinking.

---

OUTPUT

Generate complete source code.

Every page:

index.wxml

index.wxss

index.js

index.json

Generate all reusable components.

Generate CloudBase services.

Generate mock data.

Generate runnable project.
