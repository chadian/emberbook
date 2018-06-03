import Controller from '@ember/controller';
import { computed } from '@ember/object';

const FIRST_PAGE = 1;
const DEFAULT_PAGE_TO_LOAD = FIRST_PAGE;

export default Controller.extend({
  queryParams: ["page"],
  page: DEFAULT_PAGE_TO_LOAD,
  currentPageNumber: computed("page", function() {
    return Number(this.get("page"));
  }),

  actions: {
    goToPage(pageNumber) {
      if (pageNumber <= FIRST_PAGE) {
        pageNumber = FIRST_PAGE;
      }

      this.set("page", pageNumber);
    }
  }
});
