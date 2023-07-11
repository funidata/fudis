import { Component, importProvidersFrom } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormControl, Validators } from '@angular/forms';
import { StoryFn, Meta, applicationConfig, moduleMetadata } from '@storybook/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FudisTranslationService } from 'projects/ngx-fudis/src/lib/utilities/translation/translation.service';
import { DateRangeComponent } from './date-range.component';

import readme from './readme.mdx';

@Component({
	selector: 'example-language-change-component',
	template: `<fudis-button [label]="_label" (handleClick)="changeLanguage()"></fudis-button>`,
})
class LanguageChangeComponent {
	_label = 'Change calendar language';

	constructor(private _translationService: FudisTranslationService) {
		this._translationService.setLanguage('en');
	}

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
	argTypes: {
		startDate: {
			control: { type: 'object' },
		},
		endDate: {
			control: { type: 'object' },
		},
	},
	parameters: {
		docs: {
			page: readme,
		},
		controls: {
			exclude: /.*/g,
		},
	},
} as Meta;

const html = String.raw;

const TemplateDateRange: StoryFn<DateRangeComponent> = (args: DateRangeComponent) => ({
	props: {
		...args,
		startDate: {
			label: 'Start date',
			helpText: 'Select start date',
			tooltip: 'Tooltip for first',
			errorMsg: {
				required: 'Start date is required',
				matDatepickerParse: 'Start date is not a proper date',
				matStartDateInvalid: 'Start date cannot be after end date',
			},
			control: new FormControl<Date | null>(null, Validators.required),
		},
		endDate: {
			label: 'End date',
			helpText: 'Select end date',
			errorMsg: {
				required: 'End date is required',
				matDatepickerParse: 'End date is not a proper date',
				matEndDateInvalid: 'End date cannot be before start date',
			},
			control: new FormControl<Date | null>(null, Validators.required),
		},
	},
	template: html` <fudis-date-range [startDate]="startDate" [endDate]="endDate" /> `,
});

export const DateRange = TemplateDateRange.bind({});

const TemplateWithMinMax: StoryFn<DateRangeComponent> = (args: DateRangeComponent) => ({
	props: {
		...args,
		startDate: {
			label: 'Start date',
			helpText: 'Select start date',
			minDate: new Date('2023-05-01'),
			maxDate: new Date('2023-05-07'),
			tooltip: 'Tooltip for first',
			errorMsg: {
				required: 'Start date is required',
				matDatepickerParse: 'Start date is not a proper date',
				matDatepickerMin: 'Start date cannot be earlier than 5.5.2023',
				matDatepickerMax: 'Start date cannot be later than 22.6.2023',
				matStartDateInvalid: 'Start date cannot be after end date',
			},
			control: new FormControl<Date | null>(null, Validators.required),
		},
		endDate: {
			label: 'End date',
			helpText: 'Select end date',
			minDate: new Date('2023-05-15'),
			maxDate: new Date('2023-05-25'),
			errorMsg: {
				required: 'End date is required',
				matDatepickerParse: 'End date is not a proper date',
				matDatepickerMin: 'End date cannot be earlier than 5.5.2023',
				matDatepickerMax: 'End date cannot be later than 22.6.2023',
				matEndDateInvalid: 'End date cannot be before start date',
			},
			control: new FormControl<Date | null>(null, Validators.required),
		},
	},
	template: html`
		<fudis-date-range [startDate]="startDate" [endDate]="endDate" /><example-language-change-component />
	`,
});

export const WithMinAndMaxDates = TemplateWithMinMax.bind({});
