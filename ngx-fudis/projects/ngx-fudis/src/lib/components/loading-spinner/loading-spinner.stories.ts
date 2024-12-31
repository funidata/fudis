import { StoryFn, Meta, moduleMetadata } from '@storybook/angular';
import docs from './loading-spinner.mdx';
import { LoadingSpinnerComponent } from './loading-spinner.component';

export default {
  title: 'Components/Loading Spinner',
  component: LoadingSpinnerComponent,
  decorators: [
    moduleMetadata({
      imports: [LoadingSpinnerComponent],
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
};

const loadingText = 'Longer spinner loading text to see that alignment and linebreaks work.';

const AllVariantsTemplate: StoryFn = () => ({
  props: { label: loadingText },
  template: html` <fudis-grid [width]="'xs'">
    <fudis-loading-spinner [variant]="'sm'" />
    <fudis-hr />
    <fudis-loading-spinner [variant]="'sm'" [label]="label" />
    <fudis-hr />
    <fudis-loading-spinner [variant]="'lg'" />
    <fudis-hr />
    <fudis-loading-spinner [variant]="'lg'" [label]="label" />
  </fudis-grid>`,
});

export const AllVariants = AllVariantsTemplate.bind({});
