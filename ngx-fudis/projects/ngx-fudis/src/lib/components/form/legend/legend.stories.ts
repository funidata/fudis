import { Story, Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LegendComponent } from './legend.component';

export default {
	title: 'Components/Form/Legend',
	component: LegendComponent,
	decorators: [
		moduleMetadata({
			imports: [BrowserAnimationsModule, ReactiveFormsModule, FormsModule],
		}),
	],
	argTypes: {},
	parameters: {
		controls: {
			exclude: ['control'],
		},
	},
} as Meta;

export const Legend: Story = () => ({
	template: `
	<form>
	<fieldset>
	<fudis-legend>This is a Fudis legend</fudis-legend>
	<h1>TBD</h1>
	</fieldset>
	</form>

	`,
});
