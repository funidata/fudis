import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  ViewChild,
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
  _multiselectCVA: MultiselectControlValueAccessorDirective;

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
   * When app language and option labels are changed, selected Multiselect Options push themselves here, which will be then used to update visible UI labels managed by MultiselectCVA
   */
  public selectedOptionsFromLangChange: FudisSelectOption<object>[] = [];

  /**
   * Internal translated text to indicate deleting item chip aria-label
   */
  protected _translationRemoveItem = new BehaviorSubject<string>('');

  /**
   * When selecting / deselecting options, variable for storing them in the order of their id's (usually the DOM order)
   */
  protected _sortedSelectedOptions: WritableSignal<FudisSelectOption<object>[] | null> =
    signal(null);

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

    if (updatedValue?.length === 0) {
      this.selectionUpdate.emit(null);
      this.control.patchValue(null);
    } else {
      this.selectionUpdate.emit(updatedValue);
      this.control.patchValue(updatedValue);
    }
  }

  protected _updateSortedSelectedOptions(newValue: FudisSelectOption<object>[] | null) {
    this._sortedSelectedOptions.set(newValue);
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
