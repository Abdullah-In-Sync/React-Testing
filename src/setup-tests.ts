import '@testing-library/jest-dom';

// silenced in tests
global.console.log = jest.fn();
global.console.warn = jest.fn();
global.console.info = jest.fn();
global.console.error = jest.fn();
