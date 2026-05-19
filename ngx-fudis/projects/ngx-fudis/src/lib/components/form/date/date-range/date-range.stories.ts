import { importProvidersFrom } from '@angular/core';
import { FormControl } from '@angular/forms';
import { StoryFn, Meta, applicationConfig } from '@storybook/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DateRangeComponent } from './date-range.component';
import { FudisValidators } from '../../../../utilities/form/validators';
import docs from './date-range.mdx';
import { dateRangeExclude } from '../../../../utilities/storybook';

export default {
  title: 'Components/Form/Date/Date Range',
  component: DateRangeComponent,
  decorators: [
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

const TemplateDateRange: StoryFn = (args) => ({
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
      [dateParse]="dateParse"
    />
    <fudis-datepicker
      fudisDateEnd
      [label]="'End date'"
      [helpText]="'Choose end date'"
      [control]="controlEnd"
      [dateParse]="dateParse"
    />
  </fudis-date-range> `,
});

export const DateRange = TemplateDateRange.bind({});
DateRange.args = {
  dateComparisonParse: true,
  dateParse: true,
};

const TemplateDateRangeMinMax: StoryFn = (args) => ({
  props: {
    ...args,
    controlStart: new FormControl<Date | null>(new Date(2025, 4, 15), [
      FudisValidators.required('Date is required.'),
      FudisValidators.datepickerMin({
        value: new Date(2025, 4, 15),
        message: 'Start date cannot be earlier than 15.5.2025',
      }),
    ]),
    controlEnd: new FormControl<Date | null>(new Date(2025, 5, 20), [
      FudisValidators.required('Date is required.'),
      FudisValidators.datepickerMax({
        value: new Date(2025, 5, 20),
        message: 'End date cannot be later than 20.6.2025',
      }),
    ]),
  },
  template: html`<fudis-date-range [dateComparisonParse]="dateComparisonParse">
    <fudis-datepicker
      fudisDateStart
      [label]="'Start date'"
      [helpText]="'Show error by entering date before 15.5.2025'"
      [control]="controlStart"
      [dateParse]="dateParse"
    />
    <fudis-datepicker
      fudisDateEnd
      [label]="'End date'"
      [helpText]="'Show error by entering date after 20.6.2025'"
      [control]="controlEnd"
      [dateParse]="dateParse"
    />
  </fudis-date-range>`,
});

export const WithMinMaxValidators = TemplateDateRangeMinMax.bind({});
WithMinMaxValidators.args = {
  dateComparisonParse: true,
  dateParse: true,
};
