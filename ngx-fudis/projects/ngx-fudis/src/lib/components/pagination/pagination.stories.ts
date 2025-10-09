import { Meta, StoryFn } from '@storybook/angular';
import { PaginationComponent } from './pagination.component';
import readme from './pagination.mdx';
import { paginationControlsExclude } from '../../utilities/storybook';

export default {
  title: 'Components/Pagination',
  component: PaginationComponent,
  parameters: {
    docs: {
      page: readme,
    },
    controls: {
      exclude: paginationControlsExclude,
    },
  },
} as Meta;

const Template: StoryFn<PaginationComponent> = (args) => ({
  props: args,
  template: `
    <fudis-pagination
      [pageCount]="pageCount"
      [pageIndex]="pageIndex"
      [paginationAriaLabel]="paginationAriaLabel"
      (pageChange)="pageIndex = $event"
    ></fudis-pagination>
  `,
});

export const Example = Template.bind({});

Example.args = {
  pageCount: 20,
  pageIndex: 0,
  paginationAriaLabel: 'Example navigation',
};
