import { OnInit, Input, Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FudisFocusService } from '../../../../services/focus/focus.service';
import { FudisRadioButtonOption } from '../../../../types/forms';
import { NgxFudisModule } from '../../../../ngx-fudis.module';

import { FudisTranslationService } from '../../../../services/translation/translation.service';

interface MyCheckboxGroup {
  first: FormControl<boolean | null>;
  second: FormControl<boolean | null>;
  third: FormControl<boolean | null>;
}

type MyForm = {
  courseBooks: FormGroup<MyCheckboxGroup>;
  teacher: FormControl<string | null>;
  email: FormControl<string | null>;
  importantDate: FormControl<Date | null>;
  courseType: FormControl<string | null>;
  startDate: FormControl<Date | null>;
  endDate: FormControl<Date | null>;
  description: FormGroup;
};

@Component({
  imports: [NgxFudisModule],
  selector: 'example-form-content',
  template: `
    <fudis-section
      [title]="'Course implementation'"
      [level]="2"
      [titleVariant]="'lg'"
      [errorSummaryBreadcrumb]="true"
    >
      <fudis-section-content>
        <fudis-notification
          ><fudis-body-text
            >Complete the required course information before submitting.</fudis-body-text
          ></fudis-notification
        >
        <fudis-expandable
          (closedChange)="handleClosedOutput($event)"
          [title]="'Basic course information'"
          [level]="3"
          [closed]="_closed"
          [class]="'fudis-mb-sm'"
        >
          <ng-template fudisExpandableContent>
            <fudis-grid>
              <fudis-radio-button-group
                [label]="'Course type'"
                [control]="formGroup.controls['courseType']"
              >
                @for (option of courseTypeOptions; track option.value) {
                  <fudis-radio-button [label]="option.label" [value]="option.value" />
                }
              </fudis-radio-button-group>
              <fudis-checkbox-group
                [formGroup]="formGroup.controls.courseBooks"
                [label]="'Teaching methods'"
                [helpText]="'Select one to two teaching methods.'"
              >
                <fudis-checkbox-group-option [controlName]="'first'" [label]="'Lectures'" />
                <fudis-checkbox-group-option [controlName]="'second'" [label]="'Seminars'" />
                <fudis-checkbox-group-option
                  [controlName]="'third'"
                  [label]="'Independent study'"
                />
              </fudis-checkbox-group>
              <fudis-datepicker
                [label]="'Course start date'"
                [helpText]="'Select the first teaching date.'"
                [control]="formGroup.controls['importantDate']"
              >
                @if (formGroup.controls['importantDate'].value?.getTime() !== releaseDate) {
                  <fudis-error-message [message]="'Select the published course start date.'" />
                }
              </fudis-datepicker>
              <fudis-fieldset
                [label]="'Teaching staff contact details'"
                [popoverText]="'Provide contact details for the responsible teacher.'"
                [popoverTriggerLabel]="'Additional information'"
              >
                <fudis-fieldset-content>
                  <fudis-grid [columns]="{ lg: 'inputLg inputLg' }">
                    <fudis-text-input
                      [initialFocus]="true"
                      [id]="'unique-input-3'"
                      [control]="formGroup.controls['teacher']"
                      [label]="'Responsible teacher'"
                      [helpText]="'Enter the name of the responsible teacher.'"
                    >
                    </fudis-text-input>
                    <fudis-text-input
                      [id]="'unique-input-4'"
                      [control]="formGroup.controls['email']"
                      [label]="'Contact email'"
                      [helpText]="'Use the institutional email address.'"
                    />
                  </fudis-grid>
                </fudis-fieldset-content>
              </fudis-fieldset>
            </fudis-grid>
          </ng-template>
        </fudis-expandable>
        <fudis-expandable [closed]="_closed" [title]="'Schedule and descriptions'" [level]="3">
          <ng-template fudisExpandableContent>
            <fudis-fieldset [label]="'Teaching period and course description'">
              <fudis-fieldset-content>
                <fudis-date-range>
                  <fudis-datepicker
                    fudisDateStart
                    [label]="'Start date'"
                    [control]="formGroup.controls.startDate"
                  />
                  <fudis-datepicker
                    fudisDateEnd
                    [label]="'End date'"
                    [control]="formGroup.controls.endDate"
                  />
                </fudis-date-range>
                <fudis-localized-text-group
                  [formGroup]="formGroup.controls.description"
                  [label]="'Course description'"
                  [helpText]="'Provide the course description in all languages.'"
                />
              </fudis-fieldset-content>
            </fudis-fieldset>
          </ng-template>
        </fudis-expandable>
      </fudis-section-content>
    </fudis-section>
  `,
})
export class StorybookExampleFormComponent implements OnInit {
  constructor(
    private _translationService: FudisTranslationService,
    private _focusService: FudisFocusService,
  ) {}

  @Input() formGroup: FormGroup<MyForm>;

  releaseDate: number = new Date(1991, 4, 1).getTime();

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
