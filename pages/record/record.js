const recordService = require("../../services/records");
const drinkService = require("../../services/drinks");
const { getFriendlyErrorMessage } = require("../../services/cloud");
const { resolveDrinkImage } = require("../../utils/ui-v3-assets");

const fallbackRecordData = {
  scenes: ["独酌", "聚会", "约会", "庆祝", "其他"],
  tasteTags: ["香草", "蜂蜜", "橡木", "果香", "辛辣"],
  stars: [1, 2, 3, 4, 5],
  drink: {
    name: "角瓶威士忌",
    englishName: "Suntory Kakubin",
    abv: "40%vol",
    image: "/assets/ui-v3/detail-macallan.png"
  }
};

Page({
  data: {
    recordId: "",
    drinkId: "drink_kakubin",
    rating: 4,
    scene: "独处",
    taste: "蜂蜜",
    note: "",
    scenes: fallbackRecordData.scenes,
    tasteTags: fallbackRecordData.tasteTags,
    stars: fallbackRecordData.stars,
    drink: fallbackRecordData.drink
  },
  onLoad(options) {
    if (options && options.recordId) {
      this.setData({ recordId: options.recordId });
      this.loadRecord(options.recordId);
      return;
    }
    if (options && options.id) {
      this.setData({ drinkId: options.id });
      this.loadDrinkInfo(options.id);
    }
  },
  async loadRecord(recordId) {
    try {
      const result = await recordService.getDrinkRecords();
      const record = ((result && result.records) || []).find((item) => item._id === recordId);
      if (!record) {
        return;
      }
      this.setData({
        drinkId: record.drinkId,
        rating: record.rating,
        scene: record.scene,
        note: record.note || "",
        drink: record.drink ? { ...record.drink, image: resolveDrinkImage(record.drink, 0, "detail") } : fallbackRecordData.drink
      });
    } catch (error) {
      // Keep fallback form state.
    }
  },
  async loadDrinkInfo(drinkId) {
    try {
      const result = await drinkService.getDrinkDetail(drinkId);
      if (result.drink) {
        this.setData({ drink: { ...result.drink, image: resolveDrinkImage(result.drink, 0, "detail") } });
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
  selectTaste(e) {
    const taste = e.currentTarget.dataset.taste;
    this.setData({ taste });
  },
  onNoteInput(e) {
    this.setData({ note: e.detail.value });
  },
  async saveRecord() {
    if (!this.data.drinkId) {
      this.setData({ drinkId: "drink_kakubin" });
    }

    try {
      const payload = {
        drinkId: this.data.drinkId,
        rating: this.data.rating,
        scene: this.data.scene,
        note: this.data.note
      };
      if (this.data.recordId) {
        await recordService.updateDrinkRecord(this.data.recordId, payload);
      } else {
        await recordService.saveDrinkRecord(payload);
      }
      wx.showToast({ title: "已保存" });
    } catch (error) {
      wx.showToast({ title: getFriendlyErrorMessage(error, "保存失败，请稍后再试"), icon: "none" });
    }
  },
  async deleteRecord() {
    if (!this.data.recordId) {
      return;
    }
    try {
      await recordService.deleteDrinkRecord(this.data.recordId);
      wx.showToast({ title: "已删除" });
      wx.navigateBack();
    } catch (error) {
      wx.showToast({ title: getFriendlyErrorMessage(error, "删除失败，请稍后再试"), icon: "none" });
    }
  }
});
