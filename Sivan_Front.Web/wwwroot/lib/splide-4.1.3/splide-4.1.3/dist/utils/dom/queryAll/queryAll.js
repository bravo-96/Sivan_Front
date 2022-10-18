import { slice } from '../../arrayLike';
/**
 * Returns elements that match the provided selector.
 *
 * @param parent   - A parent element to start searching from.
 * @param selector - A selector to query.
 *
 * @return An array with matched elements.
 */
export function queryAll(parent, selector) {
    return selector ? slice(parent.querySelectorAll(selector)) : [];
}
//# sourceMappingURL=../../../../src/js/utils/dom/queryAll/queryAll.js.map