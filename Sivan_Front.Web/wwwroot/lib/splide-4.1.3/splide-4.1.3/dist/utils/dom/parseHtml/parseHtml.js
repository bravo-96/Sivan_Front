import { child } from '../child/child';
/**
 * Parses the provided HTML string and returns the first element.
 *
 * @param html - An HTML string to parse.
 *
 * @return An Element on success, or otherwise `undefined`.
 */
export function parseHtml(html) {
    return child(new DOMParser().parseFromString(html, 'text/html').body);
}
//# sourceMappingURL=../../../../src/js/utils/dom/parseHtml/parseHtml.js.map