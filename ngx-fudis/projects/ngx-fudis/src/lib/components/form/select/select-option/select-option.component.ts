import {
	Component,
	ElementRef,
	Host,
	HostBinding,
	Inject,
	Input,
	OnInit,
	Optional,
	ViewChild,
	effect,
} from '@angular/core';

import { DOCUMENT } from '@angular/common';
import { FudisSelectOption } from '../../../../types/forms';
import { DropdownItemBaseDirective } from '../../../../directives/form/dropdown-item-base/dropdown-item-base.directive';
import { FudisIdService } from '../../../../services/id/id.service';
import { SelectComponent } from '../select/select.component';
import { SelectGroupComponent } from '../select-group/select-group.component';

@Component({
	selector: 'fudis-select-option',
	templateUrl: './select-option.component.html',
	styleUrls: ['./select-option.component.scss'],
})
export class SelectOptionComponent extends DropdownItemBaseDirective implements OnInit {
	constructor(
		private _idService: FudisIdService,
		@Inject(DOCUMENT) _document: Document,
		@Host() protected _parentSelect: SelectComponent,
		@Host() @Optional() protected _parentGroup: SelectGroupComponent
	) {
		super(_document);

		if (this._parentGroup) {
			this._id = this._idService.getNewGrandChildId('select', this._parentSelect.id, this._parentGroup.id);
		} else {
			this._id = this._idService.getNewChildId('select', this._parentSelect.id);
		}

		effect(() => {
			if (this._parentSelect.autocomplete) {
				this._isOptionVisible(this._parentSelect.getAutocompleteFilterText()());
				this._isOptionTyped(this._parentSelect.getAutocompleteFilterText()());
			}
		});
	}

	@ViewChild('dropdownItem') dropdownItem: ElementRef<HTMLInputElement | HTMLButtonElement>;

	@Input({ required: true }) data: FudisSelectOption;

	@HostBinding('class') classes = 'fudis-select-option-host';

	public optionVisible: boolean = true;

	protected _focused: boolean = false;

	// Translated text for disabled option
	protected _disabledText: string;

	ngOnInit(): void {
		if (this._parentSelect.autocomplete) {
			this._isOptionVisible(this._parentSelect.getAutocompleteFilterText()());
			this._isOptionTyped(this._parentSelect.getAutocompleteFilterText()());
		}
	}

	protected _clickSelectOption(event: Event): void {
		if (!this.data.disabled) {
			const selectedOption: FudisSelectOption = { ...this.data, fudisGeneratedHtmlId: this._id };

			this._parentSelect.handleSelectionChange(selectedOption);
			this.handleClick.emit(event);

			this._parentSelect.closeDropdownFromSelection();
		}
	}

	protected _focusToOption(): void {
		this._focused = true;
	}

	protected _handleKeyDown(event: KeyboardEvent, cssClassSelector: string) {
		if (event.key === 'Enter' || event.key === ' ') {
			this._clickSelectOption(event);
		} else {
			this._baseHandleKeyDown(event, this.dropdownItem, cssClassSelector);
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

	private _isOptionVisible(filterText: string): void {
		if (this.data) {
			this.optionVisible =
				filterText && this.data.label.toLowerCase().includes(filterText.toLowerCase()) ? true : !filterText;

			if (this.optionVisible) {
				this._parentSelect.setOptionVisibility(this.data.value, true);
			} else {
				this._parentSelect.setOptionVisibility(this.data.value, false);
			}

			if (this.optionVisible && this._parentGroup) {
				this._parentGroup.setOptionVisibility(this.data.value, true);
			} else if (this._parentGroup) {
				this._parentGroup.setOptionVisibility(this.data.value, false);
			}
		}
	}

	private _isOptionTyped(filterText: string | undefined): void {
		if (!this.data?.disabled && this.data?.label?.toLowerCase() === filterText?.toLowerCase()) {
			if (this._parentSelect.control.value !== this.data) {
				const selectedOption: FudisSelectOption = { ...this.data, fudisGeneratedHtmlId: this._id };
				this._parentSelect.handleSelectionChange(selectedOption, true);
			}
		}
	}
}
