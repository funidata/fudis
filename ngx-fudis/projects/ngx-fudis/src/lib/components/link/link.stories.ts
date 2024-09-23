import { StoryFn, Meta } from '@storybook/angular';
import { LinkComponent } from './link.component';
import { linkExclude } from '../../utilities/storybook';
import readme from './readme.mdx';

export default {
  title: 'Components/Link',
  component: LinkComponent,
  parameters: {
    controls: {
      exclude: linkExclude,
    },
    docs: {
      page: readme,
    },
  },
  argTypes: {
    initialFocus: {
      table: { disable: true },
    },
  },
} as Meta;

const html = String.raw;

const Template: StoryFn<LinkComponent> = (args: LinkComponent) => ({
  props: args,
  template: html` <a
    fudisLink
    [title]="title"
    [size]="size"
    [external]="external"
    [initialFocus]="initialFocus"
  ></a>`,
});

export const Example = Template.bind({});
Example.args = {
  size: 'inherit',
  title: 'Visible title for the link',
  external: false,
  initialFocus: false,
};

export const ExampleWithExternalLink = Template.bind({});
ExampleWithExternalLink.args = {
  size: 'inherit',
  title: 'Visible title for the link',
  external: true,
  initialFocus: false,
};
