// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { MatButtonModule } from '@angular/material/button';
import { ButtonComponent } from './button.component';

// More on default export: https://storybook.js.org/docs/angular/writing-stories/introduction#default-export
export default {
	title: 'Components/Button',
	component: ButtonComponent,
	decorators: [
		moduleMetadata({
			imports: [MatButtonModule],
		}),
	],
	// More on argTypes: https://storybook.js.org/docs/angular/api/argtypes
	argTypes: {},
} as Meta;

// More on component templates: https://storybook.js.org/docs/angular/writing-stories/introduction#using-args
const Template: Story<ButtonComponent> = (args: ButtonComponent) => ({
	props: args,
});

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/angular/writing-stories/args
Primary.args = {
	variant: 'primary',
	label: 'Button',
};

export const Secondary = Template.bind({});
Secondary.args = {
	variant: 'secondary',
	label: 'Button',
};

export const Tertiary = Template.bind({});
Tertiary.args = {
	variant: 'tertiary',
	label: 'Button',
};

export const TextOnly = Template.bind({});
TextOnly.args = {
	variant: 'text-only',
	label: 'Button',
};

export const Disabled = Template.bind({});
Disabled.args = {
	label: 'Button',
	disabled: true,
};
