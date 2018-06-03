import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | classical-friends', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:classical-friends');
    assert.ok(route);
  });
});
