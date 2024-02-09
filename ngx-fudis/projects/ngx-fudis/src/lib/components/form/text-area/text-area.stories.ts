import { StoryFn, Meta, moduleMetadata } from '@storybook/angular';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { Component } from '@angular/core';
import { TextAreaComponent } from './text-area.component';
import { FudisValidators } from '../../../utilities/form/validators';
import readme from './readme.mdx';

@Component({
  selector: 'example-text-area-with-form-control',
  template: `
    <form [formGroup]="mainFormGroup">
      <fudis-text-area
        [control]="firstTextAreaControl"
        [label]="'Required Text Area'"
        [helpText]="'Add some text to the textarea'"
        [tooltip]="'I am here to give you additional guidance'"
        [tooltipPosition]="'right'"
      />
      <fudis-text-area
        [control]="secondTextAreaControl"
        [label]="'Text Area with max and min character length'"
      />
      <fudis-text-area
        [control]="thirdTextAreaControl"
        [label]="'Disabled text area'"
        [helpText]="'You should be able to focus on this text-area but not insert any values'"
        [disabled]="true"
      />
    </form>
  `,
})
class TextAreaWithFormControlExampleComponent {
  constructor(private _formBuilder: FormBuilder) {}

  minLength = 5;
  maxLength = 20;

  validatorsForSecondTextInput = [
    FudisValidators.minLength(
      this.minLength,
      `Too short input. Minimum length is ${this.minLength} and maximum length is ${this.maxLength}.`,
    ),
    FudisValidators.maxLength(this.maxLength, 'Too long input'),
  ];

  firstTextAreaControl: FormControl = new FormControl('', [
    FudisValidators.required('Missing a value.'),
  ]);

  secondTextAreaControl: FormControl = new FormControl('', this.validatorsForSecondTextInput);

  thirdTextAreaControl: FormControl = new FormControl('');

  mainFormGroup: FormGroup = this._formBuilder.group({
    firstTextAreaControl: this.firstTextAreaControl,
    secondTextareaControl: this.secondTextAreaControl,
    thirdTextareaControl: this.thirdTextAreaControl,
  });
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
      exclude: [
        'ariaLabel',
        'disabled',
        'id',
        '_id',
        '_required',
        '_requiredText',
        '_translations',
        'ngOnChanges',
        'ngOnInit',
        'onBlur',
        'handleBlur',
      ],
    },
  },
  argTypes: {},
} as Meta;

const Template: StoryFn<TextAreaComponent> = (args: TextAreaComponent) => ({
  props: args,
  template: `<fudis-text-area [label]="label" [control]="control" [helpText]="helpText"></fudis-text-area>`,
});

export const Example = Template.bind({});
Example.args = {
  label: 'Text Area label example',
  control: new FormControl(null),
  helpText: 'Example help text',
};

export const ExamplesWithValidators: StoryFn = () => ({
  template: `
		<example-text-area-with-form-control></example-text-area-with-form-control>
	`,
});
