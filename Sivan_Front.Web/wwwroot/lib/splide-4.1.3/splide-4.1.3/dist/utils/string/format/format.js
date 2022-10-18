import { forEach } from '../../array';
/**
 * Formats a string.
 *
 * @param string       - A string to format.
 * @param replacements - A replacement or replacements.
 *
 * @return A formatted string.
 */
export function format(string, replacements) {
    forEach(replacements, replacement => {
        string = string.replace('%s', `${replacement}`);
    });
    return string;
}
//# sourceMappingURL=../../../../src/js/utils/string/format/format.js.map