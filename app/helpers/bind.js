import { helper } from '@ember/component/helper';
import { get } from '@ember/object';

export function bind([ref, lookup, ...args], { arity }) {
  return function() {
    let combinedArgs = [...args, ...arguments];

    if (Number.isInteger(arity)) {
      combinedArgs = combinedArgs.slice(0, arity);
    }

    return get(ref, lookup).call(ref, ...combinedArgs);
  };
}

export default helper(bind);
