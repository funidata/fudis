import { StoryFn, Meta } from '@storybook/angular';
import { IconComponent } from './icon.component';
import { fudisIconArray } from '../../types/icons';
import { excludeEverythingExceptRegex } from '../../utilities/storybook';
import readme from './readme.mdx';

const html = String.raw;

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
  template: html`
    <fudis-grid [columns]="{xs:2, md: 3, lg: 4}" [width]="'sm'">
      <div
        class="storybook-flex fudis-my-xxs fudis-mx-xxs"
        style="justify-content: space-between;"
        *ngFor="let icon of fudisIconArray;"
      >
        <fudis-body-text>{{icon}}</fudis-body-text>
        <fudis-icon [color]="color" [rotate]="rotate" [icon]="icon"></fudis-icon>
      </div>
    </fudis-grid>
  `,
});

AllIcons.args = {
  color: 'gray-dark',
  rotate: 'none',
};

AllIcons.parameters = {
  controls: {
    exclude: excludeEverythingExceptRegex(['color', 'rotate']),
  },
};
