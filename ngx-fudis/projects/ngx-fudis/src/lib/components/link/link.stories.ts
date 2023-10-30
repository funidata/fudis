import { StoryFn, Meta } from '@storybook/angular';
import { LinkComponent } from './link.component';
import readme from './readme.mdx';

export default {
	title: 'Components/Link',
	component: LinkComponent,
	parameters: {
		docs: {
			page: readme,
		},
		controls: {
			exclude: ['fragmentId', 'initialFocus'],
		},
	},
} as Meta;

const Template: StoryFn<LinkComponent> = (args: LinkComponent) => ({
	props: args,
});

export const Link = Template.bind({});
Link.args = {
	href: 'https://www.example.com',
};

export const ExternalLink = Template.bind({});
ExternalLink.args = {
	href: 'https://www.example.com',
	isExternalLink: true,
};

export const LinkWithTitle = Template.bind({});
LinkWithTitle.args = {
	href: 'https://www.example.com',
	linkTitle: 'Visible title for my link',
};
