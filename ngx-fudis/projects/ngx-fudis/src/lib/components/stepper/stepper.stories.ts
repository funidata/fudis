import { StoryFn, Meta } from '@storybook/angular-vite';
import { StepperComponent } from './stepper.component';
import docs from './stepper.mdx';

export default {
  title: 'Components/Stepper',
  component: StepperComponent,
  parameters: {
    docs: {
      page: docs,
    },
  },
  argTypes: {
    orientation: {
      options: ['horizontal', 'vertical'],
      control: { type: 'radio' },
      description: 'Orientation of the stepper component',
    },
    currentStepIndex: {
      control: { type: 'number' },
      description: 'Index of the current step',
    },
    stepList: {
      control: { type: 'object' },
      description: 'Steps displayed by the stepper component.',
    },
  },
} as Meta;

const Template: StoryFn = (args) => ({
  props: args,
});

export const Example = Template.bind({});

Example.args = {
  currentStepIndex: 2,
  orientation: 'horizontal',
  stepList: [
    { label: 'Wizard' },
    { label: 'Wizard' },
    { label: 'Wizard' },
    { label: 'Wizard' },
    { label: 'Wizard' },
  ],
};
