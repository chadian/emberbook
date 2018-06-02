import Component from '@ember/component';
import { computed } from '@ember/object';
import { task } from 'ember-concurrency';

export default Component.extend({
  model: null,
  resolved: null,
  cached: null,
  timeout: 0,

  init() {
    this._super(...arguments);
    this.load();
  },

  _reset() {
    this.set('resolved', null);
  },

  didReceiveAttrs() {
    this.load();
    this.rerender();
  },

  _foreverPromise: new Promise(() => {}),

  warpedPromise: computed('resolved', 'cached', function() {
    let resolved = this.get('resolved');
    let cached = this.get('cached');

    return Promise.resolve(resolved || cached);
  }),

  load() {
    this.get("loadTask").perform();
  },

  loadTask: task(function * () {
    let model = this.get('model');
    let resolved = yield Promise.resolve(model);

    this.set('resolved', resolved);
  })
});
