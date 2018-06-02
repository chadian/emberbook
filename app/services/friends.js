import Service from '@ember/service';
import data from './friends/data';
import { timeout } from "ember-concurrency";


const DATA = data.map((data, i) => ({ ...data, id: i.toString(), favourite: false }));

const fauxRequest = (value, lower=0, upper=1000) => timeout(
  Math.floor(Math.random() * (upper - lower)) + lower
).then(() => value);

export default Service.extend({
  responseTimeLower: 500,
  responseTimeUpper: 1500,

  fetchFriends() {
    let friends = DATA.map(({ id, name, tags, image }) => ({ id, name, tags, image }));
    return fauxRequest(friends, this.get('responseTimeLower'), this.get('responseTimeUpper'));
  },

  fetchFriend(id) {
    let friend = DATA
      .filter(friend => friend.id === id)
      .pop();

    return fauxRequest(friend, this.get('responseTimeLower'), this.get('responseTimeUpper'));
  },

  saveFavourite(id) {
    let friend = DATA.filter(friend => friend.id === id)
      .pop();

    friend.favourite = true;

    return fauxRequest(friend, this.get('responseTimeLower'), this.get('responseTimeUpper'));
  }
});
