import { forEach } from '../../array';
/**
 * Toggles the provided class or classes by following the `add` boolean.
 *
 * @param elm     - An element whose classes are toggled.
 * @param classes - A class or class names.
 * @param add     - Whether to add or remove a class.
 */
export function toggleClass(elm, classes, add) {
    if (elm) {
        forEach(classes, name => {
            if (name) {
                elm.classList[add ? 'add' : 'remove'](name);
            }
        });
    }
}
//# sourceMappingURL=../../../../src/js/utils/dom/toggleClass/toggleClass.js.map