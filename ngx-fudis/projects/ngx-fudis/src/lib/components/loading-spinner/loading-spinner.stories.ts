import { StoryFn, Meta, moduleMetadata } from '@storybook/angular';
import docs from './loading-spinner.mdx';
import { LoadingSpinnerComponent } from './loading-spinner.component';
import { StorybookExampleLoadingSpinnerComponent } from './examples/loading-spinner-example.component';

export default {
  title: 'Components/Loading Spinner',
  component: LoadingSpinnerComponent,
  decorators: [
    moduleMetadata({
      imports: [LoadingSpinnerComponent, StorybookExampleLoadingSpinnerComponent],
      providers: [],
      declarations: [],
    }),
  ],
  parameters: {
    docs: {
      page: docs,
    },
  },
  argTypes: {
    variant: {
      options: ['sm', 'lg'],
      control: { type: 'radio' },
    },
    enabled: {
      options: [true, false],
      control: { type: 'radio' },
    },
    statusMessage: {
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
  variant: 'sm',
  label: '',
  enabled: true,
  statusMessage: '',
};

const loadingText = 'Longer spinner loading text to see that alignment and linebreaks work.';

const AllVariantsTemplate: StoryFn = (args) => ({
  props: { ...args, label: loadingText },
  template: html` <fudis-grid [width]="'xs'" [alignItemsX]="'center'">
    <fudis-heading [level]="2" [variant]="'md'">Small variants</fudis-heading>
    <fudis-loading-spinner [variant]="'sm'" />
    <fudis-hr />
    <fudis-loading-spinner [variant]="'sm'" [label]="label" />
    <fudis-hr />
    <fudis-heading [level]="2" [variant]="'md'">Large variants</fudis-heading>
    <fudis-loading-spinner [variant]="'lg'" />
    <fudis-hr />
    <fudis-loading-spinner [variant]="'lg'" [label]="label" />
  </fudis-grid>`,
});

export const AllVariants = AllVariantsTemplate.bind({});

AllVariants.parameters = {
  controls: {
    exclude: /.*/g,
  },
};

const LoadingSpinnerDemoTemplate: StoryFn = (args) => ({
  props: args,
  template: `<example-loading-spinner-demo/>`,
});

export const LoadingSpinnerDemo = LoadingSpinnerDemoTemplate.bind({});

LoadingSpinnerDemo.parameters = {
  controls: {
    exclude: /.*/g,
  },
};
