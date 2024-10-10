import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { NgxFudisModule } from '../../../../ngx-fudis.module';
import {
  FudisRadioButtonOption,
  FudisCheckboxGroupFormGroup,
  FudisSelectOption,
  FudisLocalizedTextGroup,
} from '../../../../types/forms';
import { FudisValidators } from '../../../../utilities/form/validators';
import { FudisGroupValidators } from '../../../../utilities/form/groupValidators';
import { defaultOptions } from '../../select/common/mock_data';
import { FudisErrorSummaryService } from '../../../../services/form/error-summary/error-summary.service';

@Component({
  standalone: true,
  imports: [NgxFudisModule, CommonModule],
  selector: 'example-with-multiple-forms',
  template: `
    <fudis-grid [align]="'center'" [columns]="{ sm: 2 }" [width]="'lg'" [classes]="'fudis-mt-xl'">
      <div fudisGridItem [columns]="'stretch'">
        <fudis-heading [level]="1">Multiple Form Components</fudis-heading>
        <fudis-body-text
          >This page is for testing purposes to demo and test, that form components, their
          validation errors and forms' Error Summaries load correctly whether the Expandable was
          opened or not before clicking Submit.</fudis-body-text
        >
      </div>

      <fudis-button
        fudisGridItem
        [columns]="'stretch'"
        (handleClick)="submitAllForms()"
        [label]="'Submit all forms!'"
      />

      <fudis-form
        [level]="2"
        [titleVariant]="'lg'"
        [title]="'Form 1 with Text Input'"
        [errorSummaryVisible]="errorSummaryVisible"
        [errorSummaryHelpText]="errorSummaryHelpText"
      >
        <ng-template fudisActions [type]="'form'">
          <fudis-button
            fudisFormSubmit
            [formValid]="allForms.controls.formOne.valid"
            [label]="'Submit Form 1'"
          />
        </ng-template>
        <ng-template fudisContent [type]="'form'">
          <fudis-expandable [title]="'Expandable with Text Input'" [errorSummaryBreadcrumb]="true">
            <ng-template fudisContent [type]="'expandable'">
              <fudis-text-input
                [label]="'Name'"
                [control]="allForms.controls.formOne.controls.name"
              />
            </ng-template>
          </fudis-expandable>
        </ng-template>
      </fudis-form>
      <fudis-form
        [level]="2"
        [titleVariant]="'lg'"
        [title]="'Form 2 with Text Area'"
        [errorSummaryVisible]="errorSummaryVisible"
        [errorSummaryHelpText]="errorSummaryHelpText"
      >
        <ng-template fudisActions [type]="'form'">
          <fudis-button
            fudisFormSubmit
            [formValid]="allForms.controls.formTwo.valid"
            [label]="'Submit Form 2'"
          />
        </ng-template>
        <ng-template fudisContent [type]="'form'">
          <fudis-expandable [title]="'Expandable with Text Area'" [errorSummaryBreadcrumb]="true">
            <ng-template fudisContent [type]="'expandable'">
              <fudis-text-area
                [label]="'Description'"
                [control]="allForms.controls.formTwo.controls.description"
              />
            </ng-template>
          </fudis-expandable>
        </ng-template>
      </fudis-form>
      <fudis-form
        [level]="2"
        [titleVariant]="'lg'"
        [title]="'Form 3 with Checkbox Group'"
        [errorSummaryVisible]="errorSummaryVisible"
        [errorSummaryHelpText]="errorSummaryHelpText"
      >
        <ng-template fudisActions [type]="'form'">
          <fudis-button
            fudisFormSubmit
            [formValid]="allForms.controls.formThree.valid"
            [label]="'Submit Form 3'"
          />
        </ng-template>
        <ng-template fudisContent [type]="'form'">
          <fudis-expandable
            [title]="'Expandable with Checkbox Group'"
            [errorSummaryBreadcrumb]="true"
          >
            <ng-template fudisContent [type]="'expandable'">
              <fudis-checkbox-group
                [label]="'Pick a fruit'"
                [formGroup]="allForms.controls.formThree"
              >
                <fudis-checkbox
                  *ngFor="let control of allForms.controls.formThree.controls | keyvalue"
                  [controlName]="control.key"
                  [label]="control.key"
                />
              </fudis-checkbox-group>
            </ng-template>
          </fudis-expandable>
        </ng-template>
      </fudis-form>
      <fudis-form
        [level]="2"
        [titleVariant]="'lg'"
        [title]="'Form 4 with Radio Button Group'"
        [errorSummaryVisible]="errorSummaryVisible"
        [errorSummaryHelpText]="errorSummaryHelpText"
      >
        <ng-template fudisActions [type]="'form'">
          <fudis-button
            fudisFormSubmit
            [formValid]="allForms.controls.formFive.valid"
            [label]="'Submit Form 4'"
          />
        </ng-template>
        <ng-template fudisContent [type]="'form'">
          <fudis-expandable
            [title]="'Expandable with Radio Button Group'"
            [errorSummaryBreadcrumb]="true"
          >
            <ng-template fudisContent [type]="'expandable'">
              <fudis-radio-button-group
                [label]="'Pick a fruit'"
                [control]="allForms.controls.formFive"
              >
                <fudis-radio-button
                  *ngFor="let option of radioOptions"
                  [label]="option.label"
                  [value]="option.value"
                />
              </fudis-radio-button-group>
            </ng-template>
          </fudis-expandable>
        </ng-template>
      </fudis-form>
      <fudis-form
        [level]="2"
        [titleVariant]="'lg'"
        [title]="'Form 5 with Select and Multiselect'"
        [errorSummaryVisible]="errorSummaryVisible"
        [errorSummaryHelpText]="errorSummaryHelpText"
      >
        <ng-template fudisActions [type]="'form'">
          <fudis-button
            fudisFormSubmit
            [formValid]="allForms.controls.formFour.valid"
            [label]="'Submit Form 5'"
          />
        </ng-template>
        <ng-template fudisContent [type]="'form'">
          <fudis-expandable
            [title]="'Expandable with Select and Multiselect'"
            [errorSummaryBreadcrumb]="true"
          >
            <ng-template fudisContent [type]="'expandable'">
              <fudis-fieldset [label]="'Select and Multiselect'" [errorSummaryBreadcrumb]="true">
                <ng-template fudisContent type="fieldset">
                  <fudis-select
                    [label]="'Pick a pet'"
                    [control]="allForms.controls.formFour.controls.select"
                  >
                    <ng-template fudisContent type="select-options">
                      <fudis-select-option *ngFor="let option of selectOptions" [data]="option" />
                    </ng-template>
                  </fudis-select>
                  <fudis-multiselect
                    [label]="'Pick multiple pets'"
                    [control]="allForms.controls.formFour.controls.multiselect"
                  >
                    <ng-template fudisContent type="select-options">
                      <fudis-multiselect-option
                        *ngFor="let option of selectOptions"
                        [data]="option"
                      />
                    </ng-template>
                  </fudis-multiselect>
                </ng-template>
              </fudis-fieldset>
            </ng-template>
          </fudis-expandable>
        </ng-template>
      </fudis-form>
      <fudis-form
        [level]="2"
        [titleVariant]="'lg'"
        [title]="'Form 6 with Localized Text Group'"
        [errorSummaryVisible]="errorSummaryVisible"
        [errorSummaryHelpText]="errorSummaryHelpText"
      >
        <ng-template fudisActions [type]="'form'">
          <fudis-button
            fudisFormSubmit
            [formValid]="allForms.controls.formSix.valid"
            [label]="'Submit Form 6'"
          />
        </ng-template>
        <ng-template fudisContent [type]="'form'">
          <fudis-expandable
            [title]="'Expandable with Localized Text Group'"
            [errorSummaryBreadcrumb]="true"
          >
            <ng-template fudisContent [type]="'expandable'">
              <fudis-localized-text-group
                [label]="'At least one required'"
                [formGroup]="allForms.controls.formSix.controls.oneRequired"
              />
              <fudis-localized-text-group
                [label]="'All required'"
                [variant]="'text-area'"
                [formGroup]="allForms.controls.formSix.controls.allRequired"
              />
              <fudis-button [label]="'Patch value'" (handleClick)="patchValue()"></fudis-button>
            </ng-template>
          </fudis-expandable>
        </ng-template>
      </fudis-form>
    </fudis-grid>
  `,
})
export class StorybookExampleWithMultipleFormsComponent {
  constructor(private _errorSummaryService: FudisErrorSummaryService) {}

  errorSummaryVisible = false;

  errorSummaryHelpText = 'There are incorrect form fields.';

  selectOptions = defaultOptions;

  radioOptions: FudisRadioButtonOption<object>[] = [
    {
      label: 'Pear',
      value: 'item-1-pear',
    },
    {
      label: 'Orange',
      value: 'item-2-orange',
    },
    {
      label: 'Peach',
      value: 'item-3-peach',
    },
  ];

  patchValue(): void {
    this.allForms.controls.formSix.controls.oneRequired.controls['fi'].patchValue(
      'Surprise value from outside',
    );
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
        FudisValidators.required('You must choose a name'),
      ),
    }),
    formTwo: new FormGroup({
      description: new FormControl<string | null>('initial value', [
        FudisValidators.minLength(15, 'Min length is 15 chars'),
        FudisValidators.maxLength(20, 'Max length is 20 chars'),
      ]),
    }),
    formThree: new FormGroup<FudisCheckboxGroupFormGroup<object>>(
      {
        apple: new FormControl<boolean | null>(null),
        fairTradeBanana: new FormControl<boolean | null>(null),
        pear: new FormControl<boolean | null>(null),
        pineapple: new FormControl<boolean | null>(null),
        orange: new FormControl<boolean | null | undefined>(null),
      },
      [FudisGroupValidators.oneRequired(new BehaviorSubject('No fruit picked! :('))],
    ),
    formFour: new FormGroup({
      select: new FormControl<FudisSelectOption<object> | null>(
        null,
        FudisValidators.required('You must pick one'),
      ),
      multiselect: new FormControl<FudisSelectOption<object>[] | null>(null, [
        FudisValidators.required('Selection is missing'),
        FudisValidators.minLength(2, 'Choose at least 2'),
      ]),
    }),
    formFive: new FormControl(null, FudisValidators.required('No fruit picked! :(')),
    formSix: new FormGroup({
      oneRequired: new FormGroup<FudisLocalizedTextGroup<object>>(
        {
          fi: new FormControl<string | null>(null),
          sv: new FormControl<string | null>(null),
          en: new FormControl<string | null>(null),
        },
        [FudisGroupValidators.oneRequired('Provide name in atleast one language')],
      ),
      allRequired: new FormGroup<FudisLocalizedTextGroup<object>>({
        fi: new FormControl<string | null>('Lorem ipsum', [
          FudisValidators.required('Missing Finnish description'),
          FudisValidators.maxLength(10, 'Too long Finnish description'),
        ]),
        sv: new FormControl<string | null>(null, [
          FudisValidators.required('Missing Swedish description'),
        ]),
        en: new FormControl<string | null>(null, [
          FudisValidators.required('Missing English description'),
        ]),
      }),
    }),
  });
}