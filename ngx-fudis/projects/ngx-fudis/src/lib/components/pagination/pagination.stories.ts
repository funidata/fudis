import { StoryFn, Meta, moduleMetadata } from '@storybook/angular';
import { PaginationComponent } from './pagination.component';
import { PaginationItemComponent } from './pagination-item/pagination-item.component';

export default {
  title: 'Components/Pagination',
  component: PaginationComponent,
  decorators: [
    moduleMetadata({
      imports: [PaginationComponent, PaginationItemComponent],
    }),
  ],
} as Meta;

const html = String.raw;

const links = [
  { label: '1', url: '/' },
  { label: '2', url: '/' },
  { label: '3', url: '/' },
  { label: '4', url: '/' },
  { label: '5', url: '/' },
  { label: '6', url: '/' },
  { label: '7', url: '/' },
  { label: '8', url: '/' },
  { label: '9', url: '/' },
  { label: '10', url: '/' },
];

const Template: StoryFn = (args) => ({
  props: {
    ...args,
    links,
  },
  template: html`
    <fudis-pagination [label]="label">
      <fudis-pagination-item *ngFor="let link of links; let index = index">
        <a [href]="link.url">{{link.label}}</a>
      </fudis-pagination-item>
    </fudis-pagination>
  `,
});

export const Example = Template.bind({});
Example.args = {
  label: 'Pagination Example',
};
