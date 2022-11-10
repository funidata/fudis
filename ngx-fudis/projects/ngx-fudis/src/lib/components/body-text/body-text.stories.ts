import { Story, Meta } from '@storybook/angular/types-6-0';
import { BodyTextComponent } from './body-text.component';

export default {
	title: 'Components/BodyText',
	component: BodyTextComponent,
} as Meta;

const Template: Story<BodyTextComponent> = (args: BodyTextComponent) => ({
	props: args,
});

export const BodyTextExample = Template.bind({});
// More on args: https://storybook.js.org/docs/angular/writing-stories/args
BodyTextExample.args = {
	size: 'l-regular',
};

export const AllTypes = () => ({
	template: `\
<div style="margin: auto">
  <fudis-body-text size="m-regular">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
  quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
  eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</fudis-body-text>
</div>`,
});
// AllTypes.parameters = {
//   design: {
//       type: 'figma',
//       url: 'https://www.figma.com/file/rLAoBj467NbhUreR36a0tr/Sisu-UI-kit?node-id=79%3A175',
//   },
//   controls: { hideNoControlsWarning: true },
// };
// AllTypes.storyName = 'All types (Figma)';
