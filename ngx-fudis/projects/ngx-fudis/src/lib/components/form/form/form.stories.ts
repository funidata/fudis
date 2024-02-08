import { StoryFn, Meta, moduleMetadata, applicationConfig } from '@storybook/angular';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit, importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import {
  FudisSelectOption,
  FudisRadioButtonOption,
  FudisDateRangeItem,
} from '../../../types/forms';
import { FudisErrorSummaryService } from '../../../services/form/error-summary/error-summary.service';
import { FudisValidators } from '../../../utilities/form/validators';
import { FudisGroupValidators } from '../../../utilities/form/groupValidators';
import { FormComponent } from './form.component';
import { FudisTranslationService } from '../../../services/translation/translation.service';
import { FudisFocusService } from '../../../services/focus/focus.service';
import readme from './readme.mdx';

@Component({
  selector: 'example-form-content',
  template: `
    <fudis-form
      [marginSides]="'responsive'"
      [marginTop]="'xl'"
      [badge]="'primary'"
      [badgeText]="'example'"
      [titleLevel]="1"
      [title]="'Example form heading'"
      [helpText]="
        'Come about ropes end loot hail-shot belaying pin hornswaggle maroon quarter main sheet nipperkin.'
      "
      [errorSummaryLinkType]="'href'"
      [errorSummaryHelpText]="
        'There are errors in this form. Please address these before trying to submit again.'
      "
      [errorSummaryVisible]="errorSummaryVisible"
    >
      <!-- <ng-template fudisHeader>
        <fudis-description-list [columns]="1" [variant]="'compact'" [data]="formHeaderDl" />
      </ng-template> -->
      <ng-template fudisActions [type]="'form'">
        <fudis-button [label]="'Previous step'" [icon]="'back'" [variant]="'tertiary'" />

        <fudis-button [label]="'Submit'" (handleClick)="submitForm()" />
      </ng-template>
      <ng-template fudisContent [type]="'form'">
        <fudis-section [title]="'Main section'">
          <ng-template fudisContent [type]="'section'">
            <fudis-expandable
              (closedChange)="handleClosedOutput($event)"
              [title]="'Expandable section 1'"
              [closed]="_closed"
            >
              <ng-template fudisContent [type]="'expandable'">
                <fudis-grid>
                  <fudis-fieldset
                    [title]="'Basic info'"
                    [helpText]="'Some generic info about this course'"
                    [id]="fieldsetId"
                  >
                    <ng-template fudisNotifications [type]="'fieldset'">
                      <fudis-notification *ngIf="firstLoad || errorSummaryVisible">
                        This is notification for a fieldset. TODO: Add notifications to error
                        summary if needed.
                      </fudis-notification>
                    </ng-template>
                    <ng-template fudisContent [type]="'fieldset'">
                      <fudis-grid [columns]="{ lg: 'inputLg inputLg' }">
                        <fudis-input-with-language-options
                          [id]="'unique-input-1'"
                          [options]="languageOptions"
                          [formGroup]="formExample.controls['name']"
                          [label]="'Course name'"
                          [helpText]="
                            'Some name would be nice. Provide course name in at least one language.'
                          "
                        >
                          <fudis-error-message
                            *ngIf="
                              formExample.controls['importantDate'].value?.getTime() !== releaseDate
                            "
                            [message]="
                              'Reminder here as well, that you have not set a good start date'
                            "
                          />
                        </fudis-input-with-language-options>
                        <fudis-input-with-language-options
                          [variant]="'text-area'"
                          [id]="'unique-input-2'"
                          [options]="languageOptions"
                          [formGroup]="formExample.controls['description']"
                          [label]="'Course description'"
                          [helpText]="
                            'So that students know what they are getting into. Provide description in all languages.'
                          "
                        />
                        <!-- <fudis-radio-button-group
                          [title]="'Course type'"
                          [id]="'radio-button-group-1'"
                          [options]="courseTypeOptions"
                          [control]="formExample.controls['courseType']"
                        /> -->
                        <fudis-checkbox-group
                          [formGroup]="formExample.controls.courseBooks"
                          [title]="'Course books'"
                          [required]="true"
                          [helpText]="'Select 1-2 coursebooks'"
                        >
                          <fudis-checkbox [controlName]="'first'" [label]="'Heir to the Empire'" />
                          <fudis-checkbox [controlName]="'second'" [label]="'Dark Force Rising'" />
                          <fudis-checkbox [controlName]="'third'" [label]="'The Last Command'" />
                        </fudis-checkbox-group>
                        <fudis-datepicker
                          [label]="'Start date'"
                          [helpText]="'You have to start from somewhere'"
                          [control]="formExample.controls['importantDate']"
                        >
                          <fudis-error-message
                            *ngIf="
                              formExample.controls['importantDate'].value?.getTime() !== releaseDate
                            "
                            [message]="'Wrong date chosen. 1.5.1991 would be great!'"
                          />
                        </fudis-datepicker>
                      </fudis-grid>
                    </ng-template>
                  </fudis-fieldset>
                  <fudis-fieldset
                    [title]="'Tearcher info'"
                    [tooltip]="'Quite many fields are required.'"
                  >
                    <ng-template fudisContent [type]="'fieldset'">
                      <fudis-grid [columns]="{ lg: 'inputLg inputLg' }">
                        <fudis-text-input
                          [initialFocus]="true"
                          [id]="'unique-input-3'"
                          [control]="formExample.controls['teacher']"
                          [label]="'Responsible teacher'"
                          [helpText]="'Someone has to be responsible for this.'"
                        >
                        </fudis-text-input>
                        <fudis-text-input
                          [id]="'unique-input-4'"
                          [control]="formExample.controls['email']"
                          [label]="'Contact email'"
                          [helpText]="'So that students can ask for more time on their homework.'"
                        />
                      </fudis-grid>
                    </ng-template>
                  </fudis-fieldset>
                </fudis-grid>
              </ng-template>
            </fudis-expandable>
            <fudis-expandable
              [closed]="_closed"
              [title]="'Expandable section 2'"
              [errorSummaryBreadcrumb]="true"
            >
              <ng-template fudisContent [type]="'expandable'">
                <fudis-fieldset [title]="'More important dates'">
                  <ng-template fudisContent [type]="'fieldset'">
                    <fudis-date-range
                      [startDate]="dateRangeStartDate"
                      [endDate]="dateRangeEndDate"
                    />
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
    private _focusService: FudisFocusService,
  ) {}

  releaseDate: number = new Date(1991, 4, 1).getTime();

  errorSummaryVisible: boolean = false;

  firstLoad: boolean = true;

  fieldsetId = 'first-fieldset-id';

  formHeaderDl = [
    { key: 'Important person', value: 'Admiral Thrawn' },
    { key: 'Key', value: 'THX-1138' },
    { key: 'Another important person', value: 'Mara Jade' },
  ];

  formExample = new FormGroup({
    name: new FormGroup(
      {
        finnish: new FormControl(null),
        swedish: new FormControl(null),
        english: new FormControl(null),
      },
      [FudisGroupValidators.atLeastOneRequired(new BehaviorSubject('Course name is missing.'))],
    ),
    description: new FormGroup({
      finnish: new FormControl(null, [
        FudisValidators.required('Missing description in Finnish.'),
        FudisValidators.minLength(10, 'Description should at least 10 characters.'),
      ]),
      swedish: new FormControl(null, [
        FudisValidators.required('Missing description in Swedish.'),
        FudisValidators.minLength(10, 'Description should at least 10 characters.'),
      ]),
      english: new FormControl(null, [
        FudisValidators.required('Missing description in English.'),
        FudisValidators.minLength(10, 'Description should at least 10 characters.'),
      ]),
    }),
    courseBooks: new FormGroup(
      {
        first: new FormControl(null),
        second: new FormControl(null),
        third: new FormControl(null),
      },
      [
        FudisGroupValidators.min({ value: 1, message: new BehaviorSubject('No book selected.') }),
        FudisGroupValidators.max({ value: 2, message: new BehaviorSubject('Too many selected.') }),
      ],
    ),
    teacher: new FormControl(
      null,
      FudisValidators.required("Missing teacher's name who is responsible for this course."),
    ),
    email: new FormControl(null, [
      FudisValidators.required('Missing email contact.'),
      FudisValidators.email('Input must be an email address.'),
      FudisValidators.minLength(5, 'Email should be at least 5 characters.'),
    ]),
    importantDate: new FormControl(null, FudisValidators.required('Start date is missing.')),
    courseType: new FormControl(null, FudisValidators.required('Course type must be selected.')),
    startDate: new FormControl<Date | null>(
      null,
      FudisValidators.required('Start date is required.'),
    ),
    endDate: new FormControl<Date | null>(null, FudisValidators.required('End date is required.')),
  });

  languageOptions: FudisSelectOption[] = [
    { value: 'finnish', label: 'FI' },
    { value: 'swedish', label: 'SV' },
    { value: 'english', label: 'EN' },
  ];

  courseTypeOptions: FudisRadioButtonOption[] = [
    { value: 'basic', label: 'Basic', id: 'courseType-1', name: 'courseType' },
    { value: 'advanced', label: 'Advanced', id: 'courseType-2', name: 'courseType' },
  ];

  dateRangeStartDate: FudisDateRangeItem = {
    control: this.formExample.controls.startDate,
    label: 'Start date',
  };

  dateRangeEndDate: FudisDateRangeItem = {
    control: this.formExample.controls.endDate,
    label: 'End date',
  };

  private _closed: boolean = true;

  ngOnInit(): void {
    this._focusService.addToIgnoreList('unique-input-3');
  }

  submitForm(): void {
    this.formExample.markAllAsTouched();
    this.errorSummaryVisible = true;

    this.firstLoad = false;

    if (this.formExample.invalid) {
      this._closed = false;
      this._errorSummaryService.reloadErrors();
    } else {
      this.errorSummaryVisible = false;
    }
  }

  handleClosedOutput(value: boolean): void {
    this._closed = value;
  }
}

export default {
  title: 'Components/Form/Form',
  component: FormComponent,
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
    docs: {
      page: readme,
    },
  },
} as Meta;

const html = String.raw;

export const Example: StoryFn = () => ({
  template: html` <example-form-content />`,
});
