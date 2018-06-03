import Component from '@ember/component';
import { task, timeout } from "ember-concurrency";

export default Component.extend({
  timeout: 0,

  init() {
    this._super(...arguments);
    this.perform();
  },

  perform() {
    this.get('delayTask').perform();
  },

  delayTask: task(function * () {
    let waitTime = Number(this.get("timeout"))
    yield timeout(waitTime);
  }).drop()
});
