import Service from '@ember/service';

export default Service.extend({
  isAuthenticated: true,

  logout(message) {
    message = message || 'you will be logged out now';
    alert(message);
    this.set('isAuthenticated', false);
  }
});
