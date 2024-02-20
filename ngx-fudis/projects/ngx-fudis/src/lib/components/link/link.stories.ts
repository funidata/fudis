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
    external: {
      options: [true, false],
      control: {
        type: 'radio',
      },
    },
    color: {
      options: ['primary-dark', 'gray-dark', 'white'],
      control: {
        type: 'radio',
      },
    },
  },
} as Meta;

const Template: StoryFn<LinkComponent> = (args: LinkComponent) => ({
  props: args,
});

export const Example = Template.bind({});
Example.args = {
  href: 'https://www.example.com',
  color: 'primary-dark',
  external: false,
  initialFocus: false,
  size: 'inherit',
};

export const ExampleWithExternalLink = Template.bind({});
ExampleWithExternalLink.args = {
  href: 'https://www.example.com',
  color: 'primary-dark',
  external: true,
  initialFocus: false,
  size: 'inherit',
};

export const ExampleWithLinkWithTitle = Template.bind({});
ExampleWithLinkWithTitle.args = {
  href: 'https://www.example.com',
  linkTitle: 'Visible title for the link',
  color: 'primary-dark',
  external: false,
  initialFocus: false,
  size: 'inherit',
};
