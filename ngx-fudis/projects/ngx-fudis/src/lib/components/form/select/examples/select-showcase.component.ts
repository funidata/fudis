import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgxFudisModule } from '../../../../ngx-fudis.module';
import { CommonModule } from '@angular/common';
import { FudisSelectOption } from '../../../../types/forms';
import { FudisValidators } from '../../../../utilities/form/validators';
import { defaultOptions, groupedMockData } from '../common/mock_data';

@Component({
  standalone: true,
  imports: [NgxFudisModule, CommonModule],
  selector: 'example-select-showcase',
  template: `
    <fudis-form
      class="fudis-mb-xxl"
      [errorSummaryHelpText]="'There are errors'"
      [title]="'Select showcase'"
      [level]="1"
      [width]="'md'"
    >
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
        <fudis-grid [columns]="{ lg: 2 }" [classes]="'fudis-mt-sm'">
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
              [helpText]="
                'All pets are equally important, but for sake of this example please pick one.'
              "
              [selectionClearButton]="true"
              (selectionUpdate)="selectionUpdate.emit($event)"
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
              [helpText]="
                'All pets are equally important, but for sake of this example please pick one.'
              "
              [selectionClearButton]="false"
              (selectionUpdate)="selectionUpdate.emit($event)"
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
              [helpText]="
                'All pets are equally important, but for sake of this example please pick one.'
              "
              [selectionClearButton]="true"
              (selectionUpdate)="selectionUpdate.emit($event)"
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
              [helpText]="
                'All pets are equally important, but for sake of this example please pick one.'
              "
              [selectionClearButton]="false"
              (selectionUpdate)="selectionUpdate.emit($event)"
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
              [helpText]="
                'All pets are equally important, but for sake of this example please pick one.'
              "
              [selectionClearButton]="true"
              (selectionUpdate)="selectionUpdate.emit($event)"
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
              [helpText]="
                'All pets are equally important, but for sake of this example please pick one.'
              "
              [selectionClearButton]="false"
              (selectionUpdate)="selectionUpdate.emit($event)"
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
            <fudis-dl *ngIf="control.value" [variant]="'compact'">
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
})
export class StorybookExampleSelectShowcaseComponent {
  constructor() {}

  @Output() selectionUpdate = new EventEmitter<FudisSelectOption<object> | null>();

  defaultOptions = defaultOptions;

  groupedMockData = groupedMockData;

  control: FormControl = new FormControl<FudisSelectOption<object> | null>(defaultOptions[2], [
    FudisValidators.required('You must choose a pet!'),
  ]);

  onClick() {
    if (!this.control.disabled) {
      this.control.disable();
    } else {
      this.control.enable();
    }
  }
}
