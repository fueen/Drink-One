Component({
  properties: {
    recipe: {
      type: Object,
      value: {}
    }
  },
  methods: {
    handleTap() {
      this.triggerEvent("taprecipe", this.properties.recipe);
    }
  }
});
