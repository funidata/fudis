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
  argTypes: {},
} as Meta;

const html = String.raw;

const Template: StoryFn = (args) => ({
  props: args,
  template: html`<fudis-notification
    [variant]="variant"
    [link]="link"
    [linkTitle]="linkTitle"
    [externalLink]="externalLink"
    >This is notification.</fudis-notification
  >`,
});

export const Notification = Template.bind({});
Notification.args = {
  variant: 'warning',
};

export const LinkNotification = Template.bind({});
LinkNotification.args = {
  variant: 'warning',
  linkTitle: 'This link opens in new tab.',
  link: 'https://www.example.com',
  externalLink: true,
};

export const AllVariants: StoryFn = () => ({
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
