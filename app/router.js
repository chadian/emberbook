import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('friends');
  this.route('classical-friends');
  this.route('friends-plus');
  this.route('friends-details', { path: '/friends/:friend_id' });
});

export default Router;
