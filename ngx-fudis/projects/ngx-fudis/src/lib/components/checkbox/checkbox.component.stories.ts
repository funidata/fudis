import { Story, Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CheckboxComponent } from './checkbox.component';

export default {
	title: 'Components/Checkbox',
	component: CheckboxComponent,
	decorators: [
		moduleMetadata({
			imports: [MatCheckboxModule],
		}),
	],
	argTypes: {},
} as Meta;

const Template: Story<CheckboxComponent> = (args: CheckboxComponent) => ({
	props: args,
});

export const Checkbox = Template.bind({});
Checkbox.args = {
	name: 'checkbox 1',
	disabled: false,
	checked: true,
	required: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
	name: 'checkbox 2',
	disabled: true,
};

export const MultipleCheckboxes = () => ({
	template: `\
			<fudis-checkbox name="eka" required="true">Tämä on checkki 1 checked</fudis-checkbox>
			<fudis-checkbox name="toka" required="false">Tämä on checkki 2</fudis-checkbox>
`,
});
