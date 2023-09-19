import { Injectable, Signal, signal } from '@angular/core';
import { FudisGridAttributes } from '../../types/grid';

@Injectable()
export class FudisGridService {
	private _defaultGridValues = signal<FudisGridAttributes>({});

	/**
	 * To set from application default values for all Grids application uses.
	 */
	setGridDefaultValues(defaultValues: FudisGridAttributes): void {
		this._defaultGridValues.set(defaultValues);
	}

	/**
	 * Get application's default values for Grid
	 */
	getGridDefaultValues(): Signal<FudisGridAttributes | null> {
		return this._defaultGridValues.asReadonly();
	}
}
