import { RouterTestingModule } from '@angular/router/testing';
import { moduleMetadata, StoryFn, Meta } from '@storybook/angular';
import { BreadcrumbsComponent } from './breadcrumbs.component';
import readme from './readme.mdx';
import { breadcrumbsExclude } from '../../utilities/storybook';

export default {
  title: 'Components/Breadcrumbs',
  component: BreadcrumbsComponent,
  decorators: [
    moduleMetadata({
      imports: [RouterTestingModule],
    }),
  ],
  parameters: {
    docs: {
      page: readme,
    },
    controls: {
      exclude: breadcrumbsExclude,
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

const Template: StoryFn<BreadcrumbsComponent> = (args: BreadcrumbsComponent) => ({
  props: {
    ...args,
    links,
  },
  template: html`
    <fudis-breadcrumbs [label]="label">
      <fudis-breadcrumbs-item
        *ngFor="let link of links"
        [label]="link.label"
        [url]="link.url"
      ></fudis-breadcrumbs-item>
    </fudis-breadcrumbs>
  `,
});

export const Breadcrumbs = Template.bind({});
Breadcrumbs.args = {
  label: 'My Lego Collection',
};
