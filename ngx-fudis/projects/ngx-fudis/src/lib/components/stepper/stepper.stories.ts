import { StoryObj, Meta } from '@storybook/angular-vite';
import { StepperComponent } from './stepper.component';
import docs from './stepper.mdx';
import { stepperExclude } from '../../utilities/storybook';

const meta: Meta<StepperComponent> = {
  title: 'Components/Stepper',
  component: StepperComponent,
  parameters: {
    docs: {
      page: docs,
    },
    controls: {
      exclude: stepperExclude,
    },
  },
  argTypes: {
    orientation: {
      options: ['horizontal', 'vertical'],
      control: { type: 'radio' },
    },
    currentStepIndex: {
      control: { type: 'number' },
    },
    steps: {
      control: { type: 'object' },
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
