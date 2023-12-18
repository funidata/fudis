import { Component, Host, Inject, OnInit, Optional, effect } from '@angular/core';

import { DOCUMENT } from '@angular/common';
import { FudisSelectOption } from '../../../../types/forms';
import { FudisIdService } from '../../../../services/id/id.service';
import { SelectComponent } from '../select/select.component';
import { SelectGroupComponent } from '../select-group/select-group.component';
import { SelectOptionBaseDirective } from '../select-option-base/select-option-base.directive';

@Component({
	selector: 'fudis-select-option',
	templateUrl: './select-option.component.html',
	styleUrls: ['./select-option.component.scss'],
})
export class SelectOptionComponent extends SelectOptionBaseDirective implements OnInit {
	constructor(
		private _idService: FudisIdService,
		@Inject(DOCUMENT) _document: Document,
		@Host() protected _parentSelect: SelectComponent,
		@Host() @Optional() _parentGroup: SelectGroupComponent
	) {
		super(_document, _parentGroup);

		this._parent = _parentSelect;

		if (this._parentGroup) {
			this._id = this._idService.getNewGrandChildId('select', this._parent.id, this._parentGroup.id);
		} else {
			this._id = this._idService.getNewChildId('select', this._parent.id);
		}

		effect(() => {
			if (this._parent.autocomplete) {
				this._isOptionTyped(this._parent.getAutocompleteFilterText()());
			}
		});
	}

	ngOnInit(): void {
		if (this._parent.autocomplete) {
			this._isOptionVisible(this._parent.getAutocompleteFilterText()());
			this._isOptionTyped(this._parent.getAutocompleteFilterText()());
		}
	}

	/**
	 * Click handler for Select Option click
	 * @param event event emitted
	 */
	protected override _clickOption(event: Event): void {
		if (!this.data.disabled) {
			const selectedOption: FudisSelectOption = { ...this.data, fudisGeneratedHtmlId: this._id };

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
				const selectedOption: FudisSelectOption = { ...this.data, fudisGeneratedHtmlId: this._id };
				this._parentSelect.handleSelectionChange(selectedOption, true);
			}
		}
	}
}
