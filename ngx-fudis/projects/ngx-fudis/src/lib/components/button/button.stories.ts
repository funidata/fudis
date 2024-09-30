import { StoryFn, Meta } from '@storybook/angular';
import { ButtonComponent } from './button.component';
import docs from './button.mdx';
import { buttonControlsExclude, buttonIconOnlyExclude } from '../../utilities/storybook';
import { fudisIconArray } from '../../types/icons';

export default {
  title: 'Components/Button',
  component: ButtonComponent,
  parameters: {
    docs: {
      page: docs,
    },
    controls: {
      exclude: buttonControlsExclude,
    },
  },
  argTypes: {
    size: {
      options: ['medium', 'small', 'icon-only'],
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
    tooltip: {
      control: { type: 'text' },
    },
    tooltipPosition: {
      options: ['left', 'right', 'above', 'below'],
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
});

export const Example = Template.bind({});
Example.args = {
  variant: 'primary',
  label: 'Button',
  ariaLabel: undefined,
  size: 'medium',
  icon: undefined,
  iconRotate: undefined,
  disabled: false,
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  variant: 'secondary',
  label: 'Icon Button',
  ariaLabel: undefined,
  size: 'medium',
  icon: 'search',
  iconRotate: undefined,
  disabled: false,
};

export const IconOnly = Template.bind({});
IconOnly.args = {
  variant: 'secondary',
  label: 'Search button',
  ariaLabel: undefined,
  size: 'medium',
  icon: 'search',
  iconRotate: undefined,
  labelHidden: true,
  disabled: false,
};

IconOnly.parameters = {
  controls: {
    exclude: buttonIconOnlyExclude,
  },
};

export const AllVariants: StoryFn<ButtonComponent> = (args: ButtonComponent) => ({
  props: args,
  template: html`
    <fudis-grid
      [classes]="'fudis-mb-md'"
      [columns]="{xs:2, md: 4}"
      [align]="'start'"
      [rowGap]="'xs'"
    >
      <fudis-heading [level]="4" [variant]="'sm'">Medium size buttons</fudis-heading>
      <fudis-button variant="primary" label="Primary"></fudis-button>
      <fudis-button variant="secondary" label="Secondary"></fudis-button>
      <fudis-button variant="tertiary" label="Tertiary"></fudis-button>
      <fudis-button label="Disabled" [disabled]="true"></fudis-button>

      <fudis-heading class="fudis-mt-lg" [level]="4" [variant]="'sm'"
        >Medium size buttons with icon</fudis-heading
      >
      <fudis-button variant="primary" icon="search" label="Primary"></fudis-button>
      <fudis-button variant="secondary" icon="search" label="Secondary"></fudis-button>
      <fudis-button variant="tertiary" icon="search" label="Tertiary"></fudis-button>
      <fudis-button label="Disabled" icon="search" [disabled]="true"></fudis-button>

      <fudis-heading class="fudis-mt-lg" [level]="4" [variant]="'sm'"
        >Small size buttons</fudis-heading
      >
      <fudis-button variant="primary" label="Primary" size="small"></fudis-button>
      <fudis-button variant="secondary" label="Secondary" size="small"></fudis-button>
      <fudis-button variant="tertiary" label="Tertiary" size="small"></fudis-button>
      <fudis-button label="Disabled" [disabled]="true" size="small"></fudis-button>

      <fudis-heading class="fudis-mt-lg" [level]="4" [variant]="'sm'"
        >Small size buttons with icons</fudis-heading
      >
      <fudis-button variant="primary" icon="search" label="Primary" size="small"></fudis-button>
      <fudis-button variant="secondary" icon="search" label="Secondary" size="small"></fudis-button>
      <fudis-button variant="tertiary" icon="search" label="Tertiary" size="small"></fudis-button>
      <fudis-button label="Disabled" icon="search" [disabled]="true" size="small"></fudis-button>

      <fudis-heading class="fudis-mt-lg" [level]="4" [variant]="'sm'"
        >Medium sized buttons with label hidden</fudis-heading
      >
      <fudis-button
        variant="primary"
        [labelHidden]="true"
        icon="search"
        label="Primary"
      ></fudis-button>
      <fudis-button
        variant="secondary"
        [labelHidden]="true"
        icon="search"
        label="Secondary"
      ></fudis-button>
      <fudis-button
        variant="tertiary"
        [labelHidden]="true"
        icon="search"
        label="Tertiary"
      ></fudis-button>
      <fudis-button
        label="Disabled"
        [labelHidden]="true"
        icon="search"
        [disabled]="true"
      ></fudis-button>

      <fudis-heading class="fudis-mt-lg" [level]="4" [variant]="'sm'"
        >Small sized buttons with label hidden</fudis-heading
      >
      <fudis-button
        variant="primary"
        [labelHidden]="true"
        icon="search"
        label="Primary"
        size="small"
      ></fudis-button>
      <fudis-button
        variant="secondary"
        [labelHidden]="true"
        icon="search"
        label="Secondary"
        size="small"
      ></fudis-button>
      <fudis-button
        variant="tertiary"
        [labelHidden]="true"
        icon="search"
        label="Tertiary"
        size="small"
      ></fudis-button>
      <fudis-button
        label="Disabled"
        [labelHidden]="true"
        icon="search"
        [disabled]="true"
        size="small"
      ></fudis-button>

      <fudis-heading class="fudis-mt-lg" [level]="4" [variant]="'sm'"
        >Icon only sized buttons with label hidden</fudis-heading
      >
      <fudis-button
        variant="primary"
        [labelHidden]="true"
        icon="search"
        label="Primary"
        size="icon-only"
      ></fudis-button>
      <fudis-button
        variant="secondary"
        [labelHidden]="true"
        icon="search"
        label="Secondary"
        size="icon-only"
      ></fudis-button>
      <fudis-button
        variant="tertiary"
        [labelHidden]="true"
        icon="search"
        label="Tertiary"
        size="icon-only"
      ></fudis-button>
      <fudis-button
        label="Disabled"
        [labelHidden]="true"
        icon="search"
        [disabled]="true"
        size="icon-only"
      ></fudis-button>
    </fudis-grid>
  `,
});

AllVariants.parameters = {
  controls: {
    exclude: /.*/g,
  },
};
