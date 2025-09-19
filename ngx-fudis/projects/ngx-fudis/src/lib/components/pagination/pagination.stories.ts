import { StoryFn, Meta } from '@storybook/angular';
import { PaginationComponent } from './pagination.component';

export default {
  title: 'Components/Pagination',
  component: PaginationComponent,
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
      <fudis-pagination-item *ngFor="let link of links; let index = index">
        <a [href]="link.url">{{link.label}}</a>
      </fudis-pagination-item>
    </fudis-pagination>
  `,
});

export const Example = Template.bind({});
Example.args = {
  label: 'Jotain muuta',
};
