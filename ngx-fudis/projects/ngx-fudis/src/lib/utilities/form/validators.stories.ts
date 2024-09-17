import { StoryFn, Meta, applicationConfig } from '@storybook/angular';
import { FormControl, FormGroup } from '@angular/forms';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FudisValidators } from './validators';
import { FudisGroupValidators } from './groupValidators';
import readme from './readme.mdx';

export default {
  title: 'Utilities/Validators',
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(BrowserAnimationsModule)],
    }),
  ],
  parameters: {
    docs: {
      page: readme,
    },
  },
} as Meta;
const html = String.raw;

const berryFormGroup = new FormGroup(
  {
    strawberry: new FormControl<boolean | null | undefined>(null),
    cloudberry: new FormControl<boolean | null | undefined>(null),
    raspberry: new FormControl<boolean | null | undefined>(null),
  },
  [FudisGroupValidators.atLeastOneRequired('Pick at least one berry')],
);

const fruitMinFormGroup = new FormGroup(
  {
    apple: new FormControl<boolean | null | undefined>(null),
    banana: new FormControl<boolean | null | undefined>(null),
    orange: new FormControl<boolean | null | undefined>(null),
    grapefruit: new FormControl<boolean | null | undefined>(null),
    pineapple: new FormControl<boolean | null | undefined>(null),
  },
  [FudisGroupValidators.min({ value: 2, message: 'Pick at least two fruits' })],
);

const fruitMaxFormGroup = new FormGroup(
  {
    apple: new FormControl<boolean | null | undefined>(null),
    banana: new FormControl<boolean | null | undefined>(null),
    orange: new FormControl<boolean | null | undefined>(null),
    grapefruit: new FormControl<boolean | null | undefined>(null),
    pineapple: new FormControl<boolean | null | undefined>(null),
  },
  [FudisGroupValidators.max({ value: 3, message: 'Three is the maximum amount of fruits' })],
);

const ValidatorsTemplate: StoryFn = (args) => ({
  props: {
    ...args,
    basicTextInput: {
      control: new FormControl('', FudisValidators.required('This field is required')),
    },
    emailTextInput: {
      control: new FormControl('', FudisValidators.email('This field expects email format')),
    },
    minLengthTextInput: {
      control: new FormControl(
        '',
        FudisValidators.minLength(10, 'Input should be at least 10 characters long'),
      ),
    },
    maxLengthTextInput: {
      control: new FormControl(
        'Focus and blur me! This control was initialised with a really long string, so error would trigger. User cannot normally type over defined maxLength of characters.',
        FudisValidators.maxLength(20, 'Input should not be over 20 characters'),
      ),
    },
    minNumberInput: {
      control: new FormControl('', FudisValidators.min(1, 'Number cannot be under 1')),
    },
    maxNumberInput: {
      control: new FormControl('', FudisValidators.max(99, 'Number cannot be over 99')),
    },
    patternTextInput: {
      control: new FormControl(
        null,
        FudisValidators.pattern(/[\d]/, 'Text should include at least one digit'),
      ),
    },
    startDate: {
      control: new FormControl<Date | null>(
        null,
        FudisValidators.datepickerMin({
          value: new Date(2024, 7, 16),
          message: 'Start date cannot be earlier than 16.8.2024',
        }),
      ),
    },
    endDate: {
      control: new FormControl<Date | null>(
        null,
        FudisValidators.datepickerMax({
          value: new Date(2024, 7, 27),
          message: 'End date cannot be later than 27.8.2024',
        }),
      ),
    },
    checkboxGroupAtLeastOneRequired: {
      formGroup: berryFormGroup,
      options: [
        { controlName: 'strawberry', label: 'Strawberry' },
        { controlName: 'cloudberry', label: 'Cloudberry' },
        { controlName: 'raspberry', label: 'Raspberry' },
      ],
    },
    checkboxGroupMin: {
      formGroup: fruitMinFormGroup,
      options: [
        { controlName: 'apple', label: 'Apple' },
        { controlName: 'banana', label: 'Banana' },
        { controlName: 'orange', label: 'Orange' },
        { controlName: 'grapefruit', label: 'Grapefruit' },
        { controlName: 'pineapple', label: 'Pineapple' },
      ],
    },
    checkboxGroupMax: {
      formGroup: fruitMaxFormGroup,
      options: [
        { controlName: 'apple', label: 'Apple' },
        { controlName: 'banana', label: 'Banana' },
        { controlName: 'orange', label: 'Orange' },
        { controlName: 'grapefruit', label: 'Grapefruit' },
        { controlName: 'pineapple', label: 'Pineapple' },
      ],
    },
  },
  template: html`
    <fudis-grid [columns]="2" [marginBottom]="'xl'">
      <fudis-heading [level]="3">Fudis Validators</fudis-heading>
      <fudis-heading [level]="4">Text Validators</fudis-heading>
      <fudis-text-input [label]="'Required validator'" [control]="basicTextInput.control" />
      <fudis-text-input
        [label]="'Email validator'"
        [control]="emailTextInput.control"
        [type]="'email'"
      />
      <fudis-text-input [label]="'MinLength validator'" [control]="minLengthTextInput.control" />
      <fudis-text-input [label]="'MaxLength validator'" [control]="maxLengthTextInput.control" />
      <fudis-heading [level]="4">Number Validators</fudis-heading>
      <fudis-text-input
        [label]="'Min number validator'"
        [control]="minNumberInput.control"
        [type]="'number'"
      />
      <fudis-text-input
        [label]="'Max number validator'"
        [control]="maxNumberInput.control"
        [type]="'number'"
      />
      <fudis-heading [level]="4">Other Validators</fudis-heading>
      <fudis-text-input [label]="'Pattern validator'" [control]="patternTextInput.control" />
      <fudis-date-range fudisGridItem [columns]="'stretch'">
        <fudis-datepicker
          fudisDateStart
          [label]="'Datepicker min validator'"
          [control]="startDate.control"
        />
        <fudis-datepicker
          fudisDateEnd
          [label]="'Datepicker max validator'"
          [control]="endDate.control"
        />
      </fudis-date-range>
    </fudis-grid>
    <fudis-divider />
    <fudis-grid [columns]="2" [marginTop]="'xl'">
      <fudis-heading [level]="3">Fudis Group Validators</fudis-heading>
      <fudis-grid-item [columns]="2">
        <fudis-checkbox-group
          [label]="'At Least One Required Group Validator'"
          [formGroup]="checkboxGroupAtLeastOneRequired.formGroup"
        >
          <fudis-checkbox
            *ngFor="let option of checkboxGroupAtLeastOneRequired.options"
            [controlName]="option.controlName"
            [label]="option.label"
          />
        </fudis-checkbox-group>
      </fudis-grid-item>
      <fudis-checkbox-group
        [label]="'Min Group Validator'"
        [formGroup]="checkboxGroupMin.formGroup"
      >
        <fudis-checkbox
          *ngFor="let option of checkboxGroupMin.options"
          [controlName]="option.controlName"
          [label]="option.label"
        />
      </fudis-checkbox-group>
      <fudis-checkbox-group
        [label]="'Max Group Validator'"
        [formGroup]="checkboxGroupMax.formGroup"
      >
        <fudis-checkbox
          *ngFor="let option of checkboxGroupMax.options"
          [controlName]="option.controlName"
          [label]="option.label"
        />
      </fudis-checkbox-group>
    </fudis-grid>
  `,
});

export const Example = ValidatorsTemplate.bind({});
Example.args = {};
