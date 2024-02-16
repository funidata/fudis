import { StoryFn, Meta, applicationConfig } from '@storybook/angular';
import { FormControl, FormGroup } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BehaviorSubject } from 'rxjs';
import { FudisValidators } from './validators';
import { FudisGroupValidators } from './groupValidators';
import readme from './readme.mdx';
import { FudisCheckboxGroupFormGroup } from '../../types/forms';
import { importProvidersFrom } from '@angular/core';

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

const berryFormGroup = new FormGroup<FudisCheckboxGroupFormGroup>(
  {
    strawberry: new FormControl<boolean | null | undefined>(null),
    cloudberry: new FormControl<boolean | null | undefined>(null),
    raspberry: new FormControl<boolean | null | undefined>(null),
  },
  [FudisGroupValidators.atLeastOneRequired(new BehaviorSubject('Pick at least one berry'))],
);

const fruitMinFormGroup = new FormGroup<FudisCheckboxGroupFormGroup>(
  {
    apple: new FormControl<boolean | null | undefined>(null),
    banana: new FormControl<boolean | null | undefined>(null),
    orange: new FormControl<boolean | null | undefined>(null),
    grapefruit: new FormControl<boolean | null | undefined>(null),
    pineapple: new FormControl<boolean | null | undefined>(null),
  },
  [FudisGroupValidators.min({ value: 2, message: 'Pick at least two fruits' })],
);

const fruitMaxFormGroup = new FormGroup<FudisCheckboxGroupFormGroup>(
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
        '',
        FudisValidators.maxLength(20, 'Input should not be less than 20 characters'),
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
    // Expose after DateRange is exposed to public API
    // Deleted from the template:
    // <fudis-date-range [startDate]="startDate" [endDate]="endDate" />

    // startDate: {
    //   label: 'DatepickerMin Validator',
    //   control: new FormControl<Date | null>(null, [
    //     FudisValidators.datepickerMin({
    //       value: new Date(2024, 0, 10),
    //       message: 'Start date cannot be earlier than 10.1.2024',
    //     }),
    //   ]),
    // },
    // endDate: {
    //   label: 'DatepickerMax Validator',
    //   control: new FormControl<Date | null>(null, [
    //     FudisValidators.datepickerMax({
    //       value: new Date(2024, 2, 25),
    //       message: 'End date cannot be later than 25.3.2024',
    //     }),
    //   ]),
    // },
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
      <fudis-text-input [label]="'Required validator'" [control]="basicTextInput.control" />
      <fudis-text-input
        [label]="'Email validator'"
        [control]="emailTextInput.control"
        [type]="'email'"
      />
      <fudis-text-input [label]="'MinLength validator'" [control]="minLengthTextInput.control" />
      <fudis-text-input [label]="'MaxLength validator'" [control]="maxLengthTextInput.control" />
      <fudis-text-input
        [label]="'Min number validator'"
        [control]="minNumberInput.control"
        [type]="'number'"
        [size]="'md'"
      />
      <fudis-text-input
        [label]="'Max number validator'"
        [control]="maxNumberInput.control"
        [type]="'number'"
        [size]="'md'"
      />
      <fudis-text-input [label]="'Pattern validator'" [control]="patternTextInput.control" />
    </fudis-grid>
    <hr class="fudis-hr" />
    <fudis-grid [columns]="2" [marginTop]="'xl'">
      <fudis-heading [level]="3">Fudis Group Validators</fudis-heading>
      <fudis-grid-item [columns]="2">
        <fudis-checkbox-group
          [title]="'At Least One Required Group Validator'"
          [formGroup]="checkboxGroupAtLeastOneRequired.formGroup"
          [required]="true"
        >
          <fudis-checkbox
            *ngFor="let option of checkboxGroupAtLeastOneRequired.options"
            [controlName]="option.controlName"
            [label]="option.label"
          />
        </fudis-checkbox-group>
      </fudis-grid-item>
      <fudis-checkbox-group
        [title]="'Min Group Validator'"
        [formGroup]="checkboxGroupMin.formGroup"
      >
        <fudis-checkbox
          *ngFor="let option of checkboxGroupMin.options"
          [controlName]="option.controlName"
          [label]="option.label"
        />
      </fudis-checkbox-group>
      <fudis-checkbox-group
        [title]="'Max Group Validator'"
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

export const ValidatorsExample = ValidatorsTemplate.bind({});
ValidatorsExample.args = {};
