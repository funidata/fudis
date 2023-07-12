import { Injectable, Signal, signal } from '@angular/core';
import { FudisDescriptionListItemDetailInfo } from '../../../../types/miscellaneous';

@Injectable({
	providedIn: 'root',
})
export class FudisDescriptionListItemDetailsService {
	private _currentDetails = signal<FudisDescriptionListItemDetailInfo[]>([]);

	getCurrentDetails(): Signal<FudisDescriptionListItemDetailInfo[]> {
		return this._currentDetails.asReadonly();
	}

	addDetail(detail: FudisDescriptionListItemDetailInfo) {
		const currentDetails = this._currentDetails();

		const existingItem = currentDetails.find((item) => {
			return item.id === detail.id;
		});

		if (existingItem) {
			const index = currentDetails.indexOf(existingItem);
			currentDetails[index] = detail;
		} else {
			currentDetails.push(detail);
		}

		this._currentDetails.set(currentDetails);
	}

	public removeDetail(detail: FudisDescriptionListItemDetailInfo): void {
		const currentDetails = this._currentDetails();

		const indexToRemove = currentDetails.indexOf(detail);

		if (indexToRemove) {
			currentDetails.splice(indexToRemove, 1);

			this._currentDetails.set(currentDetails);
		}
	}
}
