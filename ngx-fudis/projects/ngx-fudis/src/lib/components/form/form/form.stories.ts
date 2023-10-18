import { StoryFn, Meta, moduleMetadata, applicationConfig } from '@storybook/angular';

import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RouterModule } from '@angular/router';
import {
	FudisDropdownOption,
	FudisRadioButtonOption,
	FudisFormGroupErrors,
	FudisFormErrors,
	FudisDateRangeItem,
} from '../../../types/forms';

import { FudisErrorSummaryService } from '../../../services/form/error-summary/error-summary.service';
import { FudisFormGroupValidators } from '../../../utilities/form/validators';
import { FormComponent } from './form.component';
import { FudisTranslationService } from '../../../services/translation/translation.service';
import { FudisFocusService } from '../../../services/focus/focus.service';

@Component({
	selector: 'example-form-content',
	template: `
		<fudis-form
			[marginSides]="'responsive'"
			[marginTop]="'xl'"
			[badge]="'primary'"
			[badgeText]="'example'"
			[titleLevel]="titleLevel"
			[title]="formTitle"
			[id]="id"
			[helpText]="formHelpText"
			[errorSummaryLinkType]="'href'"
			[errorSummaryHelpText]="errorSummaryHelpText"
			[errorSummaryLiveRemove]="false"
			[errorSummaryVisible]="errorSummaryVisible">
			<ng-template fudisHeader>
				<!-- <fudis-heading [marginBottom]="'xs'" [level]="titleLevel">{{ formTitle }}</fudis-heading> -->
				<fudis-description-list [columns]="1" [variant]="'compact'" [data]="formHeaderDl" />
			</ng-template>
			<ng-template fudisActions type="form">
				<fudis-button [label]="'Previous step'" [icon]="'back'" [variant]="'tertiary'" />
				<fudis-button [label]="'Open menu'" [icon]="'three-dots'" [labelHidden]="true" [variant]="'secondary'" />
				<fudis-button [variant]="'secondary'" (handleClick)="changeLanguage()" [label]="'Change language'" />
				<fudis-button [label]="'Submit'" (handleClick)="submitForm()" />
			</ng-template>
			<ng-template fudisContent type="form">
				<fudis-section [title]="'Main section'">
					<ng-template fudisContent type="section">
						<fudis-expandable
							(closedChange)="handleClosedOutput($event)"
							[title]="'Expandable section 1'"
							[closed]="_closed">
							<ng-template fudisContent type="expandable">
								<fudis-grid>
									<fudis-fieldset
										[title]="'Basic info'"
										[helpText]="'Some generic info about this course'"
										[id]="fieldsetId">
										<ng-template fudisNotifications type="fieldset">
											<fudis-notification *ngIf="firstLoad || errorSummaryVisible">
												<fudis-body-text>
													This is notification for a fieldset. It has one custom error-message which should pop up in
													the error summary on submit.
												</fudis-body-text>
												<fudis-error-message
													[type]="'fieldset'"
													[variant]="'body-text'"
													[visible]="true"
													[focusId]="fieldsetId"
													[label]="'Basic info'"
													[message]="'There might be some errors in the fieldset'" />
											</fudis-notification>
										</ng-template>
										<ng-template fudisContent type="fieldset">
											<fudis-grid [columns]="{ lg: 'inputLg inputLg' }">
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
													[helpText]="
														'So that students know what they are getting into. Provide description in all languages.'
													"
													[groupErrorMsg]="errorDescription" />
												<fudis-radio-button-group
													[title]="labelCourseType"
													[id]="'radio-button-group-1'"
													[options]="courseTypeOptions"
													[control]="fieldsetExample.controls['courseType']"
													[errorMsg]="errorCourseType" />
											</fudis-grid>
										</ng-template>
									</fudis-fieldset>
									<fudis-fieldset [title]="'Tearcher info'" [tooltip]="'Quite many fields are required.'">
										<ng-template fudisContent type="fieldset">
											<fudis-grid [columns]="{ lg: 'inputLg inputLg' }">
												<fudis-text-input
													[initialFocus]="true"
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
											</fudis-grid>
										</ng-template>
									</fudis-fieldset>
									<fudis-fieldset [title]="'Important dates'" [tooltip]="'Quite many fields are required.'">
										<ng-template fudisContent type="fieldset">
											<fudis-grid [columns]="{ lg: 'inputSm inputSm' }">
												<fudis-datepicker
													[label]="labelStartDate"
													[id]="'date-picker-1'"
													[size]="'s'"
													[helpText]="'You have to start from somewhere'"
													[errorMsg]="errorImportantDate"
													[control]="fieldsetExample.controls['importantDate']">
												</fudis-datepicker>
											</fudis-grid>
										</ng-template>
									</fudis-fieldset>
								</fudis-grid>
							</ng-template>
						</fudis-expandable>
						<fudis-expandable [closed]="_closed" [title]="'Expandable section 2'" [errorSummaryBreadcrumb]="true">
							<ng-template fudisContent type="expandable">
								<fudis-fieldset [title]="'More important dates'">
									<ng-template fudisContent type="fieldset">
										<fudis-date-range [startDate]="dateRangeStartDate" [endDate]="dateRangeEndDate" />
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
class FormContentExampleComponent implements OnInit {
	constructor(
		private _errorSummaryService: FudisErrorSummaryService,
		private _translationService: FudisTranslationService,
		private _focusService: FudisFocusService
	) {}

	errorSummaryVisible: boolean = false;

	firstLoad: boolean = true;

	fieldsetId = 'first-fieldset-id';

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
			required: 'Missing description in Finnish',
			minlength: 'Description should at least 10 characters',
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

	errorImportantDate: FudisFormErrors = {
		required: 'Start date is missing.',
		matDatepickerParse: 'Date should be in dd.mm.yyyy format.',
	};

	errorCourseType: FudisFormErrors = {
		required: 'Course type must be selected.',
	};

	title = 'Fill in course information';

	helpText = 'Please fill in course information.';

	labelName = 'Course name';

	labelDescription = 'Course description';

	labelTeacher = 'Responsible teacher';

	labelEmail = 'Contact email';

	labelStartDate = 'Start date';

	labelEndDate = 'End date';

	labelCourseType = 'Course type';

	formTitle = 'Example form heading';

	titleLevel = 1;

	errorSummaryHelpText = 'There are errors in this form. Please address these before trying to submit again.';

	formHelpText = "Come about rope's end loot hail-shot belaying pin hornswaggle maroon quarter main sheet nipperkin.";

	fieldsetExample = new FormGroup({
		name: new FormGroup(
			{
				finnish: new FormControl(null),
				swedish: new FormControl(null),
				english: new FormControl(null),
			},
			[FudisFormGroupValidators.atLeastOneRequired()]
		),
		description: new FormGroup({
			finnish: new FormControl(null, [Validators.required, Validators.minLength(10)]),
			swedish: new FormControl(null, [Validators.required, Validators.minLength(10)]),
			english: new FormControl(null, [Validators.required, Validators.minLength(10)]),
		}),
		teacher: new FormControl(null, Validators.required),
		email: new FormControl(null, [Validators.required, Validators.email, Validators.minLength(5)]),
		importantDate: new FormControl(null, Validators.required),
		courseType: new FormControl(null, Validators.required),
		startDate: new FormControl<Date | null>(null, Validators.required),
		endDate: new FormControl<Date | null>(null, Validators.required),
	});

	languageOptions: FudisDropdownOption[] = [
		{ value: 'finnish', viewValue: 'FI' },
		{ value: 'swedish', viewValue: 'SV' },
		{ value: 'english', viewValue: 'EN' },
	];

	courseTypeOptions: FudisRadioButtonOption[] = [
		{ value: 'basic', viewValue: 'Basic', id: 'courseType-1', name: 'courseType' },
		{ value: 'advanced', viewValue: 'Advanced', id: 'courseType-2', name: 'courseType' },
	];

	dateRangeStartDate: FudisDateRangeItem = {
		control: this.fieldsetExample.controls.startDate,
		label: 'Start date',
		errorMsg: {
			required: 'Start date is required',
			matDatepickerParse: 'Start date is not proper date',
			matStartDateInvalid: 'Start date cannot be after end date',
		},
	};

	dateRangeEndDate: FudisDateRangeItem = {
		control: this.fieldsetExample.controls.endDate,
		label: 'End date',
		errorMsg: {
			required: 'End date is required',
			matDatepickerParse: 'End date is not proper date',
			matEndDateInvalid: 'End date cannot be before start date',
		},
	};

	private _closed: boolean = true;

	ngOnInit(): void {
		this._focusService.addToIgnoreList('unique-input-3');
	}

	submitForm(): void {
		this.fieldsetExample.markAllAsTouched();

		this.firstLoad = false;

		if (this.fieldsetExample.invalid) {
			this._closed = false;
			this.errorSummaryVisible = true;
			this._errorSummaryService.reloadErrors();
		} else {
			this.errorSummaryVisible = false;
		}
	}

	changeLanguage(): void {
		const currentLang = this._translationService.getLanguage();

		if (currentLang === 'fi') {
			this._translationService.setLanguage('en');
			// eslint-disable-next-line no-console
			console.log('Fudis internal language is now: EN');
		} else {
			this._translationService.setLanguage('fi');
			// eslint-disable-next-line no-console
			console.log('Fudis internal language is now: FI');
		}
	}

	handleClosedOutput(value: boolean): void {
		this._closed = value;
	}
}

export default {
	title: 'Components/Form/Form',
	component: FormComponent,

	argTypes: {},
	decorators: [
		moduleMetadata({
			declarations: [FormContentExampleComponent],
			imports: [ReactiveFormsModule, RouterModule],
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

const Template: StoryFn = () => ({
	template: html` <example-form-content />`,
});

export const Example = Template.bind({});
