import { forEach } from '../../array';
/**
 * Appends children to the parent element.
 *
 * @param parent   - A parent element.
 * @param children - A child or children to append to the parent.
 */
export function append(parent, children) {
    forEach(children, parent.appendChild.bind(parent));
}
//# sourceMappingURL=../../../../src/js/utils/dom/append/append.js.map