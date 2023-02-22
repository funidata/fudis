import { Story, Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { Component } from '@angular/core';
import { DatepickerComponent } from './datepicker.component';
import { IFudisErrorMessages } from '../../../types/forms';

@Component({
	selector: 'example-datepicker-with-form-control',
	template: `
		<form [formGroup]="mainFormGroup">
			<fudis-datepicker
				[control]="mainFormGroup.controls['datepicker']"
				[id]="'unique-datepicker-id-1'"
				requiredText="Required"
				[minDate]="myMinDate"
				[maxDate]="myMaxDate"
				[errorMsg]="errorMessages"
				label="Select a date"
				helpText="Please select your favourite date."></fudis-datepicker>
		</form>
		<p>{{ mainFormGroup.controls['datepicker'].value }}</p>
	`,
})
class DatepickerWithFormControlExampleComponent {
	validatorsForDatepicker = [Validators.required];

	validatorMessages: IFudisErrorMessages = {
		required: 'This is required field.',
	};

	errorMessages = {
		required: 'Selected date is missing!',
		matDatepickerMin: 'Too low date!',
		matDatepickerMax: 'Too high date',
	};

	mainFormGroup: FormGroup = this.formBuilder.group({
		datepicker: new FormControl('', this.validatorsForDatepicker),
	});

	myMinDate = new Date(2023, 2, 10);

	myMaxDate = new Date(2023, 2, 25);

	constructor(private formBuilder: FormBuilder) {}
}

export default {
	title: 'Components/Form/Datepicker',
	component: DatepickerComponent,
	decorators: [
		moduleMetadata({
			imports: [
				BrowserAnimationsModule,
				MatFormFieldModule,
				MatDatepickerModule,
				MatInputModule,
				ReactiveFormsModule,
				FormsModule,
			],
			declarations: [DatepickerWithFormControlExampleComponent],
		}),
	],
	argTypes: {},
	parameters: {
		controls: {
			exclude: ['control'],
		},
	},
} as Meta;

export const Datepicker: Story = () => ({
	template: `
	<example-datepicker-with-form-control></example-datepicker-with-form-control>
	`,
});
