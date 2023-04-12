import { StoryFn, Meta } from '@storybook/angular';
import { ErrorSummaryComponent } from './error-summary.component';

export default {
	title: 'Components/Form/ErrorSummary',
	component: ErrorSummaryComponent,
	parameters: {
		controls: {
			exclude: ['control'],
		},
	},
} as Meta;
const html = String.raw;

export const ErrorSummary: StoryFn = () => ({
	template: html` <h1>TBD</h1> `,
});
