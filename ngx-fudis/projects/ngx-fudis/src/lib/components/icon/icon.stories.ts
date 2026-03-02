import { StoryFn, Meta } from '@storybook/angular';
import { IconComponent } from './icon.component';
import { fudisIconArray } from '../../types/icons';
import { excludeEverythingExceptRegex } from '../../utilities/storybook';
import docs from './icon.mdx';

const html = String.raw;

export default {
  title: 'Components/Icon',
  component: IconComponent,
  parameters: {
    docs: {
      page: docs,
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

const Template: StoryFn = (args) => ({
  props: args,
});

export const Example = Template.bind({});
Example.args = {
  icon: 'achievement',
  color: 'gray-dark',
  rotate: 'none',
};

Example.parameters = {
  controls: {
    exclude: excludeEverythingExceptRegex(['icon', 'color', 'rotate']),
  },
};

export const AllIcons: StoryFn = (args) => ({
  props: {
    fudisIconArray,
    ...args,
  },
  template: html`
    <fudis-grid [columns]="{xs:2, md: 3, lg: 4}" [width]="'sm'">
      @for (icon of fudisIconArray; track icon) {
      <div class="storybook-flex fudis-my-xxs fudis-mx-xxs" style="justify-content: space-between;">
        <fudis-body-text>{{icon}}</fudis-body-text>
        <fudis-icon [color]="color" [rotate]="rotate" [icon]="icon"></fudis-icon>
      </div>
      }
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
