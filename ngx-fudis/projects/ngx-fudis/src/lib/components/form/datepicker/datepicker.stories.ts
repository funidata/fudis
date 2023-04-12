import { StoryFn, Meta, applicationConfig } from '@storybook/angular';
import { FormControl, Validators } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { DatepickerComponent } from './datepicker.component';
import readme from './readme.mdx';

export default {
	title: 'Components/Form/Datepicker',
	component: DatepickerComponent,
	parameters: {
		docs: {
			page: readme,
		},
	},
	decorators: [
		applicationConfig({
			providers: [importProvidersFrom(BrowserAnimationsModule)],
		}),
	],
	argTypes: {},
} as Meta;

const Template: StoryFn<DatepickerComponent> = (args: DatepickerComponent) => ({
	props: args,
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
	`,
});

export const Datepicker = Template.bind({});
Datepicker.args = {
	id: 'example-id-for-datepicker-required-validation',
	label: 'Select a date',
	required: true,
	requiredText: 'Required',
	helpText: 'Choose your favourite date.',
	errorMsg: { required: 'Date is required.' },
	tooltip: 'Is it your birthday?',
	tooltipPosition: 'left',
	tooltipToggle: true,
	control: new FormControl('', Validators.required),
};

export const Disabled = Template.bind({});
Disabled.args = {
	id: 'example-id-for-datepicker-disabled',
	label: 'Select a date',
	control: new FormControl(''),
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
	control: new FormControl(''),
	minDate: new Date(2023, 2, 13),
	maxDate: new Date(2023, 2, 26),
};
