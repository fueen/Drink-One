const libraryImages = [
  "/assets/ui-v3/library-bottle-1.png",
  "/assets/ui-v3/library-bottle-2.png",
  "/assets/ui-v3/library-bottle-3.png",
  "/assets/ui-v3/library-bottle-4.png",
  "/assets/ui-v3/library-bottle-5.png",
  "/assets/ui-v3/library-bottle-6.png"
];

const recipeCovers = [
  "/assets/ui-v3/home-recipe-1.png",
  "/assets/ui-v3/home-recipe-2.png"
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
    return "/assets/ui-v3/modal-kakubin.png";
  }

  if (scene === "detail") {
    return "/assets/ui-v3/detail-macallan.png";
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
