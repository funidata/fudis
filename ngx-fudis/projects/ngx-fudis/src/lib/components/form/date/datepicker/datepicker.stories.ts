import { StoryFn, Meta, applicationConfig, moduleMetadata } from '@storybook/angular';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { DatepickerComponent } from './datepicker.component';
import docs from './datepicker-docs.mdx';
import { FudisValidators } from '../../../../utilities/form/validators';
import { datepickerControlsExclude } from 'projects/ngx-fudis/src/lib/utilities/storybook';

const html = String.raw;

export default {
  title: 'Components/Form/Date/Datepicker',
  component: DatepickerComponent,
  parameters: {
    docs: {
      page: docs,
    },
    controls: {
      exclude: datepickerControlsExclude,
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
  argTypes: {
    tooltipPosition: {
      options: ['left', 'right', 'above', 'below', 'before', 'after'],
      control: { type: 'radio' },
    },
    label: {
      control: { type: 'text' },
    },
    helpText: {
      control: { type: 'text' },
    },
    tooltip: {
      control: { type: 'text' },
    },
  },
} as Meta;

const commonArgs: Partial<DatepickerComponent> = {
  label: 'Select a date',
  helpText: 'Choose your favourite date.',
  size: 'sm',
  disabled: false,
  tooltip: 'Is it your birthday?',
  tooltipPosition: 'left',
  tooltipToggle: true,
};

const ExampleTemplate: StoryFn<DatepickerComponent> = (args: DatepickerComponent) => ({
  props: {
    ...args,
    control: new FormControl(null, FudisValidators.required('Date is required.')),
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
    ></fudis-datepicker>
    <fudis-body-text *ngIf="control.value"
      >The date output as ISO string is: {{ control.value }}</fudis-body-text
    >
  `,
});

export const Datepicker = ExampleTemplate.bind({});
Datepicker.args = {
  ...commonArgs,
};

Datepicker.parameters = {};

const PreselectedTemplate: StoryFn<DatepickerComponent> = (args: DatepickerComponent) => ({
  props: {
    ...args,
    control: new FormControl(new Date(1977, 11, 16)),
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
    ></fudis-datepicker>
    <fudis-body-text *ngIf="control.value"
      >The date output as ISO string is: {{ control.value }}</fudis-body-text
    >
  `,
});

export const PreselectedDate = PreselectedTemplate.bind({});
PreselectedDate.args = {
  ...commonArgs,
};

const DisabledTemplate: StoryFn<DatepickerComponent> = (args: DatepickerComponent) => ({
  props: {
    ...args,
    control: new FormControl(null),
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
    ></fudis-datepicker>
    <fudis-body-text *ngIf="control.value"
      >The date output as ISO string is: {{ control.value }}</fudis-body-text
    >
  `,
});

export const Disabled = DisabledTemplate.bind({});
Disabled.args = {
  ...commonArgs,
  disabled: true,
};

const MinMaxTemplate: StoryFn<DatepickerComponent> = (args: DatepickerComponent) => ({
  props: {
    ...args,
    control: new FormControl<Date | null>(null, [
      FudisValidators.datepickerMin({
        value: new Date(2024, 0, 10),
        message: 'Date cannot be before 10.1.2024',
      }),
      FudisValidators.datepickerMax({
        value: new Date(2024, 1, 15),
        message: 'Date cannot be after 15.2.2024',
      }),
    ]),
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
    ></fudis-datepicker>
    <fudis-body-text *ngIf="control.value"
      >The date output as ISO string is: {{ control.value }}</fudis-body-text
    >
  `,
});

export const WithMinMaxValidator = MinMaxTemplate.bind({});
WithMinMaxValidator.args = {
  ...commonArgs,
  helpText: 'Choose a date between the allowed range.',
};
