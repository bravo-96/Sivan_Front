import { EVENT_REFRESH, EVENT_RESIZE, EVENT_UPDATED } from '../../constants/events';
import { LOOP } from '../../constants/types';
import { EventInterface } from '../../constructors';
import { addClass, append, before, ceil, empty, isUndefined, pad, push, rect, remove } from '../../utils';
/**
 * The multiplier to determine the number of clones.
 *
 * @since 4.0.0
 */
export const MULTIPLIER = 2;
/**
 * The component that generates clones for the loop slider.
 *
 * @since 3.0.0
 *
 * @param Splide     - A Splide instance.
 * @param Components - A collection of components.
 * @param options    - Options.
 *
 * @return A Clones component object.
 */
export function Clones(Splide, Components, options) {
    const event = EventInterface(Splide);
    const { on } = event;
    const { Elements, Slides } = Components;
    const { resolve } = Components.Direction;
    /**
     * Stores all cloned elements.
     */
    const clones = [];
    /**
     * Keeps the current number of clones.
     */
    let cloneCount;
    /**
     * Called when the component is mounted.
     * Needs to remount the component on refresh, otherwise `refresh` event will be triggered again while refreshing.
     */
    function mount() {
        on(EVENT_REFRESH, remount);
        on([EVENT_UPDATED, EVENT_RESIZE], observe);
        if ((cloneCount = computeCloneCount())) {
            generate(cloneCount);
            Components.Layout.resize(true);
        }
    }
    /**
     * Remounts the component.
     */
    function remount() {
        destroy();
        mount();
    }
    /**
     * Destroys clones.
     */
    function destroy() {
        remove(clones);
        empty(clones);
        event.destroy();
    }
    /**
     * Observes the required clone count and refreshes the slider if necessary.
     */
    function observe() {
        const count = computeCloneCount();
        if (cloneCount !== count) {
            if (cloneCount < count || !count) {
                event.emit(EVENT_REFRESH);
            }
        }
    }
    /**
     * Generates the specified number of clones.
     *
     * @param count - The number of clones to generate for each side.
     */
    function generate(count) {
        const slides = Slides.get().slice();
        const { length } = slides;
        if (length) {
            while (slides.length < count) {
                push(slides, slides);
            }
            push(slides.slice(-count), slides.slice(0, count)).forEach((Slide, index) => {
                const isHead = index < count;
                const clone = cloneDeep(Slide.slide, index);
                isHead ? before(clone, slides[0].slide) : append(Elements.list, clone);
                push(clones, clone);
                Slides.register(clone, index - count + (isHead ? 0 : length), Slide.index);
            });
        }
    }
    /**
     * Deeply clones the provided element with removing the ID attribute.
     *
     * @param elm   - An element to clone.
     * @param index - An index of the clone.
     *
     * @return A cloned element.
     */
    function cloneDeep(elm, index) {
        const clone = elm.cloneNode(true);
        addClass(clone, options.classes.clone);
        clone.id = `${Splide.root.id}-clone${pad(index + 1)}`;
        return clone;
    }
    /**
     * Returns the number of elements to generate.
     * This always returns 0 if the slider type is not `'loop'`.
     *
     * @return The number of clones.
     */
    function computeCloneCount() {
        let { clones } = options;
        if (!Splide.is(LOOP)) {
            clones = 0;
        }
        else if (isUndefined(clones)) {
            const fixedSize = options[resolve('fixedWidth')] && Components.Layout.slideSize(0);
            const fixedCount = fixedSize && ceil(rect(Elements.track)[resolve('width')] / fixedSize);
            clones = fixedCount || (options[resolve('autoWidth')] && Splide.length) || options.perPage * MULTIPLIER;
        }
        return clones;
    }
    return {
        mount,
        destroy,
    };
}
//# sourceMappingURL=../../../src/js/components/Clones/Clones.js.map