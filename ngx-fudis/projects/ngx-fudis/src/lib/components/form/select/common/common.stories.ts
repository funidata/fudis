import { Meta, applicationConfig, StoryFn } from '@storybook/angular';
import { FormControl } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { FudisGroupValidators } from '../../../../utilities/form/groupValidators';
import { SelectComponent } from '../select/select.component';
import readme from './readme.mdx';
import { groupedMockData, defaultOptions } from './mock_data';

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
      exclude: [
        'ariaLabel',
        'disabled',
        'id',
        'invalidState',
        '_id',
        '_required',
        '_requiredText',
        '_translations',
        'ngOnInit',
        'ngOnChanges',
        'onBlur',
      ],
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

const SelectWithAutocompleteTemplate: StoryFn<SelectComponent> = (args: SelectComponent) => ({
  props: {
    ...args,
    defaultOptions,
    control: new FormControl(
      [defaultOptions[2]],
      FudisGroupValidators.min({ value: 4, message: 'KÄÄÄK VALITSE NELJÄ' }),
    ),
    groupedMockData,
  },
  template: html`
    <fudis-select
      [size]="size"
      [autocomplete]="true"
      [placeholder]="placeholder"
      [control]="control"
      [label]="label"
      [helpText]="helpText"
    >
      <ng-template fudisContent type="select-options">
        <fudis-select-option *ngFor="let option of defaultOptions" [data]="option" />
        <fudis-select-group *ngFor="let group of groupedMockData" [label]="group.country">
          <fudis-select-option *ngFor="let groupedOption of group.options" [data]="groupedOption" />
        </fudis-select-group>
      </ng-template>
    </fudis-select>
  `,
});

export const SelectWithAutocomplete = SelectWithAutocompleteTemplate.bind({});
SelectWithAutocomplete.args = {
  label: 'Select a pet',
  size: 'lg',
  placeholder: 'Choose a pet',
  helpText: 'All pets are equally important, but for sake of this example please pick one.',
};
