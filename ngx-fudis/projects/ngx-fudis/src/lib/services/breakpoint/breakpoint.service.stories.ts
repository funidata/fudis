import type { Meta, StoryObj } from '@storybook/angular-vite';
import docs from './breakpoint-service.mdx';
import { FudisBreakpointService } from './breakpoint.service';

const meta: Meta<FudisBreakpointService> = {
  title: 'Services/Breakpoint',
  component: FudisBreakpointService,
  parameters: {
    docs: {
      page: docs,
    },
  },
  tags: ['!dev'],
};
export default meta;

export const Example: StoryObj<FudisBreakpointService> = {};
