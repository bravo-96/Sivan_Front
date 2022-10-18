import { RequestInterval } from '../RequestInterval/RequestInterval';
/**
 * Returns the throttled function.
 *
 * @param func     - A function to throttle.
 * @param duration - Optional. Throttle duration in milliseconds.
 *
 * @return A throttled function.
 */
export function Throttle(func, duration) {
    const interval = RequestInterval(duration || 0, func, null, 1);
    return () => {
        interval.isPaused() && interval.start();
    };
}
//# sourceMappingURL=../../../src/js/constructors/Throttle/Throttle.js.map