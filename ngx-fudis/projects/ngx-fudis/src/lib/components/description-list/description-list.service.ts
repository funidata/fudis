import { Signal, signal } from '@angular/core';
import { FudisDescriptionListVariant } from '../../types/miscellaneous';

export class FudisDescriptionListService {
	private _signalVariant = signal<FudisDescriptionListVariant>('regular');

	public setVariant(variant: FudisDescriptionListVariant): void {
		this._signalVariant.set(variant);
	}

	public getVariant(): Signal<FudisDescriptionListVariant> {
		return this._signalVariant.asReadonly();
	}
}
