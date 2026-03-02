import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  ViewChild,
  WritableSignal,
  signal,
  DOCUMENT,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { FudisTranslationService } from '../../../../services/translation/translation.service';
import { FudisFocusService } from '../../../../services/focus/focus.service';
import { FudisIdService } from '../../../../services/id/id.service';
import { SelectBaseDirective } from '../common/select-base/select-base.directive';
import { FudisSelectOption } from '../../../../types/forms';

import { MultiselectControlValueAccessorDirective } from '../common/select-control-value-accessor/select-control-value-accessor.directive';
import { BaseSelectableComponent } from '../common/interfaces/base-selectable.interface';
import { FudisDialogService } from '../../../../services/dialog/dialog.service';

/**
 * Allows selection of multiple options from a dropdown list.
 *
 * Use this component when there are multiple predefined options and user can choose more than one
 * value.
 */
@Component({
  selector: 'fudis-multiselect',
  templateUrl: './multiselect.component.html',
  styleUrls: ['../select/select.component.scss'],
  standalone: false,
})
export class MultiselectComponent<T = string>
  extends SelectBaseDirective
  implements OnInit, BaseSelectableComponent
{
  constructor(
    @Inject(DOCUMENT) _document: Document,
    protected _translationService: FudisTranslationService,
    _dialogService: FudisDialogService,
    _idService: FudisIdService,
    _focusService: FudisFocusService,
  ) {
    super(_document, _dialogService, _focusService, _idService);
  }

  @ViewChild(MultiselectControlValueAccessorDirective)
  _multiselectCVA: MultiselectControlValueAccessorDirective<T>;

  /**
   * Array type control for selected FudisSelectOptions
   */
  @Input({ required: true }) override control: FormControl<FudisSelectOption<T>[] | null>;

  /**
   * Hide or show selection chips rendered below input
   */
  @Input() showSelectionChips = true;

  /**
   * Value output event on selection change
   */
  @Output() override selectionUpdate: EventEmitter<FudisSelectOption<T>[] | null> =
    new EventEmitter<FudisSelectOption<T>[] | null>();

  /**
   * When app language and option labels are changed, selected Multiselect Options push themselves
   * here, which will be then used to update visible UI labels managed by MultiselectCVA
   */
  public selectedOptionsFromLangChange: FudisSelectOption<T>[] = [];

  /**
   * When selecting / deselecting options, variable for storing them in the order of their id's
   * (usually the DOM order)
   */
  protected _sortedSelectedOptions: WritableSignal<FudisSelectOption<T>[] | null> = signal(null);

  /**
   * Set component's id and subscribe to value changes for form control coming from application
   */
  ngOnInit(): void {
    this._setParentId('multiselect');
  }

  /**
   * Handler for adding / removing selections
   *
   * @param option FudisSelectOption to handle
   * @param type Add or remove multiselect option
   */
  public handleMultiSelectionChange(option: FudisSelectOption<T>, type: 'add' | 'remove'): void {
    let updatedValue = this.control.value;

    if (type === 'remove' && updatedValue) {
      updatedValue = updatedValue.filter((item: FudisSelectOption<T>) => {
        return item.value !== option.value;
      });
    } else if (!updatedValue) {
      updatedValue = [option];
    } else if (type === 'add') {
      updatedValue.push(option);
    }

    if (updatedValue?.length === 0) {
      this.selectionUpdate.emit(null);
      this.control.patchValue(null);
    } else {
      this.selectionUpdate.emit(updatedValue);
      this.control.patchValue(updatedValue);
    }
  }

  // Reason for the cast and any type: (known Angular limitation) attribute directives cannot propagate generics from their parent.
  // Angular will always instantiate the MultiselectControlValueAccessorDirective with its default generic (string).
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected _updateSortedSelectedOptions(newValue: FudisSelectOption<any>[] | null) {
    this._sortedSelectedOptions.set(newValue as FudisSelectOption<T>[] | null);
  }

  /**
   * Handle chip remove. If there are no selections done, focus back to input on last item removal.
   *
   * @param option Removed option
   */
  protected _handleRemoveChip(option: FudisSelectOption<T>): void {
    this.handleMultiSelectionChange(option, 'remove');

    if (!this.control.value) {
      this._focusToSelectInput();
      this.setAutocompleteFilterText('');
    }
  }
}
