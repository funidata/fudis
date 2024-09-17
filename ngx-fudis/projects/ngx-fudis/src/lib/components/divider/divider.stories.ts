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
  template: html`<fudis-divider />`,
});
