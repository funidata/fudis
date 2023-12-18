import { Directive, ElementRef, Host, Inject, Input, Optional, ViewChild, effect } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { DropdownItemBaseDirective } from '../../../../directives/form/dropdown-item-base/dropdown-item-base.directive';
import { SelectComponent } from '../select/select.component';
import { SelectGroupComponent } from '../select-group/select-group.component';
import { FudisSelectOption } from '../../../../types/forms';
import { MultiselectComponent } from '../multiselect/multiselect.component';

@Directive({
	selector: '[fudisSelectOptionBase]',
})
export class SelectOptionBaseDirective extends DropdownItemBaseDirective {
	constructor(
		@Inject(DOCUMENT) _document: Document,
		@Host() @Optional() protected _parentGroup: SelectGroupComponent
	) {
		super(_document);

		effect(() => {
			if (this._parent.autocomplete) {
				this._isOptionVisible(this._parent.getAutocompleteFilterText()());
			}
		});
	}

	@ViewChild('optionInputRef') optionInputRef: ElementRef<HTMLOptionElement | HTMLInputElement>;

	@Input({ required: true }) data: FudisSelectOption;

	protected _optionVisible: boolean = true;

	protected _focused: boolean = false;

	protected _parent: SelectComponent | MultiselectComponent;

	protected _focusSelector: string;

	/**
	 * User focus handler
	 */
	protected _focus(): void {
		this._focused = true;
	}

	protected _isOptionVisible(filterText: string): void {
		if (this.data) {
			this._optionVisible =
				filterText && this.data.label.toLowerCase().includes(filterText.toLowerCase()) ? true : !filterText;

			this._parent.setOptionVisibility(this.data.value, this._optionVisible);

			if (this._parentGroup) {
				this._parentGroup.setOptionVisibility(this.data.value, this._optionVisible);
			}
		}
	}

	protected _keyDown(event: KeyboardEvent) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			this._clickOption(event);
		} else if (event.key !== ' ') {
			this._baseHandleKeyDown(event, this.optionInputRef, this._focusSelector);
		}
	}

	protected _blur(event: FocusEvent): void {
		this._focused = false;
		this.handleBlur.emit(event);

		const closeDropdown = this._focusedOutFromComponent(event, this.optionInputRef, this._focusSelector, true);

		if (closeDropdown) {
			this._parent.closeDropdown(true, true);
		}
	}

	// eslint-disable-next-line
	protected _clickOption(event: Event): void {}
}
