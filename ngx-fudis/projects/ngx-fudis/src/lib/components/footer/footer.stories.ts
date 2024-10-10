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
      <ng-template fudisFooterContentRight>
        <a fudisLink href="example.com" [external]="true" [title]="'Privacy notice'"></a>
        <a fudisLink href="example.com" [external]="true" [title]="'Accessibility statement'"></a>
        <a fudisLink href="example.com" [title]="'System information'"></a>
      </ng-template>
      <ng-template fudisFooterContentLeft>
        <a fudisLink href="example.com" [external]="true" [title]="'Promo link'"></a>
      </ng-template>
    </fudis-footer>
  `,
});

export const Example = Template.bind({});

Example.parameters = {
  controls: {
    exclude: /.*/g,
  },
};
