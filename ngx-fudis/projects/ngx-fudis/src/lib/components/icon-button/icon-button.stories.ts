import { Meta, StoryFn } from '@storybook/angular';
import { IconButtonComponent } from './icon-button.component';
import { fudisIconArray } from '../../types/icons';
import docs from './icon-button.mdx';
import { buttonIconOnlyExclude } from '../../utilities/storybook';

export default {
  title: 'Components/IconButton',
  component: IconButtonComponent,
  parameters: {
    docs: {
      page: docs,
    },
    controls: {
      exclude: buttonIconOnlyExclude,
    },
  },
  argTypes: {
    size: {
      options: ['medium', 'small', 'extra-small'],
      control: { type: 'radio' },
    },
    variant: {
      options: ['primary', 'secondary', 'tertiary'],
      control: { type: 'radio' },
    },
    icon: {
      options: fudisIconArray,
      controls: { type: 'select' },
    },
    iconRotate: {
      options: ['flip-180', 'cw-90', 'ccw-90', 'none'],
      control: { type: 'select' },
    },
    ariaLabel: {
      control: { type: 'text' },
    },
  },
} as Meta;

const html = String.raw;

const Template: StoryFn = (args) => ({
  props: args,
  template: html`
    <fudis-icon-button
      [ariaLabel]="ariaLabel"
      [icon]="icon"
      [iconRotate]="iconRotate"
      [size]="size"
      [variant]="variant"
      [disabled]="disabled"
      [popoverPosition]="popoverPosition"
      [popoverText]="popoverText"
    ></fudis-icon-button>
  `,
});

export const Example = Template.bind({});

Example.args = {
  icon: 'search',
  iconRotate: 'cw-90',
  size: 'extra-small',
  variant: 'primary',
  ariaLabel: 'Search',
  disabled: false,
  popoverPosition: 'below',
  popoverText: 'popover',
};

export const AllVariants: StoryFn = (args) => ({
  props: args,
  template: html`
    <fudis-grid
      [classes]="'fudis-mb-md'"
      [columns]="{xs:2, md: 4}"
      [align]="'start'"
      [rowGap]="'xs'"
    >
      <fudis-heading class="fudis-mt-lg" [level]="4" [variant]="'sm'"
        >Medium sized icon buttons</fudis-heading
      >
      <fudis-icon-button
        [variant]="'primary'"
        [icon]="'search'"
        [ariaLabel]="'Primary'"
      ></fudis-icon-button>
      <fudis-icon-button
        [variant]="'secondary'"
        [icon]="'search'"
        [ariaLabel]="'Secondary'"
      ></fudis-icon-button>
      <fudis-icon-button
        [variant]="'tertiary'"
        [icon]="'search'"
        [ariaLabel]="'Tertiary'"
      ></fudis-icon-button>
      <fudis-icon-button
        [ariaLabel]="'Disabled'"
        [icon]="'search'"
        [disabled]="true"
      ></fudis-icon-button>

      <fudis-heading class="fudis-mt-lg" [level]="4" [variant]="'sm'"
        >Small sized icon buttons</fudis-heading
      >
      <fudis-icon-button
        [variant]="'primary'"
        [icon]="'search'"
        [ariaLabel]="'Primary'"
        [size]="'small'"
      ></fudis-icon-button>
      <fudis-icon-button
        [variant]="'secondary'"
        [icon]="'search'"
        [ariaLabel]="'Secondary'"
        [size]="'small'"
      ></fudis-icon-button>
      <fudis-icon-button
        [variant]="'tertiary'"
        [icon]="'search'"
        [ariaLabel]="'Tertiary'"
        [size]="'small'"
      ></fudis-icon-button>
      <fudis-icon-button
        [ariaLabel]="'Disabled'"
        [icon]="'search'"
        [disabled]="true"
        [size]="'small'"
      ></fudis-icon-button>

      <fudis-heading class="fudis-mt-lg" [level]="4" [variant]="'sm'"
        >Extra small sized icon buttons</fudis-heading
      >
      <fudis-icon-button
        [variant]="'primary'"
        [icon]="'search'"
        [ariaLabel]="'Primary'"
        [size]="'extra-small'"
      ></fudis-icon-button>
      <fudis-icon-button
        [variant]="'secondary'"
        [icon]="'search'"
        [ariaLabel]="'Secondary'"
        [size]="'extra-small'"
      ></fudis-icon-button>
      <fudis-icon-button
        [variant]="'tertiary'"
        [icon]="'search'"
        [ariaLabel]="'Tertiary'"
        [size]="'extra-small'"
      ></fudis-icon-button>
      <fudis-icon-button
        [ariaLabel]="'Disabled'"
        [icon]="'search'"
        [disabled]="true"
        [size]="'extra-small'"
      ></fudis-icon-button>
    </fudis-grid>
  `,
});

AllVariants.parameters = {
  controls: {
    exclude: /.*/g,
  },
};
