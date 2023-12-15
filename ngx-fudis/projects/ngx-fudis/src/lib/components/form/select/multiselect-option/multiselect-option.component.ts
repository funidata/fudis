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
import { SelectGroupComponent } from '../select-group/select-group.component';
import { MultiselectComponent } from '../multiselect/multiselect.component';

@Component({
	selector: 'fudis-multiselect-option',
	templateUrl: './multiselect-option.component.html',
	styleUrls: ['./multiselect-option.component.scss'],
})
export class MultiselectOptionComponent extends DropdownItemBaseDirective implements OnInit {
	constructor(
		private _idService: FudisIdService,
		@Inject(DOCUMENT) _document: Document,
		@Host() protected _parent: MultiselectComponent,
		@Host() @Optional() protected _parentGroup: SelectGroupComponent
	) {
		super(_document);

		if (this._parentGroup) {
			this._id = this._idService.getNewGrandChildId('multiselect', this._parent.id, this._parentGroup.id);
		} else {
			this._id = this._idService.getNewChildId('multiselect', this._parent.id);
		}

		effect(() => {
			if (this._parent.autocomplete) {
				this._isOptionVisible(this._parent.getAutocompleteFilterText()());
			}

			this._isOptionChecked(this._parent.getSelectedOptions()());
		});
	}

	@ViewChild('dropdownItem') dropdownItem: ElementRef<HTMLInputElement | HTMLButtonElement>;

	@Input({ required: true }) data: FudisSelectOption;

	@HostBinding('class') classes = 'fudis-select-option-host';

	public optionVisible: boolean = true;

	protected _focused: boolean = false;

	// Translated text for disabled option
	protected _disabledText: string;

	private _preventTypeChange: boolean = false;

	ngOnInit(): void {
		if (this._parent.autocomplete) {
			this._isOptionVisible(this._parent.getAutocompleteFilterText()());
		}
		this._isOptionChecked(this._parent.getSelectedOptions()());
	}

	protected _clickMultiselectOption(event: Event): void {
		if (!this.data.disabled) {
			this.checked = !this.checked;
			const selectedOption: FudisSelectOption = { ...this.data, htmlId: this._id };

			if (this.checked) {
				this._parent.handleMultiSelectionChange(selectedOption, 'add');
			} else {
				this._parent.handleMultiSelectionChange(selectedOption, 'remove');
			}

			this.handleClick.emit(event);
			this.handleChecked.emit();
		}
	}

	protected _focusToOption(): void {
		this._focused = true;
	}

	protected _handleKeyDown(event: KeyboardEvent, cssClassSelector: string) {
		if (event.key === 'Enter') {
			this._clickMultiselectOption(event);
		} else if (event.key !== ' ') {
			this._baseHandleKeyDown(event, this.dropdownItem, cssClassSelector);
		}
	}

	protected _handleButtonBlur(event: FocusEvent): void {
		this._focused = false;
		this.handleBlur.emit(event);

		const closeDropdown = this._focusedOutFromComponent(
			event,
			this.dropdownItem,
			'fudis-multiselect-option__focusable'
		);

		if (closeDropdown) {
			this._parent.closeDropdown();
		}
	}

	private _isOptionVisible(filterText: string): void {
		if (this.data) {
			this.optionVisible =
				filterText && this.data.label.toLowerCase().includes(filterText.toLowerCase()) ? true : !filterText;

			if (this.optionVisible) {
				this._parent.setOptionVisibility(this.data.value, true);
			} else {
				this._parent.setOptionVisibility(this.data.value, false);
			}

			if (this.optionVisible && this._parentGroup) {
				this._parentGroup.setOptionVisibility(this.data.value, true);
			} else if (this._parentGroup) {
				this._parentGroup.setOptionVisibility(this.data.value, false);
			}
		}
	}

	private _isOptionChecked(options: FudisSelectOption[]): void {
		if (this.data) {
			const result = options.find((option) => option.label === this.data.label && option.value === this.data.value);

			this.checked = !!result;

			if (this.checked) {
				this._parent.handleCheckedSort({ ...this.data, htmlId: this._id });
			}
		}
	}
}
