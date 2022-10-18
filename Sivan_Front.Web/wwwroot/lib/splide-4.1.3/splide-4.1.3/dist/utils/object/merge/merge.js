import { slice } from '../../arrayLike';
import { isArray, isObject } from '../../type/type';
import { forOwn } from '../forOwn/forOwn';
/**
 * Recursively merges source properties to the object.
 * Be aware that this method does not merge arrays. They are just duplicated by `slice()`.
 *
 * @param object - An object to merge properties to.
 *
 * @return A new object with merged properties.
 */
export function merge(object) {
    // eslint-disable-next-line prefer-rest-params
    slice(arguments, 1).forEach(source => {
        forOwn(source, (value, key) => {
            if (isArray(value)) {
                object[key] = value.slice();
            }
            else if (isObject(value)) {
                object[key] = merge({}, isObject(object[key]) ? object[key] : {}, value);
            }
            else {
                object[key] = value;
            }
        });
    });
    return object;
}
//# sourceMappingURL=../../../../src/js/utils/object/merge/merge.js.map