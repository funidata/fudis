import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';
import { jest } from '@jest/globals';

class MockResizeObserver implements ResizeObserver {
  static observe = jest.fn();
  static unobserve = jest.fn();
  static disconnect = jest.fn();

  observe = MockResizeObserver.observe;
  unobserve = MockResizeObserver.unobserve;
  disconnect = MockResizeObserver.disconnect;
}

globalThis.ResizeObserver = MockResizeObserver;

/**
 * Workaround for stylesheet error that comes up in tests using angular material overlays. Hopefully
 * will be fixed in the future
 * https://github.com/thymikee/jest-preset-angular/issues/79#issuecomment-1853570270
 */
const originalConsoleError = console.error;
const jsDomCssError = 'Error: Could not parse CSS stylesheet';
console.error = (...params) => {
  if (!params.find((p) => p.toString().includes(jsDomCssError))) {
    originalConsoleError(...params);
  }
};

setupZoneTestEnv();
