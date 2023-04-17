import { StoryFn, Meta } from '@storybook/angular';
import { LinkComponent } from './link.component';

export default {
	title: 'Components/Link',
	component: LinkComponent,
} as Meta;

const Template: StoryFn<LinkComponent> = (args: LinkComponent) => ({
	props: args,
});

export const Link = Template.bind({});
Link.args = {
	href: 'https://www.example.com',
};
