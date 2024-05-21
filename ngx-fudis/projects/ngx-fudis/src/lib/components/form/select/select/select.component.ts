import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Host,
  Input,
  OnInit,
  Optional,
  Output,
  ViewEncapsulation,
  effect,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { areObjectsDeepEquals } from '../../../../utilities/areObjectsDeepEquals';
import { FudisTranslationService } from '../../../../services/translation/translation.service';
import { FudisFocusService } from '../../../../services/focus/focus.service';
import { FudisIdService } from '../../../../services/id/id.service';
import { SelectBaseDirective } from '../common/select-base/select-base.directive';
import { FudisSelectOption } from '../../../../types/forms';
import { FormComponent } from '../../form/form.component';

@Component({
  selector: 'fudis-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SelectComponent extends SelectBaseDirective implements OnInit, AfterViewInit {
  constructor(
    @Host() @Optional() protected _parentForm: FormComponent | null,
    _idService: FudisIdService,
    _translationService: FudisTranslationService,
    _focusService: FudisFocusService,
    _changeDetectorRef: ChangeDetectorRef,
  ) {
    super(_focusService, _translationService, _idService, _changeDetectorRef);

    this.focusSelector = 'fudis-select-option__focusable';

    effect(() => {
      this.translationOptionDisabledText = this._translations().SELECT.DISABLED;
    });
  }

  /*
   * FormControl for single select
   */
  @Input({ required: true }) override control: FormControl<FudisSelectOption<object> | null>;

  /**
   * Value output event on selection change
   */
  @Output() selectionUpdate: EventEmitter<FudisSelectOption<object> | null> =
    new EventEmitter<FudisSelectOption<object> | null>();

  /**
   * Internal translated text for disabled select option, used in Select Option
   */
  public translationOptionDisabledText: string;

  /**
   * To pass selection label value for autocomplete
   */
  protected _autocompleteSelectionLabelValue: string | null;

  ngOnInit(): void {
    this._setParentId('select');

    this._reloadErrorSummaryOnInit(this._parentForm?.errorSummaryVisible, this.control);
  }

  ngAfterViewInit(): void {
    if (this.initialFocus && !this._focusService.isIgnored(this.id)) {
      this.focusToInput();
    }
  }

  /**
   * Handler for triggered option selection change
   * @param value option to be selected
   * @param disableSignalEmit disable signal update to reduce unneeded state updates
   */
  public handleSelectionChange(
    value: FudisSelectOption<object>,
    disableSignalEmit?: boolean,
  ): void {
    // Check if option clicked is not the same as already selected one. If they are different, then trigger state changes in component and control values
    const equalValues = areObjectsDeepEquals(value, this.control.value!);

    if (!equalValues) {
      this._controlValueChangedInternally = true;
      this.control.patchValue(value);
      this.selectionUpdate.emit(value);

      if (this.variant !== 'dropdown') {
        this._autocompleteRef.preventSpaceKeypress = true;
        (this._autocompleteRef.inputRef.nativeElement as HTMLInputElement).value = value.label;
      } else {
        this._dropdownSelectionLabelText = value?.label ? value.label : '';
      }

      if (value && this.variant !== 'dropdown' && !disableSignalEmit) {
        this._autocompleteFilterText.set(value.label);
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
    if (this.control.value) {
      this._dropdownSelectionLabelText = this.control.value.label;
      if (this.variant !== 'dropdown') {
        this._autocompleteSelectionLabelValue = this.control.value!.label;
        //this._autocompleteFilterText.set(this.control.value.label);
        this._changeDetectorRef.detectChanges();
      }
    } else {
      this._autocompleteFilterText.set('');
      this._autocompleteSelectionLabelValue = null;
      this._dropdownSelectionLabelText = '';
    }
  }
}
