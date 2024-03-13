import {
  AfterContentInit,
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
import { takeUntil } from 'rxjs';

@Component({
  selector: 'fudis-multiselect',
  templateUrl: './multiselect.component.html',
  styleUrls: ['../select/select.component.scss'],
})
export class MultiselectComponent
  extends SelectBaseDirective
  implements OnInit, AfterContentInit, AfterViewInit
{
  constructor(
    @Host() @Optional() protected _parentForm: FormComponent | null,
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
  @Input({ required: true }) override control: FormControl<FudisSelectOption[] | null>;

  /**
   * Hide or show selection chips rendered below input
   */
  @Input() showSelectionChips = true;

  /**
   * Value output event on selection change
   */
  @Output() selectionUpdate: EventEmitter<FudisSelectOption[] | null> = new EventEmitter<
    FudisSelectOption[] | null
  >();

  /**
   * Internal translated text to indicate deleting item chip aria-label
   */
  protected _translationRemoveItem: string;

  /**
   * When selecting / deselecting options, variable for storing them in the order of their id's (usually the DOM order)
   */
  protected _sortedSelectedOptions: FudisSelectOption[] = [];

  /**
   * Signal for dropdown options to listen when either Application updates its control value or user clicks (removes) selection chip
   */
  private _sortedSelectedOptionsSignal: WritableSignal<FudisSelectOption[]> = signal<
    FudisSelectOption[]
  >([]);

  /**
   * Set component's id and subscribe to value changes for form control coming from application
   */
  ngOnInit(): void {
    this._setParentId('multiselect');

    this.control.valueChanges.pipe(takeUntil(this._destroyed)).subscribe(() => {
      if (!this.controlValueChangedInternally) {
        this._updateMultiselectionFromControlValue();
      }
      this.controlValueChangedInternally = false;
    });

    // TODO: write test
    if (this._parentForm?.errorSummaryVisible && this.errorSummaryReloadOnInit) {
      this.reloadErrorSummary(this.control);
    }
  }

  ngAfterContentInit(): void {
    if (this.control.value) {
      this._updateMultiselectionFromControlValue();
    }
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
  public getSelectedOptions(): Signal<FudisSelectOption[]> {
    return this._sortedSelectedOptionsSignal.asReadonly();
  }

  /**
   * Handler for adding / removing selections
   * @param option FudisSelectOption to handle
   * @param type add or remove multiselect option
   */
  public handleMultiSelectionChange(option: FudisSelectOption, type: 'add' | 'remove'): void {
    let updatedValue = this.control.value;

    if (type === 'remove' && updatedValue) {
      updatedValue = updatedValue.filter((item: FudisSelectOption) => {
        return item.value !== option.value;
      });
    } else if (!updatedValue) {
      updatedValue = [option];
    } else if (type === 'add') {
      updatedValue.push(option);
    }

    this._sortedSelectedOptions = sortValues(updatedValue);

    this.dropdownSelectionLabelText = joinInputValues(this._sortedSelectedOptions);

    this.controlValueChangedInternally = true;
    this.selectionUpdate.emit(this._sortedSelectedOptions);
    this.control.patchValue(this._sortedSelectedOptions);
  }

  /**
   * Function called by multiselect option if they are checked
   * @param checkedOption FudisSelectOption to handle
   */
  public handleCheckedSort(checkedOption: FudisSelectOption): void {
    const foundIndex: number = this._sortedSelectedOptions.findIndex((option) => {
      return option.value === checkedOption.value && option.label === checkedOption.label;
    });

    if (foundIndex !== -1) {
      this._sortedSelectedOptions[foundIndex] = checkedOption;

      this._sortedSelectedOptions = sortValues(this._sortedSelectedOptions);

      this.dropdownSelectionLabelText = joinInputValues(this._sortedSelectedOptions);
    }
  }

  /**
   * Update internal states when Application updates control value
   */
  private _updateMultiselectionFromControlValue(): void {
    if (this.control.value) {
      this._sortedSelectedOptions = sortValues(this.control.value);
      this._sortedSelectedOptionsSignal.set(this._sortedSelectedOptions);

      if (!this.autocomplete) {
        this.dropdownSelectionLabelText = joinInputValues(this._sortedSelectedOptions);
      } else {
        this.noResultsFound = false;
      }
    } else {
      this.noResultsFound = true;
      this.dropdownSelectionLabelText = null;
    }
  }

  /**
   * Handle chip item remove by index. If there are no selections done, focus back to input on last item removal.
   * @param index index to remove
   */
  protected _handleRemoveChip(index: number): void {
    const currentValue = this.control.value;

    if (currentValue) {
      currentValue.splice(index, 1);
      if (currentValue!.length === 0 && this.autocomplete) {
        this._autocompleteRef.inputRef.nativeElement.focus();
      } else if (currentValue!.length === 0) {
        this._inputRef.nativeElement.focus();
      }

      this.dropdownSelectionLabelText = joinInputValues(currentValue);
      this._sortedSelectedOptionsSignal.set(currentValue);
      this.controlValueChangedInternally = true;
      this.control.patchValue(currentValue);
    }
  }
}
