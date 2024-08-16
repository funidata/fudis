import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { StoryFn, Meta, moduleMetadata } from '@storybook/angular';
import { FudisRadioButtonOption } from '../../../types/forms';
import { RadioButtonGroupComponent } from './radio-button-group.component';
import readme from './readme.mdx';
import { FudisValidators } from '../../../utilities/form/validators';
import { action } from '@storybook/addon-actions';
import { radioButtonGroupControlsExclude } from '../../../utilities/storybook';

type TestForm = {
  first: FormControl<string | null>;
};

const html = String.raw;

const options: FudisRadioButtonOption<object>[] = [
  { value: 'apple', label: 'Apple', id: 'fruit-1' },
  {
    value: 'fair-trade-banana',
    label: 'Fair Trade Banana',
    id: 'fruit-2',
  },
  { value: 'cherry', label: 'Cherry', id: 'fruit-3' },
];

const testFormGroup = new FormGroup<TestForm>({
  first: new FormControl(
    null,
    FudisValidators.required('You must choose a fruit'),
  ),
});

const ExampleTestTemplate: StoryFn<RadioButtonGroupComponent> = (args: RadioButtonGroupComponent) => ({
  props: {
    ...args,
    formGroup: testFormGroup,
    radioButtonChange: action('radioButtonChange'),
    options,
  },
  template: html`<fudis-radio-button-group
    [size]="size"
    [control]="formGroup.controls['first']"
    [label]="label"
    [helpText]="helpText"
    [tooltip]="tooltip"
    [tooltipToggle]="tooltipToggle"
    [tooltipPosition]="tooltipPosition"
  >
    <fudis-radio-button
      *ngFor="let option of options"
      (radioButtonChange)="radioButtonChange($event)"
      [label]="option.label"
      [value]="option.value">
    </fudis-radio-button>
  </fudis-radio-button-group>`
});

export const Example = ExampleTestTemplate.bind({});
Example.args = {
  label: 'Choose your preferred fruit',
  helpText: 'Fruits are important for your health.',
  size: 'lg',
  tooltip: 'Fair Trade Banana is right choise',
  tooltipToggle: false,
  tooltipPosition: 'right',
};

@Component({
  selector: 'disabled-radio-group-example',
  template: `
    <form [formGroup]="mainFormGroup">
      <fudis-radio-button-group
        *ngIf="mainFormGroup"
        [label]="'Choose a pet'"
        [helpText]="'We all should have a pet.'"
        [control]="mainFormGroup.controls['second']"
      >
        <fudis-radio-button
          *ngFor="let option of petOptions"
          (handleChange)="radioButtonChange($event)"
          [label]="option.label"
          [value]="option.value"
        ></fudis-radio-button>
      </fudis-radio-button-group>
    </form>
  `,
})
class DisabledRadioGroupExampleComponent {
  constructor(private _formBuilder: FormBuilder) {}

  petOptions: FudisRadioButtonOption<object>[] = [
    { value: 'platypus', label: 'Platypus' },
    { value: 'otter', label: 'Otter' },
    { value: 'capybara', label: 'Capybara' },
  ];

  mainFormGroup: FormGroup = this._formBuilder.group({
    second: new FormControl({ value: null, disabled: true },
      FudisValidators.required('You must choose a pet.'),
    ),
  });
}

const Disabled: StoryFn<DisabledRadioGroupExampleComponent> = (
  args: DisabledRadioGroupExampleComponent,
) => ({
  props: args,
  template: html`<disabled-radio-group-example></disabled-radio-group-example> `,
});

export default {
  title: 'Components/Form/Radio Button Group',
  component: RadioButtonGroupComponent,
  decorators: [
    moduleMetadata({
      declarations: [ DisabledRadioGroupExampleComponent],
      imports: [ReactiveFormsModule, FormsModule],
    }),
  ],
  parameters: {
    docs: {
      page: readme,
    },
    controls: {
      exclude: radioButtonGroupControlsExclude,
    },
  },
  argTypes: {
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'radio' },
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

export const ExampleWithDisabledOptions = Disabled.bind({});
ExampleWithDisabledOptions.parameters = {
  controls: {
    exclude: /.*/g,
  },
};
