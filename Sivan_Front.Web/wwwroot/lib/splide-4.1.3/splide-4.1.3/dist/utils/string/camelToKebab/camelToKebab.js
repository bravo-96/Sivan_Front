/**
 * Converts the provided string in the camel case to the kebab case.
 *
 * @param string - A string to convert.
 */
export function camelToKebab(string) {
    return string.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}
//# sourceMappingURL=../../../../src/js/utils/string/camelToKebab/camelToKebab.js.map