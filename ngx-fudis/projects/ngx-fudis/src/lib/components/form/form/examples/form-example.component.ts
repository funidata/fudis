import { OnInit, Input, Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FudisFocusService } from '../../../../services/focus/focus.service';
import { FudisRadioButtonOption } from '../../../../types/forms';
import { NgxFudisModule } from '../../../../ngx-fudis.module';
import { CommonModule } from '@angular/common';
import { FudisTranslationService } from '../../../../services/translation/translation.service';

type MyForm = {
  courseBooks: FormGroup;
  teacher: FormControl<string | null>;
  email: FormControl<string | null>;
  importantDate: FormControl<Date | null>;
  courseType: FormControl<string | null>;
  startDate: FormControl<Date | null>;
  endDate: FormControl<Date | null>;
  description: FormGroup;
};

@Component({
  standalone: true,
  imports: [NgxFudisModule, CommonModule],
  selector: 'example-form-content',
  template: `
    <fudis-section [title]="'Main section'" [errorSummaryBreadcrumb]="true">
      <fudis-section-content>
        <fudis-notification
          ><fudis-body-text
            >This is notification for the section</fudis-body-text
          ></fudis-notification
        >
        <fudis-expandable
          (closedChange)="handleClosedOutput($event)"
          [title]="'Expandable section 1'"
          [closed]="_closed"
        >
          <ng-template fudisContent [type]="'expandable'">
            <fudis-grid>
              <fudis-radio-button-group
                [label]="'Course type'"
                [control]="formGroup.controls['courseType']"
              >
                <fudis-radio-button
                  *ngFor="let option of courseTypeOptions"
                  [label]="option.label"
                  [value]="option.value"
                />
              </fudis-radio-button-group>
              <fudis-checkbox-group
                [formGroup]="formGroup.controls.courseBooks"
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
                [control]="formGroup.controls['importantDate']"
              >
                <fudis-error-message
                  *ngIf="formGroup.controls['importantDate'].value?.getTime() !== releaseDate"
                  [message]="'Wrong date chosen. 1.5.1991 would be great!'"
                />
              </fudis-datepicker>
              <fudis-fieldset
                [label]="'Tearcher info'"
                [tooltip]="'Quite many fields are required.'"
              >
                <fudis-fieldset-content>
                  <fudis-grid [columns]="{ lg: 'inputLg inputLg' }">
                    <fudis-text-input
                      [initialFocus]="true"
                      [id]="'unique-input-3'"
                      [control]="formGroup.controls['teacher']"
                      [label]="'Responsible teacher'"
                      [helpText]="'Someone has to be responsible for this.'"
                    >
                    </fudis-text-input>
                    <fudis-text-input
                      [id]="'unique-input-4'"
                      [control]="formGroup.controls['email']"
                      [label]="'Contact email'"
                      [helpText]="'So that students can ask for more time on their homework.'"
                    />
                  </fudis-grid>
                </fudis-fieldset-content>
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
            <fudis-fieldset [label]="'More important fields'">
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
                  [label]="'Description'"
                  [helpText]="'Description in all languages is required'"
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
