/* eslint-disable no-underscore-dangle */
import { Injectable, Signal, signal } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class FudisDescriptionListService {
	private _signalVariant = signal<string>('');

	setVariant(variant: string): void {
		console.log(variant);
		this._signalVariant.set(variant);
	}

	getVariant(): Signal<string> {
		console.log('LAALAAAA', this._signalVariant);
		return this._signalVariant.asReadonly();
	}
}
