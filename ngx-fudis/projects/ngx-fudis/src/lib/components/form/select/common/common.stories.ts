import { Meta, applicationConfig, StoryFn } from '@storybook/angular';
import { action } from 'storybook/actions';
import { FormControl } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { SelectComponent } from '../select/select.component';
import { MultiselectComponent } from '../multiselect/multiselect.component';
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

const commonArgs: Partial<SelectComponent> = {
  label: 'Select a pet',
  size: 'lg',
  placeholder: 'Choose a pet',
  helpText: 'All pets are equally important, but for sake of this example please pick one.',
  selectionClearButton: true,
  variant: 'autocompleteDropdown',
  autocompleteHelpText: 'Hello from autocompleteHelpText!',
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
  ...(commonArgs as Partial<MultiselectComponent>),
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
        @for (group of groupedMockData; track group.country) {
        <fudis-select-group [label]="group.country">
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
  ...(commonArgs as Partial<SelectComponent>),
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
        @for (group of groupedMockData; track group.country) {
        <fudis-multiselect-group [label]="group.country">
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
  ...(commonArgs as Partial<MultiselectComponent>),
};
