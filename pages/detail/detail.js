Page({
  data: {
    drink: {
      name: "角瓶威士忌",
      englishName: "Suntory Kakubin",
      image: "/assets/drinks/kakubin.png",
      abv: "40",
      category: "威士忌",
      country: "日本",
      tags: ["香草", "蜂蜜", "柑橘", "顺滑"],
      scenes: ["独处", "聚会", "餐后", "送礼"]
    }
  },
  goRecord() {
    wx.navigateTo({ url: "/pages/record/record" });
  }
});
