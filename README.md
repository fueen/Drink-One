# Drink One（喝一杯）

Drink One 是一个微信小程序项目，定位为“酒类推荐 + 酒文化探索 + DIY 酒谱 + 品鉴记录”的信息型应用。

产品不做酒类销售，不鼓励酗酒、拼酒或挑战饮酒，核心目标是帮助用户在聚会、独处、观影、游戏、社交等场景下快速决定“今晚喝什么”。

---

## 当前状态

当前项目已经完成微信小程序基础骨架和静态 UI MVP。

已完成：

- 微信小程序根目录配置。
- `app.json` 页面路由与 tabBar 配置。
- 首页、酒库、DIY 酒谱、排行榜、我的五个主 tab 页面。
- 状态推荐、酒品详情、酒量测试、成就、品鉴记录等二级页面。
- 本地 tabBar 图标资源。
- 本地酒瓶占位图片资源。
- UI 初步还原设计稿风格。
- Node.js 结构校验脚本。
- 技术架构文档。
- 全局执行计划文档。

当前阶段：

```text
Phase 2: UI refinement and frontend engineering foundation
```

下一步建议：

1. 在微信开发者工具中逐页对照设计稿检查 UI。
2. 抽取公共组件，如酒品卡片、安全提示、标签列表。
3. 配置微信云开发 CloudBase 环境。
4. 初始化分类、标签、原料、成就和酒品种子数据。

---

## 技术栈

| 层级 | 技术 |
| --- | --- |
| 小程序端 | 微信原生小程序 |
| 页面结构 | WXML / WXSS / JavaScript / JSON |
| 样式体系 | 原生 WXSS |
| 数据库规划 | 微信云开发 CloudBase MongoDB |
| 后端规划 | 微信云函数 |
| 校验脚本 | Node.js |

---

## 目录结构

```text
.
├── app.js
├── app.json
├── app.wxss
├── sitemap.json
├── project.config.json
├── project.private.config.json
├── package.json
├── README.md
├── assets/
│   ├── drinks/
│   └── tabbar/
├── docs/
│   ├── PRD v1.0.md
│   ├── Database Design.md
│   ├── technical-architecture.md
│   └── superpowers/
│       └── plans/
├── pages/
│   ├── index/
│   ├── mood/
│   ├── detail/
│   ├── diy/
│   ├── ranking/
│   ├── library/
│   ├── test/
│   ├── achievements/
│   ├── profile/
│   └── record/
└── tests/
    └── validate-miniprogram.js
```

---

## 页面说明

| 页面 | 路径 | 说明 |
| --- | --- | --- |
| 首页 | `pages/index/index` | 今日推荐、状态入口、随机抽酒、安全提示 |
| 状态推荐 | `pages/mood/mood` | 按微醺、小醉、品鉴、聚会等状态推荐 |
| 酒品详情 | `pages/detail/detail` | 酒品信息、口感标签、饮用场景、风险提示 |
| DIY 酒谱 | `pages/diy/diy` | 创建酒谱流程入口 |
| 排行榜 | `pages/ranking/ranking` | 热门榜、微醺榜、创意榜、收藏榜 |
| 酒库 | `pages/library/library` | 酒品分类、搜索、列表浏览 |
| 酒量测试 | `pages/test/test` | 用户填写信息，后续生成参考结果 |
| 成就 | `pages/achievements/achievements` | 展示用户成就和进度 |
| 我的 | `pages/profile/profile` | 用户信息、统计和菜单 |
| 品鉴记录 | `pages/record/record` | 评分、感受、饮用场景记录 |

---

## 本地开发

### 1. 使用微信开发者工具打开

直接用微信开发者工具打开项目根目录：

```text
D:\workspace\Drink One
```

项目当前使用原生小程序结构，`app.json` 位于根目录。

### 2. 运行结构校验

在 PowerShell 中运行：

```bash
npm.cmd test
```

期望输出：

```text
Mini program structure validated.
```

校验内容包括：

- `app.json` 页面注册。
- 页面 `.js/.json/.wxml/.wxss` 文件存在。
- 页面 JSON 可解析。
- 页面 JavaScript 语法可解析。
- tabBar 图标路径存在。
- 酒瓶图片资源存在。
- 首页关键 UI 文案和结构存在。

---

## 关键文档

| 文档 | 说明 |
| --- | --- |
| `docs/PRD v1.0.md` | 产品需求文档 |
| `docs/Database Design.md` | CloudBase MongoDB 数据库设计 |
| `docs/technical-architecture.md` | 技术体系架构说明 |
| `docs/superpowers/plans/2026-06-08-drink-one-global-execution-plan.md` | 全局执行计划 |

后续开发前建议阅读顺序：

1. `README.md`
2. `docs/technical-architecture.md`
3. `docs/superpowers/plans/2026-06-08-drink-one-global-execution-plan.md`
4. `docs/PRD v1.0.md`
5. `docs/Database Design.md`

---

## 数据库规划

数据库计划使用微信云开发 CloudBase MongoDB。

主要集合：

- `users`
- `drink_categories`
- `drinks`
- `drink_tags`
- `ingredients`
- `recipes`
- `recipe_likes`
- `recipe_favorites`
- `drink_records`
- `user_favorites`
- `achievement_definitions`
- `user_achievements`
- `recommend_logs`
- `system_configs`
- `report_records`

重要业务约束：

- DIY 酒谱不能让用户自由输入原料，只能从系统 `ingredients` 中选择。
- UGC 酒谱必须先审核再展示。
- 成就系统鼓励探索，不鼓励饮酒量。
- 所有涉及酒精内容的页面都需要理性饮酒提示。

---

## 开发规范

### 页面新增

新增页面时必须同步：

1. 在 `app.json` 注册页面路径。
2. 创建 `.js/.json/.wxml/.wxss` 四个页面文件。
3. 更新 `tests/validate-miniprogram.js`。
4. 运行 `npm.cmd test`。

### UI 修改

公共视觉样式优先放到 `app.wxss`：

- `.card`
- `.soft-card`
- `.tag`
- `.pill`
- `.primary-button`
- `.search`

页面私有布局放到对应页面 `.wxss`。

### 安全规则

禁止设计或实现以下内容：

- 药物混酒。
- 危险配方。
- 拼酒文化。
- 断片文化。
- 挑战类饮酒内容。
- 未成年人饮酒内容。

---

## Git 分支

推荐分支模型：

```text
main      稳定主分支
develop   日常开发分支
feature/* 单功能开发分支
```

当前开发工作应优先进入：

```text
develop
```

---

## 项目记忆

这部分用于保存后续开发需要快速恢复的上下文。

- 项目名：Drink One / 喝一杯。
- 当前目标：先完成微信小程序静态 UI 和前端工程基础，再接 CloudBase。
- 当前阶段：Phase 2，UI 精修与前端工程化。
- 最近修复：`pages/index/index.js` 曾因多余 `});` 导致模拟器空白，已修复，并增加 JS 语法校验。
- 资源策略：当前使用本地 PNG 图标和酒瓶图，后续可替换为 CloudBase 文件存储或正式设计资源。
- 下一个推荐任务：在微信开发者工具逐页对照效果图检查 UI，然后抽取公共组件。
