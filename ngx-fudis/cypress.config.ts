import { defineConfig } from 'cypress';
import getCompareSnapshotsPlugin from 'cypress-image-diff-js/dist/plugin';

export default defineConfig({
	defaultCommandTimeout: 10000,
	requestTimeout: 30000,
	responseTimeout: 30000,

	reporterOptions: {
		configFile: 'cypress/reporter-config.json',
	},
	screenshotsFolder: 'cypress/screenshots',
	trashAssetsBeforeRuns: true,
	video: false,
	videosFolder: 'cypress/target/videos',
	viewportWidth: 1920,
	viewportHeight: 1080,
	scrollBehavior: 'center',

	retries: {
		runMode: 2,
		openMode: 0,
	},

	e2e: {
		setupNodeEvents(on, config) {
			return getCompareSnapshotsPlugin(on, config);
		},
		baseUrl: 'http://localhost:6006/',
	},

	component: {
		devServer: {
			framework: 'angular',
			bundler: 'webpack',
		},
		specPattern: '**/*.cy.ts',
	},
});
