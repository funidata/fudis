import { StoryFn, Meta, moduleMetadata, applicationConfig } from '@storybook/angular';

import { ReactiveFormsModule, FormsModule, FormControl, FormGroup } from '@angular/forms';
import { Component, importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BehaviorSubject } from 'rxjs';
import { FudisDropdownOption, FudisRadioButtonOption, FudisFormErrors } from '../../../types/forms';

import { FieldSetComponent } from './fieldset.component';
import { FudisGroupValidators, FudisValidators } from '../../../utilities/form/validators';

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
						[helpText]="'Some name would be nice. Provide course name in at least one language.'" />
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
	errorStartdate: FudisFormErrors = {
		matDatepickerMin: 'Start date cannot be earlier than this day.',
		matDatepickerParse: 'Date should be in dd.mm.yyyy format.',
		matDatepickerMax: 'Start date cannot be after end date.',
	};

	errorEnddate: FudisFormErrors = {
		matDatepickerMin: 'End date cannot be before start date.',
		matDatepickerParse: 'Date should be in dd.mm.yyyy format.',
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
			[FudisGroupValidators.atLeastOneRequired(new BehaviorSubject('Course name is missing'))]
		),
		description: new FormGroup({
			finnish: new FormControl('', [
				FudisValidators.required('Missing description in Finnish.'),
				FudisValidators.minLength(10, 'Description should at least 10 characters.'),
			]),
			swedish: new FormControl('', [
				FudisValidators.required('Missing description in Swedish.'),
				FudisValidators.minLength(10, 'Description should at least 10 characters.'),
			]),
			english: new FormControl('', [
				FudisValidators.required('Missing description in English.'),
				FudisValidators.minLength(10, 'Description should at least 10 characters.'),
			]),
		}),
		teacher: new FormControl(
			'',
			FudisValidators.required("Missing teacher's name who is responsible for this course.")
		),
		email: new FormControl('', [
			FudisValidators.required('Missing email contact.'),
			FudisValidators.email('Input must be an email address.'),
			FudisValidators.minLength(5, 'Email should be at least 5 characters.'),
		]),
		startDate: new FormControl('', FudisValidators.required('Start date is missing.')),
		endDate: new FormControl('', FudisValidators.required('Start date is missing.')),
		courseType: new FormControl('', FudisValidators.required('Course type must be selected.')),
	});

	languageOptions: FudisDropdownOption[] = [
		// eslint-disable-next-line @typescript-eslint/dot-notation
		{ value: 'finnish', label: 'FI' },
		{ value: 'swedish', label: 'SV' },
		{ value: 'english', label: 'EN' },
	];

	courseTypeOptions: FudisRadioButtonOption[] = [
		{ value: 'basic', label: 'Basic', id: 'courseType-1', name: 'courseType' },
		{ value: 'advanced', label: 'Advanced', id: 'courseType-2', name: 'courseType' },
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
