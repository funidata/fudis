import { Meta, applicationConfig, StoryFn, Args } from '@storybook/angular-vite';
import { action } from 'storybook/actions';
import { FormControl } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { SelectComponent } from '../select/select.component';
import docs from './select-common.mdx';
import { groupedMockData, defaultOptions } from './mock_data';
import { FudisSelectOption } from '../../../../types/forms';
import { selectStoryControlExclude } from '../../../../utilities/storybook';

export default {
  title: 'Components/Form/Select/Common Features',
  component: SelectComponent,
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(BrowserAnimationsModule)],
    }),
  ],
  parameters: {
    docs: {
      page: docs,
    },
    controls: {
      exclude: selectStoryControlExclude,
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
  },
} as Meta;

const html = String.raw;

const commonArgs: Args = {
  label: 'Select a study programme',
  size: 'lg',
  placeholder: 'Choose a programme',
  helpText: 'Select the programme you are applying for.',
  selectionClearButton: true,
  variant: 'autocompleteDropdown',
  autocompleteHelpText: 'Start typing to search programmes.',
  popoverText: '',
  popoverTriggerLabel: '',
  popoverPosition: 'right',
};

const SelectAutocompleteTemplate: StoryFn = (args) => ({
  props: {
    ...args,
    defaultOptions,
    selectionUpdate: action('selectionUpdate'),
    control: new FormControl<FudisSelectOption<string | object> | null>(null),
  },
  template: html`
    <fudis-select
      [size]="size"
      [variant]="variant"
      [placeholder]="placeholder"
      [autocompleteHelpText]="autocompleteHelpText"
      [control]="control"
      [label]="label"
      [helpText]="helpText"
      [selectionClearButton]="selectionClearButton"
      (selectionUpdate)="selectionUpdate($event)"
      [popoverText]="popoverText"
      [popoverPosition]="popoverPosition"
      [popoverTriggerLabel]="popoverTriggerLabel"
    >
      <ng-template fudisSelectOptions>
        @for (option of defaultOptions; track option.value) {
        <fudis-select-option [data]="option"></fudis-select-option>
        }
      </ng-template>
    </fudis-select>
  `,
});

export const SelectAutocomplete = SelectAutocompleteTemplate.bind({});
SelectAutocomplete.args = {
  ...commonArgs,
};

const MultiselectAutocompleteTemplate: StoryFn = (args) => ({
  props: {
    ...args,
    defaultOptions,
    selectionUpdate: action('selectionUpdate'),
    control: new FormControl<FudisSelectOption<string | object>[] | null>([defaultOptions[2]]),
    groupedMockData,
  },
  template: html`
    <fudis-multiselect
      [size]="size"
      [variant]="variant"
      [placeholder]="placeholder"
      [autocompleteHelpText]="autocompleteHelpText"
      [control]="control"
      [label]="label"
      [helpText]="helpText"
      [selectionClearButton]="selectionClearButton"
      (selectionUpdate)="selectionUpdate($event)"
      [popoverText]="popoverText"
      [popoverPosition]="popoverPosition"
      [popoverTriggerLabel]="popoverTriggerLabel"
    >
      <ng-template fudisSelectOptions>
        @for (option of defaultOptions; track option.value) {
        <fudis-multiselect-option [data]="option"></fudis-multiselect-option>
        }
      </ng-template>
    </fudis-multiselect>
  `,
});

export const MultiselectAutocomplete = MultiselectAutocompleteTemplate.bind({});
MultiselectAutocomplete.args = {
  ...commonArgs,
};

const SelectDropdownWithGroupedOptionsTemplate: StoryFn = (args) => ({
  props: {
    ...args,
    selectionUpdate: action('selectionUpdate'),
    control: new FormControl<FudisSelectOption<string | object> | null>(null),
    groupedMockData,
  },
  template: html`
    <fudis-select
      [size]="size"
      [variant]="variant"
      [placeholder]="placeholder"
      [autocompleteHelpText]="autocompleteHelpText"
      [control]="control"
      [label]="label"
      [helpText]="helpText"
      [selectionClearButton]="selectionClearButton"
      (selectionUpdate)="selectionUpdate($event)"
      [popoverText]="popoverText"
      [popoverPosition]="popoverPosition"
      [popoverTriggerLabel]="popoverTriggerLabel"
    >
      <ng-template fudisSelectOptions>
        @for (group of groupedMockData; track group.subjectArea) {
        <fudis-select-group [label]="group.subjectArea">
          @for (groupedOption of group.options; track groupedOption.value) {
          <fudis-select-option [data]="groupedOption"></fudis-select-option>
          }
        </fudis-select-group>
        }
      </ng-template>
    </fudis-select>
  `,
});

export const SelectDropdownWithGroupedOptions = SelectDropdownWithGroupedOptionsTemplate.bind({});
SelectDropdownWithGroupedOptions.args = {
  ...commonArgs,
};

const MultiselectDropdownWithGroupedOptionsTemplate: StoryFn = (args) => ({
  props: {
    ...args,
    selectionUpdate: action('selectionUpdate'),
    control: new FormControl<FudisSelectOption<string | object> | null>(null),
    groupedMockData,
  },
  template: html`
    <fudis-multiselect
      [size]="size"
      [variant]="variant"
      [autocompleteHelpText]="autocompleteHelpText"
      [placeholder]="placeholder"
      [control]="control"
      [label]="label"
      [helpText]="helpText"
      [selectionClearButton]="selectionClearButton"
      (selectionUpdate)="selectionUpdate($event)"
      [popoverText]="popoverText"
      [popoverPosition]="popoverPosition"
      [popoverTriggerLabel]="popoverTriggerLabel"
    >
      <ng-template fudisSelectOptions>
        @for (group of groupedMockData; track group.subjectArea) {
        <fudis-multiselect-group [label]="group.subjectArea">
          @for (groupedOption of group.options; track groupedOption.value) {
          <fudis-multiselect-option [data]="groupedOption"></fudis-multiselect-option>
          }
        </fudis-multiselect-group>
        }
      </ng-template>
    </fudis-multiselect>
  `,
});

export const MultiselectDropdownWithGroupedOptions =
  MultiselectDropdownWithGroupedOptionsTemplate.bind({});
MultiselectDropdownWithGroupedOptions.args = {
  ...commonArgs,
};
