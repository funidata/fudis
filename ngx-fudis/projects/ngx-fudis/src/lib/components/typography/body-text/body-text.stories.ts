import { StoryFn, Meta } from '@storybook/angular';
import { BodyTextComponent } from './body-text.component';
import readme from './readme.mdx';

export default {
	title: 'Components/Typography/Body Text',
	component: BodyTextComponent,
	parameters: {
		docs: {
			page: readme,
		},
	},
} as Meta;

const Template: StoryFn = (args) => ({
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

export const AllVariants: StoryFn = () => ({
	template: `
	<fudis-grid columns="1fr 1fr" align="left">
	<fudis-body-text [size]="'l-regular'">This paragraph has l-regular font size. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </fudis-body-text>
	<fudis-body-text [size]="'l-light'">This paragraph has l-light font size. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</fudis-body-text>
	<fudis-body-text [size]="'m-regular'">This paragraph has m-regular font size. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</fudis-body-text>
	<fudis-body-text [size]="'m-light'">This paragraph has m-light font size. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</fudis-body-text>
	<fudis-body-text [size]="'s-regular'">This paragraph has s-regular font size. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</fudis-body-text>
	</fudis-grid>
	`,
});
