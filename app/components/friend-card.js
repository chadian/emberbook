import Component from '@ember/component';
import { readOnly } from '@ember/object/computed';

export default Component.extend({
  loadingTask: null,
  isLoading: readOnly('loadingTask.isRunning'),

  actions: {
    onClick() {
      const task = this.get('onDetailsClick')();
      this.set('loadingTask', task);
    }
  },

  willDestroy() {
    this._super();
    let loadingTask = this.get('loadingTask');

    if (loadingTask && loadingTask.cancel) {
      loadingTask.cancel();
    }
  }
});
