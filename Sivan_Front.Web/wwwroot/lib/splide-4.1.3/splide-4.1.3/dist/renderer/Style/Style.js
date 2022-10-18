import { forOwn } from '../../utils';
/**
 * The class for generating styles as a string.
 *
 * @since 3.0.0
 */
export class Style {
    /**
     * The Style constructor.
     *
     * @param id      - A slider ID.
     * @param options - Options.
     */
    constructor(id, options) {
        /**
         * The collection of registered styles categorized by each breakpoint.
         */
        this.styles = {};
        this.id = id;
        this.options = options;
    }
    /**
     * Registers a CSS rule.
     *
     * @param selector - A selector.
     * @param prop
     * @param value
     * @param breakpoint
     */
    rule(selector, prop, value, breakpoint) {
        breakpoint = breakpoint || 'default';
        const selectors = (this.styles[breakpoint] = this.styles[breakpoint] || {});
        const styles = (selectors[selector] = selectors[selector] || {});
        styles[prop] = value;
    }
    /**
     * Builds styles as a single string.
     *
     * @return Built styles.
     */
    build() {
        let css = '';
        if (this.styles.default) {
            css += this.buildSelectors(this.styles.default);
        }
        Object.keys(this.styles)
            .sort((n, m) => this.options.mediaQuery === 'min' ? +n - +m : +m - +n)
            .forEach(breakpoint => {
            if (breakpoint !== 'default') {
                css += `@media screen and (max-width: ${breakpoint}px) {`;
                css += this.buildSelectors(this.styles[breakpoint]);
                css += `}`;
            }
        });
        return css;
    }
    /**
     * Builds styles for each breakpoint.
     *
     * @param selectors - An object with styles.
     *
     * @return Built styles.
     */
    buildSelectors(selectors) {
        let css = '';
        forOwn(selectors, (styles, selector) => {
            selector = `#${this.id} ${selector}`.trim();
            css += `${selector} {`;
            forOwn(styles, (value, prop) => {
                if (value || value === 0) {
                    css += `${prop}: ${value};`;
                }
            });
            css += '}';
        });
        return css;
    }
}
//# sourceMappingURL=../../../src/js/renderer/Style/Style.js.map