// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0';
import { HeadingComponent } from './heading.component';

export default {
	title: 'Components/Typography/Heading',
	component: HeadingComponent,
} as Meta;

const Template: Story<HeadingComponent> = (args: HeadingComponent) => ({
	props: args,
	template: `
  <fudis-heading [tag]="tag" [size]="size">{{text}}</fudis-heading>
`,
});

export const Heading = Template.bind({});
Heading.args = {
	tag: 'h1',
	size: 'xl',
	text: 'I am a heading component!',
};
