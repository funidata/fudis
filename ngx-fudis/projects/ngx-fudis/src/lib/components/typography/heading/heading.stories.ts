import { StoryFn, Meta } from '@storybook/angular';
import { HeadingComponent } from './heading.component';
import readme from './readme.mdx';
import { headingControlsExclude } from '../../../utilities/storybook';
import { fudisHeadingLevelArray, fudisHeadingVariantArray } from '../../../types/typography';
import { fudisSpacingArray } from '../../../types/spacing';

const html = String.raw;

export default {
  title: 'Components/Typography/Heading',
  component: HeadingComponent,
  parameters: {
    docs: {
      page: readme,
    },
  },
  argTypes: {
    level: {
      options: fudisHeadingLevelArray,
      control: { type: 'select' },
    },
    size: { options: fudisHeadingVariantArray },
    align: { options: ['left', 'right', 'center'] },
    marginBottom: { options: fudisSpacingArray },
  },
} as Meta;

const Template: StoryFn = (args) => ({
  props: args,
  template: html`
    <fudis-heading [level]="level" [size]="size" [marginBottom]="marginBottom" [align]="align"
      >This is Fudis heading. Size is: '{{size}}' and rendered element is:
      'h{{level}}'</fudis-heading
    >
  `,
});

export const Example = Template.bind({});
Example.args = {
  level: 1,
  size: 'lg',
  align: 'left',
  marginBottom: 'xs',
};

Example.parameters = {
  controls: {
    exclude: headingControlsExclude,
  },
};

export const AllVariants: StoryFn<HeadingComponent> = (args: HeadingComponent) => ({
  props: args,
  template: html`
    <fudis-grid>
      <fudis-heading [level]="1">This is Fudis heading: xxl</fudis-heading>
      <fudis-heading [level]="2">This is Fudis heading: xl</fudis-heading>
      <fudis-heading [level]="3">This is Fudis heading: lg</fudis-heading>
      <fudis-heading [level]="4">This is Fudis heading: md</fudis-heading>
      <fudis-heading [level]="5">This is Fudis heading: sm</fudis-heading>
      <fudis-heading [level]="6">This is Fudis heading: xs</fudis-heading>
      <fudis-heading [level]="6" [size]="'xxs'">This is Fudis heading: xxs</fudis-heading>
    </fudis-grid>
  `,
});

AllVariants.parameters = {
  controls: {
    exclude: /.*/g,
  },
};
