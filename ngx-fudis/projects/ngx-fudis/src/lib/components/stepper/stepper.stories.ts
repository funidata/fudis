import { StoryObj, Meta } from '@storybook/angular-vite';
import { StepperComponent } from './stepper.component';
import docs from './stepper.mdx';

const meta: Meta<StepperComponent> = {
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
    steps: {
      control: { type: 'object' },
      description: 'Steps displayed by the stepper component.',
    },
  },
};

export default meta;

type Story = StoryObj<StepperComponent>;

const steps = [
  { label: 'Wizard' },
  { label: 'Wizard' },
  { label: 'Wizard' },
  { label: 'Wizard' },
  { label: 'Wizard' },
];

export const Example: Story = {
  args: {
    currentStepIndex: 2,
    orientation: 'horizontal',
    steps,
  },
};

export const HorizontalOrientation: Story = {
  args: {
    currentStepIndex: 2,
    orientation: 'horizontal',
    steps,
  },
  tags: ['!dev'],
};

export const VerticalOrientation: Story = {
  args: {
    ...HorizontalOrientation.args,
    orientation: 'vertical',
  },
  tags: ['!dev'],
};
