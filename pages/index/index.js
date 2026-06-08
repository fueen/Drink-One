Page({
  data: {
    moods: [
      { icon: "😌", name: "微醺" },
      { icon: "🍻", name: "小醉" },
      { icon: "🥃", name: "大醉" },
      { icon: "🎉", name: "聚会" }
    ],
    dailyDrink: {
      name: "角瓶威士忌",
      englishName: "Suntory Kakubin",
      image: "/assets/drinks/kakubin.png",
      abv: "40%vol",
      tags: ["香草", "琥珀", "小酌"],
      note: "非泥煤思路的轻快威士忌，适合搭配苏打做成清爽嗨棒。"
    }
  },
  goMood() {
    wx.navigateTo({ url: "/pages/mood/mood" });
  },
  goDetail() {
    wx.navigateTo({ url: "/pages/detail/detail" });
  }
});
