import { fudisScreenshots, fudisScreenshotInits, FudisScreenshotTestConfig } from './utilities/utility';

const config_1: FudisScreenshotTestConfig = {
	testName: '1-all-closed',
};

const config_2: FudisScreenshotTestConfig = {
	testName: '2-regular-opened',
};

const config_3: FudisScreenshotTestConfig = {
	testName: '3-regular-closed',
};

const config_4: FudisScreenshotTestConfig = {
	testName: '4-lite-open',
};

describe('Expadanble screenshot', () => {
	it('should match with previous screenshot', () => {
		cy.visit('/iframe.html?args=&id=components-expandable--all-variants&viewMode=story');
		fudisScreenshotInits();
		fudisScreenshots(config_1);
		cy.get('#fudis-expandable-1-heading .fudis-expandable__header__heading__button').click();
		fudisScreenshots(config_2);
		cy.get('#fudis-expandable-1-heading .fudis-expandable__header__heading__button').click();
		fudisScreenshots(config_3);
		cy.get('#fudis-expandable-4-heading .fudis-expandable__header__heading__button').click();
		fudisScreenshots(config_4);
	});
});
