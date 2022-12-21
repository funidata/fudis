import { Story, Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { IconComponent } from './icon.component';

export default {
	title: 'Components/Icon',
	component: IconComponent,
	decorators: [
		moduleMetadata({
			imports: [],
		}),
	],
	argTypes: {
		rotate: {
			options: ['flip-180', 'cw-90', 'ccw-90'],
			control: { type: 'text' },
		},
	},
} as Meta;

const Template: Story<IconComponent> = (args: IconComponent) => ({
	props: args,
});

export const InteractiveAllIcons = Template.bind({});
InteractiveAllIcons.args = {
	icon: 'achievement',
	color: 'default',
};
