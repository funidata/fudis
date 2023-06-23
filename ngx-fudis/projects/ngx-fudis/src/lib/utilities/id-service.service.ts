import { Injectable } from '@angular/core';

type ComponentType = 'expandable' | 'form' | 'fieldset' | 'section' | 'heading';

type IdInformation = {
	[key in ComponentType]: number;
};

@Injectable({
	providedIn: 'root',
})
export class FudisIdService {
	private _idList: IdInformation = {
		expandable: 0,
		form: 0,
		fieldset: 0,
		section: 0,
		heading: 0,
	};

	public getNewId(componentType: ComponentType): string {
		const orderNumber = this._idList[componentType] + 1;

		this._idList = { ...this._idList, [componentType]: orderNumber };

		const idToReturn = `fudis-${componentType}-${orderNumber}`;

		return idToReturn;
	}
}
