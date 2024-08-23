import { Component, importProvidersFrom } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormControl } from '@angular/forms';
import { StoryFn, Meta, applicationConfig, moduleMetadata } from '@storybook/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FudisTranslationService } from '../../../../services/translation/translation.service';
import { DateRangeComponent } from './date-range.component';
import { FudisValidators } from '../../../../utilities/form/validators';
import docs from './date-range-docs.mdx';
import { dateRangeExclude } from '../../../../utilities/storybook';

@Component({
  selector: 'example-language-change-component',
  template: `<fudis-button [label]="_label" (handleClick)="changeLanguage()"></fudis-button>`,
})
class LanguageChangeComponent {
  constructor(private _translationService: FudisTranslationService) {
    this._translationService.setLanguage('en');
  }

  protected _label = 'Change calendar language';

  changeLanguage(): void {
    if (this._translationService.getLanguage() === 'en') {
      this._translationService.setLanguage('fi');
    } else {
      this._translationService.setLanguage('en');
    }
  }
}

export default {
  title: 'Components/Form/Date/Date Range',
  component: DateRangeComponent,
  decorators: [
    moduleMetadata({
      declarations: [LanguageChangeComponent],
      imports: [ReactiveFormsModule, FormsModule],
    }),
    applicationConfig({
      providers: [importProvidersFrom(BrowserAnimationsModule)],
    }),
  ],
  parameters: {
    docs: {
      page: docs,
    },
    controls: {
      exclude: dateRangeExclude,
    },
  },
} as Meta;

const html = String.raw;

const TemplateDateRange: StoryFn<DateRangeComponent> = (args: DateRangeComponent) => ({
  props: {
    ...args,
    controlStart: new FormControl<Date | null>(null, FudisValidators.required('Date is required.')),
    controlEnd: new FormControl<Date | null>(null, FudisValidators.required('Date is required.')),
  },
  template: html`<fudis-date-range [dateComparisonParse]="dateComparisonParse">
    <fudis-datepicker
      fudisDateStart
      [label]="'Start date'"
      [helpText]="'Choose start date'"
      [control]="controlStart"
    />
    <fudis-datepicker
      fudisDateEnd
      [label]="'End date'"
      [helpText]="'Choose end date'"
      [control]="controlEnd"
    />
  </fudis-date-range> `,
});

export const DateRange = TemplateDateRange.bind({});
DateRange.args = {
  dateComparisonParse: true,
};

const TemplateDateRangeMinMax: StoryFn<DateRangeComponent> = (args: DateRangeComponent) => ({
  props: {
    ...args,
    controlStart: new FormControl<Date | null>(null, [
      FudisValidators.required('Date is required.'),
      FudisValidators.datepickerMin({
        value: new Date(2024, 4, 15),
        message: 'Start date cannot be earlier than 15.5.2024',
      }),
    ]),
    controlEnd: new FormControl<Date | null>(null, [
      FudisValidators.required('Date is required.'),
      FudisValidators.datepickerMax({
        value: new Date(2024, 5, 20),
        message: 'End date cannot be later than 20.6.2024',
      }),
    ]),
  },
  template: html`<fudis-date-range [dateComparisonParse]="dateComparisonParse">
    <fudis-datepicker
      fudisDateStart
      [label]="'Start date'"
      [helpText]="'Choose start date'"
      [control]="controlStart"
    />
    <fudis-datepicker
      fudisDateEnd
      [label]="'End date'"
      [helpText]="'Choose end date'"
      [control]="controlEnd"
    />
  </fudis-date-range> `,
});

export const WithMinMaxValidators = TemplateDateRangeMinMax.bind({});
WithMinMaxValidators.args = {
  dateComparisonParse: true,
};
