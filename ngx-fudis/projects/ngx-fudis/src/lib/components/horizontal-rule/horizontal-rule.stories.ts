import { StoryFn, Meta } from '@storybook/angular-vite';
import { HorizontalRuleComponent } from './horizontal-rule.component';
import docs from './horizontal-rule.mdx';

export default {
  title: 'Components/Horizontal Rule',
  component: HorizontalRuleComponent,
  parameters: {
    docs: {
      page: docs,
    },
  },
} as Meta;

const html = String.raw;

export const Example: StoryFn = (args) => ({
  ...args,
  template: html` <fudis-body-text class="fudis-mb-md">
      Course information is shown above the divider.
    </fudis-body-text>
    <fudis-hr />
    <fudis-body-text class="fudis-mt-md">
      Assessment details are shown below the divider.
    </fudis-body-text>`,
});
