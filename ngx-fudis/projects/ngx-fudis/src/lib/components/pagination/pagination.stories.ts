import { Meta, StoryFn } from '@storybook/angular';
import { PaginationComponent } from './pagination.component';
import docs from './pagination.mdx';
import { paginationControlsExclude } from '../../utilities/storybook';

export default {
  title: 'Components/Pagination',
  component: PaginationComponent,
  parameters: {
    docs: {
      page: docs,
    },
    controls: {
      exclude: paginationControlsExclude,
    },
  },
} as Meta;

const Template: StoryFn<PaginationComponent> = (args) => ({
  props: {
    ...args,
    handlePageChange: (event: number) => {
      args.pageIndex = event;
      document.getElementById('fudis-body-text-1')?.focus();
    },
  },
  template: `
    <fudis-pagination
      [pageCount]="pageCount"
      [pageIndex]="pageIndex"
      [paginationAriaLabel]="paginationAriaLabel"
      [autoFocusOnPageChange]="autoFocusOnPageChange"
      (pageChange)="handlePageChange($event)"
    ></fudis-pagination>
      <fudis-body-text *ngIf="!autoFocusOnPageChange" [id]="'fudis-body-text-1'" [align]="'center'" [attr.tabindex]="-1" class="fudis-mt-lg storybook-example-focus">Move focus here on pageChange</fudis-body-text>
  `,
});

export const Example = Template.bind({});

Example.args = {
  pageCount: 20,
  pageIndex: 0,
  paginationAriaLabel: 'Example navigation',
  autoFocusOnPageChange: true,
};
