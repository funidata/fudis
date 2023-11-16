import { fudisScreenshots, fudisScreenshotInit, FudisScreenshotTestConfig } from '../utilities/utility';

const configCommon: FudisScreenshotTestConfig = {
	devices: ['mobile', 'desktop', 'tablet', 'desktopLarge'],
	loadWait: 200,
	isFullscreenScreenshot: true,
};

const configInit: FudisScreenshotTestConfig = {
	...configCommon,
	testName: 'init',
};

describe('Form screenshot', () => {
	it('should match with previous screenshot, instant Submit', () => {
		cy.visit('/iframe.html?args=&id=components-form-form--example&viewMode=story');
		fudisScreenshotInit();
		fudisScreenshots(configInit);
	});
});
