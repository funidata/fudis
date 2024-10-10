import { StoryFn, Meta } from '@storybook/angular';
import { ButtonComponent } from '../../components/button/button.component';
import { spacingExclude } from '../../utilities/storybook';
import docs from './CSS-helper-classes.mdx';

export default {
  title: 'Foundations/Spacing/CSS Helper Classes',
  component: ButtonComponent,
  parameters: {
    docs: {
      page: docs,
    },
    controls: {
      exclude: spacingExclude,
    },
  },
} as Meta;

const html = String.raw;

const ExampleTemplate: StoryFn = (args) => ({
  template: html`
    <fudis-body-text [variant]="'lg-regular'"
      >This Fudis Button uses <strong>Fudis CSS Helper Classes</strong> with responsive margins and
      paddings for different screen sizes. Check what happens to the button container when you
      switch between different class values while resizing the browser window.</fudis-body-text
    >
    <fudis-body-text [variant]="'lg-regular'" class="fudis-mt-lg"
      ><strong>Currently applied classes: </strong><br /><code>{{classes}}</code></fudis-body-text
    >
    <div
      class="fudis-mt-lg"
      style="border: 2px solid var(--fudis-color-primary-light); display: inline-block;"
    >
      <fudis-button [class]="classes" [label]="'Test button'"></fudis-button>
    </div>
  `,
  props: args,
});

export const Example = ExampleTemplate.bind({});
Example.args = {
  classes: 'fudis-xs-pt-md fudis-sm-mr-xxl fudis-md-mb-xxl fudis-xs-pl-lg',
};

Example.argTypes = {
  classes: {
    options: [
      'fudis-xs-pt-md fudis-sm-mr-xxl fudis-md-mb-xxl fudis-xs-pl-lg',
      'fudis-md-mx-xxl',
      'fudis-xs-my-xxl fudis-xxl-my-none',
      'fudis-px-sm fudis-xl-py-lg',
    ],
    control: { type: 'select' },
  },
};
