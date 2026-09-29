import { StoryFn, Meta } from '@storybook/angular-vite';
import { NotificationComponent } from './notification.component';
import docs from './notification.mdx';
import { notificationExclude } from '../../utilities/storybook';

export default {
  title: 'Components/Notification',
  component: NotificationComponent,
  parameters: {
    docs: {
      page: docs,
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
  },
} as Meta;

const html = String.raw;

const Template: StoryFn = (args) => ({
  props: args,
  template: html`<fudis-notification [variant]="variant"
    ><fudis-body-text>Your application has been submitted.</fudis-body-text></fudis-notification
  >`,
});

const ButtonAndLinkTemplate: StoryFn = (args) => ({
  props: args,
  template: html` <fudis-grid [align]="'start'">
    <fudis-notification [variant]="variant">
      <fudis-body-text
        >View your application details.
        <a
          fudisLink
          href="https://www.example.com"
          [external]="true"
          [title]="'Open application details.'"
        ></a>
      </fudis-body-text>
    </fudis-notification>
    <fudis-notification [variant]="variant" [ariaDescribedby]="'description-id'">
      <fudis-body-text
        >Review your course registration.
        <fudis-button [label]="'Open registration'" />
      </fudis-body-text>
    </fudis-notification>
    <p id="description-id" aria-hidden="true" class="fudis-visually-hidden"
      >Additional information about the course registration</p
    >
  </fudis-grid>`,
});

const MultiChildTemplate: StoryFn = (args) => ({
  props: args,
  template: html`<fudis-notification [variant]="variant">
    <fudis-body-text>Please review the required fields before submitting.</fudis-body-text>
    <fudis-body-text
      >Contact student services if you need help with your application.</fudis-body-text
    >
    <fudis-body-text>Changes are saved automatically.</fudis-body-text>
  </fudis-notification>`,
});

export const Example = Template.bind({});
Example.args = {
  variant: 'warning',
};

export const ExampleWithExternalLinkAndButton = ButtonAndLinkTemplate.bind({});
ExampleWithExternalLinkAndButton.args = {
  variant: 'info',
};

export const ExampleWithMultipleChildComponents = MultiChildTemplate.bind({});
ExampleWithMultipleChildComponents.args = {
  variant: 'warning',
};

export const AllVariants: StoryFn = (args) => ({
  props: {
    ...args,
  },
  template: html`
    <fudis-grid [align]="'start'" [width]="'md'">
      <fudis-notification [variant]="'warning'">
        <fudis-body-text>Please review the required fields before submitting.</fudis-body-text>
      </fudis-notification>
      <fudis-notification [variant]="'danger'">
        <fudis-body-text>Your course registration could not be submitted.</fudis-body-text>
      </fudis-notification>
      <fudis-notification [variant]="'success'">
        <fudis-body-text>Your study plan has been updated.</fudis-body-text>
      </fudis-notification>
      <fudis-notification [variant]="'info'">
        <fudis-body-text>Course registration opens on 1 August.</fudis-body-text>
      </fudis-notification>
    </fudis-grid>
  `,
});

AllVariants.parameters = {
  controls: {
    exclude: /.*/g,
  },
};
