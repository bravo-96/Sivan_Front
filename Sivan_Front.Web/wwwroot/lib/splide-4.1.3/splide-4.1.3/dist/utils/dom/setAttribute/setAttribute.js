import { forEach } from '../../array';
import { forOwn } from '../../object';
import { isNull, isObject } from '../../type/type';
import { removeAttribute } from '../removeAttribute/removeAttribute';
/**
 * Sets attribute/attributes to the element or elements.
 * If the value is `null` or an empty string, the attribute will be removed.
 *
 * @param elms  - An element or an array with elements.
 * @param attrs - An attribute name of an object with pairs of a name and a value.
 * @param value - A value to set.
 */
export function setAttribute(elms, attrs, value) {
    if (isObject(attrs)) {
        forOwn(attrs, (value, name) => {
            setAttribute(elms, name, value);
        });
    }
    else {
        forEach(elms, elm => {
            isNull(value) || value === '' ? removeAttribute(elm, attrs) : elm.setAttribute(attrs, String(value));
        });
    }
}
//# sourceMappingURL=../../../../src/js/utils/dom/setAttribute/setAttribute.js.map