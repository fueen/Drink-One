Page({
  data: {
    steps: ["基酒", "配料", "命名"],
    activeStep: 0,
    categories: ["威士忌", "伏特加", "金酒", "朗姆酒", "龙舌兰"],
    baseDrinks: [
      { name: "角瓶威士忌", image: "/assets/drinks/kakubin.png" },
      { name: "Jack Daniel's", image: "/assets/drinks/beer-red.png" },
      { name: "芝华士12年", image: "/assets/drinks/beer-yellow.png" },
      { name: "祖兰草莓12年", image: "/assets/drinks/beer-green.png" }
    ]
  }
});
