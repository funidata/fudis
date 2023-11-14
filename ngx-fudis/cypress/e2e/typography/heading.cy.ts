import { fudisScreenshots, fudisScreenshotInits, FudisScreenshotTestConfig } from '../utilities/utility';

const config_left: FudisScreenshotTestConfig = {
	testName: 'align-left',
};

const config_right: FudisScreenshotTestConfig = {
	testName: 'align-right',
};

const config_center: FudisScreenshotTestConfig = {
	testName: 'align-center',
};

const config_all: FudisScreenshotTestConfig = {
	testName: 'all-variants',
};

describe('Heading screenshot', () => {
	it('should match with previous screenshot, align left', () => {
		cy.visit('/iframe.html?args=align:left&id=components-typography-heading--heading&viewMode=story');
		fudisScreenshotInits();
		fudisScreenshots(config_left);
	});
	it('should match with previous screenshot, align right', () => {
		cy.visit('/iframe.html?args=align:right&id=components-typography-heading--heading&viewMode=story');
		fudisScreenshotInits();
		fudisScreenshots(config_right);
	});
	it('should match with previous screenshot, align center', () => {
		cy.visit('/iframe.html?args=align:center&id=components-typography-heading--heading&viewMode=story');
		fudisScreenshotInits();
		fudisScreenshots(config_center);
	});

	it('should match with previous screenshot, all variants', () => {
		cy.visit('/iframe.html?args=&id=components-typography-heading--all-variants&viewMode=story');
		fudisScreenshotInits();
		fudisScreenshots(config_all);
	});
});
