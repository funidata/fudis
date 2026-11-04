import { GridItemDirective } from './grid-item.directive';
import type { Meta, StoryObj } from '@storybook/angular-vite';
import docs from './grid-item-directive.mdx';

const meta: Meta<GridItemDirective> = {
  title: 'Directives/Grid/Grid Item',
  component: GridItemDirective,
  parameters: {
    docs: {
      page: docs,
    },
  },
  tags: ['!dev'],
};
export default meta;

export const Example: StoryObj<GridItemDirective> = {};
