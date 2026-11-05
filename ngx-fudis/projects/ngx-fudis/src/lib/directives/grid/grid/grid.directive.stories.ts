import { GridDirective } from './grid.directive';
import type { Meta, StoryObj } from '@storybook/angular-vite';
import docs from './grid-directive.mdx';

const meta: Meta<GridDirective> = {
  title: 'Directives/Grid/Grid',
  component: GridDirective,
  parameters: {
    docs: {
      page: docs,
    },
  },
  tags: ['!dev'],
};
export default meta;

export const Example: StoryObj<GridDirective> = {};
