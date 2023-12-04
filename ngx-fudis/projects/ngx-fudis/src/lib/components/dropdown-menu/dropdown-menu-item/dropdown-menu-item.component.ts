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
		_menuService: FudisDropdownMenuItemService,
		private _idService: FudisIdService,
		@Host() protected _parentComponent: DropdownMenuComponent
	) {
		super(_menuService);
	}

	@ViewChild('dropdownItem') dropdownItem: ElementRef;

	ngOnInit(): void {
		this._id = this._idService.getNewChildId('dropdown-menu', this._parentComponent.id);
	}

	protected _handleKeyDown(event: KeyboardEvent) {
		this._baseHandleKeyDown(event, this.dropdownItem, 'fudis-dropdown-menu-item button');
	}

	protected _handleButtonBlur(event: FocusEvent, id: string): void {
		this._baseHandleButtonBlur(event, this.dropdownItem, id);
	}
}
