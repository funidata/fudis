import { Story, Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { FormControl, Validators } from '@angular/forms';
import { DatepickerComponent } from './datepicker.component';
// import { DatepickerCustomHeaderComponent } from './datepicker-custom-header/datepicker-custom-header.component';
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
		moduleMetadata({
			imports: [],
			declarations: [],
		}),
	],
	argTypes: {},
} as Meta;

const Template: Story<DatepickerComponent> = (args: DatepickerComponent) => ({
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
		[maxDate]="maxDate">
	</fudis-datepicker>
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
