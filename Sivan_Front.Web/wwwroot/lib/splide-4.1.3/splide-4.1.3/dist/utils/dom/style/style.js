import { isNull, isUndefined } from '../../type/type';
/**
 * Applies inline styles to the provided element by an object literal.
 *
 * @param elm   - An element to apply styles to.
 * @param prop  - An object literal with styles or a property name.
 * @param value - A value to set.
 */
export function style(elm, prop, value) {
    if (isUndefined(value)) {
        return getComputedStyle(elm)[prop];
    }
    if (!isNull(value)) {
        elm.style[prop] = `${value}`;
    }
}
//# sourceMappingURL=../../../../src/js/utils/dom/style/style.js.map