import Service from '@ember/service';
import { inject as service } from "@ember/service";

export default Service.extend({
  isAuthenticated: true,
  paperToaster: service(),

  logout(message) {
    message = message || 'you will be logged out now';
    this.get('paperToaster').show(message);
    this.set('isAuthenticated', false);
  },

  login() {
    this.set('isAuthenticated', true);
  }
});
