/**
 * Checks if the array includes the value or not.
 * `Array#includes` is not supported by IE.
 *
 * @param array - An array.
 * @param value - A value to search for.
 *
 * @return `true` if the array includes the value, or otherwise `false`.
 */
export function includes(array, value) {
    return array.indexOf(value) > -1;
}
//# sourceMappingURL=../../../../src/js/utils/array/includes/includes.js.map