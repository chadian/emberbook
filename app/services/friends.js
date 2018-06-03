import Service from '@ember/service';
import { computed } from '@ember/object';
import { timeout } from "ember-concurrency";
import data from './friends/data';

const DATA = data.map((data, i) => ({ ...data, id: i.toString(), favourite: false }));

let _STORE = {};
let useCache = false;
function cache(fn) {
  let store = _STORE;
  let fnKey = fn.toString();
  let fnStore = (store[fnKey] = store[fnKey] || {});

  return function() {
    return !useCache ? fn.call(this, ...arguments) :
      fnStore[[...arguments].toString()]
        ? fnStore[[...arguments].toString()]
        : fn.call(this, ...arguments).then(
          result => fnStore[[...arguments].toString()] = result
        )
  }
}

const fauxRequest = (value, lower=0, upper=1000) => timeout(
  Math.floor(Math.random() * (upper - lower)) + lower
).then(() => value);

export default Service.extend({
  responseTimeLower: 500,
  responseTimeUpper: 1500,

  fetchFriend(id) {
    let friend = DATA
      .filter(friend => friend.id === id)
      .pop();

    return fauxRequest(friend, this.get('responseTimeLower'), this.get('responseTimeUpper'));
  },

  fetchFriendsAll() {
    let friends = DATA.map(({ id, name, tags, image }) => ({ id, name, tags, image }));
    return fauxRequest(friends, this.get('responseTimeLower'), this.get('responseTimeUpper'));
  },

  fetchFriendsPage: cache(function(pageNumber) {
    return this.fetchFriendsAll().then((friends) => {
      let pageSize = 4;
      let start = Math.max((pageNumber - 1), 0) * pageSize;
      let end = start + pageSize;
      return friends.slice(start, end);
    });
  }),

  saveFavourite(id) {
    let friend = DATA.filter(friend => friend.id === id)
      .pop();

    friend.favourite = true;

    return fauxRequest(friend, this.get('responseTimeLower'), this.get('responseTimeUpper'));
  },

  _clearCache() {
    let store = this.get('_STORE');
    Object.keys(store).forEach(fnKey => {
      let fnStore = store[fnKey];
      Object.keys(fnStore).forEach(cacheKey => delete fnStore[cacheKey])
    });
  },

  _STORE: computed({
    get() {
      return _STORE;
    }
  }),

  _useCache: computed({
    get() {
      return useCache;
    },

    set(key, value) {
      useCache = value;
      return useCache;
    }
  })
});
