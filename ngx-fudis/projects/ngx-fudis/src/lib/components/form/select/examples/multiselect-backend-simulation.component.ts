import { Component, EventEmitter, Output } from '@angular/core';
import { NgxFudisModule } from '../../../../ngx-fudis.module';
import { CommonModule } from '@angular/common';
import { StorybookExampleBackendSimulationBaseDirective } from './backend-simulation-base.directive';
import { FudisSelectOption } from '../../../../types/forms';
import { FormControl } from '@angular/forms';
import { FudisValidators } from '../../../../utilities/form/validators';

@Component({
  standalone: true,
  imports: [NgxFudisModule, CommonModule],
  selector: 'example-multiselect-backend-simulation',
  template: `
    <fudis-body-text
      >This example Multiselect component has property <code>autocompleteFilter</code> set false and
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
    <fudis-multiselect
      class="fudis-mt-md"
      [size]="'lg'"
      [variant]="'autocompleteType'"
      [control]="control"
      [placeholder]="placeholder"
      [control]="control"
      [label]="label"
      [helpText]="helpText"
      [autocompleteFilter]="false"
      [autocompleteNoResultsText]="autocompleteNoResultsText"
      [selectionClearButton]="true"
      (selectionUpdate)="selectionUpdate.emit($event)"
      (filterTextUpdate)="searchTextUpdateSubject.next($event)"
    >
      <ng-template fudisSelectOptions>
        @if (searchResults | async; as options) {
          <fudis-multiselect-option
            *ngFor="let option of options"
            [data]="option"
          ></fudis-multiselect-option>
        }</ng-template
    ></fudis-multiselect>
  `,
})
export class StorybookExampleMultiselectBackendSimulationComponent extends StorybookExampleBackendSimulationBaseDirective {
  @Output() selectionUpdate = new EventEmitter<FudisSelectOption<object>[] | null>();

  override control: FormControl = new FormControl<FudisSelectOption<object>[] | null>(null, [
    FudisValidators.required('You must choose a movie!'),
  ]);
}
