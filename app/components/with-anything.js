import Component from '@ember/component';
import { getOwner } from '@ember/application';

const WithAnything = Component.extend({
  didReceiveAttrs() {
    this._super(...arguments);

    let owner = getOwner(this);
    let resolved = {};

    // eslint-disable-next-line ember/no-attrs-in-components
    Object.keys(this.attrs).forEach(attr => {
      let lookupPath = this.get(attr);
      resolved[attr] = owner.lookup(lookupPath);
    })

    this.set('resolved', resolved);
  }
});

export default WithAnything;
