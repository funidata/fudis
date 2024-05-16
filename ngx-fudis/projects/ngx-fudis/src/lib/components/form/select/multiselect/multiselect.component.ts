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
  Signal,
  WritableSignal,
  effect,
  signal,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { FudisTranslationService } from '../../../../services/translation/translation.service';
import { FudisFocusService } from '../../../../services/focus/focus.service';
import { FudisIdService } from '../../../../services/id/id.service';
import { SelectBaseDirective } from '../common/select-base/select-base.directive';
import { FudisSelectOption } from '../../../../types/forms';
import { joinInputValues, sortValues } from '../common/selectUtilities';
import { FormComponent } from '../../form/form.component';

@Component({
  selector: 'fudis-multiselect',
  templateUrl: './multiselect.component.html',
  styleUrls: ['../select/select.component.scss'],
})
export class MultiselectComponent extends SelectBaseDirective implements OnInit, AfterViewInit {
  constructor(
    @Host() @Optional() protected _parentForm: FormComponent | null,
    private _cdr: ChangeDetectorRef,
    _idService: FudisIdService,
    _translationService: FudisTranslationService,
    _focusService: FudisFocusService,
    _changeDetectorRef: ChangeDetectorRef,
  ) {
    super(_focusService, _translationService, _idService, _changeDetectorRef);

    this.focusSelector = 'fudis-multiselect-option__focusable';

    effect(() => {
      this._translationRemoveItem = this._translations().SELECT.MULTISELECT.REMOVE_ITEM;
    });
  }

  /**
   * Array type control for selected FudisSelectOptions
   */
  @Input({ required: true }) override control: FormControl<FudisSelectOption<object>[] | null>;

  /**
   * Hide or show selection chips rendered below input
   */
  @Input() showSelectionChips = true;

  /**
   * Value output event on selection change
   */
  @Output() selectionUpdate: EventEmitter<FudisSelectOption<object>[] | null> = new EventEmitter<
    FudisSelectOption<object>[] | null
  >();

  /**
   * Internal translated text to indicate deleting item chip aria-label
   */
  protected _translationRemoveItem: string;

  /**
   * When selecting / deselecting options, variable for storing them in the order of their id's (usually the DOM order)
   */
  protected _sortedSelectedOptions: FudisSelectOption<object>[] = [];

  /**
   * Signal for dropdown options to listen when either Application updates its control value or user clicks (removes) selection chip
   */
  private _selectedOptionsSignal: WritableSignal<FudisSelectOption<object>[]> = signal<
    FudisSelectOption<object>[]
  >([]);

  private _registeredOptions: FudisSelectOption<object>[] = [];

  /**
   * Set component's id and subscribe to value changes for form control coming from application
   */
  ngOnInit(): void {
    this._setParentId('multiselect');

    this._reloadErrorSummaryOnInit(this._parentForm?.errorSummaryVisible, this.control);
  }

  /**
   * Set initial focus and update component's state if control has value on initialisation
   */
  ngAfterViewInit(): void {
    if (this.initialFocus && !this._focusService.isIgnored(this.id)) {
      this.focusToInput();
    }
  }

  /**
   * Getter used in multiselect options
   * @returns Signal array of sorted selected options
   */
  public getSelectedOptions(): Signal<FudisSelectOption<object>[]> {
    return this._selectedOptionsSignal.asReadonly();
  }

  /**
   * Handler for adding / removing selections
   * @param option FudisSelectOption to handle
   * @param type add or remove multiselect option
   */
  public handleMultiSelectionChange(
    option: FudisSelectOption<object>,
    type: 'add' | 'remove',
  ): void {
    let updatedValue = this.control.value;

    if (type === 'remove' && updatedValue) {
      updatedValue = updatedValue.filter((item: FudisSelectOption<object>) => {
        return item.value !== option.value;
      });
    } else if (!updatedValue) {
      updatedValue = [option];
    } else if (type === 'add') {
      updatedValue.push(option);
    }

    this._controlValueChangedInternally = true;

    if (updatedValue?.length === 0) {
      this.selectionUpdate.emit(null);
      this.control.patchValue(null);
    } else {
      this.selectionUpdate.emit(updatedValue);
      this.control.patchValue(updatedValue);
    }
  }

  /**
   * Function called by multiselect option if they are checked
   * @param checkedOption FudisSelectOption to handle
   * @param type add or remove option from sorting
   */
  public handleCheckedSort(checkedOption: FudisSelectOption<object>, type: 'add' | 'remove'): void {
    // Check if checkedOption exists in registeredOptions
    const foundIndex: number = this._registeredOptions.findIndex((option) => {
      return option.value === checkedOption.value;
    });

    // If found, remove it
    if (foundIndex !== -1 && type === 'remove') {
      this._registeredOptions = this._registeredOptions.filter((_item, index) => {
        return foundIndex !== index;
      });
      // If not found, add it
    } else if (foundIndex === -1 && type === 'add') {
      this._registeredOptions.push(checkedOption);
    } else if (foundIndex && type === 'add') {
      this._registeredOptions[foundIndex] = checkedOption;
    }

    // Compare control value with registered options, if it matches, then sort options for the visible input field label text and for the chips

    let valuesInSync = true;

    if (this.control.value && this._registeredOptions.length === this.control.value.length) {
      this._registeredOptions.forEach((registeredOption) => {
        const matchFound = this.control.value?.find((controlOption) => {
          return (
            registeredOption.value === controlOption.value &&
            registeredOption.label === controlOption.label
          );
        });

        if (!matchFound) {
          valuesInSync = false;
        }
      });
    }

    if (valuesInSync && this.control.value) {
      this._sortedSelectedOptions = sortValues(this._registeredOptions);
      this._dropdownSelectionLabelText = joinInputValues(this._sortedSelectedOptions);
      this._cdr.detectChanges();
    } else {
      this._sortedSelectedOptions = [];
      this._dropdownSelectionLabelText = null;
    }
  }

  /**
   * Update internal states when Application updates control value
   */
  protected override _updateSelectionFromControlValue(): void {
    this._optionsLoadedOnce = true;

    if (!this.control.value || this.control.value.length === 0) {
      this._dropdownSelectionLabelText = null;
    } 
  }

  /**
   * Handle chip remove. If there are no selections done, focus back to input on last item removal.
   * @param option removed option
   */
  protected _handleRemoveChip(option: FudisSelectOption<object>): void {
    this.handleMultiSelectionChange(option, 'remove');

    if (!this.control.value) {
      if (this.autocomplete) {
        this._autocompleteRef.inputRef.nativeElement.focus();
      } else {
        this._inputRef.nativeElement.focus();
      }
    }
  }
}
