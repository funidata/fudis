import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { NgxFudisModule } from '../../../../ngx-fudis.module';
import {
  FudisLocalizedTextGroupDefaultFormGroup,
  FudisRadioButtonOption,
} from '../../../../types/forms';
import { FudisValidators } from '../../../../utilities/form/validators';
import { FudisGroupValidators } from '../../../../utilities/form/groupValidators';
import { defaultOptions, TestCourseAvailability } from '../../select/common/mock_data';
import { FudisErrorSummaryService } from '../../../../services/form/error-summary/error-summary.service';

interface MyCheckboxGroup {
  [key: string]: FormControl<boolean | null>;
}

@Component({
  imports: [NgxFudisModule, CommonModule],
  selector: 'example-with-multiple-forms',
  template: `
    <fudis-grid [align]="'center'" [columns]="{ sm: 2 }" [width]="'lg'" [classes]="'fudis-mt-xl'">
      <div fudisGridItem [columns]="'stretch'">
        <fudis-heading [level]="1">Course information forms</fudis-heading>
        <fudis-body-text
          >Complete the course information sections and submit them together to review validation
          messages in each section.</fudis-body-text
        >
      </div>

      <fudis-button
        fudisGridItem
        [columns]="'stretch'"
        (handleClick)="submitAllForms()"
        [label]="'Submit all sections'"
      />

      <fudis-form
        [level]="2"
        [titleVariant]="'lg'"
        [title]="'Course title'"
        [errorSummaryVisible]="errorSummaryVisible"
        [errorSummaryTitle]="errorSummaryTitle"
      >
        <fudis-form-actions>
          <fudis-button
            fudisFormSubmit
            [formValid]="allForms.controls.formOne.valid"
            [label]="'Submit course title'"
          />
        </fudis-form-actions>
        <fudis-form-content>
          <fudis-expandable
            [title]="'Course title details'"
            [errorSummaryBreadcrumb]="true"
            [level]="3"
            [class]="'fudis-mb-sm'"
          >
            <ng-template fudisExpandableContent>
              <fudis-text-input
                [label]="'Course title'"
                [control]="allForms.controls.formOne.controls.name"
              />
            </ng-template>
          </fudis-expandable>
        </fudis-form-content>
      </fudis-form>
      <fudis-form
        [level]="2"
        [titleVariant]="'lg'"
        [title]="'Course description'"
        [errorSummaryVisible]="errorSummaryVisible"
        [errorSummaryTitle]="errorSummaryTitle"
      >
        <fudis-form-actions>
          <fudis-button
            fudisFormSubmit
            [formValid]="allForms.controls.formTwo.valid"
            [label]="'Submit course description'"
          />
        </fudis-form-actions>
        <fudis-form-content>
          <fudis-expandable
            [title]="'Course description details'"
            [errorSummaryBreadcrumb]="true"
            [level]="3"
            [class]="'fudis-mb-sm'"
          >
            <ng-template fudisExpandableContent>
              <fudis-text-area
                [label]="'Course description'"
                [control]="allForms.controls.formTwo.controls.description"
              />
            </ng-template>
          </fudis-expandable>
        </fudis-form-content>
      </fudis-form>
      <fudis-form
        [level]="2"
        [titleVariant]="'lg'"
        [title]="'Teaching methods'"
        [errorSummaryVisible]="errorSummaryVisible"
        [errorSummaryTitle]="errorSummaryTitle"
      >
        <fudis-form-actions>
          <fudis-button
            fudisFormSubmit
            [formValid]="allForms.controls.formThree.valid"
            [label]="'Submit teaching methods'"
          />
        </fudis-form-actions>
        <fudis-form-content>
          <fudis-expandable
            [title]="'Select teaching methods'"
            [level]="3"
            [errorSummaryBreadcrumb]="true"
            [class]="'fudis-mb-sm'"
          >
            <ng-template fudisExpandableContent>
              <fudis-checkbox-group
                [label]="'Select teaching methods'"
                [formGroup]="allForms.controls.formThree"
              >
                @for (
                  control of allForms.controls.formThree.controls | keyvalue;
                  track control.key
                ) {
                  <fudis-checkbox-group-option [controlName]="control.key" [label]="control.key" />
                }
              </fudis-checkbox-group>
            </ng-template>
          </fudis-expandable>
        </fudis-form-content>
      </fudis-form>
      <fudis-form
        [level]="2"
        [titleVariant]="'lg'"
        [title]="'Study format'"
        [errorSummaryVisible]="errorSummaryVisible"
        [errorSummaryTitle]="errorSummaryTitle"
      >
        <fudis-form-actions>
          <fudis-button
            fudisFormSubmit
            [formValid]="allForms.controls.formFive.valid"
            [label]="'Submit study format'"
          />
        </fudis-form-actions>
        <fudis-form-content>
          <fudis-expandable
            [title]="'Select study format'"
            [level]="3"
            [errorSummaryBreadcrumb]="true"
            [class]="'fudis-mb-sm'"
          >
            <ng-template fudisExpandableContent>
              <fudis-radio-button-group
                [label]="'Select study format'"
                [control]="allForms.controls.formFive"
              >
                @for (option of radioOptions; track option.value) {
                  <fudis-radio-button [label]="option.label" [value]="option.value" />
                }
              </fudis-radio-button-group>
            </ng-template>
          </fudis-expandable>
        </fudis-form-content>
      </fudis-form>
      <fudis-form
        [level]="2"
        [titleVariant]="'lg'"
        [title]="'Course selection'"
        [errorSummaryVisible]="errorSummaryVisible"
        [errorSummaryTitle]="errorSummaryTitle"
      >
        <fudis-form-actions>
          <fudis-button
            fudisFormSubmit
            [formValid]="allForms.controls.formFour.valid"
            [label]="'Submit course selection'"
          />
        </fudis-form-actions>
        <fudis-form-content>
          <fudis-expandable
            [title]="'Select courses and subject areas'"
            [level]="3"
            [errorSummaryBreadcrumb]="true"
            [class]="'fudis-mb-sm'"
          >
            <ng-template fudisExpandableContent>
              <fudis-fieldset [label]="'Course selection'" [errorSummaryBreadcrumb]="true">
                <fudis-fieldset-content>
                  <fudis-select
                    [label]="'Select a course'"
                    [control]="allForms.controls.formFour.controls.select"
                  >
                    <ng-template fudisSelectOptions>
                      @for (option of selectOptions; track option.value) {
                        <fudis-select-option [data]="option" />
                      }
                    </ng-template>
                  </fudis-select>
                  <fudis-multiselect
                    [label]="'Select subject areas'"
                    [control]="allForms.controls.formFour.controls.multiselect"
                  >
                    <ng-template fudisSelectOptions>
                      @for (option of selectOptions; track option.value) {
                        <fudis-multiselect-option [data]="option" />
                      }
                    </ng-template>
                  </fudis-multiselect>
                </fudis-fieldset-content>
              </fudis-fieldset>
            </ng-template>
          </fudis-expandable>
        </fudis-form-content>
      </fudis-form>
      <fudis-form
        [level]="2"
        [titleVariant]="'lg'"
        [title]="'Multilingual course information'"
        [errorSummaryVisible]="errorSummaryVisible"
        [errorSummaryTitle]="errorSummaryTitle"
      >
        <fudis-form-actions>
          <fudis-button
            fudisFormSubmit
            [formValid]="allForms.controls.formSix.valid"
            [label]="'Submit course information'"
          />
        </fudis-form-actions>
        <fudis-form-content>
          <fudis-expandable
            [title]="'Provide multilingual course information'"
            [level]="3"
            [errorSummaryBreadcrumb]="true"
          >
            <ng-template fudisExpandableContent>
              <fudis-localized-text-group
                [label]="'Course name in at least one language'"
                [formGroup]="allForms.controls.formSix.controls.oneRequired"
              />
              <fudis-localized-text-group
                [label]="'Course description in all languages'"
                [variant]="'text-area'"
                [formGroup]="allForms.controls.formSix.controls.allRequired"
              />
              <fudis-button [label]="'Add Finnish course name'" (handleClick)="patchValue()" />
            </ng-template>
          </fudis-expandable>
        </fudis-form-content>
      </fudis-form>
    </fudis-grid>
  `,
})
export class StorybookExampleWithMultipleFormsComponent {
  constructor(private _errorSummaryService: FudisErrorSummaryService) {}

  errorSummaryVisible = false;

  errorSummaryTitle = 'Some course information is missing or incorrect.';

  selectOptions = defaultOptions;

  radioOptions: FudisRadioButtonOption<object>[] = [
    {
      label: 'On campus',
      value: 'on-campus',
    },
    {
      label: 'Online',
      value: 'online',
    },
    {
      label: 'Hybrid',
      value: 'hybrid',
    },
  ];

  patchValue(): void {
    this.allForms.controls.formSix.controls.oneRequired.controls['fi'].patchValue('Kurssin nimi');
  }

  submitAllForms(): void {
    if (this.allForms.invalid) {
      this.errorSummaryVisible = true;
      this._errorSummaryService.reloadAllErrors();
    } else {
      this.errorSummaryVisible = false;
    }
  }

  allForms = new FormGroup({
    formOne: new FormGroup({
      name: new FormControl<string | null>(
        null,
        FudisValidators.required('Course title is required.'),
      ),
    }),
    formTwo: new FormGroup({
      description: new FormControl<string | null>('initial value', [
        FudisValidators.minLength(15, 'Min length is 15 chars'),
        FudisValidators.maxLength(20, 'Max length is 20 chars'),
      ]),
    }),
    formThree: new FormGroup<MyCheckboxGroup>(
      {
        lectures: new FormControl<boolean | null>(null),
        seminars: new FormControl<boolean | null>(null),
        workshops: new FormControl<boolean | null>(null),
        independentStudy: new FormControl<boolean | null>(null),
        projectWork: new FormControl<boolean | null>(null),
      },
      [FudisGroupValidators.oneRequired(new BehaviorSubject('Select a teaching method.'))],
    ),
    formFour: new FormGroup({
      select: new FormControl<TestCourseAvailability | null>(
        null,
        FudisValidators.required('Select a course.'),
      ),
      multiselect: new FormControl<TestCourseAvailability[] | null>(null, [
        FudisValidators.required('Select subject areas.'),
        FudisValidators.minLength(2, 'Select at least two subject areas.'),
      ]),
    }),
    formFive: new FormControl(null, FudisValidators.required('Select a study format.')),
    formSix: new FormGroup({
      oneRequired: new FormGroup<FudisLocalizedTextGroupDefaultFormGroup>(
        {
          fi: new FormControl<string | null>(null),
          sv: new FormControl<string | null>(null),
          en: new FormControl<string | null>(null),
        },
        [FudisGroupValidators.oneRequired('Provide a course name in at least one language.')],
      ),
      allRequired: new FormGroup<FudisLocalizedTextGroupDefaultFormGroup>({
        fi: new FormControl<string | null>('Kurssikuvaus', [
          FudisValidators.required('Missing Finnish course description.'),
          FudisValidators.maxLength(15, 'Finnish course description is too long.'),
        ]),
        sv: new FormControl<string | null>(null, [
          FudisValidators.required('Missing Swedish course description.'),
        ]),
        en: new FormControl<string | null>(null, [
          FudisValidators.required('Missing English course description.'),
        ]),
      }),
    }),
  });
}
