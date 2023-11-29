import { Component, ElementRef, Host, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { DropdownItemBaseDirective } from '../../../../directives/form/dropdown-item-base/dropdown-item-base.directive';
import { FudisDropdownMenuItemService } from '../../../dropdown-menu/dropdown-menu-item/dropdown-menu-item.service';
import { FudisIdService } from '../../../../services/id/id.service';
import { DropdownMenuComponent } from '../../../dropdown-menu/dropdown-menu.component';

@Component({
	selector: 'fudis-select-option',
	templateUrl: './select-option.component.html',
	styleUrls: ['../../../dropdown-menu/dropdown-menu-item/dropdown-menu-item.component.scss'],
})
export class SelectOptionComponent extends DropdownItemBaseDirective implements OnInit {
	constructor(
		_clickService: FudisDropdownMenuItemService,
		private _idService: FudisIdService,
		@Host() @Optional() private _parentComponent: DropdownMenuComponent
	) {
		super(_clickService);
	}

	@ViewChild('dropdownItem') dropdownItem: ElementRef;

	@Input({ required: true }) value: string;

	ngOnInit(): void {
		if (this._parentComponent) {
			if (this._parentComponent?._isMultiselect) {
				this._isMultiselectOption = true;
			}

			this._id = this._idService.getNewChildId('dropdown-menu', this._parentComponent.id);
		}
	}

	protected _handleKeyDown(event: KeyboardEvent) {
		this._baseHandleKeyDown(event, this.dropdownItem, 'fudis-select-option button');
	}

	protected _handleButtonBlur(event: FocusEvent): void {
		this._baseHandleButtonBlur(event, this.dropdownItem);
	}
}
