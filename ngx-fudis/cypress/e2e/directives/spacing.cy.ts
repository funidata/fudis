import { fudisScreenshots, fudisScreenshotInit, FudisScreenshotTestConfig } from '../../utilities/utility';

const config: FudisScreenshotTestConfig = {
	devices: ['mobile', 'tablet', 'desktop'],
};

describe('Spacing screenshot', () => {
	it('should match with previous screenshot', () => {
		cy.visit('/iframe.html?args=&id=directives-spacing--responsive-example&viewMode=story');
		fudisScreenshotInit();
		fudisScreenshots(config);
	});
});
