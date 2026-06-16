const libraryImages = [
  "/assets/ui-v3/icons/bottle-whisky.svg",
  "/assets/ui-v3/icons/bottle-dark.svg",
  "/assets/ui-v3/icons/bottle-clear.svg",
  "/assets/ui-v3/icons/bottle-beer.svg",
  "/assets/ui-v3/icons/bottle-green.svg",
  "/assets/ui-v3/icons/bottle-cream.svg"
];

const recipeCovers = [
  "/assets/ui-v3/icons/recipe-citrus.svg",
  "/assets/ui-v3/icons/recipe-tea.svg"
];

function isV3Asset(image) {
  return typeof image === "string" && image.includes("/assets/ui-v3/");
}

function resolveDrinkImage(drink = {}, index = 0, scene = "library") {
  const image = drink.image || drink.imageUrl || "";
  if (isV3Asset(image)) {
    return image;
  }

  if (scene === "modal") {
    return "/assets/ui-v3/icons/bottle-hero.svg";
  }

  if (scene === "detail") {
    return "/assets/ui-v3/icons/bottle-hero.svg";
  }

  return libraryImages[index % libraryImages.length];
}

function resolveRecipeCover(recipe = {}, index = 0) {
  const cover = recipe.cover || recipe.coverImage || "";
  if (isV3Asset(cover)) {
    return cover;
  }
  return recipeCovers[index % recipeCovers.length];
}

module.exports = {
  resolveDrinkImage,
  resolveRecipeCover
};
