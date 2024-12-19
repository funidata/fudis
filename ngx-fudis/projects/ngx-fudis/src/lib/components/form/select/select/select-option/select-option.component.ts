import { Component, Host, Inject, OnChanges, OnDestroy, Optional } from '@angular/core';

import { DOCUMENT } from '@angular/common';
import { FudisIdService } from '../../../../../services/id/id.service';
import { SelectComponent } from '../select.component';
import { SelectGroupComponent } from '../../common/select-group/select-group.component';
import { SelectOptionBaseDirective } from '../../common/select-option-base/select-option-base.directive';
import { FudisTranslationService } from '../../../../../services/translation/translation.service';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { FudisComponentChanges } from '../../../../../types/miscellaneous';
import { FudisSelectOption } from '../../../../../types/forms';

@Component({
  selector: 'fudis-select-option',
  templateUrl: './select-option.component.html',
  styleUrls: ['./select-option.component.scss'],
})
export class SelectOptionComponent
  extends SelectOptionBaseDirective
  implements OnChanges, OnDestroy
{
  constructor(
    @Inject(DOCUMENT) _document: Document,
    @Host() protected _parentSelect: SelectComponent,
    @Host() @Optional() _parentGroup: SelectGroupComponent,
    _translationService: FudisTranslationService,
    _idService: FudisIdService,
  ) {
    super(_document, _parentGroup, _translationService, _idService);

    this._parent = _parentSelect;

    toObservable(this._parent.getAutocompleteFilterText())
      .pipe(takeUntilDestroyed())
      .subscribe((filterText) => {
        this._checkVisibilityFromFilterText(filterText);
      });
  }

  /**
   * Common parent and its properties
   */
  protected override _parent: SelectComponent;

  ngOnChanges(changes: FudisComponentChanges<SelectOptionBaseDirective>): void {
    if (changes.data?.currentValue !== changes.data?.previousValue) {
      this._id = this._idService.getNewSelectOptionId(
        'select',
        this._parent.id,
        this.data.value,
        this._parentGroup?.id,
      );

      this._checkVisibilityFromFilterText(this._parent.getAutocompleteFilterText()());

      if (changes.data?.currentValue) {
        this._onLangChangeCheckIfLabelRequiresUpdate(changes.data.currentValue);
      }
    }
  }

  ngOnDestroy(): void {
    this._parentSelect.setOptionVisibility(this._id, false);
    this._parentGroup?.setOptionVisibility(this._id, false);
  }

  /**
   * Click handler for Select Option click
   * @param event event emitted
   */
  protected override _clickOption(event: Event): void {
    if (!this.data.disabled) {
      this._parentSelect.handleSelectionChange(this.data);
      this.handleClick.emit(event);
    }
    this._parent.closeDropdown(true, true);
  }

  protected override _checkVisibilityFromFilterText(filterText: string): void {
    if (this._parent.variant !== 'dropdown' && this._parent.autocompleteFilter) {
      this._isOptionVisible(filterText);
      this._isOptionTyped(filterText);
    } else {
      this._isOptionVisible('');
    }
  }

  /**
   * When app language is changed, it will not change Form Control's value, which is intended, but visible label should be updated
   */
  protected _onLangChangeCheckIfLabelRequiresUpdate(newData: FudisSelectOption<object>): void {
    const controlValue = this._parent?.control.value;

    if (this._appLanguage !== this._translationService.getLanguage()) {
      this._appLanguage = this._translationService.getLanguage();

      if (controlValue?.value === newData.value) {
        this._parent.selectCVA.writeValue(newData);
      }
    }
  }

  /**
   * Used with autocomplete to check if filter text matches this option. If yes, then trigger selection change in the parent
   * @param filterText autocomplete filter text from parent
   */
  private _isOptionTyped(filterText: string | undefined): void {
    if (!this.data?.disabled && this.data?.label?.toLowerCase() === filterText?.toLowerCase()) {
      if (this._parent.control.value !== this.data) {
        this._parentSelect.handleSelectionChange(this.data);
      }
    }
  }
}
