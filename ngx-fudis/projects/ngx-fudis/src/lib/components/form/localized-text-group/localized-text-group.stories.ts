import { StoryFn, Meta, moduleMetadata, applicationConfig, Args } from '@storybook/angular-vite';
import { ReactiveFormsModule, FormsModule, FormControl, FormGroup } from '@angular/forms';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocalizedTextGroupComponent } from './localized-text-group.component';
import { FudisValidators } from '../../../utilities/form/validators';
import { FudisGroupValidators } from '../../../utilities/form/groupValidators';
import { fudisInputSizeArray, FudisLocalizedTextGroupDefaultFormGroup } from '../../../types/forms';
import { LocalizedTextGroupStoryExclude } from '../../../utilities/storybook';
import docs from './localized-text-group.mdx';
import { action } from 'storybook/actions';

export default {
  title: 'Components/Form/Localized Text Group',
  component: LocalizedTextGroupComponent,
  decorators: [
    moduleMetadata({
      imports: [ReactiveFormsModule, FormsModule],
    }),
    applicationConfig({
      providers: [importProvidersFrom(BrowserAnimationsModule)],
    }),
  ],
  parameters: {
    controls: {
      exclude: LocalizedTextGroupStoryExclude,
    },
    docs: {
      page: docs,
    },
  },
  argTypes: {
    size: {
      options: fudisInputSizeArray,
    },
    helpText: {
      control: { type: 'text' },
    },
    popoverPosition: {
      options: ['left', 'right', 'above', 'below'],
      control: { type: 'radio' },
    },
    popoverText: {
      control: { type: 'text' },
    },
    popoverTriggerLabel: {
      control: { type: 'text' },
    },
  },
} as Meta;

const html = String.raw;

const commonArgs: Args = {
  size: 'lg',
  initialFocus: false,
  popoverText: 'This information is needed for continuing the process.',
  popoverTriggerLabel: 'Important information',
  popoverPosition: 'right',
};

const ExampleAllRequiredTemplate: StoryFn = (args) => ({
  props: {
    ...args,
    id: 'unique-input-id-course-description',
    handleFocus: action('handleFocus'),
    handleBlur: action('handleBlur'),
    handleViewInit: action('handleViewInit'),
    handleKeyUp: action('handleKeyUp'),
    formGroup: new FormGroup<FudisLocalizedTextGroupDefaultFormGroup>({
      fi: new FormControl<string | null>(null, [
        FudisValidators.required('Missing course description in Finnish.'),
        FudisValidators.minLength(10, 'Course description is too short in Finnish.'),
        FudisValidators.maxLength(50, 'Course description is too long in Finnish.'),
      ]),
      sv: new FormControl<string | null>(null, [
        FudisValidators.required('Missing course description in Swedish.'),
        FudisValidators.minLength(10, 'Course description is too short in Swedish.'),
        FudisValidators.maxLength(100, 'Course description is too long in Swedish.'),
      ]),
      en: new FormControl<string | null>(null, [
        FudisValidators.required('Missing course description in English.'),
        FudisValidators.minLength(10, 'Course description is too short in English.'),
        FudisValidators.maxLength(1000, 'Course description is too long in English.'),
      ]),
    }),
  },
  template: html`
    <fudis-localized-text-group
      [id]="'unique-custom-text-group-1'"
      [size]="size"
      [variant]="variant"
      [formGroup]="formGroup"
      [label]="label"
      [helpText]="helpText"
      [initialFocus]="initialFocus"
      [popoverText]="popoverText"
      [popoverTriggerLabel]="popoverTriggerLabel"
      [popoverPosition]="popoverPosition"
      (handleBlur)="handleBlur($event)"
      (handleFocus)="handleFocus($event)"
      (handleKeyUp)="handleKeyUp($event)"
      (handleViewInit)="handleViewInit($event)"
    ></fudis-localized-text-group>
  `,
});

const ExampleTemplate: StoryFn = (args) => ({
  props: {
    ...args,
    handleFocus: action('handleFocus'),
    handleBlur: action('handleBlur'),
    handleViewInit: action('handleViewInit'),
    handleKeyUp: action('handleKeyUp'),
    languageOptions: [
      { controlName: 'fi', label: 'FI' },
      { controlName: 'sv', label: 'SV' },
      { controlName: 'en', label: 'EN' },
    ],
    formGroup: new FormGroup<FudisLocalizedTextGroupDefaultFormGroup>(
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
      [FudisGroupValidators.oneRequired('Give name in at least in one language')],
    ),
  },
  template: html`
    <fudis-localized-text-group
      [formGroup]="formGroup"
      [size]="size"
      [variant]="variant"
      [label]="label"
      [helpText]="helpText"
      [initialFocus]="initialFocus"
      [popoverText]="popoverText"
      [popoverTriggerLabel]="popoverTriggerLabel"
      [popoverPosition]="popoverPosition"
      (handleBlur)="handleBlur($event)"
      (handleFocus)="handleFocus($event)"
      (handleKeyUp)="handleKeyUp($event)"
      (handleViewInit)="handleViewInit($event)"
    ></fudis-localized-text-group>
  `,
});

export const Example = ExampleTemplate.bind({});

Example.args = {
  label: 'Course name',
  variant: 'text-input',
  helpText: 'Provide the course name in at least one language.',
  ...commonArgs,
};

export const ExampleWithAllRequired = ExampleAllRequiredTemplate.bind({});

ExampleWithAllRequired.args = {
  label: 'Course description',
  variant: 'text-area',
  helpText: 'Provide the course description in all languages.',
  ...commonArgs,
};
