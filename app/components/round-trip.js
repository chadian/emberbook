import Component from '@ember/component';
import { computed } from '@ember/object';
import { task } from 'ember-concurrency';

const roundTrip = function * () {
  let model = this.get('model');
  let resolved;

  this._resetState();
  this.get('onRunning')();

  try {
    resolved = yield typeof model === 'function' ? model() : model;
  } catch (e) {
    this.set('isFailure', true);
    this.set('error', e);
    this.get('onFailure')(e);
  }

  this.set('resolved', resolved);
}

const TRIP_MODIFIER_RESTARTABLE = 'restartable';
const TRIP_MODIFIER_DROP = 'drop';

export default Component.extend({
  model: null,
  modifier: TRIP_MODIFIER_RESTARTABLE,
  onFailure(error) { },
  onRunning() { },

  startTrip() {
    let trip = this.get('trip');

    if (!trip) {
      throw new Error('Please use an appropriate modifier');
    }

    return trip.perform();
  },

  error: null,
  isFailure: false,

  didReceiveAttrs() {
    this.startTrip();
  },

  state: computed('isFailure', 'roundtrip.state', function() {
    return this.get('isFailure') ? 'error' : this.get('roundtrip.state');
  }),

  trip: computed('modifier', function() {
    return this.get(this.get('modifier'));
  }),

  // tasks keyed by their modifier
  [TRIP_MODIFIER_DROP]: task(roundTrip).drop(),
  [TRIP_MODIFIER_RESTARTABLE]: task(roundTrip).drop(),

  _resetState() {
    this.set('isFailure', false);
    this.set('error', null);
  }
});
