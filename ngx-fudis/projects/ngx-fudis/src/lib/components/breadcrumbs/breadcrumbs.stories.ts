import { StoryFn, Meta } from '@storybook/angular-vite';
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
  { label: 'Student services', url: '/student-services' },
  { label: 'Admissions', url: '/student-services/admissions' },
  { label: 'Undergraduate admissions', url: '/student-services/admissions/undergraduate' },
  { label: 'Application status', url: '/student-services/admissions/undergraduate/status' },
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
        } @if (index + 1 === links.length) {
        <fudis-body-text>{{ link.label }}</fudis-body-text>
        }
      </fudis-breadcrumbs-item>
      }
    </fudis-breadcrumbs>
  `,
});

export const Example = Template.bind({});
Example.args = {
  label: 'Admissions navigation',
};
