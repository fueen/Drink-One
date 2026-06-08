Component({
  properties: {
    drink: {
      type: Object,
      value: {}
    },
    variant: {
      type: String,
      value: "default"
    },
    showNote: {
      type: Boolean,
      value: true
    },
    metaPrefix: {
      type: String,
      value: "酒精度："
    }
  },
  methods: {
    handleTap() {
      this.triggerEvent("tapdrink", this.properties.drink);
    }
  }
});
