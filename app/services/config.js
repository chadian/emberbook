import Service from '@ember/service';
import { get } from '@ember/object';
import config from 'emberliners-data-flow/config/environment';

export default Service.extend({
  unknownProperty(key) {
    return get(config, key);
  }
});
