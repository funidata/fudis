import { StoryFn, Meta } from '@storybook/angular';
import { HeadingComponent } from './heading.component';
import readme from './readme.mdx';

export default {
	title: 'Components/Typography/Heading',
	component: HeadingComponent,
	parameters: {
		docs: {
			page: readme,
		},
		controls: {
			exclude: ['_classList', '_id', 'mainClass', 'id', 'getHeadingMarginBottom', 'ngOnInit'],
		},
	},
} as Meta;

const html = String.raw;

const Template: StoryFn<HeadingComponent> = (args: HeadingComponent) => ({
	props: args,
	template: html`
		<fudis-heading [tag]="tag" [size]="size" [marginBottom]="marginBottom">This is Fudis heading</fudis-heading>
	`,
});

export const Heading = Template.bind({});
Heading.args = {
	tag: 'h1',
	size: 'lg',
	marginBottom: 'xs',
};

export const AllVariants: StoryFn = () => ({
	template: html`
		<fudis-grid>
			<fudis-heading [tag]="'h1'" [size]="'xxl'">This is Fudis heading: xxl</fudis-heading>
			<fudis-heading [tag]="'h2'" [size]="'xl'">This is Fudis heading: xl</fudis-heading>
			<fudis-heading [tag]="'h2'" [size]="'lg'">This is Fudis heading: lg</fudis-heading>
			<fudis-heading [tag]="'h3'" [size]="'md'">This is Fudis heading: md</fudis-heading>
			<fudis-heading [tag]="'h4'" [size]="'sm'">This is Fudis heading: sm</fudis-heading>
			<fudis-heading [tag]="'h5'" [size]="'xs'">This is Fudis heading: xs</fudis-heading>
			<fudis-heading [tag]="'h6'" [size]="'xxs'">This is Fudis heading: xxs</fudis-heading>
		</fudis-grid>
	`,
});
