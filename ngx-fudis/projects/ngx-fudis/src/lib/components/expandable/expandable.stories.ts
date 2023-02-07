import { Story, Meta } from '@storybook/angular/types-6-0';
import { ExpandableComponent } from './expandable.component';
import { ExpandableType } from '../../types/expandables';

export default {
	title: 'Components/Expandable',
	component: ExpandableComponent,
	argTypes: {
		tag: {
			options: ['h2', 'h3', 'h4', 'h5', 'h6'],
			control: { type: 'radio' },
		},
	},
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
	collapsed: true,
};
