import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgxFudisModule } from '../../../../ngx-fudis.module';
import { CommonModule } from '@angular/common';
import { FudisSelectOption } from '../../../../types/forms';
import { FudisValidators } from '../../../../utilities/form/validators';
import { defaultOptions, groupedMockData } from '../common/mock_data';

@Component({
  imports: [NgxFudisModule, CommonModule],
  selector: 'example-multiselect-showcase',
  template: `
    <fudis-form
      [title]="'Multiselect showcase'"
      [errorSummaryTitle]="'There are errors'"
      [level]="1"
      [titleVariant]="'xl'"
      [width]="'md'"
    >
      <fudis-form-header>
        <fudis-body-text
          >Following Multiselect components share all same Form Control. When you change value in
          one, all of them are updated.</fudis-body-text
        >
      </fudis-form-header>
      <fudis-form-actions>
        <fudis-button (handleClick)="onClick()" [label]="'Toggle Disabled State'"></fudis-button>
      </fudis-form-actions>
      <fudis-form-content>
        <fudis-grid [columns]="{ lg: 2 }" [classes]="'fudis-mt-sm'">
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
              [helpText]="
                'All pets are equally important, but for sake of this example please pick one.'
              "
              [selectionClearButton]="true"
              (selectionUpdate)="selectionUpdate.emit($event)"
            >
              <ng-template fudisSelectOptions>
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
              [helpText]="
                'All pets are equally important, but for sake of this example please pick one.'
              "
              [selectionClearButton]="false"
              (selectionUpdate)="selectionUpdate.emit($event)"
            >
              <ng-template fudisSelectOptions>
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
              [helpText]="
                'All pets are equally important, but for sake of this example please pick one.'
              "
              [selectionClearButton]="true"
              (selectionUpdate)="selectionUpdate.emit($event)"
            >
              <ng-template fudisSelectOptions>
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
              [helpText]="
                'All pets are equally important, but for sake of this example please pick one.'
              "
              [selectionClearButton]="false"
              (selectionUpdate)="selectionUpdate.emit($event)"
            >
              <ng-template fudisSelectOptions>
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
              [helpText]="
                'All pets are equally important, but for sake of this example please pick one.'
              "
              [selectionClearButton]="true"
              (selectionUpdate)="selectionUpdate.emit($event)"
            >
              <ng-template fudisSelectOptions>
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
              [helpText]="
                'All pets are equally important, but for sake of this example please pick one.'
              "
              [selectionClearButton]="false"
              (selectionUpdate)="selectionUpdate.emit($event)"
            >
              <ng-template fudisSelectOptions>
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
            <fudis-dl *ngIf="control.value">
              <fudis-dl-item *ngFor="let option of control.value; let index = index">
                <fudis-dt [contentText]="'Selected option ' + index"></fudis-dt>
                <fudis-dd>
                  <fudis-dl [variant]="'compact'">
                    <fudis-dl-item>
                      <fudis-dt [contentText]="'Value'"></fudis-dt>
                      <fudis-dd [contentText]="printControlValue(option.value)"></fudis-dd>
                    </fudis-dl-item>
                    <fudis-dl-item>
                      <fudis-dt [contentText]="'Label'"></fudis-dt>
                      <fudis-dd
                        [contentText]="option.label"
                      ></fudis-dd> </fudis-dl-item></fudis-dl></fudis-dd></fudis-dl-item></fudis-dl></fudis-grid-item></fudis-grid
      ></fudis-form-content>
    </fudis-form>
  `,
})
export class StorybookExampleMultiselectShowcaseComponent {
  @Output() selectionUpdate = new EventEmitter<FudisSelectOption<object>[] | null>();

  defaultOptions = defaultOptions;

  groupedMockData = groupedMockData;

  control: FormControl = new FormControl<FudisSelectOption<object>[] | null>(
    [defaultOptions[4], defaultOptions[1]],
    [FudisValidators.minLength(2, 'Pick at least two pets', true)],
  );

  printControlValue(value: object | string) {
    return typeof value === 'object' ? JSON.stringify(value) : value;
  }

  onClick() {
    if (!this.control.disabled) {
      this.control.disable();
    } else {
      this.control.enable();
    }
  }
}
