import { StoryFn, Meta, moduleMetadata } from '@storybook/angular';
import { PaginationComponent } from './pagination.component';

export default {
  title: 'Components/Pagination',
  component: PaginationComponent,
  decorators: [
    moduleMetadata({
      imports: [PaginationComponent],
    }),
  ],
} as Meta;

const html = String.raw;

const Template: StoryFn = (args) => ({
  props: {
    ...args,
  },
  template: html` <fudis-pagination [pageCount]="pageCount" [label]="label"> </fudis-pagination> `,
});

export const Example = Template.bind({});
Example.args = {
  label: 'Pagination Example',
  pageCount: 10,
};
