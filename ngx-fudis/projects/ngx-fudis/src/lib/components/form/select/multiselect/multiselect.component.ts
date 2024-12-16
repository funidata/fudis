import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  ViewChild,
  effect,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { FudisTranslationService } from '../../../../services/translation/translation.service';
import { FudisFocusService } from '../../../../services/focus/focus.service';
import { FudisIdService } from '../../../../services/id/id.service';
import { SelectBaseDirective } from '../common/select-base/select-base.directive';
import { FudisSelectOption } from '../../../../types/forms';
import { joinInputValues } from '../common/utilities/selectUtilities';
import { DOCUMENT } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { MultiselectControlValueAccessorDirective } from '../common/select-control-value-accessor/select-control-value-accessor.directive';

@Component({
  selector: 'fudis-multiselect',
  templateUrl: './multiselect.component.html',
  styleUrls: ['../select/select.component.scss'],
})
export class MultiselectComponent extends SelectBaseDirective implements OnInit {
  constructor(
    @Inject(DOCUMENT) _document: Document,
    _translationService: FudisTranslationService,
    _idService: FudisIdService,
    _focusService: FudisFocusService,
  ) {
    super(_document, _translationService, _focusService, _idService);

    effect(() => {
      this._translationRemoveItem.next(
        _translationService.getTranslations()().SELECT.MULTISELECT.REMOVE_ITEM,
      );
    });
  }

  @ViewChild(MultiselectControlValueAccessorDirective)
  private _multiselectCVAinput: MultiselectControlValueAccessorDirective;

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
  @Output() override selectionUpdate: EventEmitter<FudisSelectOption<object>[] | null> =
    new EventEmitter<FudisSelectOption<object>[] | null>();

  /**
   * Internal translated text to indicate deleting item chip aria-label
   */
  protected _translationRemoveItem = new BehaviorSubject<string>('');

  /**
   * When selecting / deselecting options, variable for storing them in the order of their id's (usually the DOM order)
   */
  protected _sortedSelectedOptions: FudisSelectOption<object>[] = [];

  /**
   * Set component's id and subscribe to value changes for form control coming from application
   */
  ngOnInit(): void {
    this._setParentId('multiselect');
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
    let currentSelectedOptions = [...this._sortedSelectedOptions];

    // Check if checkedOption exists in registeredOptions
    const foundIndex: number = currentSelectedOptions.findIndex((option) => {
      return option.value === checkedOption.value;
    });

    // If found, remove it
    if (foundIndex !== -1 && type === 'remove') {
      currentSelectedOptions = currentSelectedOptions.filter((_item, index) => {
        return foundIndex !== index;
      });
      // If not found, add it
    } else if (foundIndex === -1 && type === 'add') {
      currentSelectedOptions.push(checkedOption);
      // If found, replace it
    } else if (foundIndex !== -1 && type === 'add') {
      currentSelectedOptions[foundIndex] = checkedOption;
    }

    // Compare control value with registered options, if it matches, then sort options for the visible input field label text and for the chips

    let valuesInSync = true;

    if (this.control.value && currentSelectedOptions.length === this.control.value.length) {
      currentSelectedOptions.forEach((registeredOption) => {
        const matchFound = this.control.value?.find((controlOption) => {
          return registeredOption.value === controlOption.value;
        });

        if (!matchFound) {
          valuesInSync = false;
        }
      });
    }

    if (valuesInSync && this.control.value) {
      this._sortedSelectedOptions = currentSelectedOptions;

      this._dropdownSelectionLabelText.set(joinInputValues(this._sortedSelectedOptions));
    } else {
      this._sortedSelectedOptions = [];
      this._dropdownSelectionLabelText.set(null);
    }
  }

  /**
   * Update internal states when Application updates control value
   */
  protected override _updateSelectionFromControlValue(): void {
    this._optionsLoadedOnce = true;

    if (!this.control.value || this.control.value.length === 0) {
      this._dropdownSelectionLabelText.set(null);
    }
  }

  /**
   * Set HTML input element's value as null
   */
  protected override _emptyHtmlInputElement(): void {
    if (this.variant !== 'dropdown' && this.autocompleteRef) {
      this.autocompleteRef.updateInputValue('');
    } else {
      this._multiselectCVAinput.writeValue(null);
    }
  }

  /**
   * Handle chip remove. If there are no selections done, focus back to input on last item removal.
   * @param option removed option
   */
  protected _handleRemoveChip(option: FudisSelectOption<object>): void {
    this.handleMultiSelectionChange(option, 'remove');

    if (!this.control.value) {
      this._focusToSelectInput();
    }
  }
}
