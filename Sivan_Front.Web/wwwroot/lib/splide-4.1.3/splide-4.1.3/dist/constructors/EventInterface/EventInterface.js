import { EVENT_DESTROY } from '../../constants/events';
import { apply, assign, isArray, slice, toArray } from '../../utils';
import { EventBinder } from '../EventBinder/EventBinder';
/**
 * The constructor function that provides interface for internal and native events.
 *
 * @since 3.0.0
 * @constructor
 *
 * @param Splide - A Splide instance.
 *
 * @return A collection of interface functions.
 */
export function EventInterface(Splide) {
    /**
     * The document fragment for internal events.
     * Provide the Splide instance to share the bus.
     */
    const bus = Splide ? Splide.event.bus : document.createDocumentFragment();
    /**
     * An event binder object.
     */
    const binder = EventBinder();
    /**
     * Listens to an internal event or events.
     *
     * @param events   - An event name or names separated by spaces. Use a dot(.) to add a namespace.
     * @param callback - A callback function to register.
     */
    function on(events, callback) {
        binder.bind(bus, toArray(events).join(' '), e => {
            callback.apply(callback, isArray(e.detail) ? e.detail : []);
        });
    }
    /**
     * Triggers callback functions.
     * This accepts additional arguments and passes them to callbacks.
     *
     * @param event - An event name.
     */
    function emit(event) {
        // eslint-disable-next-line prefer-rest-params, prefer-spread
        binder.dispatch(bus, event, slice(arguments, 1));
    }
    if (Splide) {
        Splide.event.on(EVENT_DESTROY, binder.destroy);
    }
    return assign(binder, {
        bus,
        on,
        off: apply(binder.unbind, bus),
        emit,
    });
}
//# sourceMappingURL=../../../src/js/constructors/EventInterface/EventInterface.js.map