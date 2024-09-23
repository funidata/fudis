import { StoryFn, Meta, applicationConfig, moduleMetadata } from '@storybook/angular';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Component, importProvidersFrom } from '@angular/core';
import { DatepickerComponent } from './datepicker.component';
import docs from './datepicker-docs.mdx';
import { FudisValidators } from '../../../../utilities/form/validators';
import { datepickerControlsExclude } from '../../../../utilities/storybook';
import { FudisTranslationService } from '../../../../services/translation/translation.service';

@Component({
  selector: 'example-language-change-component',
  template: ` <fudis-grid [marginTop]="'sm'" [rowGap]="'xs'">
    <fudis-button [label]="_label" (handleClick)="changeLanguage()" />
    <fudis-body-text>Current language: {{ _translationService.getLanguage() }}</fudis-body-text>
  </fudis-grid>`,
})
class LanguageChangeComponent {
  constructor(private _translationService: FudisTranslationService) {
    this._translationService.setLanguage('en');
  }

  protected _label = 'Change calendar language';

  changeLanguage(): void {
    if (this._translationService.getLanguage() === 'en') {
      this._translationService.setLanguage('fi');
    } else if (this._translationService.getLanguage() === 'fi') {
      this._translationService.setLanguage('sv');
    } else {
      this._translationService.setLanguage('en');
    }
  }
}

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
      declarations: [LanguageChangeComponent],
      imports: [ReactiveFormsModule, FormsModule],
    }),
    applicationConfig({
      providers: [importProvidersFrom(BrowserAnimationsModule)],
    }),
  ],
  argTypes: {
    tooltipPosition: {
      options: ['left', 'right', 'above', 'below'],
      control: { type: 'radio' },
    },
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
    tooltip: {
      control: { type: 'text' },
    },
  },
} as Meta;

const commonArgs: Partial<DatepickerComponent> = {
  label: 'Select a date',
  helpText: 'Choose your favourite date.',
  size: 'md',
  disabled: false,
  dateParse: true,
  initialFocus: false,
  tooltip: 'Is it your birthday?',
  tooltipPosition: 'left',
  tooltipToggle: false,
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
      [size]="size"
      [helpText]="helpText"
      [control]="control"
      [disabled]="disabled"
      [dateParse]="dateParse"
      [initialFocus]="initialFocus"
      [tooltip]="tooltip"
      [tooltipPosition]="tooltipPosition"
      [tooltipToggle]="tooltipToggle"
    ></fudis-datepicker>
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

const PreselectedTemplate: StoryFn<DatepickerComponent> = (args: DatepickerComponent) => ({
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
      [disabled]="disabled"
      [dateParse]="dateParse"
      [initialFocus]="initialFocus"
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
    control: new FormControl({ value: null, disabled: true }),
  },
  template: html`
    <fudis-datepicker
      [label]="label"
      [id]="id"
      [size]="size"
      [helpText]="helpText"
      [control]="control"
      [disabled]="disabled"
      [dateParse]="dateParse"
      [initialFocus]="initialFocus"
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
};

const MinMaxTemplate: StoryFn<DatepickerComponent> = (args: DatepickerComponent) => ({
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
      [disabled]="disabled"
      [dateParse]="dateParse"
      [initialFocus]="initialFocus"
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
