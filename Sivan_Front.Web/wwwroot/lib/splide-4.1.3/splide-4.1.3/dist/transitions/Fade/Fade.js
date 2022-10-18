import { EVENT_MOUNTED, EVENT_REFRESH } from '../../constants/events';
import { EventInterface } from '../../constructors';
import { nextTick, noop } from '../../utils';
/**
 * The component for the fade transition.
 *
 * @since 3.0.0
 *
 * @param Splide     - A Splide instance.
 * @param Components - A collection of components.
 * @param options    - Options.
 *
 * @return A Transition component object.
 */
export function Fade(Splide, Components, options) {
    const { Slides } = Components;
    /**
     * Called when the component is mounted.
     */
    function mount() {
        EventInterface(Splide).on([EVENT_MOUNTED, EVENT_REFRESH], init);
    }
    /**
     * Initializes the component.
     * Offsets all slides for stacking them onto the head of the list.
     * The `nextTick` disables the initial fade transition of the first slide.
     */
    function init() {
        Slides.forEach(Slide => {
            Slide.style('transform', `translateX(-${100 * Slide.index}%)`);
        });
    }
    /**
     * Starts the transition.
     *
     * @param index - A slide index to be active.
     * @param done  - The callback function that must be called after the transition ends.
     */
    function start(index, done) {
        Slides.style('transition', `opacity ${options.speed}ms ${options.easing}`);
        nextTick(done);
    }
    return {
        mount,
        start,
        cancel: noop,
    };
}
//# sourceMappingURL=../../../src/js/transitions/Fade/Fade.js.map