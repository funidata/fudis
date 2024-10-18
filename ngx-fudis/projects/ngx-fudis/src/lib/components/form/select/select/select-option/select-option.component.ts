import { Component, Host, Inject, OnDestroy, OnInit, Optional, effect } from '@angular/core';

import { DOCUMENT } from '@angular/common';
import { FudisSelectOption } from '../../../../../types/forms';
import { FudisIdService } from '../../../../../services/id/id.service';
import { SelectComponent } from '../select.component';
import { SelectGroupComponent } from '../../common/select-group/select-group.component';
import { SelectOptionBaseDirective } from '../../common/select-option-base/select-option-base.directive';

@Component({
  selector: 'fudis-select-option',
  templateUrl: './select-option.component.html',
  styleUrls: ['./select-option.component.scss'],
})
export class SelectOptionComponent extends SelectOptionBaseDirective implements OnInit, OnDestroy {
  constructor(
    private _idService: FudisIdService,
    @Inject(DOCUMENT) _document: Document,
    @Host() protected _parentSelect: SelectComponent,
    @Host() @Optional() _parentGroup: SelectGroupComponent,
  ) {
    super(_document, _parentGroup);

    this._parent = _parentSelect;

    this._id = this._idService.getNewSelectOptionId(
      'select',
      this._parent.id,
      this._parentGroup?.id,
    );

    effect(() => {
      if (this._parent.variant !== 'dropdown') {
        this._isOptionTyped(this._parent.getAutocompleteFilterText()());
      }
    });
  }

  ngOnInit(): void {
    if (this._parent.variant !== 'dropdown') {
      this._isOptionVisible(this._parent.getAutocompleteFilterText()());
      this._isOptionTyped(this._parent.getAutocompleteFilterText()());
    } else {
      this._updateVisibilityToParents(true);
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
