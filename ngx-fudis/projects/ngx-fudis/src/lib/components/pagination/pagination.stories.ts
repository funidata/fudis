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
];

const Template: StoryFn = (args) => ({
  props: {
    ...args,
    links,
  },
  template: html`
    <fudis-pagination [label]="label">
      <li fudis-pagination-item *ngFor="let link of links; let index = index">
        <a [href]="link.url">{{link.label}}</a>
      </li>
    </fudis-pagination>
  `,
});

export const Example = Template.bind({});
Example.args = {
  label: 'Pagination Example',
};
