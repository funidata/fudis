import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgxFudisModule } from '../../../../ngx-fudis.module';
import { FormGroup, FormControl, ValidatorFn } from '@angular/forms';
import { FudisRadioButtonOption, FudisSelectOption } from '../../../../types/forms';
import { FudisBadgeVariant, FudisButtonVariant } from '../../../../types/miscellaneous';
import { FudisHeadingVariant, FudisHeadingLevel } from '../../../../types/typography';
import { FudisValidatorFn, FudisValidators } from '../../../../utilities/form/validators';
import { FudisGroupValidators } from '../../../../utilities/form/groupValidators';

import { FudisInternalErrorSummaryService } from '../../../../services/form/error-summary/internal-error-summary.service';

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
  animal: FormControl<FudisSelectOption<object> | null>;
  summer: FormGroup<SummerCheckbox>;
  winter: FormGroup<WinterCheckbox>;
  working: FormGroup<WorkingCheckbox>;
  sport: FormControl;
  dj: FormGroup;
};

@Component({
  imports: [NgxFudisModule, CommonModule],
  selector: 'example-e2e',
  template: `
    <fudis-form
      class="fudis-mt-xl"
      [badge]="badge"
      [badgeText]="badgeText"
      [level]="level"
      [title]="title"
      [titleVariant]="titleVariant"
      [helpText]="helpText"
      [errorSummaryTitle]="errorSummaryTitle"
      [errorSummaryVisible]="errorSummaryVisible"
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
            <fudis-grid [columns]="1" [width]="'sm'" [align]="'end'" [alignItemsX]="'end'" [columnGap]="'xxs'">
              <fudis-grid-item [alignSelfX]="'end'">
              <fudis-button 
                [label]="_textRequired +' required validators'"
                [variant]="_requiredVariant"
                class="fudis-mb-sm fudis-mr-sm"
                (handleClick)="toggleAllRequired(
                  [
                    { control: formExample.controls['text'] },
                    { control: formExample.controls['number'] },
                    { control: formExample.controls['date']},
                    { control: formExample.controls['animal'] },
                  ], 'textRequired'
                )"
                ></fudis-button>
                <fudis-button
                  [label]="_otherValidator +' other validators'"
                  [variant]="_otherVariant"
                  (handleClick)="toggleOtherValidators(
                    [
                    { control: formExample.controls['text'], target: 'textMinLength' },
                    { control: formExample.controls['email'], target: 'emailPattern' },
                    { control: formExample.controls['email'], target: 'emailMinLength' },
                    { control: formExample.controls['number'], target: 'numberMax' },
                    { control: formExample.controls['date'], target: 'dateMin' },
                  ], 'otherValidator'
                  )"></fudis-button>
              </fudis-grid-item>
            </fudis-grid>
            <fudis-grid [rowGap]="'xs'" [width]="'md'">
              <fudis-grid [columns]="{ md: 'inputLg auto' }">
                <fudis-text-input
                  [control]="formExample.controls['text']"
                  [label]="'Text input'"
                  [helpText]="'Please add some content.'"
                />
              </fudis-grid>
              <fudis-hr />
              <fudis-grid [columns]="{ md: 'inputLg auto' }">
                <fudis-text-input
                  [control]="formExample.controls['email']"
                  [label]="'Email'"
                  [helpText]="'This is an example email input with multiple validations.'"
                />
              </fudis-grid>
              <fudis-hr />
              <fudis-grid [columns]="{ md: 'inputLg auto' }">
                <fudis-text-input
                  [control]="formExample.controls['number']"
                  [label]="'Number input'"
                  [type]="'number'"
                  [size]="'md'"
                />
              </fudis-grid>
              <fudis-hr />
              <fudis-grid [columns]="{ md: 'inputLg auto' }">
                <fudis-datepicker
                  [label]="'Choose your favorite date'"
                  [control]="formExample.controls.date"
                ></fudis-datepicker>
                <fudis-grid [rowGap]="'md'">
                </fudis-grid>
              </fudis-grid>
              <fudis-hr />
              <fudis-grid [columns]="{ md: 'inputLg auto' }">
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
              </fudis-grid>
              <fudis-hr />
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
            </fudis-grid>
          </fudis-fieldset-content>
        </fudis-fieldset>
      </fudis-form-content>
    </fudis-form>
  `,
})
export class StorybookExampleE2EComponent {
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
      animal: new FormControl<FudisSelectOption<object> | null>(
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
  minNumber = 2;
  maxNumber = 5;

  _textRequired = 'Remove';
  _otherValidator = 'Remove';
  _requiredVariant: FudisButtonVariant = 'secondary';
  _otherVariant: FudisButtonVariant = 'secondary';

  _textMaxLength = 'Remove';
  _textMinLength = 'Remove';
  _emailPattern = 'Remove';
  _emailMaxLength = 'Remove';
  _emailMinLength = 'Remove';
  _numberMin = 'Remove';
  _numberMax = 'Remove';
  _numberRequired = 'Remove';
  _dateRequired = 'Remove';
  _optionRequired = 'Remove';
  _oneRequired = 'Remove';
  _dateMax = 'Remove';
  _dateMin = 'Remove';
  _radioOptionRequired = 'Remove';
  _localizedDisabled = 'Disable';

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
  private _maxLengthValidatorInstance: FudisValidatorFn = FudisValidators.maxLength(
    this.maxLength,
    `Input length should not be more than ${this.maxLength} characters.`,
  );
  private _minLengthValidatorInstance: FudisValidatorFn = FudisValidators.minLength(
    this.minLength,
    `Too short input. Minimum length is ${this.minLength}.`,
  );
  private _emailValidatorInstance: FudisValidatorFn = FudisValidators.email(
    'Input must be an email address.',
  );
  private _minNumberValidatorInstance: FudisValidatorFn = FudisValidators.min(
    this.minNumber,
    'Number is too small',
  );
  private _maxNumberValidatorInstance: FudisValidatorFn = FudisValidators.max(
    this.maxNumber,
    `Given number is higher than allowed ${this.maxNumber}.`,
  );
  private _maxDateValidatorInstance: FudisValidatorFn = FudisValidators.datepickerMax({
    value: new Date(),
    message: 'Date cannot be after todays date',
  });
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

  changeText(target: string): void {
    switch (target) {
      case 'textRequired':
        this._textRequired = this._textRequired === 'Add' ? 'Remove' : 'Add';
        return;
      case 'textMaxLength':
        this._textMaxLength = this._textMaxLength === 'Add' ? 'Remove' : 'Add';
        return;
      case 'textMinLength':
        this._textMinLength = this._textMinLength === 'Add' ? 'Remove' : 'Add';
        return;
      case 'emailPattern':
        this._emailPattern = this._emailPattern === 'Add' ? 'Remove' : 'Add';
        return;
      case 'emailMaxLength':
        this._emailMaxLength = this._emailMaxLength === 'Add' ? 'Remove' : 'Add';
        return;
      case 'emailMinLength':
        this._emailMinLength = this._emailMinLength === 'Add' ? 'Remove' : 'Add';
        return;
      case 'numberRequired':
        this._numberRequired = this._numberRequired === 'Add' ? 'Remove' : 'Add';
        return;
      case 'dateRequired':
        this._dateRequired = this._dateRequired === 'Add' ? 'Remove' : 'Add';
        return;
      case 'optionRequired':
        this._optionRequired = this._optionRequired === 'Add' ? 'Remove' : 'Add';
        return;
      case 'radioOptionRequired':
        this._radioOptionRequired = this._radioOptionRequired === 'Add' ? 'Remove' : 'Add';
        return;
      case 'dateMin':
        this._dateMin = this._dateMin === 'Add' ? 'Remove' : 'Add';
        return;
      case 'dateMax':
        this._dateMax = this._dateMax === 'Add' ? 'Remove' : 'Add';
        return;
      case 'numberMin':
        this._numberMin = this._numberMin === 'Add' ? 'Remove' : 'Add';
        return;
      case 'numberMax':
        this._numberMax = this._numberMax === 'Add' ? 'Remove' : 'Add';
        return;
      case 'oneRequired':
        this._oneRequired = this._oneRequired === 'Add' ? 'Remove' : 'Add';
        return;
      default:
        console.error('Wrong input provided. No case for text: ' + target);
        return;
    }
  }

  toggleLocalizedTextGroupDisable(): void {
    if (this.formExample.controls['dj'].disabled) {
      this.formExample.controls['dj'].enable();
      this._localizedDisabled = 'Disable';
    } else {
      this.formExample.controls['dj'].disable();
      this._localizedDisabled = 'Enable';
    }
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

  toggleOneRequired(group: FormGroup, target: string): void {
    const required = group.hasValidator(this._oneRequiredValidatorInstance);

    if (required) {
      group.removeValidators(this._oneRequiredValidatorInstance);
    } else {
      group.addValidators(this._oneRequiredValidatorInstance);
    }
    this.changeText(target);

    group.updateValueAndValidity();
  }

toggleAllRequired(
  items: { control: FormControl }[],
  validatorType: string
): void {
  for (const { control } of items) {

    const hasRequired = control.hasValidator(this._requiredValidatorInstance);

    if (hasRequired) {
      control.removeValidators(this._requiredValidatorInstance);
    } else {
      control.addValidators(this._requiredValidatorInstance);
    }

    control.updateValueAndValidity();
  }
    this.changeNewText(validatorType);
}

// toggleAllRequired(
//   items: { control: FormControl | FormGroup; isGroup?: boolean, isToggle?: boolean }[]
// ): void {
//   for (const { control, isGroup, isToggle } of items) {
//     const validator = isGroup
//     ? this._oneRequiredValidatorInstance
//     : this._requiredValidatorInstance;

//     const hasRequired = control.hasValidator(validator);

//     if (hasRequired) {
//       control.removeValidators(validator);
//       if (isGroup && isToggle) control.disable();
//     } else {
//       control.addValidators(validator);
//       if (isGroup && isToggle) control.enable();
//     }

//     control.updateValueAndValidity();
//   }
// }

toggleOtherValidators(
  items: { control: FormControl; target: string }[],
  validatorType: string
): void {
  const validatorMap: Record<string, ValidatorFn> = {
    textMinLength: this._minLengthValidatorInstance,
    emailPattern: this._emailValidatorInstance,
    emailMinLength: this._minLengthValidatorInstance,
    numberMax: this._maxNumberValidatorInstance,
    dateMin: this._minDateValidatorInstance
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

  toggleRequired(control: FormControl, target: string): void {
    const required = control.hasValidator(this._requiredValidatorInstance);

    if (required) {
      control.removeValidators(this._requiredValidatorInstance);
    } else {
      control.addValidators(this._requiredValidatorInstance);
    }

    this.changeText(target);

    control.updateValueAndValidity();
  }

  toggleMaxLength(control: FormControl, target: string): void {
    const hasMaxLength = control.hasValidator(this._maxLengthValidatorInstance);

    if (hasMaxLength) {
      control.removeValidators(this._maxLengthValidatorInstance);
    } else {
      control.addValidators(this._maxLengthValidatorInstance);
    }

    this.changeText(target);

    control.updateValueAndValidity();
  }

  toggleMinLength(control: FormControl, target: string): void {
    const hasMinLength = control.hasValidator(this._minLengthValidatorInstance);

    if (hasMinLength) {
      control.removeValidators(this._minLengthValidatorInstance);
    } else {
      control.addValidators(this._minLengthValidatorInstance);
    }

    this.changeText(target);

    control.updateValueAndValidity();
  }

  toggleEmail(control: FormControl, target: string): void {
    const hasEmail = control.hasValidator(this._emailValidatorInstance);

    if (hasEmail) {
      control.removeValidators(this._emailValidatorInstance);
    } else {
      control.addValidators(this._emailValidatorInstance);
    }

    this.changeText(target);

    this.formExample.controls['email'].updateValueAndValidity();
  }

  toggleMinNumber(control: FormControl, target: string): void {
    const hasMinNumber = control.hasValidator(this._minNumberValidatorInstance);

    if (hasMinNumber) {
      control.removeValidators(this._minNumberValidatorInstance);
    } else {
      control.addValidators(this._minNumberValidatorInstance);
    }

    this.changeText(target);

    control.updateValueAndValidity();
  }

  toggleMaxNumber(control: FormControl, target: string): void {
    const hasMaxNumber = control.hasValidator(this._maxNumberValidatorInstance);

    if (hasMaxNumber) {
      control.removeValidators(this._maxNumberValidatorInstance);
    } else {
      control.addValidators(this._maxNumberValidatorInstance);
    }
    this.changeText(target);
    control.updateValueAndValidity();
  }

  toggleMaxDate(control: FormControl, target: string): void {
    const hasMaxDate = control.hasValidator(this._maxDateValidatorInstance);

    if (hasMaxDate) {
      control.removeValidators(this._maxDateValidatorInstance);
    } else {
      control.addValidators(this._maxDateValidatorInstance);
    }
    this.changeText(target);
    control.updateValueAndValidity();
  }

  toggleMinDate(control: FormControl, target: string): void {
    const hasMinDate = control.hasValidator(this._minDateValidatorInstance);

    if (hasMinDate) {
      control.removeValidators(this._minDateValidatorInstance);
    } else {
      control.addValidators(this._minDateValidatorInstance);
    }
    this.changeText(target);
    control.updateValueAndValidity();
  }
}
