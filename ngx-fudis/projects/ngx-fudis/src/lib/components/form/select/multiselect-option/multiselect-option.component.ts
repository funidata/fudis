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

	/**
	 * ElementRef for option <input> element
	 */
	@ViewChild('optionInputRef') optionInputRef: ElementRef<HTMLInputElement | HTMLButtonElement>;

	/**
	 * Bind CSS class to Angular component wrapper
	 */
	@HostBinding('class') classes = 'fudis-select-option-host';

	/**
	 * Option info containing at least value & label
	 */
	@Input({ required: true }) data: FudisSelectOption;

	/**
	 * State of option visibility with autocomplete
	 */
	protected _optionVisible: boolean = true;

	/**
	 * State of user focus for the option
	 */
	protected _focused: boolean = false;

	/**
	 * On init check if option is visible or checked
	 */
	ngOnInit(): void {
		if (this._parent.autocomplete) {
			this._isOptionVisible(this._parent.getAutocompleteFilterText()());
		}
		this._isOptionChecked(this._parent.getSelectedOptions()());
	}

	/**
	 * Click handler for clicking the option
	 * @param event Event
	 */
	protected _clickOption(event: Event): void {
		if (!this.data.disabled) {
			this.checked = !this.checked;
			const selectedOption: FudisSelectOption = { ...this.data, fudisGeneratedHtmlId: this._id };

			if (this.checked) {
				this._parent.handleMultiSelectionChange(selectedOption, 'add');
			} else {
				this._parent.handleMultiSelectionChange(selectedOption, 'remove');
			}

			this.handleClick.emit(event);
			this.handleChecked.emit();
		}
	}

	/**
	 * User focus handler
	 */
	protected _focus(): void {
		this._focused = true;
	}

	protected _keyDown(event: KeyboardEvent, cssClassSelector: string) {
		if (event.key === 'Enter') {
			this._clickOption(event);
		} else if (event.key !== ' ') {
			this._baseHandleKeyDown(event, this.optionInputRef, cssClassSelector);
		}
	}

	protected _blur(event: FocusEvent): void {
		this._focused = false;
		this.handleBlur.emit(event);

		const closeDropdown = this._focusedOutFromComponent(
			event,
			this.optionInputRef,
			'fudis-multiselect-option__focusable',
			true
		);

		if (closeDropdown) {
			this._parent.closeDropdown(true, true);
		}
	}

	private _isOptionVisible(filterText: string): void {
		if (this.data) {
			this._optionVisible =
				filterText && this.data.label.toLowerCase().includes(filterText.toLowerCase()) ? true : !filterText;

			if (this._optionVisible) {
				this._parent.setOptionVisibility(this.data.value, true);
			} else {
				this._parent.setOptionVisibility(this.data.value, false);
			}

			if (this._optionVisible && this._parentGroup) {
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
				this._parent.handleCheckedSort({ ...this.data, fudisGeneratedHtmlId: this._id });
			}
		}
	}
}
