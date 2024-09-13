import { StoryFn, Meta, moduleMetadata, applicationConfig } from '@storybook/angular';
import { ReactiveFormsModule, FormsModule, FormControl, FormGroup } from '@angular/forms';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputWithLanguageOptionsComponent } from './input-with-language-options.component';
import { FudisValidators } from '../../../utilities/form/validators';
import { FudisGroupValidators } from '../../../utilities/form/groupValidators';
import { FudisInputWithLanguageOptionsFormGroup } from '../../../types/forms';
import { inputWithLanguageOptionsStoryExclude } from '../../../utilities/storybook';
import docs from './input-with-language-options.mdx';

export default {
  title: 'Components/Form/Input With Language Options',
  component: InputWithLanguageOptionsComponent,
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
      exclude: inputWithLanguageOptionsStoryExclude,
    },
    docs: {
      page: docs,
    },
  },
  argTypes: {
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'radio' },
    },
    helpText: {
      control: { type: 'text' },
    },
    tooltipPosition: {
      options: ['left', 'right', 'above', 'below'],
      control: { type: 'radio' },
    },
    tooltip: {
      control: { type: 'text' },
    },
  },
} as Meta;

const html = String.raw;

const commonArgs: Partial<InputWithLanguageOptionsComponent> = {
  label: 'Your superhero name',
  size: 'lg',
  disabled: false,
  variant: 'text-input',
  initialFocus: false,
  tooltip: 'Your city needs you!',
  tooltipToggle: false,
  tooltipPosition: 'right',
};

const ExampleAllRequiredTemplate: StoryFn = (args) => ({
  props: {
    ...args,
    id: 'unique-input-id-superhero-name',
    formGroup: new FormGroup<FudisInputWithLanguageOptionsFormGroup<object>>({
      finnish: new FormControl<string | null>(null, [
        FudisValidators.required('Missing superhero name on Finnish.'),
        FudisValidators.minLength(5, 'Too short Finnish name'),
        FudisValidators.maxLength(10, 'Too long Finnish name'),
      ]),
      swedish: new FormControl<string | null>(null, [
        FudisValidators.required('Missing superhero name on Swedish.'),
        FudisValidators.minLength(5, 'Too short Swedish name'),
        FudisValidators.maxLength(15, 'Too long Swedish name'),
      ]),
      english: new FormControl<string | null>(null, [
        FudisValidators.required('Missing superhero name on English.'),
        FudisValidators.minLength(5, 'Too short English name'),
        FudisValidators.maxLength(20, 'Too long English name'),
      ]),
    }),
  },
  template: html`
    <fudis-input-with-language-options
      [id]="'unique-input-1'"
      [size]="size"
      [disabled]="disabled"
      [variant]="variant"
      [formGroup]="formGroup"
      [label]="label"
      [helpText]="helpText"
      [initialFocus]="initialFocus"
      [tooltip]="tooltip"
      [tooltipToggle]="tooltipToggle"
      [tooltipPosition]="tooltipPosition"
    ></fudis-input-with-language-options>
  `,
});

const ExampleTemplate: StoryFn = (args) => ({
  props: {
    ...args,
    languageOptions: [
      { controlName: 'finnish', label: 'FI' },
      { controlName: 'swedish', label: 'SV' },
      { controlName: 'english', label: 'EN' },
    ],
    formGroup: new FormGroup<FudisInputWithLanguageOptionsFormGroup<object>>(
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
      [FudisGroupValidators.atLeastOneRequired('Give name in at least in one language')],
    ),
  },
  template: html`
    <fudis-input-with-language-options
      [formGroup]="formGroup"
      [disabled]="disabled"
      [size]="size"
      [variant]="variant"
      [label]="label"
      [helpText]="helpText"
      [initialFocus]="initialFocus"
      [tooltip]="tooltip"
      [tooltipToggle]="tooltipToggle"
      [tooltipPosition]="tooltipPosition"
    ></fudis-input-with-language-options>
  `,
});

export const Example = ExampleTemplate.bind({});

Example.args = {
  ...commonArgs,
  helpText: 'Please provide superhero name in at least one language.',
};

export const ExampleWithAllRequired = ExampleAllRequiredTemplate.bind({});

ExampleWithAllRequired.args = {
  ...commonArgs,
  helpText: 'Please provide superhero name in all languages.',
};
