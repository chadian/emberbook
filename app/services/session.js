import Service from '@ember/service';
import { inject as service } from "@ember/service";

export default Service.extend({
  isAuthenticated: false,
  paperToaster: service(),

  logout(message) {
    message = message || 'You are now logged out';
    this.get('paperToaster').show(message);
    this.set('isAuthenticated', false);
  },

  login() {
    this.set('isAuthenticated', true);
  }
});
