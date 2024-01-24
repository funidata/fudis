import {
  AfterContentInit,
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
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

@Component({
  selector: 'fudis-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SelectComponent
  extends SelectBaseDirective
  implements OnInit, AfterViewInit, AfterContentInit
{
  constructor(
    _idService: FudisIdService,
    _translationService: FudisTranslationService,
    _focusService: FudisFocusService,
  ) {
    super(_focusService, _translationService, _idService);

    this.focusSelector = 'fudis-select-option__focusable';

    effect(() => {
      this.translationOptionDisabledText = this._translations().SELECT.DISABLED;
    });
  }

  /*
   * FormControl for single select
   */
  @Input({ required: true }) override control: FormControl<FudisSelectOption | null>;

  /**
   * Value output event on selection change
   */
  @Output() selectionUpdate: EventEmitter<FudisSelectOption | null> =
    new EventEmitter<FudisSelectOption | null>();

  /**
   * Internal translated text for disabled select option
   */
  public translationOptionDisabledText: string;

  /**
   * To pass selection label value for autocomplete
   */
  protected _autocompleteSelectionLabelValue: string | null;

  ngOnInit(): void {
    this._setParentId('select');

    this._controlValueSubscription = this.control.valueChanges.subscribe(() => {
      if (!this.controlValueChangedInternally) {
        this._updateSelectionFromControlValue();
      }

      this.controlValueChangedInternally = false;
    });
  }

  ngAfterContentInit(): void {
    if (this.control.value) {
      this._updateSelectionFromControlValue();
    }
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
  public handleSelectionChange(value: FudisSelectOption, disableSignalEmit?: boolean): void {
    const equalValues = areObjectsDeepEquals(value, this.control.value!);

    if (!equalValues) {
      this.selectionUpdate.emit(value);
      this.controlValueChangedInternally = true;
      this.control.patchValue(value);

      if (this.autocomplete) {
        this._autocompleteRef.preventSpaceKeypress = true;
        (this._autocompleteRef.inputRef.nativeElement as HTMLInputElement).value = value.label;
      } else {
        this.dropdownSelectionLabelText = value?.label ? value.label : '';
      }

      if (value && this.autocomplete && !disableSignalEmit) {
        this._autocompleteFilterText.set(value.label);
      }
    }
  }

  /**
   * Checks if currently typed filter text is not same as control label value
   * @param text filter text value emitted from autocomplete
   */
  protected _checkIfAutocompleteValueNull(text: string): void {
    console.log(this.control.value);

    if (this.control.value && text.toLowerCase() !== this.control.value?.label?.toLowerCase()) {
      this.controlValueChangedInternally = true;
      this.selectionUpdate.emit(null);
      this.control.patchValue(null);
    }
  }

  /**
   * Function to patch internally control's value
   * @param value Option value to patch
   */
  protected _patchControlValue(value: FudisSelectOption | null) {
    this.controlValueChangedInternally = true;
    this._preventDropdownReopen = true;
    this.control.patchValue(value);
  }

  /**
   * If control value is updated from the Application, update component's state accordingly
   */
  private _updateSelectionFromControlValue(): void {
    if (this.control.value) {
      this.dropdownSelectionLabelText = this.control.value.label;

      if (this.autocomplete) {
        this._autocompleteSelectionLabelValue = this.control.value!.label;
        this._autocompleteFilterText.set(this.control.value.label);

        this._visibleOptionsValues = [this.control.value.value];
      }
    } else {
      this._autocompleteFilterText.set('');
      this._autocompleteSelectionLabelValue = null;
      this.dropdownSelectionLabelText = '';
    }
  }
}
