import Component from '@ember/component';

export default Component.extend({
  isShown: false,
  actions: {
    toggleShown() {
      this.toggleProperty("isShown");
    }
  }
});
