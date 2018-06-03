import { helper } from '@ember/component/helper';
import { get } from '@ember/object';

export function callWith([ref, lookup, ...args]) {
  return get(ref, lookup).call(ref, ...args);
}

export default helper(callWith);
