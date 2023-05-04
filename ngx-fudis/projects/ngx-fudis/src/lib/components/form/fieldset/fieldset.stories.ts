import { StoryFn, Meta } from '@storybook/angular';

import { FieldsetComponent } from './fieldset.component';

export default {
	title: 'Components/Form/Fieldset',
	component: FieldsetComponent,

	argTypes: {},
	parameters: {
		controls: {
			exclude: ['control'],
		},
	},
} as Meta;

export const Example: StoryFn = () => ({
	template: `
	<form>
	<fudis-fieldset></fudis-fieldset>
	</form>

	`,
});
