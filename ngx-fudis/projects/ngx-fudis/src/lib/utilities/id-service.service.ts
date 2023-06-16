import { Injectable } from '@angular/core';

type ComponentType = 'autocomplete' | 'expandable' | 'form' | 'fieldset';

type IdInformation = {
	[key in ComponentType]: number;
};

@Injectable({
	providedIn: 'root',
})
export class IdService {
	private _idList: IdInformation = {
		autocomplete: 0,
		expandable: 0,
		form: 0,
		fieldset: 0,
	};

	public getNewId(componentType: ComponentType): string {
		const orderNumber = this._idList[componentType] + 1;

		this._idList = { ...this._idList, [componentType]: orderNumber };

		const idToReturn = `fudis-${componentType}-${orderNumber}`;

		return idToReturn;
	}
}
