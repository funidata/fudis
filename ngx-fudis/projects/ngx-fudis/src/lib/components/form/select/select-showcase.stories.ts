import { Meta, applicationConfig, StoryFn } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { FormControl } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { SelectComponent } from './select/select.component';
import readme from './select-index.mdx';
import { groupedMockData, defaultOptions } from './common/mock_data';
import { FudisSelectOption } from '../../../types/forms';
import { excludeAllRegex, selectCommonExclude } from '../../../utilities/storybook';

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
      exclude: selectCommonExclude,
    },
  },
} as Meta;

const html = String.raw;

const SelectShowcaseTemplate: StoryFn<SelectComponent> = (args: SelectComponent) => ({
  props: {
    ...args,
    defaultOptions,
    selectionUpdate: action('selectionUpdate'),
    control: new FormControl<FudisSelectOption<object> | null>(defaultOptions[2]),
    groupedMockData,
  },
  template: html`
    <fudis-section [title]="'Select showcase'" [titleLevel]="1" [width]="'md'">
      <ng-template fudisNotifications type="section">
        <fudis-body-text
          >Following Select components share all same Form Control. When you change value in one,
          all of them are updated.</fudis-body-text
        >
      </ng-template>
      <ng-template fudisContent type="section">
        <fudis-grid [columns]="{lg: 2}" [marginTop]="'sm'">
          <fudis-grid-item>
            <fudis-heading [level]="2" [size]="'md'"
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
            ><fudis-heading [level]="2" [size]="'md'"
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
            ><fudis-heading [level]="2" [size]="'md'"
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
            ><fudis-heading [level]="2" [size]="'md'"
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
            ><fudis-heading [level]="2" [size]="'md'"
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
            ><fudis-heading [level]="2" [size]="'md'"
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
                </fudis-select-group> </ng-template></fudis-select></fudis-grid-item></fudis-grid
      ></ng-template>
    </fudis-section>
  `,
});

export const SelectShowcase = SelectShowcaseTemplate.bind({});

SelectShowcase.parameters = {
  controls: {
    exclude: excludeAllRegex,
  },
};

const MultiselectShowcaseTemplate: StoryFn<SelectComponent> = (args: SelectComponent) => ({
  props: {
    ...args,
    defaultOptions,
    selectionUpdate: action('selectionUpdate'),
    control: new FormControl<FudisSelectOption<object>[] | null>([
      defaultOptions[4],
      defaultOptions[1],
    ]),
    //control: new FormControl<FudisSelectOption<object>[] | null>(null),
    groupedMockData,
  },
  template: html`
    <fudis-section [title]="'Multiselect showcase'" [titleLevel]="1" [width]="'md'">
      <ng-template fudisNotifications type="section">
        <fudis-body-text
          >Following Multiselect components share all same Form Control</fudis-body-text
        >
      </ng-template>
      <ng-template fudisContent type="section">
        <fudis-grid [columns]="{lg: 2}" [marginTop]="'sm'">
          <fudis-grid-item>
            <fudis-heading [level]="2" [size]="'md'"
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
            ><fudis-heading [level]="2" [size]="'md'"
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
            ><fudis-heading [level]="2" [size]="'md'"
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
            ><fudis-heading [level]="2" [size]="'md'"
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
            ><fudis-heading [level]="2" [size]="'md'"
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
            ><fudis-heading [level]="2" [size]="'md'"
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
                </fudis-multiselect-group> </ng-template></fudis-multiselect></fudis-grid-item></fudis-grid
      ></ng-template>
    </fudis-section>
  `,
});

export const MultiselectShowcase = MultiselectShowcaseTemplate.bind({});

MultiselectShowcase.parameters = {
  controls: {
    exclude: excludeAllRegex,
  },
};
