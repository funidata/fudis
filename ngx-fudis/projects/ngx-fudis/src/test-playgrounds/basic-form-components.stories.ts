import { StoryFn, Meta, moduleMetadata } from '@storybook/angular';
import { StorybookExampleBasicFormComponentsComponent } from './basic-form-components/basic-form-components.component';
import { TextInputComponent } from '../lib/components/form/text-input/text-input.component';

export default {
  title: 'Components/Test Playground/Basic Form Components',
  component: TextInputComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [StorybookExampleBasicFormComponentsComponent],
    }),
  ],
} as Meta;

const html = String.raw;

const ExampleTemplate: StoryFn = () => ({
  template: html` <example-basic-form-components></example-basic-form-components> `,
});

export const Example = ExampleTemplate.bind({});
