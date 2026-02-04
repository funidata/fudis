import { Component, Host, Inject, Optional, OnDestroy, OnChanges } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { FudisSelectOption } from '../../../../../types/forms';
import { FudisIdService } from '../../../../../services/id/id.service';
import { SelectGroupComponent } from '../../common/select-group/select-group.component';
import { MultiselectComponent } from '../multiselect.component';
import { SelectOptionBaseDirective } from '../../common/select-option-base/select-option-base.directive';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { FudisTranslationService } from '../../../../../services/translation/translation.service';
import { FudisComponentChanges } from '../../../../../types/miscellaneous';

/**
 * Represents a selectable option within MultiselectComponent.
 */
@Component({
  selector: 'fudis-multiselect-option',
  templateUrl: './multiselect-option.component.html',
  styleUrls: ['./multiselect-option.component.scss'],
  standalone: false,
})
export class MultiselectOptionComponent<T = string>
  extends SelectOptionBaseDirective<T>
  implements OnDestroy, OnChanges
{
  private static instanceCounter = 0;
  protected readonly componentInstanceId: string;

  constructor(
    @Inject(DOCUMENT) _document: Document,
    @Host() protected _parentMultiselect: MultiselectComponent<T>,
    @Host() @Optional() _parentGroup: SelectGroupComponent,
    _idService: FudisIdService,
    _translationService: FudisTranslationService,
  ) {
    super(_document, _parentGroup, _translationService, _idService);

    MultiselectOptionComponent.instanceCounter++;
    this.componentInstanceId = MultiselectOptionComponent.instanceCounter.toString();

    this._parent = this._parentMultiselect;

    _parentMultiselect.control.valueChanges.pipe(takeUntilDestroyed()).subscribe((newValue) => {
      this._isOptionChecked(newValue);
    });

    toObservable(this._parent.getAutocompleteFilterText())
      .pipe(takeUntilDestroyed())
      .subscribe((filterText) => {
        this._checkVisibilityFromFilterText(filterText);
      });
  }

  /**
   * Common parent and its properties
   */
  protected override _parent: MultiselectComponent<T>;

  ngOnChanges(changes: FudisComponentChanges<MultiselectOptionComponent<T>>) {
    if (changes.data?.currentValue !== changes.data?.previousValue) {
      const newOptionId = this._idService.getNewSelectOptionId(
        this.data.label,
        'multiselect',
        this._parent.id,
        this._parentGroup?.id,
      );

      if (this._id && this._id !== newOptionId) this.clearParentOptionVisibility();

      this._id = newOptionId;

      this._checkVisibilityFromFilterText(this._parent.getAutocompleteFilterText()());

      const parentControlValue = this._parentMultiselect.control.value;

      if (parentControlValue && parentControlValue.length !== 0) {
        this._isOptionChecked(parentControlValue);
      } else {
        this.checked = false;
      }

      if (changes.data?.currentValue && changes.data.currentValue !== changes.data.previousValue) {
        this._checkIfLabelRequiresUpdate(changes.data?.currentValue);
      }
    }
  }

  ngOnDestroy(): void {
    this.clearParentOptionVisibility();
  }

  private clearParentOptionVisibility() {
    this._parentMultiselect.setOptionVisibility(this._id, false);
    this._parentGroup?.setOptionVisibility(this._id, false);
  }

  /**
   * Click handler for clicking the option
   *
   * @param event Event
   */
  protected override _clickOption(event: Event): void {
    if (!this.data.disabled) {
      if (!this.checked) {
        this._parentMultiselect.handleMultiSelectionChange(this.data, 'add');
      } else {
        this._parentMultiselect.handleMultiSelectionChange(this.data, 'remove');
      }

      this.handleClick.emit(event);
      this.handleChecked.emit();
    }
  }

  protected override _checkVisibilityFromFilterText(filterText: string): void {
    if (this._parent.variant !== 'dropdown' && this._parent.autocompleteFilter) {
      this._isOptionVisible(filterText);
    } else {
      this._isOptionVisible('');
    }
  }

  /**
   * Checks if this option is checked or not and updates parents state accordingly
   *
   * @param options Currently selected options
   */
  private _isOptionChecked(options: FudisSelectOption<T>[] | null): void {
    if (this.data) {
      const result = options?.find((option) => option.value === this.data.value);

      this.checked = !!result;
    }
  }

  /**
   * When option is changed, it will not change Form Control's value, which is intended, but visible
   * label should be updated
   */
  protected _checkIfLabelRequiresUpdate(newData: FudisSelectOption<T>): void {
    const controlValue = this._parent?.control.value;
    const foundMatch = controlValue?.find((selectedOption) => {
      return selectedOption.value === newData.value;
    });

    if (foundMatch) {
      this._parent.selectedOptionsFromLangChange.push(newData);

      if (
        this._parent.selectedOptionsFromLangChange.length === this._parent.control.value?.length
      ) {
        this._parent._multiselectCVA?.writeValue(this._parent.selectedOptionsFromLangChange);
        this._parent.selectedOptionsFromLangChange = [];
      }
    }
  }
}
