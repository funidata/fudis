import { Story, Meta, moduleMetadata } from '@storybook/angular';
import { BadgeComponent } from './badge.component';

export default {
	title: 'Components/Badge',
	component: BadgeComponent,
	decorators: [
		moduleMetadata({
			imports: [],
		}),
	],
	argTypes: {},
} as Meta;

const Template: Story<BadgeComponent> = (args: BadgeComponent) => ({
	props: args,
});

export const Badge = Template.bind({});
Badge.args = {
	variant: 'primary',
	content: 'Badge',
};
