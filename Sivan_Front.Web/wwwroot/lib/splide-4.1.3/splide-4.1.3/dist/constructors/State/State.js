import { includes, toArray } from '../../utils';
/**
 * The function providing a super simple state system.
 *
 * @param initialState - Specifies the initial state.
 */
export function State(initialState) {
    /**
     * The current state.
     */
    let state = initialState;
    /**
     * Sets a new state.
     *
     * @param value - A new state value.
     */
    function set(value) {
        state = value;
    }
    /**
     * Checks if the current state matches the provided one.
     *
     * @param states - A state to check.
     *
     * @return `true` if the current state is the provided one.
     */
    function is(states) {
        return includes(toArray(states), state);
    }
    return { set, is };
}
//# sourceMappingURL=../../../src/js/constructors/State/State.js.map