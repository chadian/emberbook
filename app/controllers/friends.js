import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

const FIRST_PAGE = 1;
const DEFAULT_PAGE_TO_LOAD = FIRST_PAGE;

export default Controller.extend({
  friends: service(),

  currentPage: null,

  init() {
    this._super();
    this.goToPage(DEFAULT_PAGE_TO_LOAD);
  },

  model: null,

  goToPage(page) {
    if (page <= FIRST_PAGE) {
      page = FIRST_PAGE;
    }
    this.set('currentPage', page);
    return this.set("model", this.get("friends").fetchFriendsPage(page));
  }
});
