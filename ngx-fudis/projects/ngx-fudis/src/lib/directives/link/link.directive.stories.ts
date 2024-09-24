import { StoryFn, Meta } from '@storybook/angular';
import readme from './link-directive.docs.mdx';
import { LinkDirective } from './link.directive';

export default {
  title: 'Directives/Link',
  parameters: {
    docs: {
      page: readme,
    },
  },
  argTypes: {
    size: {
      control: { type: 'radio' },
      options: ['inherit', 'md', 'lg'],
    },
  },
} as Meta;

const html = String.raw;

export const Example: StoryFn<LinkDirective> = (args: LinkDirective) => ({
  props: args,
  template: html`
    <a
      fudisLink
      href="https://www.example.com"
      [title]="title"
      [external]="external"
      [size]="size"
    ></a>
  `,
});

Example.args = {
  title: 'This is an example title',
  external: false,
  size: 'inherit',
};
