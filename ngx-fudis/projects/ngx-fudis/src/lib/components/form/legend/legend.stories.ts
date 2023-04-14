import { Story, Meta } from '@storybook/angular';

import { LegendComponent } from './legend.component';

export default {
	title: 'Components/Form/Legend',
	component: LegendComponent,

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
