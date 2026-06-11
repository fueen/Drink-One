# Drink One UI Implementation Specification

Version: 1.0

Platform: WeChat Mini Program

Design Style:

- iOS 26 Inspired

- Glassmorphism

- Modern Flat Design

- Dribbble Premium Quality

- Light Theme

---

# Global Design Tokens

## Colors

```css
--color-bg: #F8F9FB;
--color-card: rgba(255,255,255,0.72);

--color-primary: #FFB85C;
--color-secondary: #7A73FF;

--color-success: #2ED573;
--color-warning: #FFA502;

--color-text-primary: #1C1C1E;
--color-text-secondary: #6B7280;

--color-divider: rgba(0,0,0,0.06);
```

---

## Typography

### Hero Title

Font Size: 34px

Weight: 700

Line Height: 42px

---

### Section Title

Font Size: 22px

Weight: 600

Line Height: 30px

---

### Card Title

Font Size: 18px

Weight: 600

---

### Body

Font Size: 15px

Weight: 500

---

### Caption

Font Size: 13px

Weight: 400

Color:

#6B7280

---

## Radius

```css
--radius-small: 16px;
--radius-medium: 24px;
--radius-large: 32px;
--radius-pill: 999px;
```

---

## Shadow

```css
box-shadow:
0 10px 40px rgba(0,0,0,0.06);
```

---

## Glass Card

```css
background: rgba(255,255,255,0.72);

backdrop-filter: blur(24px);

border:
1px solid rgba(255,255,255,0.8);
```

---

## Layout Grid

Page Horizontal Padding

24px

---

Vertical Gap

20px

---

Card Internal Padding

20px

---

# Home Page

Page ID

home

---

## Header

Height

120px

Layout

Column

---

Title

今晚喝什么？

34px

700

---

Subtitle

适量饮酒，理性饮酒

13px

---

# Status Section

Horizontal Scroll

4 Cards

---

Card Size

Width

170px

Height

120px

Radius

28px

---

Card Layout

Top Left

Emoji Icon

40px

---

Center

Title

20px

---

Bottom

Description

13px

---

Cards

😌 微醺

🍻 小醉

🥃 品鉴

🎉 聚会

---

# Random Drink Button

Height

68px

Radius

34px

---

Background

Linear Gradient

#FFB85C

↓

#FF9966

---

Shadow

0 12px 30px rgba(255,184,92,0.25)

---

Text

随机抽一杯

18px

600

---

# Recommendation Card

Height

240px

Radius

32px

Glass Effect

Enabled

---

Layout

Left

Drink Bottle

120x120

---

Right

Drink Info

---

Drink Name

22px

600

---

Alcohol Content

15px

500

---

Tag Area

Chip Layout

---

# Achievement Card

Height

100px

Radius

28px

---

Layout

Horizontal

---

Left

Achievement Icon

64x64

---

Right

Title

Progress

---

# DIY Recipe Preview

Card Height

160px

Radius

28px

---

Cover Image

Full Width

Top Area

100px

---

Bottom

Recipe Name

Author

Likes

---

# Drink Detail Page

Page ID

drink-detail

---

# Hero Bottle Area

Height

360px

---

Bottle Image

Width

220px

Height

280px

---

Floating

Enabled

---

# Drink Info

Glass Card

Radius

32px

Padding

24px

---

Sections

酒精度

类型

国家

口感标签

适合场景

推荐饮用方式

风险提示

---

# DIY Recipe Page

Page ID

recipe-create

---

Wizard Style

Step Based

---

Step 1

Choose Base Drink

Grid

2 Columns

---

Card Height

110px

Radius

24px

---

Step 2

Choose Ingredients

Tag Style

---

Tag Height

44px

Radius

22px

---

Step 3

Recipe Name

Input

Height

56px

Radius

20px

---

Publish Button

Height

64px

Radius

32px

---

# Achievement Page

Page ID

achievement

---

Hero Progress

Circle Progress

Size

160px

---

Achievement Grid

2 Columns

---

Card

Height

160px

Radius

28px

---

Content

Icon

Name

Description

Progress

---

# Profile Page

Page ID

profile

---

Header Card

Height

180px

Radius

32px

---

Avatar

96x96

---

Statistics

4 Columns

记录酒品

收藏酒品

DIY酒谱

成就数

---

# Bottom Tab Bar

Height

88px

Blur Background

Enabled

---

Tabs

首页

酒库

DIY

成就

我的

---

Active Color

#FFB85C

Inactive Color

#A0A0A0

---

# Motion Design

All Cards

Duration

300ms

Curve

ease-out

---

Button Press

Scale

0.96

---

Card Hover

TranslateY

-4px

---

Page Transition

Fade + Slide

Duration

250ms

---

# UI Keywords

Apple Fitness

Apple Wallet

Apple Health

Glassmorphism

Premium Lifestyle

Minimal

Modern

Elegant

Soft Shadow

Liquid Feel

Notion Style Clean Layout

Avoid Vintage Design

Avoid Skeuomorphism

Avoid Retro Style

Avoid Dark Heavy Bar Theme
