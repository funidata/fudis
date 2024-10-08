import { OnInit, Input, Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FudisFocusService } from '../../../../services/focus/focus.service';
import { FudisRadioButtonOption } from '../../../../types/forms';
import { FudisBadgeVariant } from '../../../../types/miscellaneous';
import { FudisHeadingVariant, FudisHeadingLevel } from '../../../../types/typography';
import { FudisTranslationService, FudisGroupValidators, FudisValidators } from 'ngx-fudis';
import { BehaviorSubject } from 'rxjs';
import { NgxFudisModule } from '../../../../../public-api';
import { CommonModule } from '@angular/common';

type MyForm = {
  courseBooks: FormGroup;
  teacher: FormControl<string | null>;
  email: FormControl<string | null>;
  importantDate: FormControl<Date | null>;
  courseType: FormControl<string | null>;
  startDate: FormControl<Date | null>;
  endDate: FormControl<Date | null>;
};

@Component({
  standalone: true,
  imports: [NgxFudisModule, CommonModule],
  selector: 'example-form-content',
  template: `
    <fudis-form
      class="fudis-mt-xl"
      [badge]="badge"
      [badgeText]="badgeText"
      [level]="level"
      [title]="title"
      [titleVariant]="titleVariant"
      [helpText]="helpText"
      [errorSummaryHelpText]="errorSummaryHelpText"
      [errorSummaryVisible]="errorSummaryVisible"
    >
      <ng-template fudisHeader>
        <fudis-dl [columns]="1" [variant]="'compact'">
          <fudis-dl-item>
            <fudis-dt [contentText]="'Important person'" />
            <fudis-dd [contentText]="'Admiral Thrawn'" />
          </fudis-dl-item>
          <fudis-dl-item>
            <fudis-dt [contentText]="'Key'" />
            <fudis-dd [contentText]="'THX-1138'" />
          </fudis-dl-item>
          <fudis-dl-item>
            <fudis-dt [contentText]="'Another important person'" />
            <fudis-dd [contentText]="'Mara Jase'" />
          </fudis-dl-item>
        </fudis-dl>
      </ng-template>
      <ng-template fudisActions [type]="'form'">
        <fudis-button [label]="'Previous step'" [icon]="'back'" [variant]="'tertiary'" />
        <fudis-button fudisFormSubmit [formValid]="formExample.valid" [label]="'Submit'" />
      </ng-template>
      <ng-template fudisContent [type]="'form'">
        <fudis-section [title]="'Main section'" [errorSummaryBreadcrumb]="true">
          <ng-template fudisNotifications [type]="'section'">
            <fudis-notification
              ><fudis-body-text
                >This is notification for the section</fudis-body-text
              ></fudis-notification
            >
          </ng-template>
          <ng-template fudisContent [type]="'section'">
            <fudis-expandable
              (closedChange)="handleClosedOutput($event)"
              [title]="'Expandable section 1'"
              [closed]="_closed"
            >
              <ng-template fudisContent [type]="'expandable'">
                <fudis-grid>
                  <fudis-radio-button-group
                    [label]="'Course type'"
                    [control]="formExample.controls['courseType']"
                  >
                    <fudis-radio-button
                      *ngFor="let option of courseTypeOptions"
                      [label]="option.label"
                      [value]="option.value"
                    />
                  </fudis-radio-button-group>
                  <fudis-checkbox-group
                    [formGroup]="formExample.controls.courseBooks"
                    [label]="'Course books'"
                    [helpText]="'Select 1-2 coursebooks'"
                  >
                    <fudis-checkbox [controlName]="'first'" [label]="'Heir to the Empire'" />
                    <fudis-checkbox [controlName]="'second'" [label]="'Dark Force Rising'" />
                    <fudis-checkbox [controlName]="'third'" [label]="'The Last Command'" />
                  </fudis-checkbox-group>
                  <fudis-datepicker
                    [label]="'Important date'"
                    [helpText]="'You have to start from somewhere'"
                    [control]="formExample.controls['importantDate']"
                  >
                    <fudis-error-message
                      *ngIf="formExample.controls['importantDate'].value?.getTime() !== releaseDate"
                      [message]="'Wrong date chosen. 1.5.1991 would be great!'"
                    />
                  </fudis-datepicker>
                  <fudis-fieldset
                    [label]="'Tearcher info'"
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
                <fudis-fieldset [label]="'More important dates'">
                  <ng-template fudisContent [type]="'fieldset'">
                    <fudis-date-range>
                      <fudis-datepicker
                        fudisDateStart
                        [label]="'Start date'"
                        [control]="formExample.controls.startDate"
                      />
                      <fudis-datepicker
                        fudisDateEnd
                        [label]="'End date'"
                        [control]="formExample.controls.endDate"
                      />
                    </fudis-date-range>
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
export class FormContentExampleComponent implements OnInit {
  constructor(
    private _translationService: FudisTranslationService,
    private _focusService: FudisFocusService,
  ) {
    this.formExample = new FormGroup({
      courseBooks: new FormGroup(
        {
          first: new FormControl(null),
          second: new FormControl(null),
          third: new FormControl(null),
        },
        [
          FudisGroupValidators.min({ value: 1, message: new BehaviorSubject('No book selected.') }),
          FudisGroupValidators.max({
            value: 2,
            message: new BehaviorSubject('Too many selected.'),
          }),
        ],
      ),
      teacher: new FormControl<string | null>(
        null,
        FudisValidators.required("Missing teacher's name who is responsible for this course."),
      ),
      email: new FormControl<string | null>(null, [
        FudisValidators.required('Missing email contact.'),
        FudisValidators.email('Input must be an email address.'),
        FudisValidators.minLength(5, 'Email should be at least 5 characters.'),
      ]),
      importantDate: new FormControl<Date | null>(
        null,
        FudisValidators.required('Start date is missing.'),
      ),
      courseType: new FormControl<string | null>(
        null,
        FudisValidators.required('Course type must be selected.'),
      ),
      startDate: new FormControl<Date | null>(null, [
        FudisValidators.required('Start date is required.'),
        FudisValidators.datepickerMin({
          value: new Date(2024, 8, 19),
          message: 'Start date cannot be earlier than 19.9.2024',
        }),
      ]),
      endDate: new FormControl<Date | null>(null, [
        FudisValidators.required('End date is required.'),
        FudisValidators.datepickerMax({
          value: new Date(2024, 9, 20),
          message: 'End date cannot be later than 20.10.2024',
        }),
      ]),
    });
  }

  @Input() title: string;
  @Input() titleVariant: FudisHeadingVariant;
  @Input() level: FudisHeadingLevel;
  @Input() helpText: string;
  @Input() badge: FudisBadgeVariant;
  @Input() badgeText: string;
  @Input() errorSummaryHelpText: string;
  @Input() errorSummaryVisible: boolean;

  releaseDate: number = new Date(1991, 4, 1).getTime();
  firstLoad: boolean = true;
  fieldsetId = 'first-fieldset-id';

  formExample: FormGroup<MyForm>;

  courseTypeOptions: FudisRadioButtonOption<object>[] = [
    { value: 'basic', label: 'Basic' },
    { value: 'advanced', label: 'Advanced' },
  ];

  protected _closed: boolean = true;

  ngOnInit(): void {
    this._focusService.addToIgnoreList('unique-input-3');
  }

  handleClosedOutput(value: boolean): void {
    this._closed = value;
  }
}
