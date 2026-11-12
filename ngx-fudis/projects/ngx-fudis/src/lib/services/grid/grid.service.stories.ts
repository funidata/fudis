import type { Meta, StoryObj } from '@storybook/angular-vite';
import docs from './grid-service.mdx';
import { FudisGridService } from './grid.service';

const meta: Meta<FudisGridService> = {
  title: 'Services/Grid',
  component: FudisGridService,
  parameters: {
    docs: {
      page: docs,
    },
  },
  tags: ['!dev'],
};
export default meta;

export const Example: StoryObj<FudisGridService> = {};
