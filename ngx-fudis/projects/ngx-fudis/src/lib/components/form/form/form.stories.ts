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

import { FudisErrorSummaryService } from '../error-summary/error-summary.service';
import { FormGroupValidators } from '../../../utilities/form/validators';
import { FormComponent } from './form.component';

@Component({
	selector: 'example-form-content',
	template: `
		<fudis-form
			[marginSides]="'responsive'"
			[marginTop]="'xl'"
			[badge]="'primary'"
			[badgeText]="'example'"
			[titleTag]="titleTag"
			[title]="formTitle"
			[id]="id"
			[helpText]="formHelpText"
			[errorSummaryScreenReaderHelpText]="errorSummaryScreenReaderHelpText"
			[errorSummaryHelpText]="errorSummaryHelpText"
			[errorSummaryLiveRemove]="false"
			[errorSummaryVisible]="errorSummaryVisible">
			<ng-template fudisHeader>
				<!-- <fudis-heading [marginBottom]="'xs'" [tag]="titleTag">{{ formTitle }}</fudis-heading> -->
				<fudis-description-list [columns]="1" [variant]="'compact'" [data]="formHeaderDl" />
			</ng-template>
			<ng-template fudisActions type="form">
				<fudis-button [label]="'Previous step'" [icon]="'back'" [variant]="'tertiary'" />
				<fudis-button [label]="'Open menu'" [icon]="'three-dots'" [labelHidden]="true" [variant]="'secondary'" />
				<fudis-button [variant]="'secondary'" [label]="'Save draft'" />
				<fudis-button [label]="'Submit'" (handleClick)="submitForm()" />
			</ng-template>
			<ng-template fudisContent type="form">
				<fudis-section [title]="'Section title here'">
					<ng-template fudisContent type="section">
						<fudis-expandable
							(collapsedChange)="handleCollapsedOutput($event)"
							[title]="'Some title here'"
							[collapsed]="_collapsed">
							<ng-template fudisContent type="expandable">
								<fudis-fieldset
									[title]="title"
									[id]="fieldsetId"
									[helpText]="helpText"
									[tooltip]="'Quite many fields are required.'">
									<ng-template fudisNotifications type="fieldset">
										<fudis-notification *ngIf="firstLoad || errorSummaryVisible">
											<fudis-body-text>
												This is notification for a fieldset. It has one custom error-message which should pop up in the
												error summary on submit.
											</fudis-body-text>
											<fudis-error-message
												[type]="'fieldset'"
												[variant]="'body-text'"
												[visible]="true"
												[focusId]="fieldsetId"
												[label]="'Course information'"
												[message]="'There might be some errors in the fieldset'" />
										</fudis-notification>
									</ng-template>
									<ng-template fudisContent type="fieldset">
										<fudis-grid [columns]="{ lg: 'inputLg inputLg' }" [width]>
											<fudis-input-with-language-options
												[missingLanguage]="'Missing'"
												[id]="'unique-input-1'"
												[options]="languageOptions"
												[languageLabel]="'Language'"
												[formGroup]="fieldsetExample.controls['name']"
												[label]="labelName"
												[helpText]="'Some name would be nice. Provide course name in at least one language.'"
												[groupErrorMsg]="errorName"
												[requiredText]="requiredText" />
											<fudis-input-with-language-options
												[variant]="'text-area'"
												[missingLanguage]="'Missing'"
												[languageLabel]="'Language'"
												[id]="'unique-input-2'"
												[options]="languageOptions"
												[formGroup]="fieldsetExample.controls['description']"
												[label]="labelDescription"
												[helpText]="
													'So that students know what they are getting into. Provide description in all languages.'
												"
												[groupErrorMsg]="errorDescription"
												[requiredText]="requiredText" />
											<fudis-text-input
												[id]="'unique-input-3'"
												[control]="fieldsetExample.controls['teacher']"
												[label]="labelTeacher"
												[helpText]="'Someone has to be responsible for this.'"
												[errorMsg]="errorTeacher"
												[requiredText]="requiredText" />
											<fudis-text-input
												[id]="'unique-input-4'"
												[helpText]="inputHelpText"
												[control]="fieldsetExample.controls['email']"
												[label]="labelEmail"
												[helpText]="'So that students can ask for more time on their homework.'"
												[errorMsg]="errorEmail"
												[requiredText]="requiredText" />

											<fudis-radio-button-group
												[requiredText]="requiredText"
												[title]="labelCourseType"
												[id]="'radio-button-group-1'"
												[options]="courseTypeOptions"
												[control]="fieldsetExample.controls['courseType']"
												[errorMsg]="errorCourseType" />
											<fudis-grid [columns]="{ sm: 2 }">
												<fudis-datepicker
													[label]="labelStartDate"
													[id]="'date-picker-1'"
													[size]="'s'"
													[requiredText]="requiredText"
													[helpText]="'You have to start from somewhere'"
													[errorMsg]="errorStartdate"
													[control]="fieldsetExample.controls['startDate']"
													[minDate]="minDate"
													[maxDate]="
														fieldsetExample.controls['endDate'].value
															? fieldsetExample.controls['endDate'].value
															: maxDate
													">
												</fudis-datepicker>
												<fudis-datepicker
													[label]="labelEndDate"
													[id]="'date-picker-2'"
													[size]="'s'"
													[requiredText]="requiredText"
													[helpText]="'You have to end it to something'"
													[errorMsg]="errorEnddate"
													[control]="fieldsetExample.controls['endDate']"
													[disabled]="
														!fieldsetExample.controls['startDate'].value && !fieldsetExample.controls['startDate'].valid
													"
													[minDate]="fieldsetExample.controls['startDate'].value">
												</fudis-datepicker>
											</fudis-grid>
										</fudis-grid>
									</ng-template>
								</fudis-fieldset>
							</ng-template>
						</fudis-expandable>
					</ng-template>
				</fudis-section>
			</ng-template>
		</fudis-form>
	`,
})
class FormContentExampleComponent {
	errorSummaryVisible: boolean = false;

	firstLoad: boolean = true;

	submitForm(): void {
		this.fieldsetExample.markAllAsTouched();

		this.firstLoad = false;

		if (this.fieldsetExample.invalid) {
			this._collapsed = false;
			this.errorSummaryVisible = true;
			this.errorSummaryService.reloadErrors(500);
		} else {
			this.errorSummaryVisible = false;
		}
	}

	handleCollapsedOutput(value: boolean): void {
		this._collapsed = value;
	}

	private _collapsed: boolean = true;

	formHeaderDl = [
		{ key: 'Important person', value: 'Admiral Thrawn' },
		{ key: 'Key', value: 'THX-1138' },
		{ key: 'Another important person', value: 'Mara Jade' },
	];

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

	requiredText = 'Required';

	formTitle = 'Example form heading';

	titleTag = 'h1';

	errorSummaryHelpText = 'There are errors in this form. Please address these before trying to submit again.';

	errorSummaryScreenReaderHelpText = 'Attention';

	formHelpText = "Come about rope's end loot hail-shot belaying pin hornswaggle maroon quarter main sheet nipperkin.";

	fieldsetExample = new FormGroup({
		name: new FormGroup(
			{
				finnish: new FormControl(''),
				swedish: new FormControl(''),
				english: new FormControl(''),
			},
			[FormGroupValidators.atLeastOneRequired()]
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

	constructor(private errorSummaryService: FudisErrorSummaryService) {}
}

export default {
	title: 'Components/Form/Form',
	component: FormComponent,

	argTypes: {},
	decorators: [
		moduleMetadata({
			declarations: [FormContentExampleComponent],
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

const html = String.raw;

// const Template: StoryFn = () => ({
// 	props: {
// 		title: 'Example form heading',
// 		titleTag: 'h1',
// 		errorSummaryHelpText: 'There are errors in this fieldset. Please address these before trying to submit again.',
// 		errorSummaryVisible: false,
// 		errorSummaryScreenReaderHelpText: 'Attention',
// 		helpText:
// 			"Come about rope's end loot hail-shot belaying pin hornswaggle maroon quarter main sheet nipperkin. Pieces of Eight reef landlubber or just lubber reef sails loaded to the gunwalls coffer Sail ho draught capstan shrouds. Plate Fleet fluke Yellow Jack galleon wherry wench Cat o'nine tails yard coxswain square-rigged.",
// 	},
// 	template: html`
// 		<fudis-form
// 			[titleTag]="titleTag"
// 			[title]="title"
// 			[id]="id"
// 			[helpText]="helpText"
// 			[errorSummaryScreenReaderHelpText]="errorSummaryScreenReaderHelpText"
// 			[errorSummaryHelpText]="errorSummaryHelpText"
// 			[errorSummaryVisible]="errorSummaryVisible">
// 			<example-form-content></example-form-content>
// 		</fudis-form>
// 	`,
// });

const Template: StoryFn = () => ({
	template: html` <example-form-content></example-form-content> `,
});

export const Example = Template.bind({});
