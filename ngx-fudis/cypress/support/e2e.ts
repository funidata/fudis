// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';

// Alternatively you can use CommonJS syntax:
// require('./commands')
import compareSnapshotCommand from 'cypress-image-diff-js/dist/command';
// eslint-disable-next-line import/no-extraneous-dependencies
import { RecurseDefaults } from 'cypress-recurse';

declare global {
	namespace Cypress {
		interface Chainable {
			compareSnapshot(
				name: string,
				testThreshold?: number,
				retryOptions?: Partial<typeof RecurseDefaults>
			): Chainable<Element>;
		}
	}
}
compareSnapshotCommand();
