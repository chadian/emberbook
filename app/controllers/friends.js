import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

const FIRST_PAGE = 1;
const DEFAULT_PAGE_TO_LOAD = FIRST_PAGE;

import QueryParams from "ember-parachute";

export const FriendsQueryParams = new QueryParams({
  page: {
    defaultValue: DEFAULT_PAGE_TO_LOAD,
    refresh: true,
    replace: true
  }
});

export default Controller.extend(FriendsQueryParams.Mixin, {
  friends: service(),

  setup({ queryParams }) {
    this.fetchModel(queryParams.page);
  },

  queryParamsDidChange({ shouldRefresh, queryParams}) {
    if (shouldRefresh) {
      this.fetchModel(queryParams.page);
    }
  },

  model: null,
  fetchModel(page) {
    return this.set("model", this.get("friends").fetchFriendsPage(page));
  },

  goToPage(page) {
    if (page <= FIRST_PAGE) {
      page = FIRST_PAGE;
    }
    this.set("page", page);
  }
});
