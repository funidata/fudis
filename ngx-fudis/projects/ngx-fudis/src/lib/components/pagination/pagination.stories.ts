import { componentWrapperDecorator, Meta, StoryFn } from '@storybook/angular';
import { PaginationComponent } from './pagination.component';

const html = String.raw;

export default {
  title: 'Components/Pagination',
  component: PaginationComponent,
  decorators: [
    componentWrapperDecorator(
      (story) => html`<div style="display:flex; justify-content: center">${story}</div>`,
    ),
  ],
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