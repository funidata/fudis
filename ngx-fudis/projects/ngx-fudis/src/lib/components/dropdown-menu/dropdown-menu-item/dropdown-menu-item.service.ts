/* eslint-disable no-underscore-dangle */
import { Signal, signal } from '@angular/core';

export class DropdownMenuItemService {
	private _signalDropdownMenuOpen = signal<boolean>(false);

	setMenuStatus(status: boolean): void {
		this._signalDropdownMenuOpen.set(status);
	}

	getMenuStatus(): Signal<boolean> {
		return this._signalDropdownMenuOpen.asReadonly();
	}
}
