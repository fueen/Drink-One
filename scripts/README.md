# Seed Data

These JSON files are initial data for WeChat CloudBase MongoDB collections.

Recommended setup:

1. Deploy the `cloudfunctions/initSeedData` cloud function.
2. Invoke `initSeedData` from WeChat DevTools with `{}`.
3. The function writes documents with `db.collection(...).doc(_id).set({ data })`.

This is preferred over manual console import because the CloudBase console import UI can be awkward for nested document data.

Import order:

1. `seed-data/categories.json` -> `drink_categories`
2. `seed-data/tags.json` -> `drink_tags`
3. `seed-data/ingredients.json` -> `ingredients`
4. `seed-data/achievements.json` -> `achievement_definitions`
5. `seed-data/drinks.sample.json` -> `drinks`
6. `seed-data/recipes.sample.json` -> `recipes`
7. `seed-data/system-configs.json` -> `system_configs`

Notes:

- Seed files include stable `_id` values so page buttons can pass IDs directly to cloud functions during local development.
- `drinks.sample.json` is a development dataset for UI and recommendation wiring.
- `recipes.sample.json` contains approved system recipes for the home recipe list and ranking page.
- `system-configs.json` contains safety notice and review policy copy.
- Production seed data should expand `drinks` to the PRD target of 300-500 items.
- DIY recipe creation must only allow ingredients from the `ingredients` collection.
- After import, create the indexes described in `docs/Database Design.md`.

To seed only one collection, call:

```json
{
  "collection": "drinks"
}
```

Supported collection names:

- `drink_categories`
- `drink_tags`
- `ingredients`
- `achievement_definitions`
- `drinks`
- `recipes`
- `system_configs`
