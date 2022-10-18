import { slice } from '../../arrayLike';
/**
 * Create a function where provided arguments are bound.
 * `this` parameter will be always null.
 *
 * @param func - A function.
 */
export function apply(func) {
    // eslint-disable-next-line prefer-rest-params, prefer-spread
    return func.bind(null, ...slice(arguments, 1));
}
//# sourceMappingURL=../../../../src/js/utils/function/apply/apply.js.map