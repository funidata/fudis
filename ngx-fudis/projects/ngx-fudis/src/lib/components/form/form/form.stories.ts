import { StoryFn, Meta, moduleMetadata, applicationConfig } from '@storybook/angular';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FormComponent } from './form.component';
import docs from './form.mdx';
import { fudisHeadingLevelArray } from '../../../types/typography';
import { formExclude } from '../../../utilities/storybook';
import { fudisSpacingArray } from '../../../types/spacing';
import { StorybookExampleFormComponent } from './examples/form-example.component';
import { StorybookExampleWithMultipleFormsComponent } from './examples/form-example-with-multiple-forms.component';
import { StorybookExampleDynamicValidatorsComponent } from './examples/form-example-with-dynamic-validators.component';
import { BehaviorSubject } from 'rxjs';
import { FudisGroupValidators } from '../../../utilities/form/groupValidators';
import { FudisValidators } from '../../../utilities/form/validators';

export default {
  title: 'Components/Form/Form',
  component: FormComponent,
  decorators: [
    moduleMetadata({
      declarations: [],
      imports: [
        StorybookExampleDynamicValidatorsComponent,
        StorybookExampleFormComponent,
        StorybookExampleWithMultipleFormsComponent,
        ReactiveFormsModule,
        RouterModule,
      ],
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

export const Example: StoryFn = (args) => ({
  props: {
    ...args,
    formGroup: new FormGroup({
      courseBooks: new FormGroup(
        {
          first: new FormControl(null),
          second: new FormControl(null),
          third: new FormControl(null),
        },
        [
          FudisGroupValidators.min({ value: 1, message: 'No book selected.' }),
          FudisGroupValidators.max({
            value: 2,
            message: new BehaviorSubject('Too many selected.'),
          }),
        ],
      ),
      teacher: new FormControl<string | null>(
        null,
        FudisValidators.required("Missing teacher's name who is responsible for this course."),
      ),
      email: new FormControl<string | null>(null, [
        FudisValidators.required('Missing email contact.'),
        FudisValidators.email('Input must be an email address.'),
        FudisValidators.minLength(5, 'Email should be at least 5 characters.'),
      ]),
      importantDate: new FormControl<Date | null>(
        null,
        FudisValidators.required('Start date is missing.'),
      ),
      courseType: new FormControl<string | null>(
        null,
        FudisValidators.required('Course type must be selected.'),
      ),
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
      description: new FormGroup({
        fi: new FormControl<string | null>(
          null,
          FudisValidators.required('Missing Finnish description'),
        ),
        sv: new FormControl<string | null>(
          null,
          FudisValidators.required('Missing Swedish description'),
        ),
        en: new FormControl<string | null>(
          null,
          FudisValidators.required('Missing English description'),
        ),
      }),
    }),
  },
  template: html`
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
            <fudis-dd [contentText]="'Mara Jade'" />
          </fudis-dl-item>
        </fudis-dl>
      </ng-template>
      <ng-template fudisActions [type]="'form'">
        <fudis-button [label]="'Previous step'" [icon]="'back'" [variant]="'tertiary'" />
        <fudis-button fudisFormSubmit [formValid]="formGroup.valid" [label]="'Submit'" />
      </ng-template>
      <ng-template fudisContent [type]="'form'">
        <example-form-content [formGroup]="formGroup" />
      </ng-template>
    </fudis-form>
  `,
});

Example.args = {
  title: 'Example Form Heading',
  titleVariant: 'xl',
  level: 1,
  helpText: 'This is an additional help text to give user more information about the form',
  badge: 'primary',
  badgeText: 'Example',
  errorSummaryTitle:
    'There are errors in this form. Please address these before trying to submit again.',
  errorSummaryVisible: false,
};

Example.parameters = {
  controls: {
    exclude: formExclude,
  },
};

export const ExampleWithMultipleForms: StoryFn = (args) => ({
  props: args,
  template: html` <example-with-multiple-forms />`,
});

ExampleWithMultipleForms.parameters = {
  controls: {
    exclude: /.*/g,
  },
};

export const ExampleWithDynamicValidators: StoryFn = (args) => ({
  props: args,
  template: html` <example-dynamic-validator
    [title]="title"
    [helpText]="helpText"
    [titleVariant]="titleVariant"
    [level]="level"
    [errorSummaryTitle]="errorSummaryTitle"
    [errorSummaryVisible]="errorSummaryVisible"
    [badge]="badge"
    [badgeText]="badgeText"
  />`,
});

ExampleWithDynamicValidators.args = {
  title: 'Example With Dynamic Validators',
  helpText:
    "This example page is used to test, that when validators are added or removed from the FormControls, components' HTML attributes such as 'required' and max/min length are updated correctly.",
  titleVariant: 'xl',
  level: 1,
  errorSummaryTitle:
    'There are errors in this form. Please address these before trying to submit again.',
  errorSummaryVisible: false,
  badge: null,
  badgeText: '',
};

ExampleWithDynamicValidators.parameters = {
  controls: {
    exclude: formExclude,
  },
};
