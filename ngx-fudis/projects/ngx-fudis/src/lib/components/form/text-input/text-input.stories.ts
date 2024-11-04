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
import { fudisInputSizeArray } from '../../../types/forms';

@Component({
  selector: 'example-text-input-with-validators',
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
          [message]="'This is a custom error and has nothing to do with components FormControl'"
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
        [helpText]="'Be mindful that allowed numbers are between 10 and 99'"
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

  minNumber = 10;

  maxNumber = 99;

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

const html = String.raw;

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
    size: { options: fudisInputSizeArray },
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

const commonArgs: Partial<TextInputComponent> = {
  label: 'Text Input label example',
  helpText: 'Example help text',
  size: 'lg',
  initialFocus: false,
  type: 'text',
  tooltip: '',
  tooltipPosition: 'left',
  tooltipToggle: false,
};

const ExampleTemplate: StoryFn = (args) => ({
  props: {
    ...args,
    control: new FormControl(null),
  },
  template: html`
    <fudis-text-input
      [label]="label"
      [size]="size"
      [control]="control"
      [helpText]="helpText"
      [initialFocus]="initialFocus"
      [type]="type"
      [tooltip]="tooltip"
      [tooltipPosition]="tooltipPosition"
      [tooltipToggle]="tooltipToggle"
    >
    </fudis-text-input>
  `,
});

export const Example = ExampleTemplate.bind({});
Example.args = {
  ...commonArgs,
};

const DisabledTemplate: StoryFn = (args) => ({
  props: {
    ...args,
    control: new FormControl({ value: null, disabled: true }),
  },
  template: html`
    <fudis-text-input
      [label]="label"
      [size]="size"
      [control]="control"
      [helpText]="helpText"
      [initialFocus]="initialFocus"
      [type]="type"
      [tooltip]="tooltip"
      [tooltipPosition]="tooltipPosition"
      [tooltipToggle]="tooltipToggle"
    >
    </fudis-text-input>
  `,
});

export const Disabled = DisabledTemplate.bind({});
Disabled.args = {
  ...commonArgs,
};

export const WithValidators: StoryFn = (args) => ({
  props: args,
  template: `
		<example-text-input-with-validators></example-text-input-with-validators>
	`,
});

WithValidators.parameters = {
  controls: {
    exclude: /.*/g,
  },
};
