import { StoryFn, Meta, moduleMetadata } from '@storybook/angular';
import docs from './spinner.mdx';
import { SpinnerComponent } from './spinner.component';

export default {
  title: 'Components/Spinner',
  component: SpinnerComponent,
  decorators: [
    moduleMetadata({
      imports: [SpinnerComponent],
      providers: [],
      declarations: [],
    }),
  ],
  parameters: {
    docs: {
      page: docs,
    },
  },
} as Meta;

const html = String.raw;

export const Example: StoryFn = (args) => ({
  ...args,
  template: html` <fudis-spinner />`,
});
