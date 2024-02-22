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

const Template: StoryFn<FooterComponent> = (args: FooterComponent) => ({
  props: args,
  template: html`
    <fudis-footer>
      <ng-template fudisFooterRight>
        <fudis-link [externalLink]="'example.com'" [title]="'Privacy notice'"></fudis-link>
        <fudis-link [externalLink]="'example.com'" [title]="'Accessibility statement'"></fudis-link>
        <fudis-link [href]="'#'" [title]="'System information'"></fudis-link>
      </ng-template>
      <ng-template fudisFooterLeft>
        <fudis-link [externalLink]="'example.com'" [title]="'Promo link'"></fudis-link>
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
