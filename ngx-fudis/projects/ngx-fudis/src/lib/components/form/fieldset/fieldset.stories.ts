import { StoryFn, Meta, moduleMetadata, applicationConfig } from '@storybook/angular';

import { ReactiveFormsModule, FormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
	FudisDropdownOption,
	FudisRadioButtonOption,
	FudisFormGroupErrors,
	FudisFormErrors,
} from '../../../types/forms';

import { FieldSetComponent } from './fieldset.component';
import { FudisFormGroupValidators } from '../../../utilities/form/validators';

@Component({
	selector: 'example-fieldset',
	template: `
		<fudis-fieldset
			[width]="'md'"
			[title]="title"
			[id]="fieldsetId"
			[helpText]="helpText"
			[marginSides]="'responsive'"
			[tooltip]="'Some additional information'">
			<ng-template fudisActions type="fieldset">
				<fudis-button [variant]="'tertiary'" [icon]="'plus'" [label]="'Some action'" />
			</ng-template>
			<ng-template fudisNotifications type="fieldset"
				><fudis-notification>This is notification</fudis-notification></ng-template
			>
			<ng-template fudisContent type="fieldset">
				<fudis-grid [columns]="{ md: 2 }">
					<fudis-input-with-language-options
						[id]="'unique-input-1'"
						[options]="languageOptions"
						[formGroup]="fieldsetExample.controls['name']"
						[label]="labelName"
						[helpText]="'Some name would be nice. Provide course name in at least one language.'"
						[groupErrorMsg]="errorName" />
					<fudis-input-with-language-options
						[variant]="'text-area'"
						[id]="'unique-input-2'"
						[options]="languageOptions"
						[formGroup]="fieldsetExample.controls['description']"
						[label]="labelDescription"
						[helpText]="'So that students know what they are getting into. Provide description in all languages.'"
						[groupErrorMsg]="errorDescription" />
					<fudis-text-input
						[id]="'unique-input-3'"
						[control]="fieldsetExample.controls['teacher']"
						[label]="labelTeacher"
						[helpText]="'Someone has to be responsible for this.'"
						[errorMsg]="errorTeacher" />
					<fudis-text-input
						[id]="'unique-input-4'"
						[helpText]="inputHelpText"
						[control]="fieldsetExample.controls['email']"
						[label]="labelEmail"
						[helpText]="'So that students can ask for more time on their homework.'"
						[errorMsg]="errorEmail" />

					<fudis-radio-button-group
						[title]="labelCourseType"
						[id]="'radio-button-group-1'"
						[options]="courseTypeOptions"
						[control]="fieldsetExample.controls['courseType']"
						[errorMsg]="errorCourseType" />
					<fudis-grid [columns]="'1fr 1fr'">
						<fudis-datepicker
							[label]="labelStartDate"
							[id]="'date-picker-1'"
							[size]="'sm'"
							[helpText]="'You have to start from somewhere'"
							[errorMsg]="errorStartdate"
							[control]="fieldsetExample.controls['startDate']"
							[minDate]="minDate"
							[maxDate]="
								fieldsetExample.controls['endDate'].value ? fieldsetExample.controls['endDate'].value : maxDate
							" />
						<fudis-datepicker
							[label]="labelEndDate"
							[id]="'date-picker-2'"
							[size]="'sm'"
							[helpText]="'You have to end it to something'"
							[errorMsg]="errorEnddate"
							[control]="fieldsetExample.controls['endDate']"
							[disabled]="!fieldsetExample.controls['startDate'].value && !fieldsetExample.controls['startDate'].valid"
							[minDate]="fieldsetExample.controls['startDate'].value" />
					</fudis-grid>
				</fudis-grid>
			</ng-template>
		</fudis-fieldset>
	`,
})
class FieldsetExampleComponent {
	errorName: FudisFormGroupErrors = {
		atLeastOneRequired: 'Course name is missing.',
	};

	errorDescription: FudisFormGroupErrors = {
		english: {
			required: 'Missing description in English.',
			minlength: 'Description should at least 10 characters.',
		},
		swedish: { required: 'Missing description in Swedish.', minlength: 'Description should at least 10 characters.' },
		finnish: {
			required: 'Missing description in Finnish.',
			minlength: 'Description should at least 10 characters.',
		},
	};

	errorTeacher: FudisFormErrors = {
		required: "Missing teacher's name who is responsible for this course.",
	};

	errorEmail: FudisFormErrors = {
		required: 'Missing email contact.',
		minlength: 'Email should be at least 5 characters.',
		email: 'Input must be an email address.',
	};

	errorStartdate: FudisFormErrors = {
		required: 'Start date is missing.',
		matDatepickerMin: 'Start date cannot be earlier than this day.',
		matDatepickerParse: 'Date should be in dd.mm.yyyy format.',
		matDatepickerMax: 'Start date cannot be after end date.',
	};

	errorEnddate: FudisFormErrors = {
		required: 'End date is missing.',
		matDatepickerMin: 'End date cannot be before start date.',
		matDatepickerParse: 'Date should be in dd.mm.yyyy format.',
	};

	errorCourseType: FudisFormErrors = {
		required: 'Course type must be selected.',
	};

	fieldsetId = 'unique-fieldset-id';

	minDate = new Date();

	maxDate = new Date(2023, 31, 5);

	title = 'Fill in course information';

	helpText = 'Please fill in course information.';

	labelName = 'Course name';

	labelDescription = 'Course description';

	labelTeacher = 'Responsible teacher';

	labelEmail = 'Contact email';

	labelStartDate = 'Start date';

	labelEndDate = 'End date';

	labelCourseType = 'Course type';

	fieldsetExample = new FormGroup({
		name: new FormGroup(
			{
				finnish: new FormControl(''),
				swedish: new FormControl(''),
				english: new FormControl(''),
			},
			[FudisFormGroupValidators.atLeastOneRequired()]
		),
		description: new FormGroup({
			finnish: new FormControl('', [Validators.required, Validators.minLength(10)]),
			swedish: new FormControl('', [Validators.required, Validators.minLength(10)]),
			english: new FormControl('', [Validators.required, Validators.minLength(10)]),
		}),
		teacher: new FormControl('', Validators.required),
		email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(5)]),
		startDate: new FormControl('', Validators.required),
		endDate: new FormControl('', Validators.required),
		courseType: new FormControl('', Validators.required),
	});

	languageOptions: FudisDropdownOption[] = [
		// eslint-disable-next-line @typescript-eslint/dot-notation
		{ value: 'finnish', viewValue: 'FI' },
		{ value: 'swedish', viewValue: 'SV' },
		{ value: 'english', viewValue: 'EN' },
	];

	courseTypeOptions: FudisRadioButtonOption[] = [
		{ value: 'basic', viewValue: 'Basic', id: 'courseType-1', name: 'courseType' },
		{ value: 'advanced', viewValue: 'Advanced', id: 'courseType-2', name: 'courseType' },
	];

	submitForm(): void {
		this.fieldsetExample.markAllAsTouched();
	}
}

export default {
	title: 'Components/Form/Field Set',
	component: FieldSetComponent,

	argTypes: {},
	decorators: [
		moduleMetadata({
			declarations: [FieldsetExampleComponent],
			imports: [ReactiveFormsModule, FormsModule],
		}),
		applicationConfig({
			providers: [importProvidersFrom(BrowserAnimationsModule)],
		}),
	],
	parameters: {
		controls: {
			exclude: ['control'],
		},
	},
} as Meta;

const Template: StoryFn = () => ({
	template: `
	<example-fieldset></example-fieldset>
	`,
});

export const Example = Template.bind({});
