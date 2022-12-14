import { forEach } from '../../array';
/**
 * Inserts a node or nodes before the specified reference node.
 *
 * @param nodes - A node or nodes to insert.
 * @param ref   - A reference node.
 */
export function before(nodes, ref) {
    forEach(nodes, node => {
        const parent = (ref || node).parentNode;
        if (parent) {
            parent.insertBefore(node, ref);
        }
    });
}
//# sourceMappingURL=../../../../src/js/utils/dom/before/before.js.map