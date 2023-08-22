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
		<fudis-heading [level]="level" [size]="size" [marginBottom]="marginBottom">This is Fudis heading</fudis-heading>
	`,
});

export const Heading = Template.bind({});
Heading.args = {
	level: 1,
	size: 'lg',
	marginBottom: 'xs',
};

export const AllVariants: StoryFn = () => ({
	template: html`
		<fudis-grid>
			<fudis-heading [level]="1" [size]="'xxl'">This is Fudis heading: xxl</fudis-heading>
			<fudis-heading [level]="2" [size]="'xl'">This is Fudis heading: xl</fudis-heading>
			<fudis-heading [level]="3" [size]="'lg'">This is Fudis heading: lg</fudis-heading>
			<fudis-heading [level]="4" [size]="'md'">This is Fudis heading: md</fudis-heading>
			<fudis-heading [level]="4" [size]="'sm'">This is Fudis heading: sm</fudis-heading>
			<fudis-heading [level]="5" [size]="'xs'">This is Fudis heading: xs</fudis-heading>
			<fudis-heading [level]="6" [size]="'xxs'">This is Fudis heading: xxs</fudis-heading>
		</fudis-grid>
	`,
});
