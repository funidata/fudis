import { Meta, applicationConfig, StoryFn } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { FormControl } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { SelectComponent } from './select.component';
import readme from './select.mdx';
import {
  groupedMockData,
  defaultOptions,
  TestAnimalSound,
  TestAnimalScience,
} from '../common/mock_data';
import { selectStoryControlExclude } from '../../../../utilities/storybook';

export default {
  title: 'Components/Form/Select/Select',
  component: SelectComponent,
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(BrowserAnimationsModule)],
    }),
  ],
  parameters: {
    docs: {
      page: readme,
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
  disabled: false,
  placeholder: 'Choose a pet',
  helpText: 'All pets are equally important, but for sake of this example please pick one.',
  autocompleteHelpText: 'Hello from Dropdown Help Text!',
  selectionClearButton: true,
};

const DropdownTemplate: StoryFn<SelectComponent> = (args: SelectComponent) => ({
  props: {
    ...args,
    defaultOptions,
    selectionUpdate: action('selectionUpdate'),
    control: new FormControl<TestAnimalSound | TestAnimalScience | null>(null),
    groupedMockData,
  },
  template: html`
    <fudis-select
      [size]="size"
      [placeholder]="placeholder"
      [control]="control"
      [label]="label"
      [disabled]="disabled"
      [helpText]="helpText"
      [selectionClearButton]="selectionClearButton"
      [variant]="'dropdown'"
      (selectionUpdate)="selectionUpdate($event)"
    >
      <ng-template fudisContent type="select-options">
        <fudis-select-option
          *ngFor="let option of defaultOptions"
          [data]="option"
        ></fudis-select-option>
        <fudis-select-group *ngFor="let group of groupedMockData" [label]="group.country">
          <fudis-select-option
            *ngFor="let groupedOption of group.options"
            [data]="groupedOption"
          ></fudis-select-option>
        </fudis-select-group>
      </ng-template>
    </fudis-select>
  `,
});

export const Dropdown = DropdownTemplate.bind({});
Dropdown.args = {
  ...commonArgs,
};

const AutocompleteDropdownTemplate: StoryFn<SelectComponent> = (args: SelectComponent) => ({
  props: {
    ...args,
    defaultOptions,
    selectionUpdate: action('selectionUpdate'),
    control: new FormControl<TestAnimalSound | TestAnimalScience | null>(null),
    groupedMockData,
  },
  template: html`
    <fudis-select
      [size]="size"
      [placeholder]="placeholder"
      [control]="control"
      [variant]="'autocompleteDropdown'"
      [label]="label"
      [disabled]="disabled"
      [helpText]="helpText"
      [selectionClearButton]="selectionClearButton"
      [variant]="'autocompleteDropdown'"
      (selectionUpdate)="selectionUpdate($event)"
    >
      <ng-template fudisContent type="select-options">
        <fudis-select-option
          *ngFor="let option of defaultOptions"
          [data]="option"
        ></fudis-select-option>
        <fudis-select-group *ngFor="let group of groupedMockData" [label]="group.country">
          <fudis-select-option
            *ngFor="let groupedOption of group.options"
            [data]="groupedOption"
          ></fudis-select-option>
        </fudis-select-group>
      </ng-template>
    </fudis-select>
  `,
});

export const AutocompleteDropdown = AutocompleteDropdownTemplate.bind({});
AutocompleteDropdown.args = {
  ...commonArgs,
};

const AutocompleteTypeTemplate: StoryFn<SelectComponent> = (args: SelectComponent) => ({
  props: {
    ...args,
    defaultOptions,
    selectionUpdate: action('selectionUpdate'),
    control: new FormControl<TestAnimalSound | TestAnimalScience | null>(null),
    groupedMockData,
  },
  template: html`
    <fudis-select
      [size]="size"
      [placeholder]="placeholder"
      [control]="control"
      [variant]="'autocompleteType'"
      [label]="label"
      [disabled]="disabled"
      [helpText]="helpText"
      [selectionClearButton]="selectionClearButton"
      [variant]="'autocompleteType'"
      [autocompleteHelpText]="autocompleteHelpText"
      (selectionUpdate)="selectionUpdate($event)"
    >
      <ng-template fudisContent type="select-options">
        <fudis-select-option
          *ngFor="let option of defaultOptions"
          [data]="option"
        ></fudis-select-option>
        <fudis-select-group *ngFor="let group of groupedMockData" [label]="group.country">
          <fudis-select-option
            *ngFor="let groupedOption of group.options"
            [data]="groupedOption"
          ></fudis-select-option>
        </fudis-select-group>
      </ng-template>
    </fudis-select>
  `,
});

export const AutocompleteType = AutocompleteTypeTemplate.bind({});
AutocompleteType.args = {
  ...commonArgs,
};
