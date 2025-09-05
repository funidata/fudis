import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';

global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

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
