import { slice } from '../../arrayLike';
import { forOwn } from '../forOwn/forOwn';
/**
 * Assigns all own enumerable properties of all source objects to the provided object.
 *
 * @param object - An object to assign properties to.
 *
 * @return An object assigned properties of the sources to.
 */
export function assign(object) {
    // eslint-disable-next-line prefer-rest-params, prefer-spread
    slice(arguments, 1).forEach(source => {
        forOwn(source, (value, key) => {
            object[key] = source[key];
        });
    });
    return object;
}
//# sourceMappingURL=../../../../src/js/utils/object/assign/assign.js.map