import { Component, ElementRef, Host, Input, OnInit, ViewChild } from '@angular/core';
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

	ngOnInit(): void {
		if (this._parentComponent) {
			this._id = this._idService.getNewChildId('dropdown-menu', this._parentComponent.id);
		}
	}

	protected _clickOption(event: Event): void {
		this.handleClick.emit(event);

		if (!this.disabled) {
			this._closeDropdown();
			this._parentComponent.control.patchValue({ value: this.value, label: this.label });
			this._parentComponent.inputRef.nativeElement.focus();
		}
	}

	protected _handleKeyDown(event: KeyboardEvent) {
		this._baseHandleKeyDown(event, this.dropdownItem, 'fudis-select-option button');
	}

	protected _handleButtonBlur(event: FocusEvent): void {
		this._baseHandleButtonBlur(event, this.dropdownItem);
	}
}
