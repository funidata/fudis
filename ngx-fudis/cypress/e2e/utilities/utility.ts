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

	if (screenSize === 'both' || screenSize === 'desktop') {
		if (wait) {
			cy.wait(wait);
		}
		cy.viewport('macbook-13');
		cy.compareSnapshot(desktopName, 0, retryOptions);
	}
	if (screenSize === 'both' || screenSize === 'mobile') {
		if (wait) {
			cy.wait(wait);
		}
		cy.viewport('iphone-x');
		cy.compareSnapshot(mobileName, 0, retryOptions);
	}
};
