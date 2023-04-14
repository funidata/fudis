import { Story, Meta } from '@storybook/angular';
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

export const ErrorSummary: Story = () => ({
	template: html`
		<form id="testform">
			<fudis-error-summary>
				<h1>TBD</h1>
			</fudis-error-summary>
		</form>
	`,
});
