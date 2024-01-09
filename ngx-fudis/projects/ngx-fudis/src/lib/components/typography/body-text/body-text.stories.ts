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
	<fudis-grid [width]="'md'" [align]="'start'">
		<div>
			<fudis-body-text [size]="size" [marginBottom]="marginBottom" [align]="align">{{content}}</fudis-body-text>
			<fudis-body-text [size]="size" [marginBottom]="marginBottom" [align]="align">{{content}}</fudis-body-text>
		</div>
	</fudis-grid>`,
});

export const BodyText = Template.bind({});
BodyText.args = {
  size: 'lg-regular',
  marginBottom: 'md',
  align: 'left',
  content:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
};

export const AllVariants: StoryFn = () => ({
  template: `
	<fudis-grid columns="1fr 1fr" [align]="'start'">
	<fudis-body-text [size]="'lg-regular'">This paragraph has lg-regular font size. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </fudis-body-text>
	<fudis-body-text [size]="'lg-light'">This paragraph has lg-light font size. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</fudis-body-text>
	<fudis-body-text [size]="'md-regular'">This paragraph has md-regular font size. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</fudis-body-text>
	<fudis-body-text [size]="'md-light'">This paragraph has md-light font size. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</fudis-body-text>
	<fudis-body-text [size]="'sm-regular'">This paragraph has sm-regular font size. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</fudis-body-text>
	</fudis-grid>
	`,
});
