import { StoryFn, Meta } from '@storybook/angular';
import { NotificationComponent } from './notification.component';
import readme from './readme.mdx';

export default {
  title: 'Components/Notification',
  component: NotificationComponent,
  parameters: {
    docs: {
      page: readme,
    },
  },
  argTypes: {
    variant: {
      options: ['warning', 'danger', 'success', 'info'],
      control: { type: 'radio' },
    },
    externalLink: {
      control: { type: 'text' },
    },
    linkTitle: {
      control: { type: 'text' },
    },
  },
} as Meta;

const html = String.raw;

const Template: StoryFn<NotificationComponent> = (args: NotificationComponent) => ({
  props: args,
  template: html`<fudis-notification
    [variant]="variant"
    [link]="link"
    [linkTitle]="linkTitle"
    [externalLink]="externalLink"
    >This is notification.</fudis-notification
  >`,
});

export const Example = Template.bind({});
Example.args = {
  variant: 'warning',
};

export const ExampleWithExternalLink = Template.bind({});
ExampleWithExternalLink.args = {
  variant: 'warning',
  linkTitle: 'This link opens in new tab.',
  externalLink: 'https://www.example.com',
};

export const AllVariants: StoryFn<NotificationComponent> = (args: NotificationComponent) => ({
  props: {
    ...args,
  },
  template: html`
    <fudis-grid [align]="'start'" [width]="'md'">
      <fudis-notification [variant]="'warning'">
        Note! Please don't do this, okey?
      </fudis-notification>
      <fudis-notification [variant]="'danger'"> Whoops! Some error happened. </fudis-notification>
      <fudis-notification [variant]="'success'">You succeeded!</fudis-notification>
      <fudis-notification [variant]="'info'">This is a totally neutral message</fudis-notification>
    </fudis-grid>
  `,
});

AllVariants.parameters = {
  controls: {
    exclude: /.*/g,
  },
};
