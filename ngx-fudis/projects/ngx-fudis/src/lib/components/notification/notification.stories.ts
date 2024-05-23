import { StoryFn, Meta } from '@storybook/angular';
import { NotificationComponent } from './notification.component';
import readme from './readme.mdx';
import { notificationExclude } from '../../utilities/storybook';

export default {
  title: 'Components/Notification',
  component: NotificationComponent,
  parameters: {
    docs: {
      page: readme,
    },
    controls: {
      exclude: notificationExclude,
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
  ><fudis-body-text [size]="'lg-regular'">This is notification.</fudis-body-text></fudis-notification
  >`,
});

const MultiChildTemplate: StoryFn<NotificationComponent> = (args: NotificationComponent) => ({
  props: args,
  template: html`<fudis-notification
    [variant]="variant">
    <fudis-body-text [size]="'lg-regular'">Note! Please don't do this, okey?</fudis-body-text>
    <fudis-body-text [size]="'lg-regular'">If you must do it anyway, please see the documentation for more info.</fudis-body-text>
  </fudis-notification>`,
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

export const ExampleWithMultipleChildComponents = MultiChildTemplate.bind({});
ExampleWithMultipleChildComponents.args = {
  variant: 'warning',
};

export const AllVariants: StoryFn<NotificationComponent> = (args: NotificationComponent) => ({
  props: {
    ...args,
  },
  template: html`
    <fudis-grid [align]="'start'" [width]="'md'">
      <fudis-notification [variant]="'warning'">
        <fudis-body-text [size]="'lg-regular'">Note! Please don't do this, okey?</fudis-body-text>
      </fudis-notification>
      <fudis-notification [variant]="'danger'">
        <fudis-body-text [size]="'lg-regular'">Whoops! Some error happened.</fudis-body-text>
      </fudis-notification>
      <fudis-notification [variant]="'success'">
        <fudis-body-text [size]="'lg-regular'">You succeeded!</fudis-body-text>
      </fudis-notification>
      <fudis-notification [variant]="'info'">
        <fudis-body-text [size]="'lg-regular'">This is a totally neutral message</fudis-body-text>
      </fudis-notification>
    </fudis-grid>
  `,
});

AllVariants.parameters = {
  controls: {
    exclude: /.*/g,
  },
};
