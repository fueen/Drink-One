Component({
  properties: {
    drink: {
      type: Object,
      value: {}
    }
  },
  methods: {
    handleTap() {
      this.triggerEvent("tapdrink", this.properties.drink);
    }
  }
});
