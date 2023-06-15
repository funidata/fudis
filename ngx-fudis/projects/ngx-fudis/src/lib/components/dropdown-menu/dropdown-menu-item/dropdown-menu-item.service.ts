/* eslint-disable no-underscore-dangle */
import { Signal, signal } from '@angular/core';

export class DropdownMenuItemService {
	private _signalDropdownMenuOpen = signal<boolean>(false);

	setMenuStatus(status: boolean): void {
		this._signalDropdownMenuOpen.set(status);
		console.log('Setting menu status: ', this._signalDropdownMenuOpen.asReadonly()());
	}

	getMenuStatus(): Signal<boolean> {
		console.log('Getting menu status: ', this._signalDropdownMenuOpen.asReadonly()());
		return this._signalDropdownMenuOpen.asReadonly();
	}
}
