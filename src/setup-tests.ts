import '@testing-library/jest-dom';
import { jest } from "@jest/globals";

// silenced in tests
global.console.log = jest.fn();
global.console.warn = jest.fn();
global.console.info = jest.fn();
global.console.error = jest.fn();
