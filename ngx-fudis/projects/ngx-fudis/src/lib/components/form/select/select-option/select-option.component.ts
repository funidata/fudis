import { Component, ElementRef, Host, HostBinding, Input, OnInit, ViewChild, effect } from '@angular/core';

import { FudisSelectOption } from '../../../../types/forms';
import { DropdownItemBaseDirective } from '../../../../directives/form/dropdown-item-base/dropdown-item-base.directive';
import { FudisIdService } from '../../../../services/id/id.service';
import { SelectComponent } from '../select.component';

@Component({
	selector: 'fudis-select-option',
	templateUrl: './select-option.component.html',
	styleUrls: ['../../../dropdown-menu/dropdown-menu-item/dropdown-menu-item.component.scss'],
})
export class SelectOptionComponent extends DropdownItemBaseDirective implements OnInit {
	constructor(
		private _idService: FudisIdService,
		@Host() protected _parent: SelectComponent
	) {
		super();

		effect(() => {
			if (this._parent.variant === 'autocomplete') {
				this._isOptionVisible(this._parent.getAutocompleteFilterText()());
				this._isOptionTyped(this._parent.getAutocompleteFilterText()());
			}

			if (this._parent.multiselect) {
				this._isOptionChecked(this._parent.getSelectedOptions()());
			}
		});
	}

	@ViewChild('dropdownItem') dropdownItem: ElementRef;

	@Input({ required: true }) data: FudisSelectOption;

	@HostBinding('class') classes = 'fudis-select-option-host';

	public optionVisible: boolean = true;

	protected _focused: boolean = false;

	private _preventTypeChange: boolean = false;

	ngOnInit(): void {
		if (this._parent) {
			this._id = this._idService.getNewChildId('select', this._parent.id);
		}

		if (this._parent.variant === 'autocomplete') {
			this._isOptionVisible(this._parent.getAutocompleteFilterText()());
			this._isOptionTyped(this._parent.getAutocompleteFilterText()());
		}

		if (this._parent.multiselect) {
			this._isOptionChecked(this._parent.getSelectedOptions()());
		}
	}

	protected _clickSelectOption(event: Event): void {
		this._preventTypeChange = true;

		this.handleClick.emit(event);

		if (!this.data.disabled) {
			const selectedOption: FudisSelectOption = { ...this.data, htmlId: this._id };

			this._parent.closeDropdown(true, true);

			this._parent.handleSelectionChange(selectedOption);
		}
	}

	protected _clickMultiselectOption(event: Event): void {
		if (!this.data.disabled) {
			this.checked = !this.checked;
			const selectedOption: FudisSelectOption = { ...this.data, htmlId: this._id };

			if (this.checked) {
				this._parent.handleMultiSelectionChange(selectedOption, false);
			} else {
				this._parent.handleMultiSelectionChange(selectedOption, true);
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
		const closeDropdown = this._focusedOutFromComponent(event, this.dropdownItem);

		if (closeDropdown) {
			this._parent.closeDropdown();
		}
	}

	private _isOptionVisible(filterText: string | undefined): void {
		if (this.data) {
			this.optionVisible =
				filterText && this.data.label.toLowerCase().includes(filterText.toLowerCase()) ? true : !filterText;

			if (this.optionVisible && !this._parent.visibleOptionsValues.includes(this.data.value)) {
				this._parent.visibleOptionsValues.push(this.data.value);
			} else if (!this.optionVisible && this._parent.visibleOptionsValues.includes(this.data.value)) {
				const index = this._parent.visibleOptionsValues.indexOf(this.data.value);

				this._parent.visibleOptionsValues.splice(index, 1);
			}
		}
	}

	private _isOptionTyped(filterText: string | undefined): void {
		if (
			!this.data?.disabled &&
			!this._preventTypeChange &&
			this.data?.label?.toLowerCase() === filterText?.toLowerCase()
		) {
			if (this._parent.control.value !== this.data) {
				const selectedOption: FudisSelectOption = { ...this.data, htmlId: this._id };

				this._parent.handleSelectionChange(selectedOption, true);
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
