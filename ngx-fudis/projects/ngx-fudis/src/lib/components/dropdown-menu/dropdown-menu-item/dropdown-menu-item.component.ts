import { OnInit, Component, ElementRef, Host, ViewChild, Input, Optional, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { DropdownMenuComponent } from '../dropdown-menu.component';
import { FudisIdService } from '../../../services/id/id.service';
import { DropdownItemBaseDirective } from '../../../directives/form/dropdown-item-base/dropdown-item-base.directive';
import { ButtonComponent } from '../../button/button.component';

@Component({
	selector: 'fudis-dropdown-menu-item',
	templateUrl: './dropdown-menu-item.component.html',
	styleUrls: ['./dropdown-menu-item.component.scss'],
})
export class DropdownMenuItemComponent extends DropdownItemBaseDirective implements OnInit {
	constructor(
		private _idService: FudisIdService,
		@Host() protected _parentComponent: DropdownMenuComponent,
		@Inject(DOCUMENT) _document: Document,
		@Host() @Optional() protected _parentButton: ButtonComponent
	) {
		super(_document);
	}

	@ViewChild('dropdownItem') dropdownItem: ElementRef;

	/**
	 * Label for dropdown item
	 */
	@Input({ required: true }) label: string;

	/**
	 * Option for disabling dropdown item
	 */
	@Input() disabled: boolean = false;

	ngOnInit(): void {
		this._id = this._idService.getNewChildId('dropdown-menu', this._parentComponent.id);
	}

	protected _handleKeyDown(event: KeyboardEvent) {
		this._baseHandleKeyDown(event, this.dropdownItem, '.fudis-dropdown-menu-item__focusable');
	}

	protected _handleButtonBlur(event: FocusEvent): void {
		const closeDropdown = this._focusedOutFromComponent(
			event,
			this.dropdownItem,
			'fudis-dropdown-menu-item__focusable'
		);

		if (closeDropdown) {
			this._parentComponent.open = false;
		}
	}

	protected _closeDropdown(event: Event): void {
		if (this._parentButton) {
			this._parentButton.closeMenu();
		}

		this.handleClick.emit(event);
	}
}
