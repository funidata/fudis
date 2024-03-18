import { StoryFn, Meta, moduleMetadata, applicationConfig } from '@storybook/angular';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { Component, Input, OnInit, importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import {
  FudisSelectOption,
  FudisRadioButtonOption,
  FudisFormErrorSummaryLink,
  // FudisCheckboxGroupFormGroup,
  // FudisDateRangeItem,
} from '../../../types/forms';
import { FudisValidators } from '../../../utilities/form/validators';
import { FudisGroupValidators } from '../../../utilities/form/groupValidators';
import { FormComponent } from './form.component';
import { FudisTranslationService } from '../../../services/translation/translation.service';
import { FudisFocusService } from '../../../services/focus/focus.service';
import docs from './form.docs.mdx';
import { FudisBadgeVariant } from '../../../types/miscellaneous';
import { FudisHeadingLevel, FudisHeadingSize } from '../../../types/typography';
import { formExclude } from '../../../utilities/storybook';
import { defaultOptions } from '../select/common/mock_data';
import { FudisErrorSummaryService } from '../../../services/form/error-summary/error-summary.service';

@Component({
  selector: 'example-with-multiple-forms',
  template: `
    <fudis-grid [align]="'center'" [columns]="2" [width]="'lg'">
      <fudis-button
        fudisGridItem
        [columns]="'stretch'"
        (handleClick)="submitAllForms()"
        [label]="'Submit all forms!'"
      />

      <fudis-form
        [titleLevel]="2"
        [title]="'Form with Text Input'"
        [errorSummaryLinkType]="'onClick'"
        [errorSummaryVisible]="errorSummaryVisible"
        [errorSummaryHelpText]="errorSummaryHelpText"
      >
        <ng-template fudisActions [type]="'form'">
          <fudis-button
            fudisFormSubmit
            [formValid]="allForms.controls.formOne.valid"
            [label]="'Submit'"
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
        [titleLevel]="2"
        [title]="'Form with Text Area'"
        [errorSummaryLinkType]="'onClick'"
        [errorSummaryVisible]="errorSummaryVisible"
        [errorSummaryHelpText]="errorSummaryHelpText"
      >
        <ng-template fudisActions [type]="'form'">
          <fudis-button
            fudisFormSubmit
            [formValid]="allForms.controls.formTwo.valid"
            [label]="'Submit'"
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
      <!-- <fudis-form
        [titleLevel]="2"
        [title]="'Form with Checkbox Group'"
        [errorSummaryLinkType]="'onClick'"
        [errorSummaryVisible]="errorSummaryVisible"
        [errorSummaryHelpText]="errorSummaryHelpText"
      >
        <ng-template fudisActions [type]="'form'">
          <fudis-button
            fudisFormSubmit
            [formValid]="allForms.controls.formThree.valid"
            [label]="'Submit'"
          />
        </ng-template>
        <ng-template fudisContent [type]="'form'">
          <fudis-expandable [title]="'Expandable with Text Area'" [errorSummaryBreadcrumb]="true">
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
      </fudis-form> -->
      <!-- <fudis-form
        [titleLevel]="2"
        [title]="'Form with Select and Multiselect'"
        [errorSummaryLinkType]="'onClick'"
        [errorSummaryVisible]="errorSummaryVisible"
        [errorSummaryHelpText]="errorSummaryHelpText"
      >
        <ng-template fudisActions [type]="'form'">
          <fudis-button
            fudisFormSubmit
            [formValid]="allForms.controls.formFour.valid"
            [label]="'Submit'"
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
      </fudis-form> -->
    </fudis-grid>
  `,
})
class ExampleWithMultipleFormsComponent {
  constructor(private _errorSummaryService: FudisErrorSummaryService) {}

  errorSummaryVisible = false;

  errorSummaryHelpText = 'There are incorrect form fields.';

  selectOptions = defaultOptions;

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
    // formThree: new FormGroup<FudisCheckboxGroupFormGroup<object>>(
    //   {
    //     apple: new FormControl<boolean | null>(null),
    //     fairTradeBanana: new FormControl<boolean | null>(null),
    //     pear: new FormControl<boolean | null>(null),
    //     pineapple: new FormControl<boolean | null>(null),
    //     orange: new FormControl<boolean | null | undefined>(null),
    //   },
    //   [FudisGroupValidators.atLeastOneRequired(new BehaviorSubject('No fruit picked! :('))],
    // ),
    // formFour: new FormGroup({
    //   select: new FormControl<FudisSelectOption<object> | null>(
    //     null,
    //     FudisValidators.required('You must pick one'),
    //   ),
    //   multiselect: new FormControl<FudisSelectOption<object>[] | null>(null, [
    //     FudisValidators.required('Selection is missing'),
    //     FudisValidators.minLength(2, 'Choose at least 2'),
    //   ]),
    // }),
  });
}

@Component({
  selector: 'example-form-content',
  template: `
    <fudis-form
      [marginTop]="'xl'"
      [badge]="badge"
      [badgeText]="badgeText"
      [titleLevel]="titleLevel"
      [title]="title"
      [titleSize]="titleSize"
      [helpText]="helpText"
      [errorSummaryLinkType]="errorSummaryLinkType"
      [errorSummaryHelpText]="errorSummaryHelpText"
      [errorSummaryVisible]="errorSummaryVisible"
    >
      <!-- <ng-template fudisHeader>
        <fudis-description-list [columns]="1" [variant]="'compact'" [data]="formHeaderDl" />
      </ng-template> -->
      <ng-template fudisActions [type]="'form'">
        <fudis-button [label]="'Previous step'" [icon]="'back'" [variant]="'tertiary'" />
        <fudis-button
          fudisFormSubmit
          [formValid]="formExample.valid"
          [label]="'Submit'"
          (handleClick)="submitForm()"
        />
      </ng-template>
      <ng-template fudisContent [type]="'form'">
        <!-- <fudis-section [title]="'Main section'">
          <ng-template fudisContent [type]="'section'"> -->
        <fudis-expandable
          (closedChange)="handleClosedOutput($event)"
          [title]="'Expandable section 1'"
          [closed]="_closed"
        >
          <ng-template fudisContent [type]="'expandable'">
            <fudis-grid>
              <!-- <fudis-fieldset
                [label]="'Basic info'"
                [helpText]="'Some generic info about this course'"
                [id]="fieldsetId"
              >
                <ng-template fudisNotifications [type]="'fieldset'">
                  <fudis-notification *ngIf="errorSummaryVisible">
                    This is notification for a fieldset. TODO: Add notifications to error summary if
                    needed.
                  </fudis-notification>
                </ng-template>
                <ng-template fudisContent [type]="'fieldset'">
                  <fudis-grid [columns]="{ lg: 'inputLg inputLg' }"> -->
              <!-- <fudis-input-with-language-options
                          [id]="'unique-input-1'"
                          [options]="languageOptions"
                          [formGroup]="formExample.controls['name']"
                          [label]="'Course name'"
                          [helpText]="
                            'Some name would be nice. Provide course name in at least one language.'
                          "
                        >
                          <fudis-error-message
                            *ngIf="
                              formExample.controls['importantDate'].value?.getTime() !== releaseDate
                            "
                            [message]="
                              'Reminder here as well, that you have not set a good start date'
                            "
                          />
                        </fudis-input-with-language-options> -->
              <!-- <fudis-input-with-language-options
                          [variant]="'text-area'"
                          [id]="'unique-input-2'"
                          [options]="languageOptions"
                          [formGroup]="formExample.controls['description']"
                          [label]="'Course description'"
                          [helpText]="
                            'So that students know what they are getting into. Provide description in all languages.'
                          "
                        /> -->
              <!-- <fudis-radio-button-group
                          [label]="'Course type'"
                          [id]="'radio-button-group-1'"
                          [options]="courseTypeOptions"
                          [control]="formExample.controls['courseType']"
                        /> -->
              <!-- <fudis-checkbox-group
                      [formGroup]="formExample.controls.courseBooks"
                      [label]="'Course books'"
                      [helpText]="'Select 1-2 coursebooks'"
                    >
                      <fudis-checkbox [controlName]="'first'" [label]="'Heir to the Empire'" />
                      <fudis-checkbox [controlName]="'second'" [label]="'Dark Force Rising'" />
                      <fudis-checkbox [controlName]="'third'" [label]="'The Last Command'" />
                    </fudis-checkbox-group> -->
              <!-- <fudis-datepicker
                          [label]="'Start date'"
                          [helpText]="'You have to start from somewhere'"
                          [control]="formExample.controls['importantDate']"
                        >
                          <fudis-error-message
                            *ngIf="
                              formExample.controls['importantDate'].value?.getTime() !== releaseDate
                            "
                            [message]="'Wrong date chosen. 1.5.1991 would be great!'"
                          />
                        </fudis-datepicker> -->
              <!-- </fudis-grid>
                </ng-template>
              </fudis-fieldset> -->
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
        <!-- <fudis-expandable
              [closed]="_closed"
              [title]="'Expandable section 2'"
              [errorSummaryBreadcrumb]="true"
            >
              <ng-template fudisContent [type]="'expandable'">
                <fudis-fieldset [label]="'More important dates'">
                  <ng-template fudisContent [type]="'fieldset'">
                    <fudis-date-range
                      [startDate]="dateRangeStartDate"
                      [endDate]="dateRangeEndDate"
                    />
                  </ng-template>
                </fudis-fieldset>
              </ng-template>
            </fudis-expandable> -->
        <!-- </ng-template>
        </fudis-section> -->
      </ng-template>
    </fudis-form>
  `,
})
class FormContentExampleComponent implements OnInit {
  constructor(
    private _translationService: FudisTranslationService,
    private _focusService: FudisFocusService,
  ) {}

  @Input() title: string;
  @Input() titleLevel: FudisHeadingLevel;
  @Input() titleSize: FudisHeadingSize;
  @Input() helpText: string;
  @Input() badge: FudisBadgeVariant;
  @Input() badgeText: string;
  @Input() errorSummaryHelpText: string;
  @Input() errorSummaryLinkType: FudisFormErrorSummaryLink;
  @Input() errorSummaryVisible: boolean;

  releaseDate: number = new Date(1991, 4, 1).getTime();
  firstLoad: boolean = true;
  fieldsetId = 'first-fieldset-id';

  formHeaderDl = [
    { key: 'Important person', value: 'Admiral Thrawn' },
    { key: 'Key', value: 'THX-1138' },
    { key: 'Another important person', value: 'Mara Jade' },
  ];

  formExample = new FormGroup({
    // Expose when InputWithLanguageOptions is exposed to public API
    // name: new FormGroup(
    //   {
    //     finnish: new FormControl(null),
    //     swedish: new FormControl(null),
    //     english: new FormControl(null),
    //   },
    //   [FudisGroupValidators.atLeastOneRequired(new BehaviorSubject('Course name is missing.'))],
    // ),
    // description: new FormGroup({
    //   finnish: new FormControl(null, [
    //     FudisValidators.required('Missing description in Finnish.'),
    //     FudisValidators.minLength(10, 'Description should at least 10 characters.'),
    //   ]),
    //   swedish: new FormControl(null, [
    //     FudisValidators.required('Missing description in Swedish.'),
    //     FudisValidators.minLength(10, 'Description should at least 10 characters.'),
    //   ]),
    //   english: new FormControl(null, [
    //     FudisValidators.required('Missing description in English.'),
    //     FudisValidators.minLength(10, 'Description should at least 10 characters.'),
    //   ]),
    // }),
    courseBooks: new FormGroup(
      {
        first: new FormControl(null),
        second: new FormControl(null),
        third: new FormControl(null),
      },
      [
        FudisGroupValidators.min({ value: 1, message: new BehaviorSubject('No book selected.') }),
        FudisGroupValidators.max({ value: 2, message: new BehaviorSubject('Too many selected.') }),
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
    // importantDate: new FormControl(null, FudisValidators.required('Start date is missing.')),
    // courseType: new FormControl(null, FudisValidators.required('Course type must be selected.')),
    // startDate: new FormControl<Date | null>(
    //   null,
    //   FudisValidators.required('Start date is required.'),
    // ),
    // endDate: new FormControl<Date | null>(null, FudisValidators.required('End date is required.')),
  });

  languageOptions: FudisSelectOption<object>[] = [
    { value: 'finnish', label: 'FI' },
    { value: 'swedish', label: 'SV' },
    { value: 'english', label: 'EN' },
  ];

  courseTypeOptions: FudisRadioButtonOption[] = [
    { value: 'basic', label: 'Basic', id: 'courseType-1' },
    { value: 'advanced', label: 'Advanced', id: 'courseType-2' },
  ];

  // Expose when DateRange is exposed to public API
  // dateRangeStartDate: FudisDateRangeItem = {
  //   control: this.formExample.controls.startDate,
  //   label: 'Start date',
  // };

  // dateRangeEndDate: FudisDateRangeItem = {
  //   control: this.formExample.controls.endDate,
  //   label: 'End date',
  // };

  private _closed: boolean = true;

  ngOnInit(): void {
    this._focusService.addToIgnoreList('unique-input-3');
  }

  submitForm(): void {
    if (this.formExample.valid) {
      //this.errorSummaryVisible = false;
    }
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
    titleSize: {
      options: ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
      control: {
        type: 'select',
      },
    },
    titleLevel: {
      options: [1, 2, 3, 4, 5, 6],
      control: {
        type: 'select',
      },
    },
    errorSummaryLinkType: {
      options: ['href', 'router', 'onClick'],
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
    [titleLevel]="titleLevel"
    [titleSize]="titleSize"
    [helpText]="helpText"
    [badge]="badge"
    [badgeText]="badgeText"
    [errorSummaryHelpText]="errorSummaryHelpText"
    [errorSummaryLinkType]="errorSummaryLinkType"
    [errorSummaryVisible]="errorSummaryVisible"
  />`,
});

Example.args = {
  title: 'Example Form Heading',
  titleLevel: 1,
  titleSize: 'xl',
  helpText: 'This is an additional help text to give user more information about the form',
  badge: 'primary',
  badgeText: 'Example',
  errorSummaryHelpText:
    'There are errors in this form. Please address these before trying to submit again.',
  errorSummaryLinkType: 'onClick',
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
