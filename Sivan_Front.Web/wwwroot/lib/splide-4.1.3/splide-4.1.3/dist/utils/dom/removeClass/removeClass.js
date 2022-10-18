import { toggleClass } from '../toggleClass/toggleClass';
/**
 * Removes classes from the element.
 *
 * @param elm     - An element to remove classes from.
 * @param classes - Classes to remove.
 */
export function removeClass(elm, classes) {
    toggleClass(elm, classes, false);
}
//# sourceMappingURL=../../../../src/js/utils/dom/removeClass/removeClass.js.map