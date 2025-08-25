import { Meta, StoryFn } from '@storybook/angular';
import { FooterComponent } from './footer.component';
import readme from './readme.mdx';

const html = String.raw;

export default {
  title: 'Components/Footer',
  component: FooterComponent,
  parameters: {
    docs: {
      page: readme,
    },
  },
} as Meta;

const Template: StoryFn = (args) => ({
  props: args,
  template: html`
    <fudis-footer>
        <a fudisLink href="example.com" [external]="true" [title]="'Privacy notice'"></a>
        <a fudisLink href="example.com" [external]="true" [title]="'Accessibility statement'"></a>
        <a fudisLink href="example.com" [title]="'System information'"></a>
        <a fudisLink href="example.com" [external]="true" [title]="'Promo link'"></a>
    </fudis-footer>
  `,
});

export const Example = Template.bind({});
