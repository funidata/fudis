import { StoryFn, Meta, applicationConfig, moduleMetadata } from '@storybook/angular';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { FudisValidators } from '../../../../utilities/form/validators';
import { DatepickerComponent } from './datepicker.component';
import docs from './datepicker.mdx';
import { datepickerControlsExclude } from '../../../../utilities/storybook';
import { action } from '@storybook/addon-actions';
import { LanguageChangeComponent } from '../examples/example-datepicker-language-change';
import { DateFilterWithErrorMessageComponent } from '../examples/example-datepicker-date-filter';

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
      imports: [
        ReactiveFormsModule,
        FormsModule,
        DateFilterWithErrorMessageComponent,
        LanguageChangeComponent,
      ],
    }),
    applicationConfig({
      providers: [importProvidersFrom(BrowserAnimationsModule)],
    }),
  ],
  argTypes: {
    label: {
      control: { type: 'text' },
    },
    helpText: {
      control: { type: 'text' },
    },
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'radio' },
    },
    popoverPosition: {
      options: ['left', 'right', 'above', 'below'],
      control: { type: 'radio' },
    },
    popoverText: {
      control: { type: 'text' },
    },
    popoverTriggerLabel: {
      control: { type: 'text' },
    },
  },
} as Meta;

const commonArgs: Partial<DatepickerComponent> = {
  label: 'Select a date',
  helpText: 'Choose your favourite date.',
  size: 'md',
  dateParse: true,
  initialFocus: false,
  popoverText: 'Is it your birthday?',
  popoverPosition: 'left',
  popoverTriggerLabel: 'Additional information',
};

const ExampleTemplate: StoryFn = (args) => ({
  props: {
    ...args,
    control: new FormControl(null, FudisValidators.required('Date is required.')),
  },
  template: html`
    <fudis-datepicker
      [label]="label"
      [id]="id"
      [size]="size"
      [helpText]="helpText"
      [control]="control"
      [dateParse]="dateParse"
      [initialFocus]="initialFocus"
      [popoverText]="popoverText"
      [popoverPosition]="popoverPosition"
      [popoverTriggerLabel]="popoverTriggerLabel"
    />
    <fudis-body-text *ngIf="control.value"
      >The date output as ISO string is: {{ control.value }}</fudis-body-text
    >
    <example-language-change-component />
  `,
});

export const Datepicker = ExampleTemplate.bind({});
Datepicker.args = {
  ...commonArgs,
};

const PreselectedTemplate: StoryFn = (args) => ({
  props: {
    ...args,
    control: new FormControl(new Date(1977, 11, 16)),
  },
  template: html`
    <fudis-datepicker
      [label]="label"
      [id]="id"
      [size]="size"
      [helpText]="helpText"
      [control]="control"
      [dateParse]="dateParse"
      [initialFocus]="initialFocus"
      [popoverText]="popoverText"
      [popoverPosition]="popoverPosition"
      [popoverTriggerLabel]="popoverTriggerLabel"
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

const DisabledTemplate: StoryFn = (args) => ({
  props: {
    ...args,
    control: new FormControl({ value: null, disabled: true }),
  },
  template: html`
    <fudis-datepicker
      [label]="label"
      [id]="id"
      [size]="size"
      [helpText]="helpText"
      [control]="control"
      [dateParse]="dateParse"
      [initialFocus]="initialFocus"
      [popoverText]="popoverText"
      [popoverPosition]="popoverPosition"
      [popoverTriggerLabel]="popoverTriggerLabel"
    ></fudis-datepicker>
    <fudis-body-text *ngIf="control.value"
      >The date output as ISO string is: {{ control.value }}</fudis-body-text
    >
  `,
});

export const Disabled = DisabledTemplate.bind({});
Disabled.args = {
  ...commonArgs,
};

const MinMaxTemplate: StoryFn = (args) => ({
  props: {
    ...args,
    control: new FormControl<Date | null>(null, [
      FudisValidators.datepickerMin({
        value: new Date(2024, 1, 4),
        message: 'Date cannot be before 4.2.2024',
      }),
      FudisValidators.datepickerMax({
        value: new Date(2024, 1, 20),
        message: 'Date cannot be after 20.2.2024',
      }),
    ]),
  },
  template: html`
    <fudis-datepicker
      [label]="label"
      [id]="id"
      [size]="size"
      [helpText]="helpText"
      [control]="control"
      [dateParse]="dateParse"
      [initialFocus]="initialFocus"
      [popoverText]="popoverText"
      [popoverPosition]="popoverPosition"
      [popoverTriggerLabel]="popoverTriggerLabel"
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

export const WithDateFilter: StoryFn = (args) => ({
  props: {
    ...args,
    addError: action('addError'),
  },
  template: html`
    <example-date-filter-with-error-message
      (handleAddError)="addError($event)"
    ></example-date-filter-with-error-message>
  `,
});

WithDateFilter.parameters = {
  controls: {
    exclude: /.*/g,
  },
};
