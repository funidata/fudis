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

export const Primary = Template.bind({});
Primary.args = {
	name: 'öööö!',
};