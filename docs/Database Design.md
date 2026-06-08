# Drink One（喝一杯）

# Database Design.md

Version: v1.0

Database: 微信云开发 CloudBase MongoDB

---

# 数据库总体结构

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

user_achievements

achievement_definitions

recommend_logs

system_configs

report_records

---

# 1. users（用户表）

用户基础信息

```json
{
  "_id": "",
  "openid": "",
  "nickname": "",
  "avatarUrl": "",
  "gender": 0,
  "city": "",
  "province": "",
  "country": "",

  "drinkLevel": 1,

  "totalDrinkRecord": 0,
  "totalRecipeCount": 0,

  "achievementCount": 0,

  "createdAt": "",
  "updatedAt": ""
}
```

字段说明

| 字段               | 类型     | 说明       |
| ---------------- | ------ | -------- |
| openid           | string | 微信用户唯一标识 |
| drinkLevel       | int    | 酒类探索等级   |
| totalDrinkRecord | int    | 累计记录酒品数  |
| achievementCount | int    | 已解锁成就数   |

---

# 2. drink_categories（酒品分类）

```json
{
  "_id": "",
  "name": "威士忌",
  "icon": "",
  "sort": 1
}
```

初始化数据

- 啤酒

- 白酒

- 红酒

- 威士忌

- 金酒

- 伏特加

- 龙舌兰

- 梅酒

- 鸡尾酒

---

# 3. drinks（酒品库）

核心表

```json
{
  "_id": "",

  "name": "角瓶威士忌",

  "englishName": "Suntory Kakubin",

  "categoryId": "",

  "brand": "Suntory",

  "country": "日本",

  "abv": 40,

  "capacity": "700ml",

  "imageUrl": "",

  "gallery": [],

  "description": "",

  "tasteTags": [
    "香草",
    "蜂蜜",
    "木桶"
  ],

  "statusTags": [
    "微醺",
    "聚会"
  ],

  "recommendScenes": [
    "观影",
    "聚餐"
  ],

  "riskLevel": 2,

  "favoriteCount": 0,

  "viewCount": 0,

  "recordCount": 0,

  "createdAt": "",
  "updatedAt": ""
}
```

riskLevel

1 = 低

2 = 中

3 = 高

---

# 4. drink_tags（标签表）

```json
{
  "_id": "",

  "name": "微醺",

  "type": "status"
}
```

type

status

taste

scene

style

---

# 5. ingredients（DIY原料表）

用户只能从这里选

不能自由输入

```json
{
  "_id": "",

  "name": "可乐",

  "category": "饮料",

  "imageUrl": "",

  "enabled": true,

  "createdAt": ""
}
```

初始原料

- 柠檬

- 薄荷

- 可乐

- 雪碧

- 苏打水

- 青柠

- 橙汁

- 冰块

---

# 6. recipes（DIY酒谱表）

核心UGC表

```json
{
  "_id": "",

  "userId": "",

  "recipeName": "深夜程序员",

  "baseDrinkId": "",

  "ingredientIds": [],

  "description": "",

  "coverImage": "",

  "status": "approved",

  "viewCount": 0,

  "likeCount": 0,

  "favoriteCount": 0,

  "createdAt": "",

  "updatedAt": ""
}
```

status

pending

approved

rejected

hidden

---

# 7. recipe_likes（点赞表）

```json
{
  "_id": "",

  "recipeId": "",

  "userId": "",

  "createdAt": ""
}
```

联合唯一索引

recipeId + userId

---

# 8. recipe_favorites（酒谱收藏）

```json
{
  "_id": "",

  "recipeId": "",

  "userId": "",

  "createdAt": ""
}
```

---

# 9. drink_records（品鉴记录）

核心功能表

```json
{
  "_id": "",

  "userId": "",

  "drinkId": "",

  "rating": 5,

  "scene": "聚会",

  "note": "口感不错",

  "createdAt": ""
}
```

rating

1~5

---

# 10. user_favorites（酒品收藏）

```json
{
  "_id": "",

  "userId": "",

  "drinkId": "",

  "createdAt": ""
}
```

---

# 11. achievement_definitions（成就定义）

系统初始化

```json
{
  "_id": "",

  "name": "微醺新人",

  "icon": "",

  "description": "记录第一种酒",

  "conditionType": "drink_record",

  "conditionValue": 1,

  "sort": 1
}
```

---

# 12. user_achievements（用户成就）

```json
{
  "_id": "",

  "userId": "",

  "achievementId": "",

  "unlockedAt": ""
}
```

---

# 13. recommend_logs（推荐记录）

记录首页推荐

```json
{
  "_id": "",

  "userId": "",

  "drinkId": "",

  "recommendType": "random",

  "createdAt": ""
}
```

recommendType

random

daily

mood

party

---

# 14. system_configs（系统配置）

```json
{
  "_id": "",

  "configKey": "safety_notice",

  "configValue": "适量饮酒..."
}
```

---

# 15. report_records（举报记录）

审核模块

```json
{
  "_id": "",

  "targetType": "recipe",

  "targetId": "",

  "userId": "",

  "reason": "违规内容",

  "status": "pending",

  "createdAt": ""
}
```

status

pending

processing

resolved

---

# 索引设计

users

openid

唯一索引

---

drinks

categoryId

abv

favoriteCount

recordCount

---

recipes

status

likeCount

favoriteCount

createdAt

---

drink_records

userId

drinkId

createdAt

---

user_achievements

userId

achievementId

唯一索引

---

# 初始数据规模

drinks

约 300 ~ 500 条

ingredients

约 30 条

achievements

约 50 条

recipes

用户生成

无限增长

---

# 数据安全策略

所有用户内容发布前：

1. 敏感词检测

2. 微信内容安全审核

3. 图片安全审核

4. 人工处理举报内容

禁止：

- 药物混酒

- 危险配方

- 色情内容

- 赌博内容

- 未成年人饮酒内容

- 挑战类饮酒内容

审核不通过直接隐藏
