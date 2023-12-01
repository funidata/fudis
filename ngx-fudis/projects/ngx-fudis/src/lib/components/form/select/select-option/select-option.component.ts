import { Component, ElementRef, Host, Input, OnInit, ViewChild } from '@angular/core';
import { FudisDropdownOption } from '../../../../types/forms';
import { DropdownItemBaseDirective } from '../../../../directives/form/dropdown-item-base/dropdown-item-base.directive';
import { FudisDropdownMenuItemService } from '../../../dropdown-menu/dropdown-menu-item/dropdown-menu-item.service';
import { FudisIdService } from '../../../../services/id/id.service';
import { SelectComponent } from '../select.component';

@Component({
	selector: 'fudis-select-option',
	templateUrl: './select-option.component.html',
	styleUrls: ['../../../dropdown-menu/dropdown-menu-item/dropdown-menu-item.component.scss'],
})
export class SelectOptionComponent extends DropdownItemBaseDirective implements OnInit {
	constructor(
		_menuService: FudisDropdownMenuItemService,
		private _idService: FudisIdService,
		@Host() protected _parentComponent: SelectComponent
	) {
		super(_menuService);
	}

	@ViewChild('dropdownItem') dropdownItem: ElementRef;

	@Input({ required: true }) value: string;

	protected _focused: boolean = false;

	ngOnInit(): void {
		if (this._parentComponent) {
			this._id = this._idService.getNewChildId('dropdown-menu', this._parentComponent.id);
		}
	}

	protected _clickSelectOption(event: Event): void {
		this.handleClick.emit(event);

		if (!this.disabled) {
			const selectedOption: FudisDropdownOption = { value: this.value, label: this.label };
			this._closeDropdown();
			this._parentComponent.control.patchValue(selectedOption);
			this._parentComponent.handleSelectionChange(selectedOption);
			this._parentComponent.inputRef.nativeElement.focus();
		}
	}

	protected _clickMultiselectOption(event: Event): void {
		this.handleClick.emit(event);
		this.handleChecked.emit();

		if (!this.disabled) {
			this.checked = !this.checked;
			const selectedOption: FudisDropdownOption = { value: this.value, label: this.label };
			this._parentComponent.handleMultiSelectionChange(selectedOption);
		}
	}

	protected _focusToOption(): void {
		this._focused = true;
	}

	protected _blurFromOption(event: FocusEvent): void {
		this._focused = false;
		this.handleBlur.emit(event);
	}

	protected _handleKeyDown(event: KeyboardEvent, selector: string) {
		if (event.key !== ' ') {
			this._baseHandleKeyDown(event, this.dropdownItem, selector);
		}
	}

	protected _handleButtonBlur(event: FocusEvent): void {
		this._baseHandleButtonBlur(event, this.dropdownItem);
	}
}
