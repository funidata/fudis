import { Story, Meta } from '@storybook/angular/types-6-0';
import { BodyTextComponent } from './body-text.component';

export default {
	title: 'Components/Typography/BodyText',
	component: BodyTextComponent,
} as Meta;

const Template: Story<BodyTextComponent> = () => ({
	template: `
  <fudis-body-text size="m-regular">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
  quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
  eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</fudis-body-text>
`,
});

export const BodyText = Template.bind({});
BodyText.args = {
	size: 'l-regular',
};
