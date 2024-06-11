import { Meta, applicationConfig, StoryFn } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { FormControl } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { SelectComponent } from '../select/select.component';
import { MultiselectComponent } from '../multiselect/multiselect.component';
import readme from './select-common.mdx';
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
  selectionClearButton: true,
};

const SelectAutocompleteDropdownTemplate: StoryFn<SelectComponent> = (args: SelectComponent) => ({
  props: {
    ...args,
    defaultOptions,
    selectionUpdate: action('selectionUpdate'),
    control: new FormControl<FudisSelectOption<object> | null>(null),
  },
  template: html`
    <fudis-select
      [size]="size"
      [variant]="'autocompleteDropdown'"
      [placeholder]="placeholder"
      [control]="control"
      [label]="label"
      [helpText]="helpText"
      [disabled]="disabled"
      [selectionClearButton]="selectionClearButton"
      (selectionUpdate)="selectionUpdate($event)"
    >
      <ng-template fudisContent type="select-options">
        <fudis-select-option
          *ngFor="let option of defaultOptions"
          [data]="option"
        ></fudis-select-option>
      </ng-template>
    </fudis-select>
  `,
});

export const SelectAutocompleteDropdown = SelectAutocompleteDropdownTemplate.bind({});
SelectAutocompleteDropdown.args = {
  ...commonArgs,
};

const MultiselectAutocompleteDropdownTemplate: StoryFn<MultiselectComponent> = (
  args: MultiselectComponent,
) => ({
  props: {
    ...args,
    defaultOptions,
    selectionUpdate: action('selectionUpdate'),
    control: new FormControl<FudisSelectOption<object>[] | null>([defaultOptions[2]]),
    groupedMockData,
  },
  template: html`
    <fudis-multiselect
      [size]="size"
      [variant]="'autocompleteDropdown'"
      [placeholder]="placeholder"
      [control]="control"
      [label]="label"
      [helpText]="helpText"
      [disabled]="disabled"
      [selectionClearButton]="selectionClearButton"
      (selectionUpdate)="selectionUpdate($event)"
    >
      <ng-template fudisContent type="select-options">
        <fudis-multiselect-option
          *ngFor="let option of defaultOptions"
          [data]="option"
        ></fudis-multiselect-option>
      </ng-template>
    </fudis-multiselect>
  `,
});

export const MultiselectAutocompleteDropdown = MultiselectAutocompleteDropdownTemplate.bind({});
MultiselectAutocompleteDropdown.args = {
  ...(commonArgs as Partial<MultiselectComponent>),
};

const SelectDropdownWithGroupedOptionsTemplate: StoryFn<SelectComponent> = (
  args: SelectComponent,
) => ({
  props: {
    ...args,
    selectionUpdate: action('selectionUpdate'),
    control: new FormControl<FudisSelectOption<object> | null>(null),
    groupedMockData,
  },
  template: html`
    <fudis-select
      [size]="size"
      [variant]="'dropdown'"
      [placeholder]="placeholder"
      [control]="control"
      [label]="label"
      [helpText]="helpText"
      [disabled]="disabled"
      [selectionClearButton]="selectionClearButton"
      (selectionUpdate)="selectionUpdate($event)"
    >
      <ng-template fudisContent type="select-options">
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

export const SelectDropdownWithGroupedOptions = SelectDropdownWithGroupedOptionsTemplate.bind({});
SelectDropdownWithGroupedOptions.args = {
  ...(commonArgs as Partial<SelectComponent>),
};

const MultiselectDropdownWithGroupedOptionsTemplate: StoryFn<MultiselectComponent> = (
  args: MultiselectComponent,
) => ({
  props: {
    ...args,
    selectionUpdate: action('selectionUpdate'),
    control: new FormControl<FudisSelectOption<object> | null>(null),
    groupedMockData,
  },
  template: html`
    <fudis-multiselect
      [size]="size"
      [variant]="'dropdown'"
      [placeholder]="placeholder"
      [control]="control"
      [label]="label"
      [helpText]="helpText"
      [disabled]="disabled"
      [selectionClearButton]="selectionClearButton"
      (selectionUpdate)="selectionUpdate($event)"
    >
      <ng-template fudisContent type="select-options">
        <fudis-multiselect-group *ngFor="let group of groupedMockData" [label]="group.country">
          <fudis-multiselect-option
            *ngFor="let groupedOption of group.options"
            [data]="groupedOption"
          ></fudis-multiselect-option>
        </fudis-multiselect-group>
      </ng-template>
    </fudis-multiselect>
  `,
});

export const MultiselectDropdownWithGroupedOptions =
  MultiselectDropdownWithGroupedOptionsTemplate.bind({});
MultiselectDropdownWithGroupedOptions.args = {
  ...(commonArgs as Partial<MultiselectComponent>),
};
