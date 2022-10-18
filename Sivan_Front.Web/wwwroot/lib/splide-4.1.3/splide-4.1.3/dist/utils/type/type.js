import { apply } from '../function';
/**
 * The alias of the type check function.
 *
 * @param type    - A type.
 * @param subject - A subject to check.
 *
 * @return `true` if the subject is the specified type.
 */
function typeOf(type, subject) {
    return typeof subject === type;
}
/**
 * Checks if the given subject is an object or not.
 *
 * @param subject - A subject to check.
 *
 * @return `true` if the subject is an object, or otherwise `false`.
 */
export function isObject(subject) {
    return !isNull(subject) && typeOf('object', subject);
}
/**
 * Checks if the given subject is an array or not.
 *
 * @param subject - A subject to check.
 *
 * @return `true` if the subject is an array, or otherwise `false`.
 */
export const isArray = Array.isArray;
/**
 * Checks if the given subject is a function or not.
 *
 * @param subject - A subject to check.
 *
 * @return `true` if the subject is a function, or otherwise `false`.
 */
export const isFunction = apply(typeOf, 'function');
/**
 * Checks if the given subject is a string or not.
 *
 * @param subject - A subject to check.
 *
 * @return `true` if the subject is a string, or otherwise `false`.
 */
export const isString = apply(typeOf, 'string');
/**
 * Checks if the given subject is `undefined` or not.
 *
 * @param subject - A subject to check.
 *
 * @return `true` if the subject is `undefined`, or otherwise `false`.
 */
export const isUndefined = apply(typeOf, 'undefined');
/**
 * Checks if the given subject is `null` or not.
 *
 * @param subject - A subject to check.
 *
 * @return `true` if the subject is `null`, or otherwise `false`.
 */
export function isNull(subject) {
    return subject === null;
}
/**
 * Checks if the given subject is an HTMLElement instance or not.
 * This method takes into account which `window` the node belongs to.
 *
 * @param subject - A subject to check.
 *
 * @return `true` if the subject is an HTMLElement instance, or otherwise `false`.
 */
export function isHTMLElement(subject) {
    try {
        return subject instanceof (subject.ownerDocument.defaultView || window).HTMLElement;
    }
    catch (e) {
        return false;
    }
}
//# sourceMappingURL=../../../src/js/utils/type/type.js.map