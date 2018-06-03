import Route from '@ember/routing/route';
import { inject as service } from "@ember/service";

export default Route.extend({
  friends: service(),

  queryParams: {
    page: {
      refreshModel: true
    }
  },

  model({ page }) {
    return this.get("friends").fetchFriendsPage(page);
  },
});
