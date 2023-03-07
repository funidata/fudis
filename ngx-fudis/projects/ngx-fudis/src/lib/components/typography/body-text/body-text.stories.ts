import { Story, Meta } from '@storybook/angular/types-6-0';
import { BodyTextComponent } from './body-text.component';
import readme from './readme.mdx';

export default {
	title: 'Components/Typography/BodyText',
	component: BodyTextComponent,
	parameters: {
		docs: {
			page: readme,
		},
	},
	argTypes: {
		marginBottom: {
			options: [0, 'm', 'l'],
			control: { type: 'radio' },
		},
	},
} as Meta;

const Template: Story = (args) => ({
	props: args,
	template: `
	<fudis-grid width="m" align="left">
		<div>
			<fudis-body-text [size]="size" [marginBottom]="marginBottom">{{content}}</fudis-body-text>
			<fudis-body-text [size]="size" [marginBottom]="marginBottom">{{content}}</fudis-body-text>
		</div>
	</fudis-grid>`,
});

export const BodyText = Template.bind({});
BodyText.args = {
	size: 'l-regular',
	marginBottom: 'm',
	content:
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
};
