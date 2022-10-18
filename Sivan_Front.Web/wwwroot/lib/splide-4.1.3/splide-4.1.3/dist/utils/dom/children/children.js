import { slice } from '../../arrayLike';
import { matches } from '../matches/matches';
/**
 * Finds children that has the specified tag or class name.
 *
 * @param parent   - A parent element.
 * @param selector - Optional. A selector to filter children.
 *
 * @return An array with filtered children.
 */
export function children(parent, selector) {
    const children = parent ? slice(parent.children) : [];
    return selector ? children.filter(child => matches(child, selector)) : children;
}
//# sourceMappingURL=../../../../src/js/utils/dom/children/children.js.map