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
} from '@angular/core';

import { FormControl } from '@angular/forms';
import { areObjectsDeepEquals } from '../../../../utilities/areObjectsDeepEquals';
import { FudisFocusService } from '../../../../services/focus/focus.service';
import { FudisIdService } from '../../../../services/id/id.service';
import { SelectBaseDirective } from '../common/select-base/select-base.directive';
import { FudisSelectOption } from '../../../../types/forms';
import { DOCUMENT } from '@angular/common';
import { SelectControlValueAccessorDirective } from '../common/select-control-value-accessor/select-control-value-accessor.directive';
import { BaseSelectableComponent } from '../common/interfaces/base-selectable.interface';

@Component({
  selector: 'fudis-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: false,
})
export class SelectComponent
  extends SelectBaseDirective
  implements OnInit, AfterViewInit, BaseSelectableComponent
{
  constructor(
    @Inject(DOCUMENT) _document: Document,
    _idService: FudisIdService,
    _focusService: FudisFocusService,
  ) {
    super(_document, _focusService, _idService);
  }

  @ViewChild(SelectControlValueAccessorDirective)
  public selectCVA: SelectControlValueAccessorDirective;

  /*
   * FormControl for single select
   */
  @Input({ required: true }) override control: FormControl<FudisSelectOption<object> | null>;

  /**
   * Value output event on selection change
   */
  @Output() override selectionUpdate: EventEmitter<FudisSelectOption<object> | null> =
    new EventEmitter<FudisSelectOption<object> | null>();

  ngOnInit(): void {
    this._setParentId('select');
  }

  /**
   * Handler for triggered option selection change
   *
   * @param value Option to be selected
   * @param disableSignalEmit Disable signal update to reduce unneeded state updates
   */
  public handleSelectionChange(value: FudisSelectOption<object> | null): void {
    // Check if option clicked is not the same as already selected one. If they are different, then trigger state changes in component and control values
    const equalValues = areObjectsDeepEquals(value, this.control.value!);

    if (!equalValues) {
      this.control.patchValue(value);
      this.selectionUpdate.emit(value);
    }
  }

  /**
   * Create hashed option id for Select active descendant
   */
  protected activeDescendant = FudisIdService.createSelectOptionId;

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
