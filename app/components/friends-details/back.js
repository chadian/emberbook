import Component from '@ember/component';

export default Component.extend({
  actions: {
    historyBack() {
      window.history.back();
    }
  }
});
