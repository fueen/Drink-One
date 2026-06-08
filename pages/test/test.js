Page({
  data: {
    fields: [
      { label: "性别", value: "男" },
      { label: "体重", value: "65 kg" },
      { label: "饮酒频率", value: "每周 1-2 次" },
      { label: "平均酒量", value: "2-3 杯鸡尾酒" }
    ]
  },
  selectField(e) {
    const index = e.currentTarget.dataset.index;
    wx.showToast({ title: `请选择: ${this.data.fields[index].label}`, icon: "none" });
  },
  startTest() {
    wx.showToast({ title: "分析中...", icon: "none" });
  }
});
