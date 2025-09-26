import { Meta, StoryObj } from '@storybook/angular';
import { PaginationComponent } from './pagination.component';

export default {
  title: 'Components/Pagination',
  component: PaginationComponent,
  decorators: [],
  argTypes: {
    pageChange: { action: 'pageChange' },
  },
} as Meta;

export const Example: StoryObj<PaginationComponent> = {
  render: (args) => ({
    props: {
      ...args,
      pageIndex: args.pageIndex ?? 0,
      handlePageChange: (index: number) => {
        args.pageIndex = index;
        args.pageChange?.(index);
      },
      pageHref: (i: number) => `/pagination-example?page=${i + 1}`,
    },
  }),
  args: {
    pageCount: 20,
    pageIndex: 0,
    siblingCount: 1,
    label: 'Some label'
  },
  
};


