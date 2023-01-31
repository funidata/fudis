import { Story, Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { ExpandableComponent } from './expandable.component';
import { ExpandableType } from '../../types/expandables';
import { IconComponent } from '../icon/icon.component';

export default {
	title: 'Components/Expandable',
	component: ExpandableComponent,
	decorators: [
		moduleMetadata({
			declarations: [IconComponent],
		}),
	],
	argTypes: {},
	parameters: {
		controls: {
			exclude: ['_collapsed', 'openedOnce', 'ref', 'collapsedChange', 'setCollapsedStatus', 'content'],
		},
	},
} as Meta;

const Template: Story<ExpandableComponent> = (args: ExpandableComponent) => ({
	props: args,
});

export const Expandable = Template.bind({});
Expandable.args = {
	variant: ExpandableType.regular,
	title: 'Regular expandable',
	subTitle: 'This is my sub title for extra info',
	contentText: 'Hey you! I am the content of the expandable.',
};
