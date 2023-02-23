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
import readme from './readme.mdx';

@Component({
	selector: 'example-datepicker-with-form-control',
	template: `
		<form [formGroup]="mainFormGroup">
			<fudis-datepicker
				[control]="mainFormGroup.controls['datepickerBasic']"
				[id]="'unique-datepicker-id-1'"
				requiredText="Required"
				[errorMsg]="validatorMessages"
				label="Select a date"
				helpText="Please select your favourite date."></fudis-datepicker>
			<fudis-datepicker
				[control]="mainFormGroup.controls['datepickerWithMinMax']"
				[id]="'unique-datepicker-id-2'"
				requiredText="Required"
				[minDate]="myMinDate"
				[maxDate]="myMaxDate"
				[errorMsg]="validatorMessages"
				label="Datepicker with min and max dates"
				helpText="Please select a date inside the allowed range."></fudis-datepicker>
			<fudis-datepicker
				[control]="mainFormGroup.controls['datepickerDisabled']"
				[id]="'unique-datepicker-id-3'"
				[disabled]="true"
				label="This is disabled datepicker"></fudis-datepicker>
		</form>
	`,
})
class DatepickerWithFormControlExampleComponent {
	validatorsForDatepicker = [Validators.required];

	validatorMessages: IFudisErrorMessages = {
		required: 'This is required field.',
		matDatepickerMin: 'Too low date!',
		matDatepickerMax: 'Too high date',
	};

	mainFormGroup: FormGroup = this.formBuilder.group({
		datepickerBasic: new FormControl('', this.validatorsForDatepicker),
		datepickerDisabled: new FormControl(''),
		datepickerWithMinMax: new FormControl('', this.validatorsForDatepicker),
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
		docs: {
			page: readme,
		},
	},
} as Meta;

export const Datepicker: Story = () => ({
	template: `
	<example-datepicker-with-form-control></example-datepicker-with-form-control>
	`,
});
