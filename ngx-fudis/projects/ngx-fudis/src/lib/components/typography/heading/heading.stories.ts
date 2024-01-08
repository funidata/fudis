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

const Template: StoryFn = (args) => ({
  props: args,
  template: `
		<fudis-heading [level]="level" [size]="size" [marginBottom]="marginBottom" [align]="align">This is Fudis heading</fudis-heading>
	`,
});

export const Heading = Template.bind({});
Heading.args = {
  level: 1,
  size: 'lg',
  align: 'left',
  marginBottom: 'xs',
};

export const AllVariants: StoryFn = () => ({
  template: `
		<fudis-grid>
			<fudis-heading [level]="1">This is Fudis heading: xxl</fudis-heading>
			<fudis-heading [level]="2">This is Fudis heading: xl</fudis-heading>
			<fudis-heading [level]="3">This is Fudis heading: lg</fudis-heading>
			<fudis-heading [level]="4">This is Fudis heading: md</fudis-heading>
			<fudis-heading [level]="5">This is Fudis heading: sm</fudis-heading>
			<fudis-heading [level]="6">This is Fudis heading: xs</fudis-heading>
			<fudis-heading [level]="6" [size]="'xxs'">This is Fudis heading: xxs</fudis-heading>
		</fudis-grid>
	`,
});
