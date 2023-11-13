const retryOptions = {
	limit: 3, // max number of retries
	delay: 500, // delay before next iteration, ms
};

export const fudisScreenshots = (
	screenSize: 'both' | 'desktop' | 'mobile' = 'both',
	name?: string | null,
	wait?: number | null
) => {
	const desktopName = name ? `${name}_desktop` : 'desktop';
	const mobileName = name ? `${name}_mobile` : 'mobile';

	cy.wrap(
		Cypress.automation('remote:debugger:protocol', {
			command: 'Emulation.setDeviceMetricsOverride',
			params: {
				// target DPR here
				deviceScaleFactor: 1,
				// width and height set to 0 remove overrides
				width: 0,
				height: 0,
				// my use case wasn't on mobile
				mobile: false,
			},
		})
	);
	cy.wait(1000);

	if (screenSize === 'both' || screenSize === 'desktop') {
		cy.viewport('macbook-13');
		if (wait) {
			cy.wait(wait);
		}
		cy.compareSnapshot(desktopName, 0, retryOptions);
	}
	if (screenSize === 'both' || screenSize === 'mobile') {
		cy.viewport('iphone-x');
		if (wait) {
			cy.wait(wait);
		}
		cy.compareSnapshot(mobileName, 0, retryOptions);
	}
};
