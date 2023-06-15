// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { StoryFn, Meta } from '@storybook/angular';
import { HeadingComponent } from './heading.component';

export default {
	title: 'Components/Typography/Heading',
	component: HeadingComponent,
} as Meta;

const Template: StoryFn<HeadingComponent> = (args: HeadingComponent) => ({
	props: args,
	template: `
  <fudis-heading [tag]="tag" [size]="size">I am a heading component!</fudis-heading>
`,
});

export const Heading = Template.bind({});
Heading.args = {
	tag: 'h1',
	size: 'xl',
};
