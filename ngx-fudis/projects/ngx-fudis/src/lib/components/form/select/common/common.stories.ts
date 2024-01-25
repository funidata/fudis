import { Meta, applicationConfig, StoryFn } from '@storybook/angular';
import { FormControl } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { FudisGroupValidators } from '../../../../utilities/form/groupValidators';
import { SelectComponent } from '../select/select.component';
import { MultiselectComponent } from '../multiselect/multiselect.component';
import readme from './readme.mdx';
import { groupedMockData, defaultOptions } from './mock_data';
import { FudisSelectOption } from 'dist/ngx-fudis/lib/types/forms';

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
      exclude: [],
    },
  },
  argTypes: {
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'radio' },
    },
  },
} as Meta;

const html = String.raw;

const SelectAutocompleteTemplate: StoryFn<SelectComponent> = (args: SelectComponent) => ({
  props: {
    ...args,
    defaultOptions,
    control: new FormControl<FudisSelectOption | null>(defaultOptions[2]),
    groupedMockData,
  },
  template: html`
    <fudis-select
      [size]="size"
      [placeholder]="placeholder"
      [control]="control"
      [label]="label"
      [helpText]="helpText"
      [autocomplete]="true"
      [autocompleteClearButton]="autocompleteClearButton"
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

export const SelectAutocomplete = SelectAutocompleteTemplate.bind({});
SelectAutocomplete.args = {
  autocompleteClearButton: true,
  label: 'Select a pet',
  size: 'lg',
  placeholder: 'Choose a pet',
  helpText: 'All pets are equally important, but for sake of this example please pick one.',
};

export const SelectAutocompleteClearButtonFalse = SelectAutocompleteTemplate.bind({});

SelectAutocompleteClearButtonFalse.args = {
  autocompleteClearButton: false,
  label: 'Select a pet',
  size: 'lg',
  placeholder: 'Choose a pet',
  helpText: 'All pets are equally important, but for sake of this example please pick one.',
};

const MultiselectAutocompleteTemplate: StoryFn<MultiselectComponent> = (
  args: MultiselectComponent,
) => ({
  props: {
    ...args,
    defaultOptions,
    control: new FormControl<FudisSelectOption[] | null>(
      [defaultOptions[2]],
      FudisGroupValidators.min({ value: 4, message: 'KÄÄÄK VALITSE NELJÄ' }),
    ),
    groupedMockData,
  },
  template: html`
    <fudis-multiselect
      [size]="size"
      [autocomplete]="true"
      [placeholder]="placeholder"
      [control]="control"
      [label]="label"
      [helpText]="helpText"
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

export const MultiselectAutocomplete = MultiselectAutocompleteTemplate.bind({});
MultiselectAutocomplete.args = {
  label: 'Select a pet',
  size: 'lg',
  placeholder: 'Choose a pet',
  helpText: 'All pets are equally important, but for sake of this example please pick one.',
};

// <fudis-select-group *ngFor="let group of groupedMockData" [label]="group.country">
//           <fudis-select-option
//             *ngFor="let groupedOption of group.options"
//             [data]="groupedOption"
//           ></fudis-select-option>
//         </fudis-select-group>
