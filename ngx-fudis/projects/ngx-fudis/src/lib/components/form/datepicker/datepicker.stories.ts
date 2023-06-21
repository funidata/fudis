import { StoryFn, Meta, applicationConfig, moduleMetadata } from '@storybook/angular';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AfterViewChecked, ChangeDetectorRef, Component, importProvidersFrom } from '@angular/core';
import { DatepickerComponent } from './datepicker.component';
import readme from './readme.mdx';
import { TFudisInputErrorMessages } from '../../../types/forms';

@Component({
	selector: 'example-date-range',
	template: `
		<form [formGroup]="mainFormGroup">
			<fudis-fieldset [title]="'Select a date range'" [helpText]="'Select date range'">
				<fudis-datepicker
					style="margin-right: 1rem;"
					[label]="'Select start date'"
					[id]="'date-picker-1'"
					[requiredText]="'Required'"
					[helpText]="'You have to start from somewhere'"
					[errorMsg]="validatorMessages"
					[control]="mainFormGroup.controls['first']"
					[minDate]="minDate"
					[maxDate]="mainFormGroup.controls['second'].value ? mainFormGroup.controls['second'].value : maxDate">
				</fudis-datepicker>
				<fudis-datepicker
					[label]="'Select end date'"
					[id]="'date-picker-2'"
					[requiredText]="'Required'"
					[helpText]="'You have to end it to something'"
					[errorMsg]="validatorMessagesSecond"
					[control]="mainFormGroup.controls['second']"
					[disabled]="!mainFormGroup.controls['first'].value && !mainFormGroup.controls['first'].valid"
					[minDate]="mainFormGroup.controls['first'].value">
				</fudis-datepicker>
			</fudis-fieldset>

			<fudis-error-message
				[visible]="true"
				*ngIf="
					mainFormGroup.controls['first']?.touched &&
					mainFormGroup.controls['second'].touched &&
					(mainFormGroup.controls['first']?.errors?.required || mainFormGroup.controls['second']?.errors?.required)
				"
				[message]="'Missing one or more values'"></fudis-error-message>

			<div *ngIf="mainFormGroup.controls['first'].value">
				<fudis-heading [tag]="'h3'" [size]="'m'">Values from first DatePicker</fudis-heading>

				<fudis-body-text>The date output is: {{ mainFormGroup.controls['first'].value }}</fudis-body-text>
				<fudis-body-text
					>The date output with Angular date pipe is:
					{{ mainFormGroup.controls['first'].value | date : 'dd.MM.yyyy' }}</fudis-body-text
				>
			</div>
			<div *ngIf="mainFormGroup.controls['second'].value">
				<fudis-heading [tag]="'h3'" [size]="'m'">Values from second DatePicker</fudis-heading>
				<fudis-body-text>The date output is: {{ mainFormGroup.controls['second'].value }}</fudis-body-text>
				<fudis-body-text
					>The date output with Angular date pipe is:
					{{ mainFormGroup.controls['second'].value | date : 'dd.MM.yyyy' }}</fudis-body-text
				>
			</div>
		</form>
	`,
})
class DateRangeExampleComponent implements AfterViewChecked {
	id = 'date-range-example';

	minDate = new Date();

	minDateSecond = new Date();

	disabled = true;

	validatorMessages: TFudisInputErrorMessages = {
		required: 'This is required field.',
		matDatepickerMin: 'Start date has to be today or later.',
		matDatepickerParse: 'Your date does is not a real date.',
		matDatepickerMax: 'Starting date cannot be after ending date.',
	};

	validatorMessagesSecond: TFudisInputErrorMessages = {
		required: 'This is required field.',
		matDatepickerParse: 'Your date does is not a real date',
		matDatepickerMin: 'Ending date cannot be earlier than starting date.',
	};

	mainFormGroup: FormGroup = this.formBuilder.group({
		first: new FormControl('', [Validators.required]),
		second: new FormControl('', Validators.required),
	});

	constructor(private formBuilder: FormBuilder, private readonly changeDetectorRef: ChangeDetectorRef) {}

	ngAfterViewChecked(): void {
		this.changeDetectorRef.detectChanges();
	}
}

export default {
	title: 'Components/Form/Datepicker',
	component: DatepickerComponent,
	parameters: {
		docs: {
			page: readme,
		},
	},
	decorators: [
		moduleMetadata({
			declarations: [DateRangeExampleComponent],
			imports: [ReactiveFormsModule, FormsModule],
		}),
		applicationConfig({
			providers: [importProvidersFrom(BrowserAnimationsModule)],
		}),
	],
	argTypes: {},
} as Meta;

// Not best way to change the HTML language. Cleaner Angular way implemented in Sandbox.

const changeLanguage = () => {
	const currentLang = document.documentElement.getAttribute('lang');

	if (currentLang === 'en') {
		document.documentElement.setAttribute('lang', 'fi');
	} else {
		document.documentElement.setAttribute('lang', 'en');
	}
};

const Template: StoryFn<DatepickerComponent> = (args: DatepickerComponent) => ({
	props: {
		...args,
		changeLanguage,
	},

	template: `
	<fudis-datepicker 
		[label]="label" 
		[id]="id" 
		[requiredText]="requiredText"  
		[helpText]="helpText" 
		[errorMsg]="errorMsg" 
		[control]="control" 
		[disabled]="disabled" 
		[minDate]="minDate" 
		[maxDate]="maxDate"
		[tooltip]="tooltip"
		[tooltipPosition]="tooltipPosition"
		[tooltipToggle]="tooltipToggle">
	</fudis-datepicker>
	<fudis-body-text *ngIf=control.value>The date output is: {{ control.value }}</fudis-body-text>
	<fudis-body-text *ngIf=control.value>The date output with Angular date pipe is: {{ control.value | date:'dd.MM.yyyy' }}</fudis-body-text>
	<fudis-button style="margin-top: 1rem;" [variant]="'secondary'" *ngIf="!disabled" [label]="'Change calendar language'" (handleClick)="changeLanguage()"></fudis-button>
	`,
});

export const Datepicker = Template.bind({});
Datepicker.args = {
	id: 'example-id-for-datepicker-required-validation',
	label: 'Select a date',
	requiredText: 'Required',
	helpText: 'Choose your favourite date.',
	errorMsg: { required: 'Date is required.', matDatepickerParse: 'Your date does is not a real date.' },
	tooltip: 'Is it your birthday?',
	tooltipPosition: 'left',
	tooltipToggle: true,
	control: new FormControl(null, Validators.required),
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
	errorMsg: {
		matDatepickerMin: 'Date is not inside the allowed range.',
		matDatepickerMax: 'Date is not inside the allowed range.',
	},
	control: new FormControl(null),
	minDate: new Date(2023, 2, 13),
	maxDate: new Date(2023, 2, 26),
};

export const DateRange: StoryFn = () => ({
	template: `
		<example-date-range></example-date-range>
	`,
});
