import { OnInit, Component, ElementRef, Host, ViewChild } from '@angular/core';
import { FudisDropdownMenuItemService } from './dropdown-menu-item.service';
import { DropdownMenuComponent } from '../dropdown-menu.component';
import { FudisIdService } from '../../../services/id/id.service';
import { DropdownItemBaseDirective } from '../../../directives/form/dropdown-item-base/dropdown-item-base.directive';

@Component({
	selector: 'fudis-dropdown-menu-item',
	templateUrl: './dropdown-menu-item.component.html',
	styleUrls: ['./dropdown-menu-item.component.scss'],
})
export class DropdownMenuItemComponent extends DropdownItemBaseDirective implements OnInit {
	constructor(
		_clickService: FudisDropdownMenuItemService,
		private _idService: FudisIdService,
		@Host() private _parentComponent: DropdownMenuComponent
	) {
		super(_clickService);
	}

	@ViewChild('dropdownItem') dropdownItem: ElementRef;

	ngOnInit(): void {
		// Check parent component's public HostBinding for multiselect usage
		if (this._parentComponent?._isMultiselect) {
			this._isMultiselectOption = true;
		}

		this._id = this._idService.getNewChildId('dropdown-menu', this._parentComponent.id);
	}

	protected _handleKeyDown(event: KeyboardEvent) {
		this._baseHandleKeyDown(event, this.dropdownItem, 'fudis-dropdown-menu-item button');
	}

	protected _handleButtonBlur(event: FocusEvent): void {
		this._baseHandleButtonBlur(event, this.dropdownItem);
	}
}
