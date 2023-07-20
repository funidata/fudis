import { StoryFn, Meta } from '@storybook/angular';
import { BadgeComponent } from './badge.component';
import readme from './readme.mdx';

export default {
	title: 'Components/Badge',
	component: BadgeComponent,
	parameters: {
		docs: {
			page: readme,
		},
	},
	argTypes: {},
} as Meta;

const Template: StoryFn<BadgeComponent> = (args: BadgeComponent) => ({
	props: args,
});

const html = String.raw;

export const Badge = Template.bind({});
Badge.args = {
	variant: 'primary',
	content: 'Badge',
};

export const AllVariants: StoryFn = () => ({
	template: html`
		<fudis-grid rowGap="sm">
			<fudis-badge [variant]="'accent'" [content]="'accent'"></fudis-badge>
			<fudis-badge [variant]="'danger'" [content]="'danger'"></fudis-badge>
			<fudis-badge [variant]="'primary'" [content]="'primary'"></fudis-badge>
			<fudis-badge [variant]="'secondary'" [content]="'secondary'"></fudis-badge>
			<fudis-badge [variant]="'success'" [content]="'success'"></fudis-badge>
		</fudis-grid>
	`,
});
