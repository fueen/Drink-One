const recordService = require("../../services/records");
const drinkService = require("../../services/drinks");

const fallbackRecordData = {
  scenes: ["独处", "餐后", "聚会", "其他"],
  stars: [1, 2, 3, 4, 5],
  drink: {
    name: "角瓶威士忌",
    englishName: "Suntory Kakubin",
    abv: "40%vol",
    image: "/assets/drinks/kakubin.png"
  }
};

Page({
  data: {
    drinkId: "",
    rating: 4,
    scene: "独处",
    note: "",
    scenes: fallbackRecordData.scenes,
    stars: fallbackRecordData.stars,
    drink: fallbackRecordData.drink
  },
  onLoad(options) {
    if (options && options.id) {
      this.setData({ drinkId: options.id });
      this.loadDrinkInfo(options.id);
    }
  },
  async loadDrinkInfo(drinkId) {
    try {
      const result = await drinkService.getDrinkDetail(drinkId);
      if (result.drink) {
        this.setData({ drink: result.drink });
      }
    } catch (error) {
      // keep fallback drink info
    }
  },
  setRating(e) {
    const rating = e.currentTarget.dataset.index + 1;
    this.setData({ rating });
  },
  selectScene(e) {
    const scene = e.currentTarget.dataset.scene;
    this.setData({ scene });
  },
  onNoteInput(e) {
    this.setData({ note: e.detail.value });
  },
  async saveRecord() {
    if (!this.data.drinkId) {
      wx.showToast({ title: "缺少酒品信息", icon: "none" });
      return;
    }

    try {
      await recordService.saveDrinkRecord({
        drinkId: this.data.drinkId,
        rating: this.data.rating,
        scene: this.data.scene,
        note: this.data.note
      });
      wx.showToast({ title: "已保存" });
    } catch (error) {
      wx.showToast({ title: error.message || "保存失败", icon: "none" });
    }
  }
});
