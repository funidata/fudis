import { fudisScreenshots, fudisScreenshotInit, FudisScreenshotTestConfig } from '../utilities/utility';

const configLeft: FudisScreenshotTestConfig = {
	testName: 'align-left',
};

const configRight: FudisScreenshotTestConfig = {
	testName: 'align-right',
};

const configCenter: FudisScreenshotTestConfig = {
	testName: 'align-center',
};

const configAll: FudisScreenshotTestConfig = {
	testName: 'all-variants',
};

describe('Heading screenshot', () => {
	it('should match with previous screenshot, align left', () => {
		cy.visit('/iframe.html?args=align:left&id=components-typography-heading--heading&viewMode=story');
		fudisScreenshotInit();
		fudisScreenshots(configLeft);
	});
	it('should match with previous screenshot, align right', () => {
		cy.visit('/iframe.html?args=align:right&id=components-typography-heading--heading&viewMode=story');
		fudisScreenshotInit();
		fudisScreenshots(configRight);
	});
	it('should match with previous screenshot, align center', () => {
		cy.visit('/iframe.html?args=align:center&id=components-typography-heading--heading&viewMode=story');
		fudisScreenshotInit();
		fudisScreenshots(configCenter);
	});

	it('should match with previous screenshot, all variants', () => {
		cy.visit('/iframe.html?args=&id=components-typography-heading--all-variants&viewMode=story');
		fudisScreenshotInit();
		fudisScreenshots(configAll);
	});
});
