import { StoryFn, Meta } from '@storybook/angular-vite';
import { BodyTextComponent } from './body-text.component';
import docs from './body-text.mdx';

export default {
  title: 'Components/Typography/Body Text',
  component: BodyTextComponent,
  parameters: {
    docs: {
      page: docs,
    },
  },
  argTypes: {
    variant: {
      options: ['lg-regular', 'md-regular', 'sm-regular', 'lg-light', 'md-light'],
      control: { type: 'radio' },
    },
    align: {
      options: ['left', 'right', 'center'],
      control: { type: 'radio' },
    },
    lang: {
      options: ['fi', 'sv', 'en'],
      control: { type: 'radio' },
    },
  },
} as Meta;

const html = String.raw;

const Template: StoryFn = (args) => ({
  props: args,
  template: html` <fudis-grid [width]="'md'" [align]="'start'">
    <div>
      <fudis-body-text [variant]="variant" [align]="align" [lang]="lang"
        >{{content}}</fudis-body-text
      >
      <fudis-body-text [variant]="variant" [align]="align" [lang]="lang"
        >{{content}}</fudis-body-text
      >
    </div>
  </fudis-grid>`,
});

export const Example = Template.bind({});
Example.args = {
  variant: 'md-regular',
  align: 'left',
  lang: 'en',
  content: 'Students can view course information, submit assignments, and track academic progress.',
};

export const AllVariants: StoryFn = (args) => ({
  props: args,
  template: html`
    <fudis-body-text [variant]="'lg-regular'" class="fudis-mb-xs"
      >This paragraph has <strong>lg-regular</strong> variant. Course information is presented in a
      clear, readable format for students.
    </fudis-body-text>
    <fudis-body-text [variant]="'lg-light'" class="fudis-mb-xs"
      >This paragraph has <strong>lg-light</strong> variant. Students can review their study plan
      before registering for courses.
    </fudis-body-text>
    <fudis-body-text [variant]="'md-regular'" class="fudis-mb-xs"
      >This paragraph has <strong>md-regular</strong> variant. Assessment information is available
      in the course catalogue.</fudis-body-text
    >
    <fudis-body-text [variant]="'md-light'" class="fudis-mb-xs"
      >This paragraph has <strong>md-light</strong> variant. Academic services provide guidance
      throughout the academic year.
    </fudis-body-text>
    <fudis-body-text [variant]="'sm-regular'"
      >This paragraph has <strong>sm-regular</strong> variant. Check the deadline before submitting
      your application.
    </fudis-body-text>
  `,
});

AllVariants.parameters = {
  controls: {
    exclude: /.*/g,
  },
};
