import { StoryFn, Meta } from '@storybook/angular';
import { ErrorSummaryComponent } from './error-summary.component';
import readme from './readme.mdx';

export default {
  title: 'Components/Form/Error Summary',
  component: ErrorSummaryComponent,
  parameters: {
    docs: {
      page: readme,
    },
    controls: {
      exclude: ['control'],
    },
  },
} as Meta;
const html = String.raw;

export const ErrorSummary: StoryFn = () => ({
  template: html` <h1>TBD</h1> `,
});
