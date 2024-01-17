import { StoryFn, Meta, applicationConfig, moduleMetadata } from '@storybook/angular';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { DatepickerComponent } from './datepicker.component';
import readme from './readme.mdx';
import { FudisValidators } from '../../../../utilities/form/validators';

const html = String.raw;

export default {
  title: 'Components/Form/Date/Datepicker',
  component: DatepickerComponent,
  parameters: {
    docs: {
      page: readme,
    },
    controls: {
      exclude: [
        '_translations',
        '_id',
        '_required',
        '_requiredText',
        'ngOnChanges',
        'ngOnInit',
        'setConfigs',
        'onBlur',
      ],
    },
  },
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [ReactiveFormsModule, FormsModule],
    }),
    applicationConfig({
      providers: [importProvidersFrom(BrowserAnimationsModule)],
    }),
  ],
  argTypes: {},
} as Meta;

const Template: StoryFn<DatepickerComponent> = (args: DatepickerComponent) => ({
  props: {
    ...args,
  },

  template: html`
    <fudis-datepicker
      [label]="label"
      [id]="id"
      [helpText]="helpText"
      [control]="control"
      [disabled]="disabled"
      [tooltip]="tooltip"
      [tooltipPosition]="tooltipPosition"
      [tooltipToggle]="tooltipToggle"
    />
    <fudis-body-text *ngIf="control.value">The date output is: {{ control.value }}</fudis-body-text>
    <fudis-body-text *ngIf="control.value"
      >The date output with Angular date pipe is: {{ control.value | date:'dd.MM.yyyy'
      }}</fudis-body-text
    >
  `,
});

export const Datepicker = Template.bind({});
Datepicker.args = {
  id: 'example-id-for-datepicker-required-validation',
  label: 'Select a date',
  helpText: 'Choose your favourite date.',
  tooltip: 'Is it your birthday?',
  tooltipPosition: 'left',
  tooltipToggle: true,
  control: new FormControl(null, FudisValidators.required('Date is required.')),
};

export const DatepickerPreselectedDate = Template.bind({});
DatepickerPreselectedDate.args = {
  label: 'Select a date',
  helpText: 'Choose your favourite date.',
  tooltip: 'Is it your birthday?',
  tooltipPosition: 'left',
  tooltipToggle: true,
  control: new FormControl(new Date('1977-12-16')),
};

export const Disabled = Template.bind({});
Disabled.args = {
  id: 'example-id-for-datepicker-disabled',
  label: 'Select a date',
  control: new FormControl(null),
  disabled: true,
};

export const WithMinMaxValidator = Template.bind({});
WithMinMaxValidator.args = {
  id: 'example-id-for-datepicker-min-max-validator',
  label: 'Select a date',
  helpText: 'Choose a date between the allowed range.',
  control: new FormControl<Date | null>(null, [
    FudisValidators.datepickerMin({
      value: new Date(2024, 0, 1),
      message: 'Date cannot be before 1.1.2024',
    }),
    FudisValidators.datepickerMax({
      value: new Date(2024, 1, 1),
      message: 'Date cannot be after 1.2.2024',
    }),
  ]),
};
