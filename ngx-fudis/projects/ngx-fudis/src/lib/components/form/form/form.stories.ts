import { StoryFn, Meta, moduleMetadata, applicationConfig } from '@storybook/angular';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { Component, Input, OnInit, importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import {
  FudisSelectOption,
  FudisRadioButtonOption,
  FudisCheckboxGroupFormGroup,
  FudisLocalizedTextGroup,
} from '../../../types/forms';
import { FudisValidators } from '../../../utilities/form/validators';
import { FudisGroupValidators } from '../../../utilities/form/groupValidators';
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
import { defaultOptions } from '../select/common/mock_data';
import { FudisErrorSummaryService } from '../../../services/form/error-summary/error-summary.service';
import { fudisSpacingArray } from '../../../types/spacing';

@Component({
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
class ExampleWithMultipleFormsComponent {
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

@Component({
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
class FormContentExampleComponent implements OnInit {
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
      teacher: new FormControl(
        null,
        FudisValidators.required("Missing teacher's name who is responsible for this course."),
      ),
      email: new FormControl(null, [
        FudisValidators.required('Missing email contact.'),
        FudisValidators.email('Input must be an email address.'),
        FudisValidators.minLength(5, 'Email should be at least 5 characters.'),
      ]),
      importantDate: new FormControl(null, FudisValidators.required('Start date is missing.')),
      courseType: new FormControl(null, FudisValidators.required('Course type must be selected.')),
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

  formExample: FormGroup;

  languageOptions: FudisSelectOption<object>[] = [
    { value: 'finnish', label: 'FI' },
    { value: 'swedish', label: 'SV' },
    { value: 'english', label: 'EN' },
  ];

  courseTypeOptions: FudisRadioButtonOption<object>[] = [
    { value: 'basic', label: 'Basic' },
    { value: 'advanced', label: 'Advanced' },
  ];

  private _closed: boolean = true;

  ngOnInit(): void {
    this._focusService.addToIgnoreList('unique-input-3');
  }

  handleClosedOutput(value: boolean): void {
    this._closed = value;
  }
}

export default {
  title: 'Components/Form/Form',
  component: FormComponent,
  decorators: [
    moduleMetadata({
      declarations: [FormContentExampleComponent, ExampleWithMultipleFormsComponent],
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

export const Example: StoryFn<FormComponent> = (args: FormComponent) => ({
  props: args,
  template: html` <example-form-content
    [title]="title"
    [titleVariant]="titleVariant"
    [level]="level"
    [helpText]="helpText"
    [badge]="badge"
    [badgeText]="badgeText"
    [errorSummaryHelpText]="errorSummaryHelpText"
    [errorSummaryVisible]="errorSummaryVisible"
  />`,
});

Example.args = {
  title: 'Example Form Heading',
  titleVariant: 'xl',
  level: 1,
  helpText: 'This is an additional help text to give user more information about the form',
  badge: 'primary',
  badgeText: 'Example',
  errorSummaryHelpText:
    'There are errors in this form. Please address these before trying to submit again.',
  errorSummaryVisible: false,
};

Example.parameters = {
  controls: {
    exclude: formExclude,
  },
};

export const ExampleWithMultipleForms: StoryFn<FormComponent> = (args: FormComponent) => ({
  props: args,
  template: html` <example-with-multiple-forms />`,
});

ExampleWithMultipleForms.parameters = {
  controls: {
    exclude: /.*/g,
  },
};
