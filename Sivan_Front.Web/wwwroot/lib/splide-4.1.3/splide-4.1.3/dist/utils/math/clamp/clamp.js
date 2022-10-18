import { max, min } from '../math/math';
/**
 * Clamps a number.
 *
 * @param number - A subject number to check.
 * @param x      - A min or max number.
 * @param y      - A min or max number.
 *
 * @return A clamped number.
 */
export function clamp(number, x, y) {
    const minimum = min(x, y);
    const maximum = max(x, y);
    return min(max(minimum, number), maximum);
}
//# sourceMappingURL=../../../../src/js/utils/math/clamp/clamp.js.map