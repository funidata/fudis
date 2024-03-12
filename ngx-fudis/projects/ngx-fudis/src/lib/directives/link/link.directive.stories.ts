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
    color: {
      control: { type: 'select' },
      options: ['primary-dark', 'gray-dark', 'white'],
    },
    size: {
      control: { type: 'select' },
      options: ['inherit', 'md', 'lg'],
    },
  },
} as Meta;

const html = String.raw;

export const Example: StoryFn<LinkDirective> = (args: LinkDirective) => ({
  props: args,
  template: html`
    <a fudisLink href="#example" [color]="color" [size]="size">https://www.example.com</a>
  `,
});

Example.args = {
  color: 'primary-dark',
  size: 'inherit',
};
