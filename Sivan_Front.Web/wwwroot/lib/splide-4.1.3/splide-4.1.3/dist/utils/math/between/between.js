import { max, min } from '../math/math';
/**
 * Checks if the subject number is between `x` and `y`.
 *
 * @param number    - A subject number to check.
 * @param x         - A min or max number.
 * @param y         - A max or min number.
 * @param exclusive - Optional. Whether to exclude `x` or `y`.
 */
export function between(number, x, y, exclusive) {
    const minimum = min(x, y);
    const maximum = max(x, y);
    return exclusive
        ? minimum < number && number < maximum
        : minimum <= number && number <= maximum;
}
//# sourceMappingURL=../../../../src/js/utils/math/between/between.js.map