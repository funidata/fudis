import { Component, ElementRef, Host, Injector, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
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
		private _viewRef: ViewContainerRef,
		private _injector: Injector,
		_clickService: FudisDropdownMenuItemService,
		private _idService: FudisIdService,
		@Host() protected _parentComponent: SelectComponent
	) {
		super(_clickService);
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
		this._closeDropdown();

		// console.log(this._parent);
		// console.log(this._parentComponent);
		// console.log(this._viewRef.injector);

		if (this._parentComponent?.control) {
			this._parentComponent.control.patchValue({ value: this.value, label: this.label });
		}
	}

	protected _handleKeyDown(event: KeyboardEvent) {
		this._baseHandleKeyDown(event, this.dropdownItem, 'fudis-select-option button');
	}

	protected _handleButtonBlur(event: FocusEvent): void {
		this._baseHandleButtonBlur(event, this.dropdownItem);
	}
}
