import { Story, Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorSummaryComponent } from './error-summary.component';

export default {
	title: 'Components/Form/ErrorSummary',
	component: ErrorSummaryComponent,
	decorators: [
		moduleMetadata({
			imports: [ReactiveFormsModule, FormsModule],
		}),
	],
	argTypes: {},
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
