import { StoryFn, Meta, moduleMetadata, applicationConfig } from '@storybook/angular';
import { ReactiveFormsModule, FormsModule, FormControl, FormGroup } from '@angular/forms';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocalizedTextGroupComponent } from './localized-text-group.component';
import { FudisValidators } from '../../../utilities/form/validators';
import { FudisGroupValidators } from '../../../utilities/form/groupValidators';
import { fudisInputSizeArray, FudisLocalizedTextGroupDefaultFormGroup } from '../../../types/forms';
import { LocalizedTextGroupStoryExclude } from '../../../utilities/storybook';
import docs from './localized-text-group.mdx';
import { action } from '@storybook/addon-actions';

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
      control: { type: 'radio' },
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

const commonArgs: Partial<LocalizedTextGroupComponent<object>> = {
  size: 'lg',
  initialFocus: false,
  popoverText: 'Your city needs you!',
  popoverTriggerLabel: 'Important information',
  popoverPosition: 'right',
};

const ExampleAllRequiredTemplate: StoryFn = (args) => ({
  props: {
    ...args,
    id: 'unique-input-id-superhero-name',
    handleFocus: action('handleFocus'),
    handleBlur: action('handleBlur'),
    handleViewInit: action('handleViewInit'),
    handleKeyUp: action('handleKeyUp'),
    formGroup: new FormGroup<FudisLocalizedTextGroupDefaultFormGroup>({
      fi: new FormControl<string | null>(null, [
        FudisValidators.required('Missing backstory in Finnish.'),
        FudisValidators.minLength(10, 'Too short backstory in Finnish'),
        FudisValidators.maxLength(50, 'Too long backstory in Finnish'),
      ]),
      sv: new FormControl<string | null>(null, [
        FudisValidators.required('Missing backstory in Swedish.'),
        FudisValidators.minLength(10, 'Too short backstory in Swedish'),
        FudisValidators.maxLength(100, 'Too long backstory in Swedish'),
      ]),
      en: new FormControl<string | null>(null, [
        FudisValidators.required('Missing backstory in English.'),
        FudisValidators.minLength(10, 'Too short backstory in English'),
        FudisValidators.maxLength(1000, 'Too long backstory in English'),
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
  ...commonArgs,
  label: 'Your superhero name',
  variant: 'text-input',
  helpText: 'Please provide superhero name in at least one language.',
};

export const ExampleWithAllRequired = ExampleAllRequiredTemplate.bind({});

ExampleWithAllRequired.args = {
  ...commonArgs,
  label: 'Your superhero origin story',
  variant: 'text-area',
  helpText: 'Please provide an interesting superhero backstory in all languages.',
};
