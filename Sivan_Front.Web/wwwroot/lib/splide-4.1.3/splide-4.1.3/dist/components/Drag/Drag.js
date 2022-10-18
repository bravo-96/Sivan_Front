import { CLASS_ARROW, CLASS_PAGINATION_PAGE } from '../../constants/classes';
import { EVENT_DRAG, EVENT_DRAGGED, EVENT_DRAGGING, EVENT_MOUNTED, EVENT_UPDATED } from '../../constants/events';
import { SCROLL_LISTENER_OPTIONS } from '../../constants/listener-options';
import { DRAGGING, IDLE, MOVING, SCROLLING } from '../../constants/states';
import { FADE, LOOP, SLIDE } from '../../constants/types';
import { EventInterface } from '../../constructors';
import { abs, isObject, matches, min, noop, prevent, sign, timeOf } from '../../utils';
import { FRICTION, LOG_INTERVAL, POINTER_DOWN_EVENTS, POINTER_MOVE_EVENTS, POINTER_UP_EVENTS } from './constants';
/**
 * The component for dragging the slider.
 *
 * @since 3.0.0
 *
 * @param Splide     - A Splide instance.
 * @param Components - A collection of components.
 * @param options    - Options.
 *
 * @return A Drag component object.
 */
export function Drag(Splide, Components, options) {
    const { on, emit, bind, unbind } = EventInterface(Splide);
    const { state } = Splide;
    const { Move, Scroll, Controller, Elements: { track }, Media: { reduce } } = Components;
    const { resolve, orient } = Components.Direction;
    const { getPosition, exceededLimit } = Move;
    /**
     * The base slider position to calculate the delta of coords.
     */
    let basePosition;
    /**
     * The base event object saved per specific sampling interval.
     */
    let baseEvent;
    /**
     * Holds the previous base event object.
     */
    let prevBaseEvent;
    /**
     * Indicates whether the drag mode is `free` or not.
     */
    let isFree;
    /**
     * Indicates whether the user is dragging the slider or not.
     */
    let dragging;
    /**
     * Indicates whether the slider exceeds limits or not.
     * This must not be `undefined` for strict comparison.
     */
    let exceeded = false;
    /**
     * Turns into `true` when the user starts dragging the slider.
     */
    let clickPrevented;
    /**
     * Indicates whether the drag component is now disabled or not.
     */
    let disabled;
    /**
     * The target element to attach listeners.
     */
    let target;
    /**
     * Called when the component is mounted.
     */
    function mount() {
        bind(track, POINTER_MOVE_EVENTS, noop, SCROLL_LISTENER_OPTIONS);
        bind(track, POINTER_UP_EVENTS, noop, SCROLL_LISTENER_OPTIONS);
        bind(track, POINTER_DOWN_EVENTS, onPointerDown, SCROLL_LISTENER_OPTIONS);
        bind(track, 'click', onClick, { capture: true });
        bind(track, 'dragstart', prevent);
        on([EVENT_MOUNTED, EVENT_UPDATED], init);
    }
    /**
     * Initializes the component.
     */
    function init() {
        const { drag } = options;
        disable(!drag);
        isFree = drag === 'free';
    }
    /**
     * Called when the user clicks or touches the slider.
     * - Needs to prevent the default behaviour when the slider is busy to deny any action, such as dragging images
     * - IE does not support MouseEvent and TouchEvent constructors
     * - The `dragging` state always becomes `true` when the user starts dragging while the slider is moving
     *
     * @param e - A TouchEvent or MouseEvent object
     */
    function onPointerDown(e) {
        clickPrevented = false;
        if (!disabled) {
            const isTouch = isTouchEvent(e);
            if (isDraggable(e.target) && (isTouch || !e.button)) {
                if (!Controller.isBusy()) {
                    target = isTouch ? track : window;
                    dragging = state.is([MOVING, SCROLLING]);
                    prevBaseEvent = null;
                    bind(target, POINTER_MOVE_EVENTS, onPointerMove, SCROLL_LISTENER_OPTIONS);
                    bind(target, POINTER_UP_EVENTS, onPointerUp, SCROLL_LISTENER_OPTIONS);
                    Move.cancel();
                    Scroll.cancel();
                    save(e);
                }
                else {
                    prevent(e, true);
                }
            }
        }
    }
    /**
     * Called while the user moves the pointer on the slider.
     *
     * @param e - A TouchEvent or MouseEvent object
     */
    function onPointerMove(e) {
        if (!state.is(DRAGGING)) {
            state.set(DRAGGING);
            emit(EVENT_DRAG);
        }
        if (e.cancelable) {
            if (dragging) {
                Move.translate(basePosition + constrain(diffCoord(e)));
                const expired = diffTime(e) > LOG_INTERVAL;
                const hasExceeded = exceeded !== (exceeded = exceededLimit());
                if (expired || hasExceeded) {
                    save(e);
                }
                clickPrevented = true;
                emit(EVENT_DRAGGING);
                prevent(e);
            }
            else if (isSliderDirection(e)) {
                dragging = shouldStart(e);
                prevent(e);
            }
        }
    }
    /**
     * Called when the user releases pointing devices.
     * Needs to move the slider when:
     * - The user drags the slider and the distance exceeds the threshold
     * - The user aborted the slider moving by pointerdown and just released it without dragging the slider
     *
     * @param e - A TouchEvent or MouseEvent object
     */
    function onPointerUp(e) {
        if (state.is(DRAGGING)) {
            state.set(IDLE);
            emit(EVENT_DRAGGED);
        }
        if (dragging) {
            move(e);
            prevent(e);
        }
        unbind(target, POINTER_MOVE_EVENTS, onPointerMove);
        unbind(target, POINTER_UP_EVENTS, onPointerUp);
        dragging = false;
    }
    /**
     * Called when the track element is clicked.
     * Disables click any elements inside it while dragging.
     *
     * @param e - A MouseEvent object.
     */
    function onClick(e) {
        if (!disabled && clickPrevented) {
            prevent(e, true);
        }
    }
    /**
     * Saves data at the specific moment.
     *
     * @param e - A TouchEvent or MouseEvent object.
     */
    function save(e) {
        prevBaseEvent = baseEvent;
        baseEvent = e;
        basePosition = getPosition();
    }
    /**
     * Calculates the destination by the drag velocity and moves the carousel.
     * If motion is reduced, restores transition speed to the initial value
     * because it's "essential" motion for the user to recognize what happens on the carousel.
     *
     * @param e - A TouchEvent or MouseEvent object.
     */
    function move(e) {
        const velocity = computeVelocity(e);
        const destination = computeDestination(velocity);
        const rewind = options.rewind && options.rewindByDrag;
        reduce(false);
        if (isFree) {
            Controller.scroll(destination, 0, options.snap);
        }
        else if (Splide.is(FADE)) {
            Controller.go(orient(sign(velocity)) < 0 ? (rewind ? '<' : '-') : (rewind ? '>' : '+'));
        }
        else if (Splide.is(SLIDE) && exceeded && rewind) {
            Controller.go(exceededLimit(true) ? '>' : '<');
        }
        else {
            Controller.go(Controller.toDest(destination), true);
        }
        reduce(true);
    }
    /**
     * Checks if the drag distance exceeds the defined threshold.
     *
     * @param e - A TouchEvent or MouseEvent object.
     *
     * @return `true` if the distance exceeds the threshold, or `false` if not.
     */
    function shouldStart(e) {
        const { dragMinThreshold: thresholds } = options;
        const isObj = isObject(thresholds);
        const mouse = isObj && thresholds.mouse || 0;
        const touch = (isObj ? thresholds.touch : +thresholds) || 10;
        return abs(diffCoord(e)) > (isTouchEvent(e) ? touch : mouse);
    }
    /**
     * Checks whether dragging towards the slider or the scroll direction.
     *
     * @return `true` if dragging towards the slider direction, or otherwise `false`.
     *
     * @param e - A TouchEvent or MouseEvent object
     */
    function isSliderDirection(e) {
        return abs(diffCoord(e)) > abs(diffCoord(e, true));
    }
    /**
     * Computes the drag velocity.
     *
     * @param e - A TouchEvent or MouseEvent object
     *
     * @return The drag velocity.
     */
    function computeVelocity(e) {
        if (Splide.is(LOOP) || !exceeded) {
            const time = diffTime(e);
            if (time && time < LOG_INTERVAL) {
                return diffCoord(e) / time;
            }
        }
        return 0;
    }
    /**
     * Computes the destination by the velocity and the `flickPower` option.
     *
     * @param velocity - The drag velocity.
     *
     * @return The destination.
     */
    function computeDestination(velocity) {
        return getPosition() + sign(velocity) * min(abs(velocity) * (options.flickPower || 600), isFree ? Infinity : Components.Layout.listSize() * (options.flickMaxPages || 1));
    }
    /**
     * Returns the coord difference between the provided and base events.
     *
     * @param e          - A TouchEvent or MouseEvent object.
     * @param orthogonal - Optional. If `true`, returns the coord of the orthogonal axis against the drag one.
     *
     * @return The difference of the coord.
     */
    function diffCoord(e, orthogonal) {
        return coordOf(e, orthogonal) - coordOf(getBaseEvent(e), orthogonal);
    }
    /**
     * Returns the elapsed time from the base event to `e`.
     *
     * @param e - A TouchEvent or MouseEvent object.
     *
     * @return The elapsed time in milliseconds.
     */
    function diffTime(e) {
        return timeOf(e) - timeOf(getBaseEvent(e));
    }
    /**
     * Returns the base event.
     * If the base event is same with `e`, returns previous one.
     *
     * @param e - A TouchEvent or MouseEvent object.
     *
     * @return A base event.
     */
    function getBaseEvent(e) {
        return baseEvent === e && prevBaseEvent || baseEvent;
    }
    /**
     * Returns the `pageX` and `pageY` coordinates provided by the event.
     * Be aware that IE does not support both TouchEvent and MouseEvent constructors.
     *
     * @param e          - A TouchEvent or MouseEvent object.
     * @param orthogonal - Optional. If `true`, returns the coord of the orthogonal axis against the drag one.
     *
     * @return A pageX or pageY coordinate.
     */
    function coordOf(e, orthogonal) {
        return (isTouchEvent(e) ? e.changedTouches[0] : e)[`page${resolve(orthogonal ? 'Y' : 'X')}`];
    }
    /**
     * Reduces the distance to move by the predefined friction.
     * This does nothing when the slider type is not `slide`, or the position is inside borders.
     *
     * @param diff - Diff to constrain.
     *
     * @return The constrained diff.
     */
    function constrain(diff) {
        return diff / (exceeded && Splide.is(SLIDE) ? FRICTION : 1);
    }
    /**
     * Returns `true` if the user can drag the target.
     *
     * @param target - An event target.
     *
     * @return `true` if the target is draggable.
     */
    function isDraggable(target) {
        const { noDrag } = options;
        return !matches(target, `.${CLASS_PAGINATION_PAGE}, .${CLASS_ARROW}`)
            && (!noDrag || !matches(target, noDrag));
    }
    /**
     * Checks if the provided event is TouchEvent or MouseEvent.
     *
     * @param e - An event to check.
     *
     * @return `true` if the `e` is TouchEvent.
     */
    function isTouchEvent(e) {
        return typeof TouchEvent !== 'undefined' && e instanceof TouchEvent;
    }
    /**
     * Checks if now the user is dragging the slider or not.
     *
     * @return `true` if the user is dragging the slider or otherwise `false`.
     */
    function isDragging() {
        return dragging;
    }
    /**
     * Disables the component.
     *
     * @param value - Set `true` to disable the component.
     */
    function disable(value) {
        disabled = value;
    }
    return {
        mount,
        disable,
        isDragging,
    };
}
//# sourceMappingURL=../../../src/js/components/Drag/Drag.js.map