import { isString } from '../../type/type';
import { addClass } from '../addClass/addClass';
import { append } from '../append/append';
import { setAttribute } from '../setAttribute/setAttribute';
/**
 * Creates a HTML element.
 *
 * @param tag    - A tag name.
 * @param attrs  - Optional. An object with attributes to apply the created element to, or a string with classes.
 * @param parent - Optional. A parent element where the created element is appended.
 */
export function create(tag, attrs, parent) {
    const elm = document.createElement(tag);
    if (attrs) {
        isString(attrs) ? addClass(elm, attrs) : setAttribute(elm, attrs);
    }
    parent && append(parent, elm);
    return elm;
}
//# sourceMappingURL=../../../../src/js/utils/dom/create/create.js.map