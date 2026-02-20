import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, ValidatorFn } from '@angular/forms';
import { FudisRadioButtonOption, FudisSelectOption } from '../../../../types/forms';
import { FudisBadgeVariant, FudisButtonVariant } from '../../../../types/miscellaneous';
import { FudisHeadingVariant, FudisHeadingLevel } from '../../../../types/typography';
import { FudisValidatorFn, FudisValidators } from '../../../../utilities/form/validators';
import { FudisGroupValidators } from '../../../../utilities/form/groupValidators';
import { FudisInternalErrorSummaryService } from '../../../../services/form/error-summary/internal-error-summary.service';
import { NgxFudisModule } from '../../../../ngx-fudis.module';

type SummerCheckbox = {
  summer: FormControl<boolean | null>;
};
interface WinterCheckbox {
  winter: FormControl<boolean | null>;
}

type WorkingCheckbox = {
  working: FormControl<boolean | null>;
};

type MyForm = {
  text: FormControl<string | null>;
  email: FormControl<string | null>;
  number: FormControl<number | null>;
  date: FormControl<Date | null>;
  animal: FormControl<FudisSelectOption<string> | null>;
  summer: FormGroup<SummerCheckbox>;
  winter: FormGroup<WinterCheckbox>;
  working: FormGroup<WorkingCheckbox>;
  sport: FormControl;
  dj: FormGroup;
};

@Component({
  imports: [NgxFudisModule, CommonModule],
  selector: 'example-form-dynamic-components',
  template: `
    <fudis-form
      class="fudis-mt-xl"
      [level]="1"
      [title]="'Example With Dynamic Validators'"
      [titleVariant]="'xl'"
      [errorSummaryTitle]="
        'There are errors in this form. Please address these before trying to submit again.'
      "
      [errorSummaryVisible]="false"
    >
      <fudis-form-actions>
        <fudis-button
          (handleClick)="toggleErrorSummary()"
          [variant]="'secondary'"
          [label]="'Toggle Error Summary'"
        />
        <fudis-button fudisFormSubmit [formValid]="formExample.valid" [label]="'Submit'" />
      </fudis-form-actions>
      <fudis-form-content>
        <fudis-fieldset [label]="'Add and remove validators dynamically'">
          <fudis-fieldset-content>
            <fudis-grid [columns]="{ sm: 2 }" [width]="'xxl'">
              <fudis-grid-item [alignSelfX]="'end'" [columns]="{ sm: 2 }">
                <fudis-button
                  [label]="_textRequired + ' required validators'"
                  [variant]="_requiredVariant"
                  class="fudis-mb-sm fudis-mr-sm"
                  (handleClick)="
                    toggleAllRequired(
                      [
                        { control: formExample.controls.text },
                        { control: formExample.controls.number },
                        { control: formExample.controls.date },
                        { control: formExample.controls.animal },
                        { control: formExample.controls.sport },
                        { control: formExample.controls.dj, isGroup: true },
                      ],
                      'textRequired'
                    )
                  "
                ></fudis-button>
                <fudis-button
                  [label]="_otherValidator + ' other validators'"
                  [variant]="_otherVariant"
                  (handleClick)="
                    toggleOtherValidators(
                      [
                        { control: formExample.controls.text, target: 'textMinLength' },
                        { control: formExample.controls.email, target: 'emailPattern' },
                        { control: formExample.controls.email, target: 'emailMinLength' },
                        { control: formExample.controls.number, target: 'numberMax' },
                        { control: formExample.controls.date, target: 'dateMin' },
                      ],
                      'otherValidator'
                    )
                  "
                ></fudis-button>
              </fudis-grid-item>
              <fudis-text-input
                [control]="formExample.controls.text"
                [label]="'Text input'"
                [helpText]="'Please add some content.'"
              />

              <fudis-text-input
                [control]="formExample.controls.email"
                [label]="'Email'"
                [helpText]="'This is an example email input with multiple validations.'"
              />

              <fudis-text-input
                [control]="formExample.controls.number"
                [label]="'Number input'"
                [type]="'number'"
                [size]="'md'"
              />

              <fudis-datepicker
                [size]="'lg'"
                [label]="'Choose your favorite date'"
                [control]="formExample.controls.date"
              ></fudis-datepicker>

              <fudis-select
                [label]="'Select your favorite animal'"
                [size]="'md'"
                [control]="formExample.controls.animal"
              >
                <ng-template fudisSelectOptions>
                  <fudis-select-option [data]="{ value: 'option-1', label: 'Otter' }" />
                  <fudis-select-option [data]="{ value: 'option-2', label: 'Rattle snake' }" />
                  <fudis-select-option [data]="{ value: 'option-3', label: 'Zeebra' }" />
                </ng-template>
              </fudis-select>

              <fudis-radio-button-group
                [label]="'Select your favorite sport'"
                [control]="formExample.controls.sport"
              >
                <fudis-radio-button
                  *ngFor="let sport of sportOptions"
                  [label]="sport.label"
                  [value]="sport.value"
                >
                </fudis-radio-button>
              </fudis-radio-button-group>

              <fudis-localized-text-group
                [label]="'At least one required'"
                [formGroup]="formExample.controls.dj"
              ></fudis-localized-text-group>
            </fudis-grid>
          </fudis-fieldset-content>
        </fudis-fieldset>
        <fudis-hr fudisGridItem [columns]="2" [class]="'fudis-mt-lg'" />
        <fudis-fieldset [label]="'Dynamic FormGroup validators'" [class]="'fudis-mt-lg'">
          <fudis-fieldset-content>
            <fudis-grid [alignItemsY]="'baseline'" [columns]="{ md: 3 }">
              <fudis-checkbox-group
                [label]="'If you like summer'"
                [formGroup]="formExample.controls.summer"
              >
                <fudis-checkbox-group-option
                  [controlName]="'summer'"
                  [label]="'Summer holidays'"
                  (handleChange)="
                    toggleRequiredFromOthers([
                      formExample.controls.winter,
                      formExample.controls.working,
                    ])
                  "
                />
              </fudis-checkbox-group>
              <fudis-checkbox-group
                [label]="'If you like winter'"
                [formGroup]="formExample.controls.winter"
              >
                <fudis-checkbox-group-option
                  [controlName]="'winter'"
                  [label]="'Winter holidays'"
                  (handleChange)="
                    toggleRequiredFromOthers([
                      formExample.controls.summer,
                      formExample.controls.working,
                    ])
                  "
                />
              </fudis-checkbox-group>
              <fudis-checkbox-group
                [label]="'If you like working'"
                [formGroup]="formExample.controls.working"
              >
                <fudis-checkbox-group-option
                  [controlName]="'working'"
                  [label]="'Working holidays'"
                  (handleChange)="
                    toggleRequiredFromOthers([
                      formExample.controls.summer,
                      formExample.controls.winter,
                    ])
                  "
                />
              </fudis-checkbox-group>
            </fudis-grid>
          </fudis-fieldset-content>
        </fudis-fieldset>
      </fudis-form-content>
    </fudis-form>
  `,
})
export class StorybookExampleFormDynamicComponentsComponent {
  constructor(private _errorSummaryService: FudisInternalErrorSummaryService) {
    this.formExample = new FormGroup({
      text: new FormControl<string | null>(null, [
        this._requiredValidatorInstance,
        this._minLengthValidatorInstance,
      ]),
      email: new FormControl<string | null>(null, [
        this._emailValidatorInstance,
        this._minLengthValidatorInstance,
      ]),
      number: new FormControl<number | null>(null, [
        this._requiredValidatorInstance,
        this._maxNumberValidatorInstance,
      ]),
      date: new FormControl<Date | null>(null, [
        this._requiredValidatorInstance,
        this._minDateValidatorInstance,
      ]),
      animal: new FormControl<FudisSelectOption<string> | null>(
        null,
        this._requiredValidatorInstance,
      ),
      summer: new FormGroup<SummerCheckbox>(
        {
          summer: new FormControl(null),
        },
        this._oneRequiredValidatorInstance,
      ),
      winter: new FormGroup<WinterCheckbox>(
        {
          winter: new FormControl(null),
        },
        this._oneRequiredValidatorInstance,
      ),
      working: new FormGroup<WorkingCheckbox>(
        {
          working: new FormControl(null),
        },
        this._oneRequiredValidatorInstance,
      ),
      sport: new FormControl(null, [this._requiredValidatorInstance]),
      dj: new FormGroup(
        {
          fi: new FormControl<string | null>(null, [
            FudisValidators.maxLength(15, 'Too long Finnish name'),
          ]),
          sv: new FormControl<string | null>(null, [
            FudisValidators.maxLength(20, 'Too long Swedish name'),
          ]),
          en: new FormControl<string | null>(null, [
            FudisValidators.maxLength(25, 'Too long English name'),
          ]),
        },
        this._oneRequiredValidatorInstance,
      ),
    });
  }

  @Input() title: string;
  @Input() titleVariant: FudisHeadingVariant;
  @Input() level: FudisHeadingLevel;
  @Input() helpText: string;
  @Input() badge: FudisBadgeVariant;
  @Input() badgeText: string;
  @Input() errorSummaryTitle: string;
  @Input() errorSummaryVisible: boolean;

  minLength = 5;
  maxLength = 20;
  maxNumber = 5;

  _textRequired = 'Remove';
  _otherValidator = 'Remove';
  _requiredVariant: FudisButtonVariant = 'secondary';
  _otherVariant: FudisButtonVariant = 'secondary';

  sportOptions: FudisRadioButtonOption<object>[] = [
    { value: 'cycling', label: 'Cycling' },
    {
      value: 'canoeing',
      label: 'Canoeing',
    },
    { value: 'climbing', label: 'Climbing' },
    { value: 'table-tennis', label: 'Table Tennis' },
  ];

  /**
   * Instance of validators
   */
  protected _requiredValidatorInstance: FudisValidatorFn =
    FudisValidators.required('This is required input.');
  private _minLengthValidatorInstance: FudisValidatorFn = FudisValidators.minLength(
    this.minLength,
    `Too short input. Minimum length is ${this.minLength}.`,
  );
  private _emailValidatorInstance: FudisValidatorFn = FudisValidators.email(
    'Input must be an email address.',
  );
  private _maxNumberValidatorInstance: FudisValidatorFn = FudisValidators.max(
    this.maxNumber,
    `Given number is higher than allowed ${this.maxNumber}.`,
  );
  private _minDateValidatorInstance: FudisValidatorFn = FudisValidators.datepickerMin({
    value: new Date(new Date().setDate(new Date().getDate() - 1)),
    message: 'Date cannot be before yesterdays date',
  });
  private _oneRequiredValidatorInstance: FudisValidatorFn = FudisGroupValidators.oneRequired(
    'At least one option must be selected',
  );

  formExample: FormGroup<MyForm>;

  _errorSummaryVisible = false;

  toggleErrorSummary() {
    this._errorSummaryVisible =
      this._errorSummaryService.errorSummaryVisibilityStatus['fudis-form-1']();

    this._errorSummaryService.setErrorSummaryVisibility('fudis-form-1', !this._errorSummaryVisible);
  }

  changeNewText(validatorType: string): string {
    if (validatorType === 'textRequired') {
      this._textRequired = this._textRequired === 'Add' ? 'Remove' : 'Add';
      this._requiredVariant = this._requiredVariant === 'primary' ? 'secondary' : 'primary';
    }

    if (validatorType === 'otherValidator') {
      this._otherValidator = this._otherValidator === 'Add' ? 'Remove' : 'Add';
      this._otherVariant = this._otherVariant === 'primary' ? 'secondary' : 'primary';
    }

    return validatorType;
  }

  toggleRequiredFromOthers(removeControls: FormGroup[]): void {
    removeControls.forEach((control) => {
      const required = control.hasValidator(this._oneRequiredValidatorInstance);

      if (required) {
        control.disable();
        control.removeValidators(this._oneRequiredValidatorInstance);
      } else {
        control.enable();
        control.addValidators(this._oneRequiredValidatorInstance);
      }

      control.updateValueAndValidity();
    });
  }

  toggleAllRequired(
    items: { control: FormControl | FormGroup; isGroup?: boolean }[],
    validatorType: string,
  ): void {
    for (const { control, isGroup } of items) {
      const validator = isGroup
        ? this._oneRequiredValidatorInstance
        : this._requiredValidatorInstance;

      const hasRequired = control.hasValidator(validator);

      if (hasRequired) {
        control.removeValidators(validator);
      } else {
        control.addValidators(validator);
      }

      control.updateValueAndValidity();
    }
    this.changeNewText(validatorType);
  }

  toggleOtherValidators(
    items: { control: FormControl; target: string }[],
    validatorType: string,
  ): void {
    const validatorMap: Record<string, ValidatorFn> = {
      textMinLength: this._minLengthValidatorInstance,
      emailPattern: this._emailValidatorInstance,
      emailMinLength: this._minLengthValidatorInstance,
      numberMax: this._maxNumberValidatorInstance,
      dateMin: this._minDateValidatorInstance,
    };

    for (const { control, target } of items) {
      const validator = validatorMap[target];

      const hasValidator = control.hasValidator(validator);

      if (hasValidator) {
        control.removeValidators(validator);
      } else {
        control.addValidators(validator);
      }

      control.updateValueAndValidity();
    }

    this.changeNewText(validatorType);
  }
}
