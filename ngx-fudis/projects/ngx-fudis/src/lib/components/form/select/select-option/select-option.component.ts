import { Component, ElementRef, Host, HostBinding, Input, OnInit, Optional, ViewChild, effect } from '@angular/core';

import { FudisSelectOption } from '../../../../types/forms';
import { DropdownItemBaseDirective } from '../../../../directives/form/dropdown-item-base/dropdown-item-base.directive';
import { FudisIdService } from '../../../../services/id/id.service';
import { SelectComponent } from '../select.component';
import { SelectGroupComponent } from '../select-group/select-group.component';

@Component({
	selector: 'fudis-select-option',
	templateUrl: './select-option.component.html',
	styleUrls: ['./select-option.component.scss'],
})
export class SelectOptionComponent extends DropdownItemBaseDirective implements OnInit {
	constructor(
		private _idService: FudisIdService,
		@Host() protected _parentSelect: SelectComponent,
		@Host() @Optional() protected _parentGroup: SelectGroupComponent
	) {
		super();

		if (this._parentGroup) {
			this._id = this._idService.getNewGrandChildId('select', this._parentSelect.id, this._parentGroup.id);
		} else {
			this._id = this._idService.getNewChildId('select', this._parentSelect.id);
		}

		effect(() => {
			if (this._parentSelect.variant === 'autocomplete') {
				this._isOptionVisible(this._parentSelect.getAutocompleteFilterText()());
				this._isOptionTyped(this._parentSelect.getAutocompleteFilterText()());
			}

			if (this._parentSelect.multiselect) {
				this._isOptionChecked(this._parentSelect.getSelectedOptions()());
			}
		});
	}

	@ViewChild('dropdownItem') dropdownItem: ElementRef;

	@Input({ required: true }) data: FudisSelectOption;

	@HostBinding('class') classes = 'fudis-select-option-host';

	public optionVisible: boolean = true;

	protected _focused: boolean = false;

	// Translated text for disabled option
	protected _disabledText: string;

	private _preventTypeChange: boolean = false;

	ngOnInit(): void {
		if (this._parentSelect.variant === 'autocomplete') {
			this._isOptionVisible(this._parentSelect.getAutocompleteFilterText()());
			this._isOptionTyped(this._parentSelect.getAutocompleteFilterText()());
		}

		if (this._parentSelect.multiselect) {
			this._isOptionChecked(this._parentSelect.getSelectedOptions()());
		}
	}

	protected _clickSelectOption(event: Event): void {
		this._preventTypeChange = true;

		this.handleClick.emit(event);

		if (!this.data.disabled) {
			const selectedOption: FudisSelectOption = { ...this.data, htmlId: this._id };

			this._parentSelect.closeDropdown(true, true);

			this._parentSelect.handleSelectionChange(selectedOption);
		}
	}

	protected _clickMultiselectOption(event: Event): void {
		if (!this.data.disabled) {
			this.checked = !this.checked;
			const selectedOption: FudisSelectOption = { ...this.data, htmlId: this._id };

			if (this.checked) {
				this._parentSelect.handleMultiSelectionChange(selectedOption, false);
			} else {
				this._parentSelect.handleMultiSelectionChange(selectedOption, true);
			}

			this.handleClick.emit(event);
			this.handleChecked.emit();
		}
	}

	protected _focusToOption(): void {
		this._focused = true;
	}

	protected _handleKeyDown(event: KeyboardEvent, selector: string) {
		if (event.key !== ' ') {
			this._baseHandleKeyDown(event, this.dropdownItem, selector);
		}
	}

	protected _handleButtonBlur(event: FocusEvent): void {
		this._focused = false;
		this.handleBlur.emit(event);
		const closeDropdown = this._focusedOutFromComponent(event, this.dropdownItem, 'fudis-select-option__focusable');

		if (closeDropdown) {
			this._parentSelect.closeDropdown();
		}
	}

	private _isOptionVisible(filterText: string | undefined): void {
		if (this.data) {
			this.optionVisible =
				filterText && this.data.label.toLowerCase().includes(filterText.toLowerCase()) ? true : !filterText;

			if (this.optionVisible) {
				this._parentSelect.setOptionsVisibility(this.data.value, true);
			} else if (!this.optionVisible) {
				this._parentSelect.setOptionsVisibility(this.data.value, false);
			}

			if (this.optionVisible && this._parentGroup) {
				this._parentGroup.setOptionsVisibility(this.data.value, true);
			} else if (this._parentGroup) {
				this._parentGroup.setOptionsVisibility(this.data.value, false);
			}
		}
	}

	private _isOptionTyped(filterText: string | undefined): void {
		if (
			!this.data?.disabled &&
			!this._preventTypeChange &&
			this.data?.label?.toLowerCase() === filterText?.toLowerCase()
		) {
			if (this._parentSelect.control.value !== this.data) {
				const selectedOption: FudisSelectOption = { ...this.data, htmlId: this._id };

				this._parentSelect.handleSelectionChange(selectedOption, true);
			}
		} else {
			this._preventTypeChange = false;
		}
	}

	private _isOptionChecked(options: FudisSelectOption[]): void {
		if (this.data) {
			const result = options.find((option) => option.label === this.data.label && option.value === this.data.value);

			this.checked = !!result;
		}
	}
}
