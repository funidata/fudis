/* eslint-disable no-underscore-dangle */
import { Signal, signal } from '@angular/core';

export class FudisDescriptionListService {
	private _signalVariant = signal<string>('');

	setVariant(variant: string): void {
		this._signalVariant.set(variant);
	}

	getVariant(): Signal<string> {
		return this._signalVariant.asReadonly();
	}
}
