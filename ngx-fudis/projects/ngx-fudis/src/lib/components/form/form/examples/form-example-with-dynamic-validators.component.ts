import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgxFudisModule } from '../../../../ngx-fudis.module';
import { FormGroup, FormControl } from '@angular/forms';
import {
  FudisCheckboxGroupFormGroup,
  FudisRadioButtonOption,
  FudisSelectOption,
} from '../../../../types/forms';
import { FudisBadgeVariant } from '../../../../types/miscellaneous';
import { FudisHeadingVariant, FudisHeadingLevel } from '../../../../types/typography';
import { FudisValidatorFn, FudisValidators } from '../../../../utilities/form/validators';
import { FudisGroupValidators } from '../../../../utilities/form/groupValidators';

import { FudisInternalErrorSummaryService } from '../../../../services/form/error-summary/internal-error-summary.service';

type MyForm = {
  text: FormControl<string | null>;
  email: FormControl<string | null>;
  number: FormControl<number | null>;
  date: FormControl<Date | null>;
  animal: FormControl<FudisSelectOption<object> | null>;
  summer: FormGroup<FudisCheckboxGroupFormGroup<object>>;
  winter: FormGroup<FudisCheckboxGroupFormGroup<object>>;
  working: FormGroup<FudisCheckboxGroupFormGroup<object>>;
  sport: FormControl;
  dj: FormGroup;
};

@Component({
  standalone: true,
  imports: [NgxFudisModule, CommonModule],
  selector: 'example-dynamic-validator',
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
      <ng-template fudisActions [type]="'form'">
        <fudis-button
          (handleClick)="toggleErrorSummary()"
          [variant]="'secondary'"
          [label]="'Toggle Error Summary'"
        />
        <fudis-button fudisFormSubmit [formValid]="formExample.valid" [label]="'Submit'" />
      </ng-template>
      <ng-template fudisContent [type]="'form'">
        <fudis-fieldset [label]="'Add and remove validators dynamically'">
          <ng-template fudisContent [type]="'fieldset'">
            <fudis-grid [rowGap]="'xs'" [width]="'md'">
              <fudis-grid [columns]="{ md: 'inputLg auto' }">
                <fudis-text-input
                  [control]="formExample.controls['text']"
                  [label]="'Text input'"
                  [helpText]="'Please add some content.'"
                />
                <fudis-grid [rowGap]="'md'">
                  <fudis-button
                    [label]="_textRequired + ' text required validator'"
                    (handleClick)="toggleRequired(formExample.controls['text'], 'textRequired')"
                  ></fudis-button>
                  <fudis-button
                    [label]="_textMaxLength + ' text maxLength validator'"
                    (handleClick)="toggleMaxLength(formExample.controls['text'], 'textMaxLength')"
                  ></fudis-button>
                  <fudis-button
                    [label]="_textMinLength + ' text minLength validator'"
                    (handleClick)="toggleMinLength(formExample.controls['text'], 'textMinLength')"
                  ></fudis-button>
                </fudis-grid>
              </fudis-grid>
              <fudis-hr />
              <fudis-grid [columns]="{ md: 'inputLg auto' }">
                <fudis-text-input
                  [control]="formExample.controls['email']"
                  [label]="'Email'"
                  [helpText]="'This is an example email input with multiple validations.'"
                />
                <fudis-grid [rowGap]="'md'">
                  <fudis-button
                    [label]="_emailPattern + ' email pattern validator'"
                    (handleClick)="toggleEmail(formExample.controls['email'], 'emailPattern')"
                  ></fudis-button>
                  <fudis-button
                    [label]="_emailMaxLength + ' email maxLength validator'"
                    (handleClick)="toggleMaxLength(formExample.controls['email'], 'emailMaxLength')"
                  ></fudis-button>
                  <fudis-button
                    [label]="_emailMinLength + ' email minLength validator'"
                    (handleClick)="toggleMinLength(formExample.controls['email'], 'emailMinLength')"
                  ></fudis-button>
                </fudis-grid>
              </fudis-grid>
              <fudis-hr />
              <fudis-grid [columns]="{ md: 'inputLg auto' }">
                <fudis-text-input
                  [control]="formExample.controls['number']"
                  [label]="'Number input'"
                  [type]="'number'"
                  [size]="'md'"
                />
                <fudis-grid [rowGap]="'md'">
                  <fudis-button
                    [label]="_numberRequired + ' number required validator'"
                    (handleClick)="toggleRequired(formExample.controls['number'], 'numberRequired')"
                  ></fudis-button>
                  <fudis-button
                    [label]="_numberMax + ' maxNumber validator'"
                    (handleClick)="toggleMaxNumber(formExample.controls['number'], 'numberMax')"
                  ></fudis-button>
                  <fudis-button
                    [label]="_numberMin + ' minNumber validator'"
                    (handleClick)="toggleMinNumber(formExample.controls['number'], 'numberMin')"
                  ></fudis-button>
                </fudis-grid>
              </fudis-grid>
              <fudis-hr />
              <fudis-grid [columns]="{ md: 'inputLg auto' }">
                <fudis-datepicker
                  [label]="'Choose your favorite date'"
                  [control]="formExample.controls.date"
                ></fudis-datepicker>
                <fudis-grid [rowGap]="'md'">
                  <fudis-button
                    [label]="_dateRequired + ' date required validator'"
                    (handleClick)="toggleRequired(formExample.controls['date'], 'dateRequired')"
                  ></fudis-button>
                  <fudis-button
                    [label]="_dateMax + ' maxDate validator'"
                    (handleClick)="toggleMaxDate(formExample.controls['date'], 'dateMax')"
                  ></fudis-button>
                  <fudis-button
                    [label]="_dateMin + ' minDate validator'"
                    (handleClick)="toggleMinDate(formExample.controls['date'], 'dateMin')"
                  ></fudis-button>
                </fudis-grid>
              </fudis-grid>
              <fudis-hr />
              <fudis-grid [columns]="{ md: 'inputLg auto' }">
                <fudis-select
                  [label]="'Select your favorite animal'"
                  [size]="'md'"
                  [control]="formExample.controls.animal"
                >
                  <ng-template fudisContent [type]="'select-options'">
                    <fudis-select-option [data]="{ value: 'option-1', label: 'Otter' }" />
                    <fudis-select-option [data]="{ value: 'option-2', label: 'Rattle snake' }" />
                    <fudis-select-option [data]="{ value: 'option-3', label: 'Zeebra' }" />
                  </ng-template>
                </fudis-select>

                <fudis-button
                  [label]="_optionRequired + ' option required validator'"
                  (handleClick)="toggleRequired(formExample.controls['animal'], 'optionRequired')"
                ></fudis-button>
              </fudis-grid>
              <fudis-hr />
              <fudis-grid [columns]="{ md: 3 }">
                <fudis-checkbox-group
                  [label]="'If you like summer'"
                  [formGroup]="formExample.controls.summer"
                >
                  <fudis-checkbox
                    [controlName]="'summer1'"
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
                  <fudis-checkbox
                    [controlName]="'winter1'"
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
                  <fudis-checkbox
                    [controlName]="'working1'"
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
              <fudis-hr />
              <fudis-grid [columns]="{ md: 'inputLg auto' }">
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
                <fudis-button
                  [label]="_radioOptionRequired + ' option required validator'"
                  (handleClick)="
                    toggleRequired(formExample.controls['sport'], 'radioOptionRequired')
                  "
                ></fudis-button>
              </fudis-grid>
              <fudis-hr />
              <fudis-grid [columns]="{ md: 'inputLg auto' }">
                <fudis-localized-text-group
                  [label]="'At least one required'"
                  [formGroup]="formExample.controls.dj"
                ></fudis-localized-text-group>
                <fudis-grid [rowGap]="'md'">
                  <fudis-button
                    [label]="_oneRequired + ' option required validator'"
                    (handleClick)="toggleOneRequired(formExample.controls['dj'], 'oneRequired')"
                  ></fudis-button>
                  <fudis-button
                    [label]="_localizedDisabled + ' Localized Text Group'"
                    (handleClick)="toggleLocalizedTextGroupDisable()"
                  ></fudis-button>
                </fudis-grid>
              </fudis-grid>
            </fudis-grid>
          </ng-template>
        </fudis-fieldset>
      </ng-template>
    </fudis-form>
  `,
})
export class StorybookExampleDynamicValidatorsComponent {
  constructor(private _errorSummaryService: FudisInternalErrorSummaryService) {
    this.formExample = new FormGroup({
      text: new FormControl<string | null>(null, [
        this._requiredValidatorInstance,
        this._minLengthValidatorInstance,
        this._maxLengthValidatorInstance,
      ]),
      email: new FormControl<string | null>(null, [
        this._emailValidatorInstance,
        this._maxLengthValidatorInstance,
        this._minLengthValidatorInstance,
      ]),
      number: new FormControl<number | null>(null, [
        this._requiredValidatorInstance,
        this._minNumberValidatorInstance,
        this._maxNumberValidatorInstance,
      ]),
      date: new FormControl<Date | null>(null, [
        this._requiredValidatorInstance,
        this._maxDateValidatorInstance,
        this._minDateValidatorInstance,
      ]),
      animal: new FormControl<FudisSelectOption<object> | null>(
        null,
        this._requiredValidatorInstance,
      ),
      summer: new FormGroup<FudisCheckboxGroupFormGroup<object>>(
        {
          summer1: new FormControl(null),
        },
        this._oneRequiredValidatorInstance,
      ),
      winter: new FormGroup<FudisCheckboxGroupFormGroup<object>>(
        {
          winter1: new FormControl(null),
        },
        this._oneRequiredValidatorInstance,
      ),
      working: new FormGroup<FudisCheckboxGroupFormGroup<object>>(
        {
          working1: new FormControl(null),
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
  @Input() errorSummaryHelpText: string;
  @Input() errorSummaryVisible: boolean;

  minLength = 5;
  maxLength = 20;
  minNumber = 2;
  maxNumber = 5;

  _textRequired = 'Remove';
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

  toggleRequiredFromOthers(removeControls: FormGroup<FudisCheckboxGroupFormGroup<object>>[]): void {
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
    const hasMaxDate = control.hasValidator(this._minDateValidatorInstance);

    if (hasMaxDate) {
      control.removeValidators(this._minDateValidatorInstance);
    } else {
      control.addValidators(this._minDateValidatorInstance);
    }
    this.changeText(target);
    control.updateValueAndValidity();
  }
}
