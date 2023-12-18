import { Component, Host, HostBinding, Inject, OnInit, Optional, effect } from '@angular/core';

import { DOCUMENT } from '@angular/common';
import { FudisSelectOption } from '../../../../types/forms';
import { FudisIdService } from '../../../../services/id/id.service';
import { SelectGroupComponent } from '../select-group/select-group.component';
import { MultiselectComponent } from '../multiselect/multiselect.component';
import { SelectOptionBaseDirective } from '../select-option-base/select-option-base.directive';

@Component({
	selector: 'fudis-multiselect-option',
	templateUrl: './multiselect-option.component.html',
	styleUrls: ['./multiselect-option.component.scss'],
})
export class MultiselectOptionComponent extends SelectOptionBaseDirective implements OnInit {
	constructor(
		private _idService: FudisIdService,
		@Inject(DOCUMENT) _document: Document,
		@Host() protected _parentMultiselect: MultiselectComponent,
		@Host() @Optional() _parentGroup: SelectGroupComponent
	) {
		super(_document, _parentGroup);

		this._parent = this._parentMultiselect;
		this._focusSelector = 'fudis-multiselect-option__focusable';

		if (this._parentGroup) {
			this._id = this._idService.getNewGrandChildId('multiselect', this._parent.id, this._parentGroup.id);
		} else {
			this._id = this._idService.getNewChildId('multiselect', this._parent.id);
		}

		effect(() => {
			this._isOptionChecked(this._parentMultiselect.getSelectedOptions()());
		});
	}

	/**
	 * Bind CSS class to Angular component wrapper
	 */
	@HostBinding('class') classes = 'fudis-select-option-host';

	/**
	 * On init check if option is visible or checked
	 */
	ngOnInit(): void {
		if (this._parent.autocomplete) {
			this._isOptionVisible(this._parent.getAutocompleteFilterText()());
		}
		this._isOptionChecked(this._parentMultiselect.getSelectedOptions()());
	}

	/**
	 * Click handler for clicking the option
	 * @param event Event
	 */
	protected override _clickOption(event: Event): void {
		if (!this.data.disabled) {
			this.checked = !this.checked;
			const selectedOption: FudisSelectOption = { ...this.data, fudisGeneratedHtmlId: this._id };

			if (this.checked) {
				this._parentMultiselect.handleMultiSelectionChange(selectedOption, 'add');
			} else {
				this._parentMultiselect.handleMultiSelectionChange(selectedOption, 'remove');
			}

			this.handleClick.emit(event);
			this.handleChecked.emit();
		}
	}

	private _isOptionChecked(options: FudisSelectOption[]): void {
		if (this.data) {
			const result = options.find((option) => option.label === this.data.label && option.value === this.data.value);

			this.checked = !!result;

			if (this.checked) {
				this._parentMultiselect.handleCheckedSort({ ...this.data, fudisGeneratedHtmlId: this._id });
			}
		}
	}
}
