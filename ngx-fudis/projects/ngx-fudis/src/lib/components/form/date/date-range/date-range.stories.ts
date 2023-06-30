import { Component, Signal, importProvidersFrom } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormControl, Validators } from '@angular/forms';
import { StoryFn, Meta, applicationConfig, moduleMetadata } from '@storybook/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BehaviorSubject } from 'rxjs';
import { DateRangeComponent } from './date-range.component';
import { FudisTranslationConfig } from '../../../../types/forms';
import { FudisTranslationConfigService } from '../../../../utilities/config.service';

@Component({
	selector: 'example-language-change-component',
	template: `<fudis-button [label]="_label" (handleClick)="changeLanguage()"></fudis-button>`,
})
class LanguageChangeComponent {
	_label = 'Change language';

	_config: Signal<FudisTranslationConfig>;

	requiredText = new BehaviorSubject<string>('Required');

	closeLabel = new BehaviorSubject<string>('Close calendar');

	constructor(private _configService: FudisTranslationConfigService) {
		this._config = this._configService.getConfig();

		this._configService.setConfig({
			appLanguage: 'en',
			requiredText: this.requiredText,
			datepicker: { closeLabel: this.closeLabel },
		});
	}

	changeLanguage(): void {
		if (this._config().appLanguage === 'en') {
			this._label = 'Vaihda kieli';
			this.requiredText.next('Pakollinen');
			this.closeLabel.next('Sulje kalenteri');

			this._configService.setConfig({
				appLanguage: 'fi',
			});
		} else {
			this._label = 'Change language';
			this.requiredText.next('Required');
			this.closeLabel.next('Close calendar');
			this._configService.setConfig({
				appLanguage: 'en',
			});
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
	argTypes: {},
} as Meta;

const html = String.raw;

const Template: StoryFn<DateRangeComponent> = (args: DateRangeComponent) => ({
	props: {
		...args,
	},
	template: html`
		<example-language-change-component />
		<fudis-date-range [startDate]="startDate" [endDate]="endDate" />
	`,
});

export const DateRange = Template.bind({});
DateRange.args = {
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
};
