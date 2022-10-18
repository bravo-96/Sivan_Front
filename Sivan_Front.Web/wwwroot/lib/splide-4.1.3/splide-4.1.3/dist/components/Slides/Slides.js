import { EVENT_REFRESH, EVENT_RESIZE } from '../../constants/events';
import { EventInterface } from '../../constructors';
import { addClass, append, apply, before, between, empty, forEach as forEachItem, includes, isFunction, isHTMLElement, isString, matches, parseHtml, queryAll, remove as removeNode, toArray, } from '../../utils';
import { Slide } from './Slide';
/**
 * The component for managing all slides include clones.
 *
 * @since 3.0.0
 *
 * @param Splide     - A Splide instance.
 * @param Components - A collection of components.
 * @param options    - Options.
 *
 * @return An Slides component object.
 */
export function Slides(Splide, Components, options) {
    const { on, emit, bind } = EventInterface(Splide);
    const { slides, list } = Components.Elements;
    /**
     * Stores all SlideComponent objects.
     */
    const Slides = [];
    /**
     * Called when the component is mounted.
     */
    function mount() {
        init();
        on(EVENT_REFRESH, destroy);
        on(EVENT_REFRESH, init);
    }
    /**
     * Initializes the component.
     */
    function init() {
        slides.forEach((slide, index) => { register(slide, index, -1); });
    }
    /**
     * Destroys the component.
     */
    function destroy() {
        forEach(Slide => { Slide.destroy(); });
        empty(Slides);
    }
    /**
     * Manually updates the status of all slides.
     */
    function update() {
        forEach(Slide => { Slide.update(); });
    }
    /**
     * Registers a slide element and creates a Slide object.
     * Needs to sort every time when a new slide is registered especially for clones.
     *
     * @param slide      - A slide element to register.
     * @param index      - A slide index.
     * @param slideIndex - A slide index for clones. This must be `-1` for regular slides.
     */
    function register(slide, index, slideIndex) {
        const object = Slide(Splide, index, slideIndex, slide);
        object.mount();
        Slides.push(object);
        Slides.sort((Slide1, Slide2) => Slide1.index - Slide2.index);
    }
    /**
     * Returns all Slide objects.
     *
     * @param excludeClones - Optional. Determines whether to exclude clones or not.
     *
     * @return An array with Slide objects.
     */
    function get(excludeClones) {
        return excludeClones ? filter(Slide => !Slide.isClone) : Slides;
    }
    /**
     * Returns slides in the specified page.
     *
     * @param page - A page index.
     *
     * @return An array with slides that belong to the page.
     */
    function getIn(page) {
        const { Controller } = Components;
        const index = Controller.toIndex(page);
        const max = Controller.hasFocus() ? 1 : options.perPage;
        return filter(Slide => between(Slide.index, index, index + max - 1));
    }
    /**
     * Returns a Slide object at the specified index.
     *
     * @param index - A slide index.
     *
     * @return A Slide object if available, or otherwise `undefined`.
     */
    function getAt(index) {
        return filter(index)[0];
    }
    /**
     * Inserts a slide or slides at a specified index.
     *
     * @param items - A slide element, an HTML string or an array with them.
     * @param index - Optional. An index to insert the slide at. If omitted, appends it to the list.
     */
    function add(items, index) {
        forEachItem(items, slide => {
            if (isString(slide)) {
                slide = parseHtml(slide);
            }
            if (isHTMLElement(slide)) {
                const ref = slides[index];
                ref ? before(slide, ref) : append(list, slide);
                addClass(slide, options.classes.slide);
                observeImages(slide, apply(emit, EVENT_RESIZE));
            }
        });
        emit(EVENT_REFRESH);
    }
    /**
     * Removes slides that match the matcher
     * that can be an index, an array with indices, a selector, or an iteratee function.
     *
     * @param matcher - An index, an array with indices, a selector string, or an iteratee function.
     */
    function remove(matcher) {
        removeNode(filter(matcher).map(Slide => Slide.slide));
        emit(EVENT_REFRESH);
    }
    /**
     * Iterates over Slide objects by the iteratee function.
     *
     * @param iteratee      - An iteratee function that takes a Slide object, an index and an array with Slides.
     * @param excludeClones - Optional. Determines whether to exclude clones or not.
     */
    function forEach(iteratee, excludeClones) {
        get(excludeClones).forEach(iteratee);
    }
    /**
     * Filters Slides by the matcher
     * that can be an index, an array with indices, a selector, or a predicate function.
     *
     * @param matcher - An index, an array with indices, a selector string, or a predicate function.
     *
     * @return An array with SlideComponent objects.
     */
    function filter(matcher) {
        return Slides.filter(isFunction(matcher)
            ? matcher
            : Slide => isString(matcher)
                ? matches(Slide.slide, matcher)
                : includes(toArray(matcher), Slide.index));
    }
    /**
     * Adds a CSS rule to all slides or containers.
     *
     * @param prop         - A property name.
     * @param value        - A CSS value to add.
     * @param useContainer - Optional. Determines whether to apply the rule to the container or not.
     */
    function style(prop, value, useContainer) {
        forEach(Slide => { Slide.style(prop, value, useContainer); });
    }
    /**
     * Invokes the callback after all images in the element are loaded.
     *
     * @param elm      - An element that may contain images.
     * @param callback - A callback function.
     */
    function observeImages(elm, callback) {
        const images = queryAll(elm, 'img');
        let { length } = images;
        if (length) {
            images.forEach(img => {
                bind(img, 'load error', () => {
                    if (!--length) {
                        callback();
                    }
                });
            });
        }
        else {
            callback();
        }
    }
    /**
     * Returns the length of slides.
     *
     * @param excludeClones - Optional. Determines whether to exclude clones or not.
     *
     * @return The length of slides.
     */
    function getLength(excludeClones) {
        return excludeClones ? slides.length : Slides.length;
    }
    /**
     * Checks if the number of slides is over than the `perPage` option, including clones.
     *
     * @return `true` if there are enough slides, or otherwise `false`.
     */
    function isEnough() {
        return Slides.length > options.perPage;
    }
    return {
        mount,
        destroy,
        update,
        register,
        get,
        getIn,
        getAt,
        add,
        remove,
        forEach,
        filter,
        style,
        getLength,
        isEnough,
    };
}
//# sourceMappingURL=../../../src/js/components/Slides/Slides.js.map