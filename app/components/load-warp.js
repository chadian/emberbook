import Component from '@ember/component';
import { computed } from '@ember/object';
import { task } from 'ember-concurrency';

export default Component.extend({
  model: null,
  resolved: null,
  cached: null,
  threshold: 0,

  _cachedMode: null,

  init() {
    this._super(...arguments);
    this.load();
  },

  _reset() {
    this.set('resolved', null);
  },

  didReceiveAttrs() {
    if (this.get('model') !== this.get('_cachedModel')) {
      this.set("_cachedModel", this.get("model"));
      this.load();
    }
  },

  _foreverPromise: new Promise(() => {}),

  warpedPromise: computed('resolved', '_cachedModel', function() {
    let resolved = this.get('resolved');
    let cached = this.get('_cachedModel');

    return Promise.resolve(resolved || cached);
  }),

  load() {
    this.get("loadTask").perform();
  },

  loadTask: task(function * () {
    let model = this.get('_cachedModel');
    let resolved = yield Promise.resolve(model);

    this.set('resolved', resolved);
  })
});
