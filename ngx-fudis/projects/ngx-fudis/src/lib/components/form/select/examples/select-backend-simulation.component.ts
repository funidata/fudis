import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgxFudisModule } from '../../../../ngx-fudis.module';
import { CommonModule } from '@angular/common';
import { FudisSelectOption } from '../../../../types/forms';
import { FudisValidators } from '../../../../utilities/form/validators';
import { StorybookExampleBackendSimulationBaseDirective } from './backend-simulation-base.directive';

@Component({
  standalone: true,
  imports: [NgxFudisModule, CommonModule],
  selector: 'example-select-backend-simulation',
  template: `
    <fudis-body-text
      >This example Select component has property <code>autocompleteFilter</code> set false and
      filtering is done outside of Select with a delay to simulate fetching options from the
      backend.</fudis-body-text
    >
    <fudis-body-text>It will limit its search for only 10 results. </fudis-body-text>
    <fudis-body-text
      >Number of options from 'database' checked: {{ databaseCounter }}</fudis-body-text
    >
    <fudis-body-text>Filtering status: {{ filterStatus }}</fudis-body-text>
    <fudis-body-text
      >Number of options loaded to DOM: {{ (searchResults | async)?.length }}</fudis-body-text
    >
    <fudis-select
      class="fudis-mt-md"
      [size]="'lg'"
      [variant]="'autocompleteType'"
      [placeholder]="placeholder"
      [control]="control"
      [label]="label"
      [helpText]="helpText"
      [autocompleteNoResultsText]="autocompleteNoResultsText"
      [autocompleteFilter]="false"
      [selectionClearButton]="true"
      (selectionUpdate)="selectionUpdate.emit($event)"
      (filterTextUpdate)="searchTextUpdateSubject.next($event)"
    >
      <ng-template fudisContent type="select-options">
        @if (searchResults | async; as options) {
          <fudis-select-option *ngFor="let option of options" [data]="option"></fudis-select-option>
        }</ng-template
    ></fudis-select>
  `,
})
export class StorybookExampleSelectBackendSimulationComponent extends StorybookExampleBackendSimulationBaseDirective {
  @Output() selectionUpdate = new EventEmitter<FudisSelectOption<object> | null>();

  control: FormControl = new FormControl<FudisSelectOption<object> | null>(null, [
    FudisValidators.required('You must choose a pet!'),
  ]);
}
