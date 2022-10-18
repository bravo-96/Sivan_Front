import { toArray } from '../toArray/toArray';
/**
 * The extended `Array#forEach` method that accepts a single value as an argument.
 *
 * @param values   - A value or values to iterate over.
 * @param iteratee - An iteratee function.
 */
export function forEach(values, iteratee) {
    toArray(values).forEach(iteratee);
}
//# sourceMappingURL=../../../../src/js/utils/array/forEach/forEach.js.map