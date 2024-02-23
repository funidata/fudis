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
  },
  argTypes: {
    color: {
      options: [
        'yellow',
        'red',
        'gray-dark',
        'gray-light',
        'primary',
        'primary-dark',
        'green',
        'white',
      ],
    },
    icon: {
      options: fudisIconArray,
    },
    rotate: {
      options: ['flip-180', 'cw-90', 'ccw-90', 'none'],
    },
  },
} as Meta;

const Template: StoryFn<IconComponent> = (args: IconComponent) => ({
  props: args,
});

export const Example = Template.bind({});
Example.args = {
  icon: 'achievement',
  color: 'gray-dark',
  rotate: 'none',
};

export const AllIcons: StoryFn<IconComponent> = (args: IconComponent) => ({
  props: {
    fudisIconArray,
    ...args,
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

AllIcons.parameters = {
  controls: {
    exclude: /.*/g,
  },
};
