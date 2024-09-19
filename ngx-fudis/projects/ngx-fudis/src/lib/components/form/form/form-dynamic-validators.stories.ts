import { StoryFn, Meta, moduleMetadata, applicationConfig } from '@storybook/angular';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { Component, Input, importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FudisValidatorFn, FudisValidators } from '../../../utilities/form/validators';
import { FormComponent } from './form.component';
import docs from './form.docs.mdx';
import { FudisBadgeVariant } from '../../../types/miscellaneous';
import {
  FudisHeadingLevel,
  FudisHeadingVariant,
  fudisHeadingLevelArray,
} from '../../../types/typography';
import { formExclude } from '../../../utilities/storybook';
import { fudisSpacingArray } from '../../../types/spacing';
import { FudisCheckboxGroupFormGroup, FudisRadioButtonOption } from '../../../types/forms';
import { FudisGroupValidators } from '../../../utilities/form/groupValidators';
@Component({
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
              <hr class="fudis-hr" aria-hidden="true" />
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
              <hr class="fudis-hr" aria-hidden="true" />
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
              <hr class="fudis-hr" aria-hidden="true" />
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
              <hr class="fudis-hr" aria-hidden="true" />
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
              <hr class="fudis-hr" aria-hidden="true" />
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
              <fudis-grid [columns]="{ md: 'inputLg auto' }">
                <hr fudisGridItem [columns]="'stretch'" class="fudis-hr" aria-hidden="true" />
                <fudis-radio-button-group
                  [label]="'Select your favorite sport'"
                  [control]="formExample.controls.sport"
                  (handleChange)="radioButtonChange($event)"
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
              <fudis-grid [columns]="{ md: 'inputLg auto' }">
                <hr fudisGridItem [columns]="'stretch'" class="fudis-hr" aria-hidden="true" />
                <fudis-localized-text-group
                  [label]="'At least one required'"
                  [formGroup]="formExample.controls.dj"
                ></fudis-localized-text-group>
                <fudis-button
                  [label]="_oneRequired + ' option required validator'"
                  (handleClick)="toggleOneRequired(formExample.controls['dj'], 'oneRequired')"
                ></fudis-button>
              </fudis-grid>
            </fudis-grid>
          </ng-template>
        </fudis-fieldset>
      </ng-template>
    </fudis-form>
  `,
})
class DynamicValidatorExampleComponent {
  constructor() {
    this.formExample = new FormGroup({
      text: new FormControl(null, [
        this._requiredValidatorInstance,
        this._minLengthValidatorInstance,
        this._maxLengthValidatorInstance,
      ]),
      email: new FormControl(null, [
        this._emailValidatorInstance,
        this._maxLengthValidatorInstance,
        this._minLengthValidatorInstance,
      ]),
      number: new FormControl(null, [
        this._requiredValidatorInstance,
        this._minNumberValidatorInstance,
        this._maxNumberValidatorInstance,
      ]),
      date: new FormControl<Date | null>(null, [
        this._requiredValidatorInstance,
        this._maxDateValidatorInstance,
        this._minDateValidatorInstance,
      ]),
      animal: new FormControl(null, this._requiredValidatorInstance),
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
          finnish: new FormControl<string | null>(null, [
            FudisValidators.maxLength(15, 'Too long Finnish name'),
          ]),
          swedish: new FormControl<string | null>(null, [
            FudisValidators.maxLength(20, 'Too long Swedish name'),
          ]),
          english: new FormControl<string | null>(null, [
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

  formExample: FormGroup;

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

export default {
  title: 'Components/Form/Form',
  component: FormComponent,
  decorators: [
    moduleMetadata({
      declarations: [DynamicValidatorExampleComponent],
      imports: [ReactiveFormsModule, RouterModule],
    }),
    applicationConfig({
      providers: [importProvidersFrom(BrowserAnimationsModule)],
    }),
  ],
  parameters: {
    docs: {
      page: docs,
    },
  },
  argTypes: {
    badge: {
      options: ['accent', 'danger', 'primary', 'secondary', 'success'],
      control: {
        type: 'select',
      },
    },
    badgeText: {
      control: {
        type: 'text',
      },
    },
    titleVariant: {
      options: fudisSpacingArray,
      control: {
        type: 'select',
      },
    },
    level: {
      options: fudisHeadingLevelArray,
      control: {
        type: 'select',
      },
    },
  },
} as Meta;

const html = String.raw;

export const ExampleWithDynamicValidators: StoryFn<FormComponent> = (args: FormComponent) => ({
  props: args,
  template: html` <example-dynamic-validator
    [title]="title"
    [helpText]="helpText"
    [titleVariant]="titleVariant"
    [level]="level"
    [errorSummaryHelpText]="errorSummaryHelpText"
    [errorSummaryVisible]="errorSummaryVisible"
  />`,
});

ExampleWithDynamicValidators.args = {
  title: 'Example with Dynamic Validators',
  helpText:
    "This example page is used to test, that when validators are added or removed from the FormControls, components' HTML attributes such as 'required' and max/min length are updated correctly.",
  titleVariant: 'xl',
  level: 1,
  errorSummaryHelpText:
    'There are errors in this form. Please address these before trying to submit again.',
  errorSummaryVisible: false,
};

ExampleWithDynamicValidators.parameters = {
  controls: {
    exclude: formExclude,
  },
};
