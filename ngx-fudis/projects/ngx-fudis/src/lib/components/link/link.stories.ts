import { Story, Meta } from '@storybook/angular/types-6-0';
import { LinkComponent } from './link.component';

export default {
	title: 'Components/Link',
	component: LinkComponent,
} as Meta;

const Template: Story<LinkComponent> = (args: LinkComponent) => ({
	props: args,
});

export const Link = Template.bind({});
Link.args = {
	href: 'https://www.example.com',
};
