import FriendsController from './friends';
import { task } from 'ember-concurrency';
import { inject as service } from '@ember/service';

export default FriendsController.extend({
  _warpThreshold: 0,
  router: service(),
  friends: service(),

  cacheThenTransition: task(function * (id) {
    yield this.get('friends').fetchFriend(id);
    this.get('router').transitionTo('friends-details', id);
  }).restartable(),

  actions: {
    transitionToFriend(id) {
      return this.get("cacheThenTransition").perform(id);
    }
  }
});
