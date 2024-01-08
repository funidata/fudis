import { StoryFn, Meta } from '@storybook/angular';
import { IconComponent } from './icon.component';
import { fudisIconArray } from '../../types/icons';
import readme from './readme.mdx';

export default {
  title: 'Components/Icon',
  component: IconComponent,
  parameters: {
    docs: {
      page: readme,
    },
    controls: {
      exclude: ['_iconSize', 'classes', '_classList', '_getClasses', 'ngOnChanges'],
    },
  },
  argTypes: {},
} as Meta;

const Template: StoryFn<IconComponent> = (args: IconComponent) => ({
  props: args,
});

export const Icon = Template.bind({});
Icon.args = {
  icon: 'achievement',
  color: 'default',
};

export const AllIcons: StoryFn = () => ({
  props: {
    fudisIconArray,
  },
  template: `
	<fudis-grid [columns]="{xs:2, md: 3, lg: 4}" [width]="'sm'">
		<div class="storybook-flex" style="margin: 0.25rem; justify-content: space-between;" *ngFor="let icon of fudisIconArray;">
		<fudis-body-text>{{icon}}</fudis-body-text>
		<fudis-icon [icon]="icon"></fudis-icon>
		</div>
	</fudis-grid>
	`,
});
