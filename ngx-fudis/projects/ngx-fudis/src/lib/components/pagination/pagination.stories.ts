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
      setTimeout(() => {
        document.getElementById('fudis-body-text-1')?.focus();
      }, 350);
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
      <p *ngIf="!autoFocusOnPageChange" id="fudis-body-text-1" tabindex="-1" class="fudis-body-text fudis-body-text__md-regular fudis-body-text__center storybook-example-focus fudis-mt-lg ">Move focus here on pageChange</p>
      `,
});

export const Example = Template.bind({});

Example.args = {
  pageCount: 20,
  pageIndex: 0,
  paginationAriaLabel: 'Example navigation',
  autoFocusOnPageChange: true,
};
