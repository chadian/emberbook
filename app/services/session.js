import Service from '@ember/service';

export default Service.extend({
  isAuthenticated: true,

  logout() {
    this.set('isAuthenticated', false);
    this.set('isAdmin', false);
  }
});
