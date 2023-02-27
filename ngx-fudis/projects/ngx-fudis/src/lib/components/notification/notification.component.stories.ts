import { Story, Meta } from '@storybook/angular/types-6-0';
import { NotificationComponent } from './notification.component';
import readme from './readme.mdx';

export default {
	title: 'Components/NoticationComponent',
	component: NotificationComponent,
	parameters: {
		docs: {
			page: readme,
		},
	},
	argTypes: {
		icon: {
			control: { type: 'text' },
		},
	},
} as Meta;

const Template: Story = (args) => ({
	props: args,
	template: `<fudis-notification [variant]="variant" [link]="link" [linkTitle]="linkTitle" [externalLink]="externalLink" [externalLinkAriaLabel]="externalLinkAriaLabel">{{content}}</fudis-notification>`,
});

export const Notification = Template.bind({});
Notification.args = {
	variant: 'warning',
	content: 'Jeejee',
};

export const LinkNotification = Template.bind({});
LinkNotification.args = {
	variant: 'warning',
	content: 'This link leads to another site.',
	linkTitle: 'example',
	link: 'https://www.example.com',
	externalLink: true,
	externalLinkAriaLabel: 'Link to another page',
};

export const AllVariants: Story = () => ({
	template: `
	<fudis-grid align="left" width="m">
		<fudis-notification variant="warning">Note! Please don't do this, okey? </fudis-notification>
		<fudis-notification variant="danger">Whoops! Some error happened. </fudis-notification>
		<fudis-notification variant="success">You succeeded!</fudis-notification>
		<fudis-notification variant="light">This is a totally neutral message</fudis-notification>
	</fudis-grid>
	`,
});
