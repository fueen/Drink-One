# Seed Data

These JSON files are initial data for WeChat CloudBase MongoDB collections.

Import order:

1. `seed-data/categories.json` -> `drink_categories`
2. `seed-data/tags.json` -> `drink_tags`
3. `seed-data/ingredients.json` -> `ingredients`
4. `seed-data/achievements.json` -> `achievement_definitions`
5. `seed-data/drinks.sample.json` -> `drinks`

Notes:

- `drinks.sample.json` is a small development dataset for UI and recommendation wiring.
- Production seed data should expand `drinks` to the PRD target of 300-500 items.
- DIY recipe creation must only allow ingredients from the `ingredients` collection.
- After import, create the indexes described in `docs/Database Design.md`.

