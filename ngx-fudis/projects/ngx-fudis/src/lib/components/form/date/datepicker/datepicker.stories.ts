import { StoryFn, Meta, applicationConfig, moduleMetadata } from '@storybook/angular';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { DatepickerComponent } from './datepicker.component';
import readme from './readme.mdx';

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
				'_configs',
				'_id',
				'_required',
				'_requiredText',
				'ngOnChanges',
				'ngOnInit',
				'setConfigs',
				'subscribeToCloseLabel',
				'onBlur',
				'subscribeToRequiredText',
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
			[errorMsg]="errorMsg"
			[control]="control"
			[disabled]="disabled"
			[minDate]="minDate"
			[maxDate]="maxDate"
			[tooltip]="tooltip"
			[tooltipPosition]="tooltipPosition"
			[tooltipToggle]="tooltipToggle" />
		<fudis-body-text *ngIf="control.value">The date output is: {{ control.value }}</fudis-body-text>
		<fudis-body-text *ngIf="control.value"
			>The date output with Angular date pipe is: {{ control.value | date:'dd.MM.yyyy' }}</fudis-body-text
		>
	`,
});

export const Datepicker = Template.bind({});
Datepicker.args = {
	id: 'example-id-for-datepicker-required-validation',
	label: 'Select a date',
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
