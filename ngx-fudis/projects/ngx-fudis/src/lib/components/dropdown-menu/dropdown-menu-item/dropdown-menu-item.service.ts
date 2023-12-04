/* eslint-disable no-underscore-dangle */
import { Signal, signal } from '@angular/core';
import { FudisDropdownMenuStatus } from '../../../types/miscellaneous';

export class FudisDropdownMenuItemService {
	private _signalDropdownMenuOpen = signal<FudisDropdownMenuStatus>(null);

	setMenuStatus(status: FudisDropdownMenuStatus): void {
		this._signalDropdownMenuOpen.set(status);
	}

	getMenuStatus(): Signal<FudisDropdownMenuStatus> {
		return this._signalDropdownMenuOpen.asReadonly();
	}
}
