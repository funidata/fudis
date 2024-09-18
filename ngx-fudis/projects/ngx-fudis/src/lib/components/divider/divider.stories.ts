import { StoryFn, Meta } from '@storybook/angular';
import { DividerComponent } from './divider.component';
import docs from './divider.docs.mdx';

export default {
  title: 'Components/Divider',
  component: DividerComponent,
  parameters: {
    docs: {
      page: docs,
    },
  },
} as Meta;

const html = String.raw;

export const Example: StoryFn<DividerComponent> = (args: DividerComponent) => ({
  ...args,
  template: html` <fudis-body-text class="fudis-mb-md">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam quis porttitor nunc. Nunc
      vehicula ut massa non facilisis.
    </fudis-body-text>
    <fudis-divider />
    <fudis-body-text class="fudis-mt-md">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam quis porttitor nunc. Nunc
      vehicula ut massa non facilisis.
    </fudis-body-text>`,
});
