import { slice } from '../slice/slice';
/**
 * The find method for an array or array-like object, works in IE.
 * This method is not performant for a huge array.
 *
 * @param arrayLike - An array-like object.
 * @param predicate - The predicate function to test each element in the object.
 *
 * @return A found value if available, or otherwise `undefined`.
 */
export function find(arrayLike, predicate) {
    return slice(arrayLike).filter(predicate)[0];
}
//# sourceMappingURL=../../../../src/js/utils/arrayLike/find/find.js.map