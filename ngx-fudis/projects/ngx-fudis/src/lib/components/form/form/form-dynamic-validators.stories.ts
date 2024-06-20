import { StoryFn, Meta, moduleMetadata, applicationConfig } from '@storybook/angular';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { Component, Input, OnInit, importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FudisValidatorFn, FudisValidators } from '../../../utilities/form/validators';
import { FormComponent } from './form.component';
import { FudisTranslationService } from '../../../services/translation/translation.service';
import { FudisFocusService } from '../../../services/focus/focus.service';
import docs from './form.docs.mdx';
import { FudisBadgeVariant } from '../../../types/miscellaneous';
import {
  FudisHeadingLevel,
  FudisHeadingVariant,
  fudisHeadingLevelArray,
} from '../../../types/typography';
import { formExclude } from '../../../utilities/storybook';
import { fudisSpacingArray } from '../../../types/spacing';
@Component({
  selector: 'example-dynamic-validator',
  template: `
    <fudis-form
      [marginTop]="'xl'"
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
        <fudis-fieldset
          [label]="'Add and remove validators dynamically'"
        >
          <ng-template fudisContent [type]="'fieldset'">
            <fudis-grid [columns]="{ lg: 'inputLg inputLg' }">
                <fudis-text-input
                  [initialFocus]="true"
                  [control]="formExample.controls['required']"
                  [label]="'Required text input'"
                  [helpText]="'Please add some content.'"
                >
                </fudis-text-input>
                <fudis-grid-item>
                  <fudis-button [variant]="'secondary'" [label]="'Test update value & validity for required'" (handleClick)="handleUpdateRequiredValidator()"></fudis-button>
                  <fudis-button [label]="'Remove validator for required'" (handleClick)="handleRemoveRequiredValidator()"></fudis-button>
                </fudis-grid-item>
                <fudis-text-input
                  [initialFocus]="true"
                  [control]="formExample.controls['email']"
                  [label]="'Email'"
                  [helpText]="'This is an example email input with multiple validations.'"
                >
                </fudis-text-input>
                <fudis-grid-item>
                  <fudis-button [variant]="'secondary'" [label]="'Test update value & validity for email,min and max'" (handleClick)="handleUpdateEmailValidator()"></fudis-button>
                  <fudis-button [label]="'Remove validator for email,min and max'" (handleClick)="handleRemoveEmailValidator()"></fudis-button>
                </fudis-grid-item>
                <fudis-text-input
                  [control]="formExample.controls['number']"
                  [label]="'Number input'"
                  [type]="'number'"
                  [size]="'sm'">
                </fudis-text-input>
                <fudis-grid-item>
                  <fudis-button [variant]="'secondary'" [label]="'Test update value & validity for number input'" (handleClick)="handleUpdateNumberInput()"></fudis-button>
                  <fudis-button [label]="'Remove validator  for number input'" (handleClick)="handleRemoveNumberInput()"></fudis-button>
                </fudis-grid-item>
            </fudis-grid>
          </ng-template>
        </fudis-fieldset>
      </ng-template>
    </fudis-form>
  `,
})
class DynamicValidatorExampleComponent implements OnInit {
  constructor(
    private _translationService: FudisTranslationService,
    private _focusService: FudisFocusService,
  ) {
    this._requiredValidatorInstance = FudisValidators.required('Missing required name who is responsible for this course.')
    this._maxLengthValidatorInstance = FudisValidators.maxLength(this.maxLength, 'Email should not be more than 20 characters.')
    this._minLengthValidatorInstance = FudisValidators.minLength(this.minLength, `Too short email. Minimum length is ${this.minLength} and maximum length is ${this.maxLength}.`,)
    this._emailValidatorInstance = FudisValidators.email('Input must be an email address.')
    this._minNumberValidatorInstance = FudisValidators.min(this.minNumber, 'Number is too small');
    this._maxNumberValidatorInstance = FudisValidators.max(this.maxNumber, `Given number is not inside the allowed range ${this.minNumber} - ${this.maxNumber}.` )
    this.formExample = new FormGroup({
      required: new FormControl(
        null,
        this._requiredValidatorInstance,
      ),
      email: new FormControl(null, [
        this._maxLengthValidatorInstance,
        this._emailValidatorInstance,
      ]),
      number: new FormControl(null, [
        this._maxNumberValidatorInstance,
        this._minNumberValidatorInstance,
      ])
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

  formExample: FormGroup;

  minLength = 5;
  maxLength = 20;
  minNumber = 2;
  maxNumber = 5;


  private _closed: boolean = true;

  /**
   * Instance of required validator
   */
    private _requiredValidatorInstance: FudisValidatorFn | null;
    private _maxLengthValidatorInstance: FudisValidatorFn | null;
    private _minLengthValidatorInstance: FudisValidatorFn | null;
    private _emailValidatorInstance: FudisValidatorFn | null;
    private _minNumberValidatorInstance: FudisValidatorFn | null;
    private _maxNumberValidatorInstance: FudisValidatorFn | null;

  ngOnInit(): void {
    this._focusService.addToIgnoreList('unique-input-3');
  }

  handleClosedOutput(value: boolean): void {
    this._closed = value;
  }

  handleUpdateRequiredValidator(): void {
    if(!this._requiredValidatorInstance) {
      this._requiredValidatorInstance = FudisValidators.required('Missing required name who is responsible for this course.');
      this.formExample.controls['required'].addValidators(this._requiredValidatorInstance);
      this.formExample.controls['required'].updateValueAndValidity();
    }
  }

  handleUpdateEmailValidator(): void {
    if(!this._maxLengthValidatorInstance && !this._emailValidatorInstance && !this._minLengthValidatorInstance) {
      this._maxLengthValidatorInstance = FudisValidators.maxLength(this.maxLength, 'Email should not be more than 20 characters.');
      this._minLengthValidatorInstance = FudisValidators.minLength(this.minLength, `Too short email. Minimum length is ${this.minLength} and maximum length is ${this.maxLength}.`,)
      this._emailValidatorInstance = FudisValidators.email('Input must be an email address.');

      this.formExample.controls['email'].addValidators(this._maxLengthValidatorInstance);
      this.formExample.controls['email'].addValidators(this._minLengthValidatorInstance);
      this.formExample.controls['email'].addValidators(this._emailValidatorInstance);
      this.formExample.controls['email'].updateValueAndValidity();
    }
  }

  handleUpdateNumberValidator(): void {
    if(!this._maxNumberValidatorInstance && !this._minNumberValidatorInstance) {
      this._maxNumberValidatorInstance = FudisValidators.max(this.maxNumber, `Given number is not inside the allowed range ${this.minNumber} - ${this.maxNumber}.` )
      this._minNumberValidatorInstance = FudisValidators.min(this.minNumber, 'Number is too small'),

      this.formExample.controls['number'].addValidators(this._maxNumberValidatorInstance);
      this.formExample.controls['number'].addValidators(this._minNumberValidatorInstance);
      this.formExample.controls['number'].updateValueAndValidity();
    }
  }

  handleRemoveRequiredValidator(): void {
    if(this._requiredValidatorInstance) {
      this.formExample.controls['required'].removeValidators(this._requiredValidatorInstance);
      this.formExample.controls['required'].updateValueAndValidity();
      this._requiredValidatorInstance = null;
    }
  }

  handleRemoveEmailValidator(): void {
    if(this._maxLengthValidatorInstance && this._emailValidatorInstance && this._minLengthValidatorInstance) {
      this.formExample.controls['email'].removeValidators(this._maxLengthValidatorInstance);
      this.formExample.controls['email'].removeValidators(this._minLengthValidatorInstance);
      this.formExample.controls['email'].removeValidators(this._emailValidatorInstance);
      this.formExample.controls['email'].updateValueAndValidity();
      this._maxLengthValidatorInstance = null;
      this._minLengthValidatorInstance = null;
      this._emailValidatorInstance = null;
    }
  }

  handleRemoveNumberValidator(): void {
    if(this._maxNumberValidatorInstance && this._minNumberValidatorInstance) {
      this.formExample.controls['number'].removeValidators(this._maxNumberValidatorInstance);
      this.formExample.controls['number'].removeValidators(this._minNumberValidatorInstance);
      this.formExample.controls['number'].updateValueAndValidity();
      this._maxNumberValidatorInstance = null;
      this._minNumberValidatorInstance = null;
    }
  }
}

export default {
  title: 'Components/Form/Form',
  component: FormComponent,
  decorators: [
    moduleMetadata({
      declarations: [ DynamicValidatorExampleComponent],
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

export const DynamicExample: StoryFn<FormComponent> = (args: FormComponent) => ({
  props: args,
  template: html` <example-dynamic-validator
    [title]="title"
    [titleVariant]="titleVariant"
    [level]="level"
    [errorSummaryHelpText]="errorSummaryHelpText"
    [errorSummaryVisible]="errorSummaryVisible"
  />`,
});

DynamicExample.args = {
  title: 'Example with Dynamic Form Validators',
  titleVariant: 'xl',
  level: 1,
  errorSummaryHelpText:
    'There are errors in this form. Please address these before trying to submit again.',
  errorSummaryVisible: false,
};

DynamicExample.parameters = {
  controls: {
    exclude: formExclude,
  },
};