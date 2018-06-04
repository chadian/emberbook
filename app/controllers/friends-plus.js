import FriendsController from './friends';
import { task } from 'ember-concurrency';
import { inject as service } from '@ember/service';

export default FriendsController.extend({
  _warpThreshold: 0,
  router: service(),

  cacheThenTransition: task(function * (id) {
    yield timeout(5000);
    console.log('finally loaded', id);
    this.get('router').transitionTo('index');
  }).restartable(),

  actions: {
    transitionToFriend(id) {
      return this.get("cacheThenTransition").perform(id);
    }
  }
});
