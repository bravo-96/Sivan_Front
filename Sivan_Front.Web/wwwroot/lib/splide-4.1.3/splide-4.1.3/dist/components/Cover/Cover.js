import { EVENT_LAZYLOAD_LOADED, EVENT_MOUNTED, EVENT_REFRESH, EVENT_UPDATED } from '../../constants/events';
import { EventInterface } from '../../constructors';
import { apply, child, display } from '../../utils';
/**
 * The component for setting the image as the slide background.
 *
 * @since 3.0.0
 *
 * @param Splide     - A Splide instance.
 * @param Components - A collection of components.
 * @param options    - Options.
 *
 * @return A Cover component object.
 */
export function Cover(Splide, Components, options) {
    const { on } = EventInterface(Splide);
    /**
     * Called when the component is mounted.
     */
    function mount() {
        if (options.cover) {
            on(EVENT_LAZYLOAD_LOADED, apply(toggle, true));
            on([EVENT_MOUNTED, EVENT_UPDATED, EVENT_REFRESH], apply(cover, true));
        }
    }
    /**
     * Sets/removes the background image to/from all slides.
     *
     * @param cover - If `false`, removes the background image.
     */
    function cover(cover) {
        Components.Slides.forEach(Slide => {
            const img = child(Slide.container || Slide.slide, 'img');
            if (img && img.src) {
                toggle(cover, img, Slide);
            }
        });
    }
    /**
     * Sets/removes the background image to/from the parent element.
     *
     * @param cover - If `false`, removes the background image.
     * @param img   - A target image element.
     * @param Slide - A SlideComponent object where the image belongs.
     */
    function toggle(cover, img, Slide) {
        Slide.style('background', cover ? `center/cover no-repeat url("${img.src}")` : '', true);
        display(img, cover ? 'none' : '');
    }
    return {
        mount,
        destroy: apply(cover, false),
    };
}
//# sourceMappingURL=../../../src/js/components/Cover/Cover.js.map