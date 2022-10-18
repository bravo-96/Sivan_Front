import { forEach } from '../../array';
/**
 * Removes attributes from the element.
 *
 * @param elms  - An element or elements.
 * @param attrs - An attribute or attributes to remove.
 */
export function removeAttribute(elms, attrs) {
    forEach(elms, elm => {
        forEach(attrs, attr => {
            elm && elm.removeAttribute(attr);
        });
    });
}
//# sourceMappingURL=../../../../src/js/utils/dom/removeAttribute/removeAttribute.js.map