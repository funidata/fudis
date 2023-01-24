import { Story, Meta } from '@storybook/angular/types-6-0';
import { CheckboxComponent } from './checkbox.component';

export default {
	title: 'Components/Form/Checkbox',
	component: CheckboxComponent,
} as Meta;

const Template: Story<CheckboxComponent> = (args: CheckboxComponent) => ({
	props: args,
});

export const Checkbox = Template.bind({});
Checkbox.args = {
	disabled: false,
	required: true,
	label: 'Jeejee olen natiivi checkbox',
};
