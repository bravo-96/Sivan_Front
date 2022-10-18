/**
 * Returns an element that matches the provided selector.
 *
 * @param parent   - A parent element to start searching from.
 * @param selector - A selector to query.
 *
 * @return A found element or `null`.
 */
export function query(parent, selector) {
    return parent && parent.querySelector(selector);
}
//# sourceMappingURL=../../../../src/js/utils/dom/query/query.js.map