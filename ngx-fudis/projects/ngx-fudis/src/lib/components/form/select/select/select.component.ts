import {
  AfterViewInit,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
  DOCUMENT,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { areObjectsDeepEquals } from '../../../../utilities/areObjectsDeepEquals';
import { FudisFocusService } from '../../../../services/focus/focus.service';
import { FudisIdService } from '../../../../services/id/id.service';
import { SelectBaseDirective } from '../common/select-base/select-base.directive';
import { FudisSelectOption } from '../../../../types/forms';
import { SelectControlValueAccessorDirective } from '../common/select-control-value-accessor/select-control-value-accessor.directive';
import { BaseSelectableComponent } from '../common/interfaces/base-selectable.interface';
import { FudisDialogService } from '../../../../services/dialog/dialog.service';
import { LabelComponent } from '../../label/label.component';
import { SelectAutocompleteDirective } from '../common/autocomplete/autocomplete.directive';
import { SelectIconsComponent } from '../common/select-icons/select-icons.component';
import { SelectDropdownComponent } from '../common/select-dropdown/select-dropdown.component';
import { NgTemplateOutlet, AsyncPipe } from '@angular/common';
import { GuidanceComponent } from '../../guidance/guidance.component';

/**
 * Allows selection of a single option from a dropdown list.
 *
 * Use this component when there are multiple predefined options and user can choose only one value.
 * The FormControl value is a `FudisSelectOption` object (not a primitive). Options are projected
 * via `<ng-template fudisSelectOptions>` containing `<fudis-select-option>` elements.
 *
 * Option data should be treated as immutable. If application needs to update option labels
 * dynamically, for example after a language change, provide a new options array with new
 * `FudisSelectOption` object references instead of mutating existing option objects in place.
 * Replacing option objects allows the component to update the selected label and option views
 * correctly.
 *
 * @example
 *   ```html
 *   <fudis-select [label]="'Country'" [control]="countryControl">
 *     <ng-template fudisSelectOptions>
 *       <fudis-select-option [data]="{ value: 'fi', label: 'Finland' }"></fudis-select-option>
 *       <fudis-select-option [data]="{ value: 'se', label: 'Sweden' }"></fudis-select-option>
 *     </ng-template>
 *   </fudis-select>
 *   ```;
 */
@Component({
  selector: 'fudis-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [
    LabelComponent,
    FormsModule,
    SelectControlValueAccessorDirective,
    SelectAutocompleteDirective,
    ReactiveFormsModule,
    SelectIconsComponent,
    SelectDropdownComponent,
    NgTemplateOutlet,
    GuidanceComponent,
    AsyncPipe,
  ],
})
export class SelectComponent<T = string>
  extends SelectBaseDirective
  implements OnInit, AfterViewInit, BaseSelectableComponent
{
  constructor(
    @Inject(DOCUMENT) _document: Document,
    _dialogService: FudisDialogService,
    _idService: FudisIdService,
    _focusService: FudisFocusService,
  ) {
    super(_document, _dialogService, _focusService, _idService);
  }

  @ViewChild(SelectControlValueAccessorDirective)
  public selectCVA: SelectControlValueAccessorDirective<T>;

  /**
   * FormControl for single select
   */
  @Input({ required: true }) override control: FormControl<FudisSelectOption<T> | null>;

  /**
   * Value output event on selection change
   */
  @Output() override selectionUpdate: EventEmitter<FudisSelectOption<T> | null> =
    new EventEmitter<FudisSelectOption<T> | null>();

  ngOnInit(): void {
    this._setParentId('select');
  }

  /**
   * Handler for triggered option selection change
   *
   * @param value Option to be selected
   * @param disableSignalEmit Disable signal update to reduce unneeded state updates
   */
  public handleSelectionChange(value: FudisSelectOption<T> | null): void {
    // Check if option clicked is not the same as already selected one. If they are different, then trigger state changes in component and control values
    const equalValues = areObjectsDeepEquals(value, this.control.value!);

    if (!equalValues) {
      this.control.patchValue(value);
      this.selectionUpdate.emit(value);
    }
  }

  /**
   * Checks if currently typed filter text is not same as control label value
   *
   * @param text Filter text value emitted from autocomplete
   */
  protected override _checkIfAutocompleteValueNull(text: string): void {
    if (this.control.value && text.toLowerCase() !== this.control.value?.label?.toLowerCase()) {
      this.selectionUpdate.emit(null);
      this.control.patchValue(null);
    }
  }

  /**
   * If control value is updated from the Application, update component's state accordingly
   */
  protected override _updateComponentStateFromControlValue(): void {
    const currentLabel = this.control.value?.label;
    if (this.variant !== 'dropdown') {
      if (currentLabel) {
        this.setAutocompleteFilterText(currentLabel);
      } else if (!this._inputFocused) {
        this.setAutocompleteFilterText('');
      }
    }
  }
}
