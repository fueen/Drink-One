Component({
  properties: {
    status: {
      type: Object,
      value: {}
    }
  },
  methods: {
    handleTap() {
      this.triggerEvent("tapstatus", this.properties.status);
    }
  }
});
