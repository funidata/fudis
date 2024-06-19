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

const Template: StoryFn<LinkComponent> = (args: LinkComponent) => ({
  props: args,
});

export const Example = Template.bind({});
Example.args = {
  href: 'https://www.example.com',
  initialFocus: false,
  size: 'inherit',
};

export const ExampleWithExternalLink = Template.bind({});
ExampleWithExternalLink.args = {
  externalLink: 'https://www.example.com',
  initialFocus: false,
  size: 'inherit',
};

export const ExampleWithLinkWithTitle = Template.bind({});
ExampleWithLinkWithTitle.args = {
  externalLink: 'https://www.example.com',
  title: 'Visible title for the link',
  initialFocus: false,
  size: 'inherit',
};
