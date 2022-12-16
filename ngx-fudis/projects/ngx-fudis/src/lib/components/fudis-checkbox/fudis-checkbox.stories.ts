import { Story, Meta } from '@storybook/angular/types-6-0';
import { FudisCheckboxComponent } from './fudis-checkbox.component';

export default {
	title: 'Components/FudisCheckbox',
	component: FudisCheckboxComponent,
} as Meta;

const Template: Story<FudisCheckboxComponent> = (args: FudisCheckboxComponent) => ({
	props: args,
});

export const FudisCheckbox = Template.bind({});
FudisCheckbox.args = {
	disabled: false,
	required: true,
	label: 'Jeejee olen natiivi checkbox',
};
