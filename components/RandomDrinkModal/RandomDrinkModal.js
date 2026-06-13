Component({
  properties: {
    visible: {
      type: Boolean,
      value: false
    },
    drink: {
      type: Object,
      value: {},
      observer(value) {
        this.setData({ displayDrink: this.normalizeDrink(value) });
      }
    },
    loading: {
      type: Boolean,
      value: false
    },
    drawing: {
      type: Boolean,
      value: false
    },
    progress: {
      type: Number,
      value: 0
    }
  },
  data: {
    displayDrink: {
      image: "/assets/drinks/kakubin.png",
      name: "麦卡伦 12年",
      englishName: "Macallan 12 Years Old",
      abv: "40%vol",
      tags: ["香草", "蜂蜜", "果干"],
      description: "经典雪莉桶风格，口感圆润顺滑，带有香草、蜂蜜与果干的味道。"
    }
  },
  methods: {
    normalizeDrink(drink = {}) {
      return {
        image: drink.image || drink.imageUrl || "/assets/drinks/kakubin.png",
        name: drink.name || "麦卡伦 12年",
        englishName: drink.englishName || "Macallan 12 Years Old",
        abv: drink.abv || "40%vol",
        tags: drink.tags || drink.tasteTags || ["香草", "蜂蜜", "果干"],
        description: drink.note || drink.description || "经典雪莉桶风格，口感圆润顺滑，带有香草、蜂蜜与果干的味道。"
      };
    },
    close() {
      this.triggerEvent("close");
    },
    viewDetail() {
      this.triggerEvent("viewdetail");
    },
    tryAnother() {
      this.triggerEvent("tryanother");
    },
    noop() {}
  }
});
