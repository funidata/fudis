import { Meta, moduleMetadata, StoryFn } from '@storybook/angular';
import { Exercise2Component } from './exercise-2.component';
import docs from './exercise.mdx';

const html = String.raw;

export default {
  title: 'Components/Exercise2',
  component: Exercise2Component,
  decorators: [
    moduleMetadata({
      imports: [Exercise2Component],
    }),
  ],
  parameters: {
    docs: {
      page: docs,
    },
  },
  argTypes: {
    size: {
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      control: { type: 'select' },
    },
  },
} as Meta;

const Template: StoryFn<Exercise2Component> = (args) => ({
  props: args,
  template: html`
    <!-- 1. place your exercise-2 selector here -->
    <exercise-2 [size]="size"></exercise-2>
  `,
});

export const Example = Template.bind({});

Example.args = {
  size: 'md',
  // place your exercise selector args here
};
