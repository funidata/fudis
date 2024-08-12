import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { action } from '@storybook/addon-actions';
import { StoryFn, Meta, moduleMetadata } from '@storybook/angular';
import { FudisRadioButtonOption } from '../../../types/forms';
import { RadioButtonGroupComponent } from './radio-button-group.component';
import readme from './readme.mdx';
import { FudisValidators } from '../../../utilities/form/validators';

const getDefaultValue = (
  options: FudisRadioButtonOption[],
): string | boolean | undefined | null => {
  const checkedValue = options.find((item) => item.checked);
  return checkedValue?.value;
};
@Component({
  selector: 'example-radio-button-group',
  template: `
    <!-- <form [formGroup]="mainFormGroup"> -->
      <fudis-radio-button-group
        *ngIf="mainFormGroup"
        style="margin-bottom: 1rem;"
        [label]="'Choose your preferred fruit'"
        [helpText]="'Fruits are important for your health.'"
        [tooltip]="'Choose at least one fruit'"
        [tooltipToggle]="false"
        [tooltipPosition]="'right'"
        [control]="mainFormGroup.controls['first']"
    >
    <fudis-radio-button
      *ngFor="let option of fruitOptions"
      (handleChange)="radioButtonChange($event)"
      [label]="option.label"
      [value]="option.value"
  ></fudis-radio-button>
</fudis-radio-button-group>
<p>{{ mainFormGroup.controls['first'].value }}</p>
<!-- testaile null arvolla mitä printtaa -->
      <!-- <fudis-radio-button-group
        *ngIf="mainFormGroup"
        style="margin-top: 2rem; margin-bottom: 1rem;"
        [label]="'Choose a pet'"
        [helpText]="'We all should have a pet.'"
        [control]="mainFormGroup.controls['second']"
        [options]="petOptions"
      />
      <fudis-radio-button-group
        *ngIf="mainFormGroup"
        style="margin-top: 2rem; margin-bottom: 1rem;"
        [label]="'Choose a truth'"
        [helpText]="'We all perceive truth individually.'"
        [control]="mainFormGroup.controls['third']"
        [options]="booleanOptions"
      /> -->
    <!-- </form> -->
  `,
})
class RadioButtonGroupExampleComponent {
  constructor(private _formBuilder: FormBuilder) {}

  fruitOptions: FudisRadioButtonOption[] = [
    { value: 'apple', label: 'Apple', id: 'fruit-1' },
    {
      value: 'fair-trade-banana',
      label: 'Fair Trade Banana',
      id: 'fruit-2',

      checked: true,
    },
    { value: 'cherry', label: 'Cherry', id: 'fruit-3' },
  ];

  // petOptions: FudisRadioButtonOption[] = [
  //   { value: 'platypus', label: 'Platypus' },
  //   { value: 'otter', label: 'Otter' },
  //   { value: 'capybara', label: 'Capybara' },
  // ];

  // booleanOptions: FudisRadioButtonOption[] = [
  //   { value: false, label: 'False', id: 'boolean-1' },
  //   { value: true, label: 'True', id: 'boolean-2' },
  // ];

  mainFormGroup: FormGroup = this._formBuilder.group({
    first: new FormControl(
      null,
      FudisValidators.required('You must choose a fruit'),
    ),
    // second: new FormControl(
    //   getDefaultValue(this.petOptions),
    //   FudisValidators.required('You must choose a pet.'),
    // ),
    // third: new FormControl(null, FudisValidators.required('You must choose a truth')),
  });
}

export default {
  title: 'Components/Form/Radio Button Group',
  component: RadioButtonGroupComponent,
  decorators: [
    moduleMetadata({
      declarations: [RadioButtonGroupExampleComponent],
      imports: [ReactiveFormsModule, FormsModule],
    }),
  ],
  parameters: {
    docs: {
      page: readme,
    },
    controls: {
      exclude: /.*/g,
    },
  },
  argTypes: {},
} as Meta;

const html = String.raw;

const Template: StoryFn<RadioButtonGroupExampleComponent> = (
  args: RadioButtonGroupExampleComponent,
) => ({
  props: args,
  radioButtonChange: action('radioButtonChange'),
  template: html`<example-radio-button-group></example-radio-button-group> `,
});

export const Examples = Template.bind({});
Examples.args = {};
