import { StoryFn, Meta, moduleMetadata } from '@storybook/angular';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { Component } from '@angular/core';
import { TextInputComponent } from './text-input.component';
import { FudisValidators } from '../../../utilities/form/validators';
import readme from './readme.mdx';
import { textInputControlsExclude } from '../../../utilities/storybook';

@Component({
  selector: 'example-text-input-with-form-control',
  template: `
    <form [formGroup]="mainFormGroup">
      <fudis-text-input
        [control]="mainFormGroup.controls['required']"
        [label]="'Required text input'"
        [tooltip]="'This is a tooltip text'"
        [tooltipPosition]="'right'"
        [helpText]="'Please add some content.'"
      >
        <fudis-error-message
          [message]="'This is a custom error, it is not totally fault of this component'"
        />
      </fudis-text-input>
      <fudis-text-input
        [control]="mainFormGroup.controls['email']"
        [label]="'Email'"
        [type]="'email'"
        [helpText]="'This is an example email input with multiple validations.'"
      />
      <fudis-text-input
        [control]="mainFormGroup.controls['pattern']"
        [label]="'Pattern'"
        [helpText]="'Do not use low case letters!'"
      />
      <fudis-text-input
        [control]="mainFormGroup.controls['number']"
        [label]="'Number input'"
        [tooltip]="'You can choose any number between 1 and 5'"
        [tooltipPosition]="'left'"
        [tooltipToggle]="false"
        [type]="'number'"
        [size]="'sm'"
      />
    </form>
  `,
})
class TextInputWithFormControlExampleComponent {
  constructor(private _formBuilder: FormBuilder) {}

  minLength = 5;

  maxLength = 20;

  minNumber = 2;

  maxNumber = 5;

  validatorsForEmail = [
    FudisValidators.minLength(
      this.minLength,
      `Too short email. Minimum length is ${this.minLength} and maximum length is ${this.maxLength}.`,
    ),
    FudisValidators.maxLength(this.maxLength, `Too long email.`),
    FudisValidators.email('Input must be an email address.'),
  ];

  validatorsForNumber = [
    FudisValidators.min(this.minNumber, 'Number is too small'),
    FudisValidators.max(
      this.maxNumber,
      `Given number is not inside the allowed range ${this.minNumber} - ${this.maxNumber}.`,
    ),
    FudisValidators.required('This is required field.'),
  ];

  mainFormGroup: FormGroup = this._formBuilder.group({
    required: new FormControl('', FudisValidators.required('This is required field.')),
    email: new FormControl('', this.validatorsForEmail),
    number: new FormControl('', this.validatorsForNumber),
    pattern: new FormControl(
      null,
      FudisValidators.pattern(/^[A-Z \d\W]+$/, 'YOU USED LOW CAPS! SHAME ON YOU!'),
    ),
  });
}

export default {
  title: 'Components/Form/Text Input',
  component: TextInputComponent,
  decorators: [
    moduleMetadata({
      declarations: [TextInputWithFormControlExampleComponent],
      imports: [ReactiveFormsModule, FormsModule],
    }),
  ],
  parameters: {
    docs: {
      page: readme,
    },
    controls: { exclude: textInputControlsExclude },
  },
  argTypes: {
    size: { options: ['sm', 'md', 'lg'] },
    helpText: { control: 'text' },
    type: {
      options: ['email', 'number', 'password', 'tel', 'text', 'url'],
    },
    tooltipPosition: {
      options: ['left', 'right', 'above', 'below'],
      control: { type: 'radio' },
    },
    tooltip: {
      control: { type: 'text' },
    },
  },
} as Meta;

const Template: StoryFn<TextInputComponent> = (args: TextInputComponent) => ({
  props: { ...args, control: new FormControl(null) },
});

const TemplateDisabled: StoryFn<TextInputComponent> = (args: TextInputComponent) => ({
  props: { ...args, control: new FormControl({ value: null, disabled: true }) },
});

export const Example = Template.bind({});
Example.args = {
  tooltip: '',
  tooltipToggle: false,
  size: 'lg',
  type: 'text',
  label: 'Text-input label example',
  helpText: 'Example help text',
  initialFocus: false,
};

export const Disabled = TemplateDisabled.bind({});
Disabled.args = {
  size: 'lg',
  tooltip: '',
  tooltipToggle: false,
  label: 'Disabled Text Input',
  helpText: 'You should be able to focus on this input but not insert any values',
  initialFocus: false,
};

export const WithValidators: StoryFn<TextInputComponent> = (args: TextInputComponent) => ({
  props: args,
  template: `
		<example-text-input-with-form-control></example-text-input-with-form-control>
	`,
});

WithValidators.parameters = {
  controls: {
    exclude: /.*/g,
  },
};
