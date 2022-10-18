import { isString } from '../../type/type';
import { toggleClass } from '../toggleClass/toggleClass';
/**
 * Adds classes to the element.
 *
 * @param elm     - An element to add classes to.
 * @param classes - Classes to add.
 */
export function addClass(elm, classes) {
    toggleClass(elm, isString(classes) ? classes.split(' ') : classes, true);
}
//# sourceMappingURL=../../../../src/js/utils/dom/addClass/addClass.js.map