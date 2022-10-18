"use strict";
window.matchMedia = () => ({
    matches: false,
    media: '',
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
});
//# sourceMappingURL=../../../src/js/test/jest/setup.js.map