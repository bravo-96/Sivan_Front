/**
 * Focuses the provided element without scrolling the ascendant element.
 *
 * @param elm - An element to focus.
 */
export function focus(elm) {
    elm['setActive'] && elm['setActive']() || elm.focus({ preventScroll: true });
}
//# sourceMappingURL=../../../../src/js/utils/dom/focus/focus.js.map