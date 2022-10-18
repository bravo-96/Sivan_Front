import { EVENT_MOVE, EVENT_REFRESH, EVENT_SCROLL, EVENT_SCROLLED, EVENT_UPDATED } from '../../constants/events';
import { IDLE, SCROLLING } from '../../constants/states';
import { SLIDE } from '../../constants/types';
import { EventInterface, RequestInterval } from '../../constructors';
import { abs, apply, approximatelyEqual, floor, max, sign } from '../../utils';
import { BASE_VELOCITY, BOUNCE_DIFF_THRESHOLD, BOUNCE_DURATION, FRICTION_FACTOR, MIN_DURATION } from './constants';
/**
 * The component for scrolling the slider.
 *
 * @since 3.0.0
 *
 * @param Splide     - A Splide instance.
 * @param Components - A collection of components.
 * @param options    - Options.
 *
 * @return A Scroll component object.
 */
export function Scroll(Splide, Components, options) {
    const { on, emit } = EventInterface(Splide);
    const { state: { set } } = Splide;
    const { Move } = Components;
    const { getPosition, getLimit, exceededLimit, translate } = Move;
    const isSlide = Splide.is(SLIDE);
    /**
     * Retains the active RequestInterval object.
     */
    let interval;
    /**
     * Holds the callback function.
     */
    let callback;
    /**
     * The current friction (<= 1).
     */
    let friction = 1;
    /**
     * Called when the component is mounted.
     */
    function mount() {
        on(EVENT_MOVE, clear);
        on([EVENT_UPDATED, EVENT_REFRESH], cancel);
    }
    /**
     * Scrolls the slider to the provided destination.
     *
     * @param destination - The destination to scroll the slider to.
     * @param duration    - Optional. The scroll duration. If omitted, calculates it by the distance.
     * @param snap        - Optional. Whether to snap the slider to the closest slide or not.
     * @param onScrolled  - Optional. A callback invoked after scroll ends.
     * @param noConstrain - Optional. Whether to suppress constraint process when the slider exceeds bounds.
     */
    function scroll(destination, duration, snap, onScrolled, noConstrain) {
        const from = getPosition();
        clear();
        if (snap && (!isSlide || !exceededLimit())) {
            const size = Components.Layout.sliderSize();
            const offset = sign(destination) * size * floor(abs(destination) / size) || 0;
            destination = Move.toPosition(Components.Controller.toDest(destination % size)) + offset;
        }
        const noDistance = approximatelyEqual(from, destination, 1);
        friction = 1;
        duration = noDistance ? 0 : duration || max(abs(destination - from) / BASE_VELOCITY, MIN_DURATION);
        callback = onScrolled;
        interval = RequestInterval(duration, onEnd, apply(update, from, destination, noConstrain), 1);
        set(SCROLLING);
        emit(EVENT_SCROLL);
        interval.start();
    }
    /**
     * Called when scroll ends or has been just canceled.
     */
    function onEnd() {
        set(IDLE);
        callback && callback();
        emit(EVENT_SCROLLED);
    }
    /**
     * Called whenever the interval timer is updated.
     *
     * @param from        - A position where scroll starts.
     * @param to          - A destination where the slider goes.
     * @param noConstrain - Whether to suppress constraint process when the slider exceeds bounds.
     * @param rate        - A current rate.
     */
    function update(from, to, noConstrain, rate) {
        const position = getPosition();
        const target = from + (to - from) * easing(rate);
        const diff = (target - position) * friction;
        translate(position + diff);
        if (isSlide && !noConstrain && exceededLimit()) {
            friction *= FRICTION_FACTOR;
            if (abs(diff) < BOUNCE_DIFF_THRESHOLD) {
                scroll(getLimit(exceededLimit(true)), BOUNCE_DURATION, false, callback, true);
            }
        }
    }
    /**
     * Clears the active interval.
     */
    function clear() {
        if (interval) {
            interval.cancel();
        }
    }
    /**
     * Cancels the active interval and emits the `scrolled` event.
     */
    function cancel() {
        if (interval && !interval.isPaused()) {
            clear();
            onEnd();
        }
    }
    /**
     * The easing function.
     *
     * @param t - A value to ease.
     *
     * @return An eased value.
     */
    function easing(t) {
        const { easingFunc } = options;
        return easingFunc ? easingFunc(t) : 1 - Math.pow(1 - t, 4);
    }
    return {
        mount,
        destroy: clear,
        scroll,
        cancel,
    };
}
//# sourceMappingURL=../../../src/js/components/Scroll/Scroll.js.map