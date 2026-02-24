import { StoryFn, Meta } from '@storybook/angular';
import { BreadcrumbsComponent } from './breadcrumbs.component';
import docs from './breadcrumbs.mdx';

export default {
  title: 'Components/Breadcrumbs',
  component: BreadcrumbsComponent,
  parameters: {
    docs: {
      page: docs,
    },
  },
} as Meta;

const html = String.raw;

const links = [
  { label: 'My Legos', url: '/my-legos' },
  { label: 'Genre', url: '/my-legos/genre' },
  { label: 'Star Wars\u{2122}', url: '/my-legos/genre/star-wars' },
  { label: 'UCS Imperial Star Destroyer\u{2122}', url: '/my-legos/genre/star-wars/set-75252' },
];

const Template: StoryFn = (args) => ({
  props: {
    ...args,
    links,
  },
  template: html`
    <fudis-breadcrumbs [label]="label">
    @for (link of links; track link.url; let index = $index) {
      <fudis-breadcrumbs-item>
        @if (index + 1 !== links.length) {
          <a [href]="link.url">{{ link.label }}</a>
        }
        @if (index + 1 === links.length) {
          <fudis-body-text>{{ link.label }}</fudis-body-text>
        }
      </fudis-breadcrumbs-item>
    }
    </fudis-breadcrumbs>
  `,
});

export const Example = Template.bind({});
Example.args = {
  label: 'My Lego Collection',
};
