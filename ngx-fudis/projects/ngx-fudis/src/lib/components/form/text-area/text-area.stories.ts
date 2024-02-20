import { StoryFn, Meta, moduleMetadata } from '@storybook/angular';
import { FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { TextAreaComponent } from './text-area.component';
import { FudisValidators } from '../../../utilities/form/validators';
import readme from './readme.mdx';
import { textInputControlsExclude } from '../../../utilities/storybook';

@Component({
  selector: 'example-text-area-with-form-control',
  template: `
    <fudis-text-area
      [control]="firstTextAreaControl"
      [label]="'Required Text Area'"
      [helpText]="'Add some text to the textarea'"
      [tooltip]="'I am here to give you additional guidance'"
      [tooltipPosition]="'right'"
    />
    <fudis-text-area
      [control]="secondTextareaControl"
      [helpText]="'Only 20 characters is allowed'"
      [label]="'Text Area with max and min character length'"
    />
  `,
})
class TextAreaWithFormControlExampleComponent {
  minLength = 5;
  maxLength = 20;

  firstTextAreaControl = new FormControl('', [FudisValidators.required('Missing a value.')]);

  secondTextareaControl = new FormControl('', [
    FudisValidators.minLength(
      this.minLength,
      `Too short input. Minimum length is ${this.minLength} and maximum length is ${this.maxLength}.`,
    ),
    FudisValidators.maxLength(this.maxLength, 'Too long input'),
  ]);
}

export default {
  title: 'Components/Form/Text Area',
  component: TextAreaComponent,
  decorators: [
    moduleMetadata({
      declarations: [TextAreaWithFormControlExampleComponent],
      imports: [ReactiveFormsModule, FormsModule],
    }),
  ],
  parameters: {
    docs: {
      page: readme,
    },
    controls: {
      exclude: textInputControlsExclude,
    },
  },
  argTypes: {
    size: { options: ['sm', 'md', 'lg'] },
    helpText: { control: 'text' },

    tooltipPosition: {
      options: ['left', 'right', 'above', 'below'],
      control: { type: 'radio' },
    },
    tooltip: {
      control: { type: 'text' },
    },
  },
} as Meta;

const Template: StoryFn<TextAreaComponent> = (args: TextAreaComponent) => ({
  props: { ...args, control: new FormControl(null) },
});

export const Example = Template.bind({});
Example.args = {
  tooltip: '',
  tooltipToggle: false,
  size: 'lg',
  disabled: false,
  label: 'Text Area label example',
  helpText: 'Example help text',
};

export const WithValidators: StoryFn<TextAreaComponent> = (args: TextAreaComponent) => ({
  props: args,
  template: `
		<example-text-area-with-form-control></example-text-area-with-form-control>
	`,
});

WithValidators.parameters = {
  controls: {
    exclude: /.*/g,
  },
};
