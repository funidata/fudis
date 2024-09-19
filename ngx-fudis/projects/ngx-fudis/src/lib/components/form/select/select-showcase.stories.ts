import { Meta, applicationConfig, StoryFn } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { FormControl } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { SelectComponent } from './select/select.component';
import readme from './select-index.mdx';
import { groupedMockData, defaultOptions } from './common/mock_data';
import { FudisSelectOption } from '../../../types/forms';
import { excludeAllRegex, selectStoryControlExclude } from '../../../utilities/storybook';
import { FudisValidators } from '../../../utilities/form/validators';

export default {
  title: 'Components/Form/Select',
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
} as Meta;

const html = String.raw;

const commonControl = new FormControl<FudisSelectOption<object> | null>(defaultOptions[2], [
  FudisValidators.required('You must choose a pet!'),
]);

const SelectShowcaseTemplate: StoryFn<SelectComponent> = (args: SelectComponent) => ({
  props: {
    ...args,
    defaultOptions,
    selectionUpdate: action('selectionUpdate'),
    control: commonControl,
    onClick: () => {
      if (!commonControl.disabled) {
        commonControl.disable();
      } else {
        commonControl.enable();
      }
    },
    groupedMockData,
  },
  template: html`
    <fudis-form class="fudis-mb-xxl" [title]="'Select showcase'" [level]="1" [width]="'md'">
      <ng-template fudisHeader type="form">
        <fudis-body-text
          >Following Select components share all same Form Control. When you change value in one,
          all of them are updated.</fudis-body-text
        >
      </ng-template>
      <ng-template fudisActions type="form">
        <fudis-button (handleClick)="onClick()" [label]="'Toggle Disabled State'"></fudis-button>
      </ng-template>
      <ng-template fudisContent type="form">
        <fudis-grid [columns]="{lg: 2}" [classes]="['fudis-mt-sm']">
          <fudis-grid-item>
            <fudis-heading [level]="2" [variant]="'md'"
              >Single-select Dropdown with Clear Button</fudis-heading
            >
            <fudis-select
              [size]="'lg'"
              [variant]="'dropdown'"
              [placeholder]="'Choose a pet'"
              [control]="control"
              [label]="'Select a pet'"
              [helpText]="'All pets are equally important, but for sake of this example please pick one.'"
              [selectionClearButton]="true"
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
                </fudis-select-group> </ng-template></fudis-select
          ></fudis-grid-item>
          <fudis-grid-item
            ><fudis-heading [level]="2" [variant]="'md'"
              >Single-select Dropdown without Clear button</fudis-heading
            >
            <fudis-select
              [size]="'lg'"
              [variant]="'dropdown'"
              [placeholder]="'Choose a pet'"
              [control]="control"
              [label]="'Select a pet'"
              [helpText]="'All pets are equally important, but for sake of this example please pick one.'"
              [selectionClearButton]="false"
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
                </fudis-select-group> </ng-template></fudis-select
          ></fudis-grid-item>

          <fudis-grid-item
            ><fudis-heading [level]="2" [variant]="'md'"
              >Single-select Autocomplete Dropdown with Clear button</fudis-heading
            >
            <fudis-select
              [size]="'lg'"
              [variant]="'autocompleteDropdown'"
              [placeholder]="'Choose a pet'"
              [control]="control"
              [label]="'Select a pet'"
              [helpText]="'All pets are equally important, but for sake of this example please pick one.'"
              [selectionClearButton]="true"
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
                </fudis-select-group> </ng-template></fudis-select
          ></fudis-grid-item>

          <fudis-grid-item
            ><fudis-heading [level]="2" [variant]="'md'"
              >Single-select Autocomplete Dropdown without Clear button</fudis-heading
            >
            <fudis-select
              [size]="'lg'"
              [variant]="'autocompleteDropdown'"
              [placeholder]="'Choose a pet'"
              [control]="control"
              [label]="'Select a pet'"
              [helpText]="'All pets are equally important, but for sake of this example please pick one.'"
              [selectionClearButton]="false"
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
                </fudis-select-group> </ng-template></fudis-select
          ></fudis-grid-item>
          <fudis-grid-item
            ><fudis-heading [level]="2" [variant]="'md'"
              >Single-select Autocomplete Type with Clear button</fudis-heading
            >
            <fudis-select
              [size]="'lg'"
              [variant]="'autocompleteType'"
              [placeholder]="'Choose a pet'"
              [control]="control"
              [label]="'Select a pet'"
              [helpText]="'All pets are equally important, but for sake of this example please pick one.'"
              [selectionClearButton]="true"
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
                </fudis-select-group> </ng-template></fudis-select
          ></fudis-grid-item>

          <fudis-grid-item
            ><fudis-heading [level]="2" [variant]="'md'"
              >Single-select Autocomplete Type without Clear button</fudis-heading
            >
            <fudis-select
              [size]="'lg'"
              [variant]="'autocompleteType'"
              [placeholder]="'Choose a pet'"
              [control]="control"
              [label]="'Select a pet'"
              [helpText]="'All pets are equally important, but for sake of this example please pick one.'"
              [selectionClearButton]="false"
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
                </fudis-select-group> </ng-template></fudis-select
          ></fudis-grid-item>

          <fudis-grid-item [columns]="'stretch'">
            <fudis-heading [level]="3" [variant]="'md'">Current control value</fudis-heading>
            <ng-container *ngIf="!control.value">
              <fudis-body-text [variant]="'lg-regular'"
                >Control value: null.</fudis-body-text
              ></ng-container
            >
            <fudis-dl
              *ngIf="control.value"
              [variant]="'compact'"
              [classes]="['fudis-mt-none fudis-mb-none']"
            >
              <fudis-dl-item>
                <fudis-dt [contentText]="'Value'"></fudis-dt>
                <fudis-dd [contentText]="control.value.value"></fudis-dd>
              </fudis-dl-item>
              <fudis-dl-item>
                <fudis-dt [contentText]="'Label'"></fudis-dt>
                <fudis-dd [contentText]="control.value.label"></fudis-dd>
              </fudis-dl-item>
            </fudis-dl> </fudis-grid-item></fudis-grid
      ></ng-template>
    </fudis-form>
  `,
});

export const SelectShowcase = SelectShowcaseTemplate.bind({});

SelectShowcase.parameters = {
  controls: {
    exclude: excludeAllRegex,
  },
};

const commonMultiselectControl = new FormControl<FudisSelectOption<object>[] | null>(
  [defaultOptions[4], defaultOptions[1]],
  [FudisValidators.minLength(2, 'Pick at least two pets', true)],
);

const MultiselectShowcaseTemplate: StoryFn<SelectComponent> = (args: SelectComponent) => ({
  props: {
    ...args,
    defaultOptions,
    selectionUpdate: action('selectionUpdate'),
    control: commonMultiselectControl,
    onClick: () => {
      if (!commonMultiselectControl.disabled) {
        commonMultiselectControl.disable();
      } else {
        commonMultiselectControl.enable();
      }
    },
    groupedMockData,
  },
  template: html`
    <fudis-form [title]="'Multiselect showcase'" [level]="1" [width]="'md'">
      <ng-template fudisHeader type="form">
        <fudis-body-text
          >Following Multiselect components share all same Form Control. When you change value in
          one, all of them are updated.</fudis-body-text
        >
      </ng-template>
      <ng-template fudisActions type="form">
        <fudis-button (handleClick)="onClick()" [label]="'Toggle Disabled State'"></fudis-button>
      </ng-template>
      <ng-template fudisContent type="form">
        <fudis-grid [columns]="{lg: 2}" [classes]="['fudis-mt-sm']">
          <fudis-grid-item>
            <fudis-heading [level]="2" [variant]="'md'"
              >Multiselect Dropdown with Clear Button</fudis-heading
            >
            <fudis-multiselect
              [size]="'lg'"
              [variant]="'dropdown'"
              [placeholder]="'Choose a pet'"
              [control]="control"
              [label]="'Select a pet'"
              [helpText]="'All pets are equally important, but for sake of this example please pick one.'"
              [selectionClearButton]="true"
              (selectionUpdate)="selectionUpdate($event)"
            >
              <ng-template fudisContent type="select-options">
                <fudis-multiselect-option
                  *ngFor="let option of defaultOptions"
                  [data]="option"
                ></fudis-multiselect-option>
                <fudis-multiselect-group
                  *ngFor="let group of groupedMockData"
                  [label]="group.country"
                >
                  <fudis-multiselect-option
                    *ngFor="let groupedOption of group.options"
                    [data]="groupedOption"
                  ></fudis-multiselect-option>
                </fudis-multiselect-group> </ng-template></fudis-multiselect
          ></fudis-grid-item>
          <fudis-grid-item
            ><fudis-heading [level]="2" [variant]="'md'"
              >Multiselect Dropdown without Clear button</fudis-heading
            >
            <fudis-multiselect
              [size]="'lg'"
              [variant]="'dropdown'"
              [placeholder]="'Choose a pet'"
              [control]="control"
              [label]="'Select a pet'"
              [helpText]="'All pets are equally important, but for sake of this example please pick one.'"
              [selectionClearButton]="false"
              (selectionUpdate)="selectionUpdate($event)"
            >
              <ng-template fudisContent type="select-options">
                <fudis-multiselect-option
                  *ngFor="let option of defaultOptions"
                  [data]="option"
                ></fudis-multiselect-option>
                <fudis-multiselect-group
                  *ngFor="let group of groupedMockData"
                  [label]="group.country"
                >
                  <fudis-multiselect-option
                    *ngFor="let groupedOption of group.options"
                    [data]="groupedOption"
                  ></fudis-multiselect-option>
                </fudis-multiselect-group> </ng-template></fudis-multiselect
          ></fudis-grid-item>

          <fudis-grid-item
            ><fudis-heading [level]="2" [variant]="'md'"
              >Multiselect Autocomplete Dropdown with Clear button</fudis-heading
            >
            <fudis-multiselect
              [size]="'lg'"
              [variant]="'autocompleteDropdown'"
              [placeholder]="'Choose a pet'"
              [control]="control"
              [label]="'Select a pet'"
              [helpText]="'All pets are equally important, but for sake of this example please pick one.'"
              [selectionClearButton]="true"
              (selectionUpdate)="selectionUpdate($event)"
            >
              <ng-template fudisContent type="select-options">
                <fudis-multiselect-option
                  *ngFor="let option of defaultOptions"
                  [data]="option"
                ></fudis-multiselect-option>
                <fudis-multiselect-group
                  *ngFor="let group of groupedMockData"
                  [label]="group.country"
                >
                  <fudis-multiselect-option
                    *ngFor="let groupedOption of group.options"
                    [data]="groupedOption"
                  ></fudis-multiselect-option>
                </fudis-multiselect-group> </ng-template></fudis-multiselect
          ></fudis-grid-item>

          <fudis-grid-item
            ><fudis-heading [level]="2" [variant]="'md'"
              >Multiselect Autocomplete Dropdown without Clear button</fudis-heading
            >
            <fudis-multiselect
              [size]="'lg'"
              [variant]="'autocompleteDropdown'"
              [placeholder]="'Choose a pet'"
              [control]="control"
              [label]="'Select a pet'"
              [helpText]="'All pets are equally important, but for sake of this example please pick one.'"
              [selectionClearButton]="false"
              (selectionUpdate)="selectionUpdate($event)"
            >
              <ng-template fudisContent type="select-options">
                <fudis-multiselect-option
                  *ngFor="let option of defaultOptions"
                  [data]="option"
                ></fudis-multiselect-option>
                <fudis-multiselect-group
                  *ngFor="let group of groupedMockData"
                  [label]="group.country"
                >
                  <fudis-multiselect-option
                    *ngFor="let groupedOption of group.options"
                    [data]="groupedOption"
                  ></fudis-multiselect-option>
                </fudis-multiselect-group> </ng-template></fudis-multiselect
          ></fudis-grid-item>
          <fudis-grid-item
            ><fudis-heading [level]="2" [variant]="'md'"
              >Multiselect Autocomplete Type with Clear button</fudis-heading
            >
            <fudis-multiselect
              [size]="'lg'"
              [variant]="'autocompleteType'"
              [placeholder]="'Choose a pet'"
              [control]="control"
              [label]="'Select a pet'"
              [helpText]="'All pets are equally important, but for sake of this example please pick one.'"
              [selectionClearButton]="true"
              (selectionUpdate)="selectionUpdate($event)"
            >
              <ng-template fudisContent type="select-options">
                <fudis-multiselect-option
                  *ngFor="let option of defaultOptions"
                  [data]="option"
                ></fudis-multiselect-option>
                <fudis-multiselect-group
                  *ngFor="let group of groupedMockData"
                  [label]="group.country"
                >
                  <fudis-multiselect-option
                    *ngFor="let groupedOption of group.options"
                    [data]="groupedOption"
                  ></fudis-multiselect-option>
                </fudis-multiselect-group> </ng-template></fudis-multiselect
          ></fudis-grid-item>

          <fudis-grid-item
            ><fudis-heading [level]="2" [variant]="'md'"
              >Multiselect Autocomplete Type without Clear button</fudis-heading
            >
            <fudis-multiselect
              [size]="'lg'"
              [variant]="'autocompleteType'"
              [placeholder]="'Choose a pet'"
              [control]="control"
              [label]="'Select a pet'"
              [helpText]="'All pets are equally important, but for sake of this example please pick one.'"
              [selectionClearButton]="false"
              (selectionUpdate)="selectionUpdate($event)"
            >
              <ng-template fudisContent type="select-options">
                <fudis-multiselect-option
                  *ngFor="let option of defaultOptions"
                  [data]="option"
                ></fudis-multiselect-option>
                <fudis-multiselect-group
                  *ngFor="let group of groupedMockData"
                  [label]="group.country"
                >
                  <fudis-multiselect-option
                    *ngFor="let groupedOption of group.options"
                    [data]="groupedOption"
                  ></fudis-multiselect-option>
                </fudis-multiselect-group> </ng-template></fudis-multiselect
          ></fudis-grid-item>
          <fudis-grid-item [columns]="'stretch'">
            <fudis-heading [level]="3" [variant]="'md'">Current control value</fudis-heading>
            <ng-container *ngIf="!control.value">
              <fudis-body-text [variant]="'lg-regular'"
                >Control value: null.</fudis-body-text
              ></ng-container
            >
            <fudis-dl *ngIf="control.value" [classes]="['fudis-mt-none fudis-mb-none']">
              <fudis-dl-item *ngFor="let option of control.value; let index = index">
                <fudis-dt [contentText]="'Selected option ' + index"></fudis-dt>
                <fudis-dd>
                  <fudis-dl [variant]="'compact'" [classes]="['fudis-mt-none fudis-mb-none']">
                    <fudis-dl-item>
                      <fudis-dt [contentText]="'Value'"></fudis-dt>
                      <fudis-dd [contentText]="option.value"></fudis-dd>
                    </fudis-dl-item>
                    <fudis-dl-item>
                      <fudis-dt [contentText]="'Label'"></fudis-dt>
                      <fudis-dd
                        [contentText]="option.label"
                      ></fudis-dd> </fudis-dl-item></fudis-dl></fudis-dd></fudis-dl-item></fudis-dl></fudis-grid-item></fudis-grid
      ></ng-template>
    </fudis-form>
  `,
});

export const MultiselectShowcase = MultiselectShowcaseTemplate.bind({});

MultiselectShowcase.parameters = {
  controls: {
    exclude: excludeAllRegex,
  },
};
