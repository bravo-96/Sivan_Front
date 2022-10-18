import { isHTMLElement } from '../../type/type';
/**
 * Checks if the element can be selected by the provided selector or not.
 *
 * @param elm      - An element to check.
 * @param selector - A selector to test.
 *
 * @return `true` if the selector matches the element, or otherwise `false`.
 */
export function matches(elm, selector) {
    return isHTMLElement(elm) && (elm['msMatchesSelector'] || elm.matches).call(elm, selector);
}
//# sourceMappingURL=../../../../src/js/utils/dom/matches/matches.js.map