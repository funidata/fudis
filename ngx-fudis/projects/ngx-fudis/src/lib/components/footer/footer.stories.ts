import { Meta, StoryFn } from '@storybook/angular';
import { FooterComponent } from './footer.component';

export default {
	title: 'Components/Footer',
	component: FooterComponent,
	argTypes: {},
} as Meta;

const Template: StoryFn = () => ({
	template: `
	<fudis-footer></fudis-footer>
	`,
});

export const Footer = Template.bind({});
