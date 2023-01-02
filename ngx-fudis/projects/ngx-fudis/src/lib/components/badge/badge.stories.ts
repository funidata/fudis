import { Story, Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
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

export const InteractiveBadge = Template.bind({});
InteractiveBadge.args = {
	variant: 'primary',
	content: 'Badge',
};
