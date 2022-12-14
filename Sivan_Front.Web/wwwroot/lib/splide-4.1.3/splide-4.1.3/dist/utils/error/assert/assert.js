import { PROJECT_CODE } from '../../../constants/project';
/**
 * Throws an error if the provided condition is falsy.
 *
 * @param condition - If falsy, an error is thrown.
 * @param message   - Optional. A message to display.
 */
export function assert(condition, message) {
    if (!condition) {
        throw new Error(`[${PROJECT_CODE}] ${message || ''}`);
    }
}
//# sourceMappingURL=../../../../src/js/utils/error/assert/assert.js.map