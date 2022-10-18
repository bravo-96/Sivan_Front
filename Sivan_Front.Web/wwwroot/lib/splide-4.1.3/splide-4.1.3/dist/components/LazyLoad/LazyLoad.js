import { CLASS_LOADING } from '../../constants/classes';
import { EVENT_LAZYLOAD_LOADED, EVENT_MOVED, EVENT_REFRESH, EVENT_RESIZE, EVENT_SCROLLED, } from '../../constants/events';
import { EventInterface } from '../../constructors';
import { addClass, apply, child, create, display, empty, getAttribute, queryAll, remove, removeAttribute, removeClass, setAttribute, } from '../../utils';
import { IMAGE_SELECTOR, SRC_DATA_ATTRIBUTE, SRCSET_DATA_ATTRIBUTE } from './constants';
/**
 * The component for lazily loading images.
 *
 * @since 3.0.0
 *
 * @param Splide     - A Splide instance.
 * @param Components - A collection of components.
 * @param options    - Options.
 *
 * @return An LazyLoad component object.
 */
export function LazyLoad(Splide, Components, options) {
    const { on, off, bind, emit } = EventInterface(Splide);
    const isSequential = options.lazyLoad === 'sequential';
    const events = [EVENT_MOVED, EVENT_SCROLLED];
    /**
     * Stores data of images.
     */
    let entries = [];
    /**
     * Called when the component is mounted.
     */
    function mount() {
        if (options.lazyLoad) {
            init();
            on(EVENT_REFRESH, init);
        }
    }
    /**
     * Initializes the component and start loading images.
     * Be aware that `refresh` also calls this method.
     */
    function init() {
        empty(entries);
        register();
        if (isSequential) {
            loadNext();
        }
        else {
            off(events);
            on(events, check);
            check();
        }
    }
    /**
     * Finds images and register them as entries with creating spinner elements.
     * Note that spinner can be already available because of `refresh()`.
     */
    function register() {
        Components.Slides.forEach(Slide => {
            queryAll(Slide.slide, IMAGE_SELECTOR).forEach(img => {
                const src = getAttribute(img, SRC_DATA_ATTRIBUTE);
                const srcset = getAttribute(img, SRCSET_DATA_ATTRIBUTE);
                if (src !== img.src || srcset !== img.srcset) {
                    const className = options.classes.spinner;
                    const parent = img.parentElement;
                    const spinner = child(parent, `.${className}`) || create('span', className, parent);
                    entries.push([img, Slide, spinner]);
                    img.src || display(img, 'none');
                }
            });
        });
    }
    /**
     * Checks how close each image is from the active slide, and determines whether to start loading or not.
     * The last `+1` is for the current page.
     */
    function check() {
        entries = entries.filter(data => {
            const distance = options.perPage * ((options.preloadPages || 1) + 1) - 1;
            return data[1].isWithin(Splide.index, distance) ? load(data) : true;
        });
        entries.length || off(events);
    }
    /**
     * Starts loading the image in the provided data.
     *
     * @param data - A LazyLoadEntry object.
     */
    function load(data) {
        const [img] = data;
        addClass(data[1].slide, CLASS_LOADING);
        bind(img, 'load error', apply(onLoad, data));
        setAttribute(img, 'src', getAttribute(img, SRC_DATA_ATTRIBUTE));
        setAttribute(img, 'srcset', getAttribute(img, SRCSET_DATA_ATTRIBUTE));
        removeAttribute(img, SRC_DATA_ATTRIBUTE);
        removeAttribute(img, SRCSET_DATA_ATTRIBUTE);
    }
    /**
     * Called when the image is loaded or any error occurs.
     *
     * @param data - A LazyLoadEntry object.
     * @param e    - An Event object.
     */
    function onLoad(data, e) {
        const [img, Slide] = data;
        removeClass(Slide.slide, CLASS_LOADING);
        if (e.type !== 'error') {
            remove(data[2]);
            display(img, '');
            emit(EVENT_LAZYLOAD_LOADED, img, Slide);
            emit(EVENT_RESIZE);
        }
        isSequential && loadNext();
    }
    /**
     * Starts loading a next image.
     */
    function loadNext() {
        entries.length && load(entries.shift());
    }
    return {
        mount,
        destroy: apply(empty, entries),
        check,
    };
}
//# sourceMappingURL=../../../src/js/components/LazyLoad/LazyLoad.js.map