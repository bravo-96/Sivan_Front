import { isArray } from '../../type/type';
/**
 * Push the provided value to an array if the value is not an array.
 *
 * @param value - A value to push.
 *
 * @return An array containing the value, or the value itself if it is already an array.
 */
export function toArray(value) {
    return isArray(value) ? value : [value];
}
//# sourceMappingURL=../../../../src/js/utils/array/toArray/toArray.js.map