/**
 * Call the `preventDefault()` of the provided event.
 *
 * @param e               - An Event object.
 * @param stopPropagation - Optional. Whether to stop the event propagation or not.
 */
export function prevent(e, stopPropagation) {
    e.preventDefault();
    if (stopPropagation) {
        e.stopPropagation();
        e.stopImmediatePropagation();
    }
}
//# sourceMappingURL=../../../../src/js/utils/dom/prevent/prevent.js.map