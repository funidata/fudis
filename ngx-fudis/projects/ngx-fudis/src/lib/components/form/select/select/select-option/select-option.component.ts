import { Component, Host, Inject, OnChanges, OnDestroy, Optional } from '@angular/core';

import { DOCUMENT } from '@angular/common';
import { FudisSelectOption } from '../../../../../types/forms';
import { FudisIdService } from '../../../../../services/id/id.service';
import { SelectComponent } from '../select.component';
import { SelectGroupComponent } from '../../common/select-group/select-group.component';
import { SelectOptionBaseDirective } from '../../common/select-option-base/select-option-base.directive';
import { FudisTranslationService } from '../../../../../services/translation/translation.service';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { FudisComponentChanges } from '../../../../../types/miscellaneous';

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
    private _idService: FudisIdService,
    @Inject(DOCUMENT) _document: Document,
    @Host() protected _parentSelect: SelectComponent,
    @Host() @Optional() _parentGroup: SelectGroupComponent,
    _translationService: FudisTranslationService,
  ) {
    super(_document, _parentGroup, _translationService);

    this._parent = _parentSelect;

    this._id = this._idService.getNewSelectOptionId(
      'select',
      this._parent.id,
      this._parentGroup?.id,
    );

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
      this._updateVisibleLabel();

      this._checkVisibilityFromFilterText(this._parent.getAutocompleteFilterText()());
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
      const selectedOption: FudisSelectOption<object> = {
        ...this.data,
        fudisGeneratedHtmlId: this._id,
      };

      this._parentSelect.handleSelectionChange(selectedOption);
      this.handleClick.emit(event);
    }
    this._parent.closeDropdown(true, true);
  }

  protected override _updateVisibleLabel(): void {
    if (this._parent.control.value?.value === this.data.value) {
      this._parent.updateInputValueTexts(this.data.label);
    }
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
   * Used with autocomplete to check if filter text matches this option. If yes, then trigger selection change in the parent
   * @param filterText autocomplete filter text from parent
   */
  private _isOptionTyped(filterText: string | undefined): void {
    if (!this.data?.disabled && this.data?.label?.toLowerCase() === filterText?.toLowerCase()) {
      if (this._parent.control.value !== this.data) {
        const selectedOption: FudisSelectOption<object> = {
          ...this.data,
          fudisGeneratedHtmlId: this._id,
        };
        this._parentSelect.handleSelectionChange(selectedOption, true);
      }
    }
  }
}
