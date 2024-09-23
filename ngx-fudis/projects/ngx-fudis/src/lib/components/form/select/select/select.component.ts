import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Host,
  Inject,
  Input,
  OnInit,
  Optional,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { areObjectsDeepEquals } from '../../../../utilities/areObjectsDeepEquals';
import { FudisTranslationService } from '../../../../services/translation/translation.service';
import { FudisFocusService } from '../../../../services/focus/focus.service';
import { FudisIdService } from '../../../../services/id/id.service';
import { SelectBaseDirective } from '../common/select-base/select-base.directive';
import { FudisSelectOption } from '../../../../types/forms';
import { FormComponent } from '../../form/form.component';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'fudis-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SelectComponent extends SelectBaseDirective implements OnInit {
  constructor(
    @Host() @Optional() protected _parentForm: FormComponent | null,
    @Inject(DOCUMENT) _document: Document,
    _idService: FudisIdService,
    _translationService: FudisTranslationService,
    _focusService: FudisFocusService,
    _changeDetectorRef: ChangeDetectorRef,
  ) {
    super(_document, _translationService, _focusService, _idService, _changeDetectorRef);
  }

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

    this._triggerErrorSummaryOnInitReload(
      this._parentForm?.errorSummaryVisible,
      this.control.invalid,
    );
  }

  /**
   * Handler for triggered option selection change
   * @param value option to be selected
   * @param disableSignalEmit disable signal update to reduce unneeded state updates
   */
  public handleSelectionChange(
    value: FudisSelectOption<object> | null,
    disableSignalEmit?: boolean,
  ): void {
    // Check if option clicked is not the same as already selected one. If they are different, then trigger state changes in component and control values
    const equalValues = areObjectsDeepEquals(value, this.control.value!);

    if (!equalValues) {
      this._controlValueChangedInternally = true;
      this.control.patchValue(value);
      this.selectionUpdate.emit(value);

      this._updateInputValueTexts(value?.label || '');

      if (value && this.variant !== 'dropdown' && !disableSignalEmit) {
        this._filterTextUpdate(value.label);
      }
    }
  }

  /**
   * Checks if currently typed filter text is not same as control label value
   * @param text filter text value emitted from autocomplete
   */
  protected _checkIfAutocompleteValueNull(text: string): void {
    if (this.control.value && text.toLowerCase() !== this.control.value?.label?.toLowerCase()) {
      this._controlValueChangedInternally = true;
      this.selectionUpdate.emit(null);
      this.control.patchValue(null);
    }
  }

  /**
   * If control value is updated from the Application, update component's state accordingly
   */
  protected override _updateSelectionFromControlValue(): void {
    const currentLabel = this.control.value?.label;
    this._dropdownSelectionLabelText = currentLabel || '';
    if (this.variant !== 'dropdown' && this.autocompleteRef) {
      this.autocompleteRef.updateInputValue(currentLabel || '');
    }
    this._cdr.detectChanges();
  }
}
