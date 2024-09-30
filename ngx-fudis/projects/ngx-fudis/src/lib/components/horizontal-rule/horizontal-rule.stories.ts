import { StoryFn, Meta } from '@storybook/angular';
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

export const Example: StoryFn<HorizontalRuleComponent> = (args: HorizontalRuleComponent) => ({
  ...args,
  template: html` <fudis-body-text class="fudis-mb-md">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam quis porttitor nunc. Nunc
      vehicula ut massa non facilisis.
    </fudis-body-text>
    <fudis-hr />
    <fudis-body-text class="fudis-mt-md">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam quis porttitor nunc. Nunc
      vehicula ut massa non facilisis.
    </fudis-body-text>`,
});
