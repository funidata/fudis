import { Meta, StoryFn } from '@storybook/angular';
import { PaginationComponent } from './pagination.component';

export default {
  title: 'Components/Pagination',
  component: PaginationComponent,
} as Meta;

const Template: StoryFn<PaginationComponent> = (args) => ({
  props: args,
  template: `
    <fudis-pagination
      [pageCount]="20"
      [pageIndex]="0"
      [paginationAriaLabel]="'Example'"
      (pageChange)="pageIndex = $event"
    ></fudis-pagination>
  `,
});

export const Example = Template.bind({});
