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
  argTypes: {},
} as Meta;

const Template: StoryFn<FooterComponent> = (args: FooterComponent) => ({
  props: args,
  template: html`
    <fudis-footer>
      <ng-template fudisFooterRight>
        <fudis-link
          [href]="'example.com'"
          [linkTitle]="'Privacy notice'"
          [isExternalLink]="true"
        ></fudis-link>
        <fudis-link
          [href]="'example.com'"
          [linkTitle]="'Accessibility statement'"
          [isExternalLink]="true"
        ></fudis-link>
        <fudis-link [href]="'example.com'" [linkTitle]="'System information'"></fudis-link>
      </ng-template>
      <ng-template fudisFooterLeft>
        <fudis-link
          [href]="'example.com'"
          [linkTitle]="'Promo link'"
          [external]="true"
        ></fudis-link>
      </ng-template>
    </fudis-footer>
  `,
});

export const Footer = Template.bind({});
