import { ARROW_DOWN, ARROW_LEFT, ARROW_RIGHT, ARROW_UP } from '../../constants/arrows';
import { RTL, TTB } from '../../constants/directions';
/**
 * The translation map for directions.
 *
 * @since 3.0.0
 */
export const ORIENTATION_MAP = {
    width: ['height'],
    left: ['top', 'right'],
    right: ['bottom', 'left'],
    x: ['y'],
    X: ['Y'],
    Y: ['X'],
    ArrowLeft: [ARROW_UP, ARROW_RIGHT],
    ArrowRight: [ARROW_DOWN, ARROW_LEFT],
};
/**
 * The component that absorbs the difference among directions.
 *
 * @since 3.0.0
 *
 * @param Splide     - A Splide instance.
 * @param Components - A collection of components.
 * @param options    - Options.
 *
 * @return A Direction component object.
 */
export function Direction(Splide, Components, options) {
    /**
     * Resolves the provided property name.
     *
     * @param prop      - A property name to translate.
     * @param axisOnly  - Optional. If `ture`, returns the same property for LTR and RTL.
     * @param direction - Optional. Specify the direction. The default value is the `direction` option.
     */
    function resolve(prop, axisOnly, direction) {
        direction = direction || options.direction;
        const index = direction === RTL && !axisOnly ? 1 : direction === TTB ? 0 : -1;
        return ORIENTATION_MAP[prop] && ORIENTATION_MAP[prop][index]
            || prop.replace(/width|left|right/i, (match, offset) => {
                const replacement = ORIENTATION_MAP[match.toLowerCase()][index] || match;
                return offset > 0 ? replacement.charAt(0).toUpperCase() + replacement.slice(1) : replacement;
            });
    }
    /**
     * Orients the value towards the current direction.
     *
     * @param value - A value to orient.
     *
     * @return The oriented value.
     */
    function orient(value) {
        return value * (options.direction === RTL ? 1 : -1);
    }
    return {
        resolve,
        orient,
    };
}
//# sourceMappingURL=../../../src/js/components/Direction/Direction.js.map