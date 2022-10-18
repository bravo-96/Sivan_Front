import { toArray } from '../toArray/toArray';
/**
 * Extended `Array#push()` that accepts an item or an array with items.
 *
 * @param array - An array to push items.
 * @param items - An item or items to push.
 *
 * @return A provided array itself.
 */
export function push(array, items) {
    array.push(...toArray(items));
    return array;
}
//# sourceMappingURL=../../../../src/js/utils/array/push/push.js.map