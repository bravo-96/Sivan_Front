import { ARIA_ORIENTATION } from '../../constants/attributes';
import { TTB } from '../../constants/directions';
import { EVENT_CLICK, EVENT_MOUNTED, EVENT_MOVE, EVENT_NAVIGATION_MOUNTED, EVENT_SLIDE_KEYDOWN, EVENT_UPDATED, } from '../../constants/events';
import { LOOP } from '../../constants/types';
import { EventInterface } from '../../constructors';
import { apply, empty, includes, isUndefined, prevent, setAttribute } from '../../utils';
import { normalizeKey } from '../../utils/dom/normalizeKey/normalizeKey';
/**
 * The keys for triggering the navigation slide.
 *
 * @since 3.0.0
 */
const TRIGGER_KEYS = [' ', 'Enter'];
/**
 * The component for syncing multiple sliders.
 *
 * @since 3.0.0
 *
 * @param Splide     - A Splide instance.
 * @param Components - A collection of components.
 * @param options    - Options.
 *
 * @return A Sync component object.
 */
export function Sync(Splide, Components, options) {
    const { isNavigation, slideFocus } = options;
    /**
     * Stores event objects.
     */
    const events = [];
    /**
     * Called when the component is mounted.
     */
    function mount() {
        Splide.splides.forEach(target => {
            if (!target.isParent) {
                sync(Splide, target.splide);
                sync(target.splide, Splide);
            }
        });
        if (isNavigation) {
            navigate();
        }
    }
    /**
     * Destroys the component.
     */
    function destroy() {
        events.forEach(event => { event.destroy(); });
        empty(events);
    }
    /**
     * Remounts the component.
     *
     * @internal
     */
    function remount() {
        destroy();
        mount();
    }
    /**
     * Syncs the current index with a provided child splide instance.
     *
     * @param splide - A splide instance to sync with.
     * @param target - A target splide instance.
     */
    function sync(splide, target) {
        const event = EventInterface(splide);
        event.on(EVENT_MOVE, (index, prev, dest) => {
            target.go(target.is(LOOP) ? dest : index);
        });
        events.push(event);
    }
    /**
     * Makes slides clickable and moves the slider to the index of clicked slide.
     * Note that the direction of `menu` is implicitly `vertical` as default.
     */
    function navigate() {
        const event = EventInterface(Splide);
        const { on } = event;
        on(EVENT_CLICK, onClick);
        on(EVENT_SLIDE_KEYDOWN, onKeydown);
        on([EVENT_MOUNTED, EVENT_UPDATED], update);
        events.push(event);
        event.emit(EVENT_NAVIGATION_MOUNTED, Splide.splides);
    }
    /**
     * Update attributes.
     */
    function update() {
        setAttribute(Components.Elements.list, ARIA_ORIENTATION, options.direction === TTB ? 'vertical' : '');
    }
    /**
     * Called when the navigation slide is clicked.
     *
     * @param Slide - A clicked Slide component.
     */
    function onClick(Slide) {
        Splide.go(Slide.index);
    }
    /**
     * Called when any key is pressed on the navigation slide.
     *
     * @param Slide - A Slide component.
     * @param e     - A KeyboardEvent object.
     */
    function onKeydown(Slide, e) {
        if (includes(TRIGGER_KEYS, normalizeKey(e))) {
            onClick(Slide);
            prevent(e);
        }
    }
    return {
        setup: apply(Components.Media.set, { slideFocus: isUndefined(slideFocus) ? isNavigation : slideFocus }, true),
        mount,
        destroy,
        remount,
    };
}
//# sourceMappingURL=../../../src/js/components/Sync/Sync.js.map