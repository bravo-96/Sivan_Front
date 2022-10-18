import { min, raf } from '../../utils';
/**
 * Requests interval like the native `setInterval()` with using `requestAnimationFrame`.
 *
 * @since 3.0.0
 *
 * @param interval   - The interval duration in milliseconds.
 * @param onInterval - The callback fired on every interval.
 * @param onUpdate   - Optional. Called on every animation frame, taking the progress rate.
 * @param limit      - Optional. Limits the number of interval.
 */
export function RequestInterval(interval, onInterval, onUpdate, limit) {
    const { now } = Date;
    /**
     * The time when the interval starts.
     */
    let startTime;
    /**
     * The current progress rate.
     */
    let rate = 0;
    /**
     * The animation frame ID.
     */
    let id;
    /**
     * Indicates whether the interval is currently paused or not.
     */
    let paused = true;
    /**
     * The loop count. This only works when the `limit` argument is provided.
     */
    let count = 0;
    /**
     * The update function called on every animation frame.
     */
    function update() {
        if (!paused) {
            rate = interval ? min((now() - startTime) / interval, 1) : 1;
            onUpdate && onUpdate(rate);
            if (rate >= 1) {
                onInterval();
                startTime = now();
                if (limit && ++count >= limit) {
                    return pause();
                }
            }
            id = raf(update);
        }
    }
    /**
     * Starts the interval.
     *
     * @param resume - Optional. Whether to resume the paused progress or not.
     */
    function start(resume) {
        resume || cancel();
        startTime = now() - (resume ? rate * interval : 0);
        paused = false;
        id = raf(update);
    }
    /**
     * Pauses the interval.
     */
    function pause() {
        paused = true;
    }
    /**
     * Rewinds the current progress.
     */
    function rewind() {
        startTime = now();
        rate = 0;
        if (onUpdate) {
            onUpdate(rate);
        }
    }
    /**
     * Cancels the interval.
     */
    function cancel() {
        id && cancelAnimationFrame(id);
        rate = 0;
        id = 0;
        paused = true;
    }
    /**
     * Sets new interval duration.
     *
     * @param time - The interval duration in milliseconds.
     */
    function set(time) {
        interval = time;
    }
    /**
     * Checks if the interval is paused or not.
     *
     * @return `true` if the interval is paused, or otherwise `false`.
     */
    function isPaused() {
        return paused;
    }
    return {
        start,
        rewind,
        pause,
        cancel,
        set,
        isPaused,
    };
}
//# sourceMappingURL=../../../src/js/constructors/RequestInterval/RequestInterval.js.map