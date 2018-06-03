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
  }
});
