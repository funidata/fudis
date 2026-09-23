import { Meta, StoryFn } from '@storybook/angular-vite';
import { FooterComponent } from './footer.component';
import docs from './footer.mdx';

const html = String.raw;

export default {
  title: 'Components/Footer',
  component: FooterComponent,
  parameters: {
    docs: {
      page: docs,
    },
  },
} as Meta;

const Template: StoryFn = (args) => ({
  props: args,
  template: html`
    <fudis-footer>
      <a
        fudisLink
        href="https://www.exampleuniversity.edu"
        [external]="true"
        [title]="'University website'"
      ></a>
    </fudis-footer>
  `,
});

export const Example = Template.bind({});
