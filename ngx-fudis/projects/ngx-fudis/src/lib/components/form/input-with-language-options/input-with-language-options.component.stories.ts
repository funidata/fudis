import { StoryFn, Meta, moduleMetadata, applicationConfig } from '@storybook/angular';

import { ReactiveFormsModule, FormsModule, FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IFudisDropdownOption, TFudisFieldsetErrorMessages, TFudisInputErrorMessages } from '../../../types/forms';
import { InputWithLanguageOptionsComponent } from './input-with-language-options.component';

@Component({
	selector: 'example-input-with-language-options',
	template: `
		<form>
			<fudis-grid>
				<fudis-fieldset [legend]="legend" [id]="fieldsetId">
					<ng-template fudisFieldsetGuidance>
						<fudis-guidance [inputLabel]="label" [helpText]="helpText" [id]="fieldsetid + '_guidance'"></fudis-guidance>
					</ng-template>
					<ng-template fudisFieldsetContent>
						<fudis-grid [columns]="'1fr 1fr'">
							<fudis-input-with-language-options
								[id]="'unique-input-1'"
								[options]="languageOptions"
								[formGroup]="form.controls['name']"
								[label]="labelName"
								[helpText]="'Some name would be nice. Name for all languages must be given.'"
								[groupErrorMsg]="errorName"
								[requiredText]="requiredText"></fudis-input-with-language-options>
							<fudis-input-with-language-options
								[id]="'unique-input-2'"
								[options]="languageOptions"
								[formGroup]="form.controls['description']"
								[label]="labelDescription"
								[helpText]="
									'So that students know what they are getting into. Please give description at least in Finnish and English.'
								"
								[groupErrorMsg]="errorDescription"
								[requiredText]="requiredText"></fudis-input-with-language-options>
							<fudis-text-input
								[id]="'unique-input-3'"
								[control]="form.controls['teacher']"
								[label]="labelTeacher"
								[helpText]="'Someone has to be responsible about this.'"
								[errorMsg]="errorTeacher"
								[requiredText]="requiredText"></fudis-text-input>
							<fudis-text-input
								[id]="'unique-input-4'"
								[helpText]="inputHelpText"
								[control]="form.controls['email']"
								[label]="labelEmail"
								[helpText]="'So that lazy students can ask for more time on their homework.'"
								[errorMsg]="errorEmail"
								[requiredText]="requiredText"></fudis-text-input>
							<fudis-datepicker
								[label]="labelStartDate"
								[id]="'date-picker-1'"
								[requiredText]="requiredText"
								[helpText]="'You have to start from somewhere'"
								[errorMsg]="errorStartdate"
								[control]="form.controls['startDate']"
								[minDate]="minDate"
								[maxDate]="form.controls['endDate'].value ? form.controls['endDate'].value : maxDate">
							</fudis-datepicker>
							<fudis-datepicker
								[label]="labelEndDate"
								[id]="'date-picker-2'"
								[requiredText]="requiredText"
								[helpText]="'You have to end it to something'"
								[errorMsg]="errorEnddate"
								[control]="form.controls['endDate']"
								[disabled]="!form.controls['startDate'].value && !form.controls['startDate'].valid"
								[minDate]="form.controls['startDate']">
							</fudis-datepicker>
						</fudis-grid>
					</ng-template>
				</fudis-fieldset>
			</fudis-grid>
		</form>
	`,
})
class InputWithLanguageOptionsExampleComponent {
	errorName: TFudisFieldsetErrorMessages = {
		english: {
			required: 'Missing course name on English.',
		},
		finnish: {
			required: 'Missing course name on Finnish.',
		},
		swedish: {
			required: 'Missing course name on Finnish.',
		},
	};

	errorDescription: TFudisFieldsetErrorMessages = {
		english: {
			required: 'Missing description in English.',
			minlength: 'Description should at least 5 characters.',
		},
		finnish: {
			required: 'Missing description in Finnish.',
			minlength: 'Description should at least 5 characters.',
		},
	};

	errorTeacher: TFudisInputErrorMessages = {
		required: "Missing teacher's name who is responsible for this course.",
	};

	errorEmail: TFudisInputErrorMessages = {
		required: 'Missing email contact.',
		minlength: 'Email should be at least 5 characters.',
		email: 'Input must be an email address.',
	};

	errorStartdate: TFudisInputErrorMessages = {
		required: 'Start date is missing.',
		matDatepickerMin: 'Start date cannot be earlier than this day.',
		matDatepickerParse: 'Date should be in dd.mm.yyyy format.',
		matDatepickerMax: 'Start date cannot be after end date.',
	};

	errorEnddate: TFudisInputErrorMessages = {
		required: 'End date is missing.',
		matDatepickerMin: 'End date cannot be before start date.',
		matDatepickerParse: 'Date should be in dd.mm.yyyy format.',
	};

	fieldsetId = 'unique-fieldset-id';

	languageOptions: IFudisDropdownOption[] = [
		{ value: 'finnish', viewValue: 'Fi' },
		{ value: 'swedish', viewValue: 'Sv' },
		{ value: 'english', viewValue: 'En' },
	];

	minDate = new Date();

	maxDate = new Date(2023, 31, 5);

	legend = 'Fill in course information';

	helpText = 'Please fill in course information.';

	labelName = 'Course name';

	labelDescription = 'Course description';

	labelTeacher = 'Responsible teacher';

	labelEmail = 'Contact email';

	labelStartDate = 'Start date';

	labelEndDate = 'End date';

	labelOne = 'Course teacher email';

	labelTwo = 'Course name';

	requiredText = 'Required';

	form = new FormGroup({
		name: new FormGroup({
			finnish: new FormControl('', [Validators.required, Validators.minLength(5)]),
			swedish: new FormControl('', [Validators.required, Validators.minLength(5)]),
			english: new FormControl('', [Validators.required, Validators.minLength(5)]),
		}),
		description: new FormGroup({
			finnish: new FormControl('', [Validators.required, Validators.minLength(5)]),
			swedish: new FormControl(''),
			english: new FormControl('', [Validators.required, Validators.minLength(5)]),
		}),
		teacher: new FormControl('', Validators.required),
		email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(5)]),
		startDate: new FormControl('', Validators.required),
		endDate: new FormControl('', Validators.required),
	});

	mainFormGroup: FormGroup = this.formBuilder.group({
		finnish: new FormControl('', [Validators.required, Validators.email, Validators.minLength(5)]),
		swedish: new FormControl(''),
		english: new FormControl('', Validators.required),
	});

	secondFormGroup: FormGroup = this.formBuilder.group({
		finnish: new FormControl('', Validators.required),
		swedish: new FormControl(''),
		english: new FormControl('', Validators.required),
	});

	thirdFormGroup: FormGroup = this.formBuilder.group({
		first: new FormControl('', Validators.required),
		second: new FormControl('', Validators.required),
	});

	constructor(private formBuilder: FormBuilder) {}
}

export default {
	title: 'Components/Form/Input With Language Options',
	component: InputWithLanguageOptionsComponent,

	argTypes: {},
	decorators: [
		moduleMetadata({
			declarations: [InputWithLanguageOptionsExampleComponent],
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
	<example-input-with-language-options></example-input-with-language-options>
	`,
});

export const Example = Template.bind({});
