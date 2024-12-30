import { StoryFn, Meta, moduleMetadata } from '@storybook/angular';
import docs from './spinner.mdx';
import { SpinnerComponent } from './spinner.component';

export default {
  title: 'Components/Spinner',
  component: SpinnerComponent,
  decorators: [
    moduleMetadata({
      imports: [SpinnerComponent],
      providers: [],
      declarations: [],
    }),
  ],
  parameters: {
    docs: {
      page: docs,
    },
  },
  argTypes: {
    variant: {
      options: ['sm', 'lg'],
      control: { type: 'radio' },
    },
  },
} as Meta;

const Template: StoryFn = (args) => ({
  props: args,
});

export const Example = Template.bind({});

Example.args = {
  variant: 'sm',
  label: 'Loading text. Erase me to revert to default text.',
};
