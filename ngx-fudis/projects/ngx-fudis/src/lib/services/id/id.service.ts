import { Injectable } from '@angular/core';
import {
	FudisIdComponentAmounts,
	FudisIdComponentType,
	FudisIdFamily,
	FudisIdFamilyData,
	FudisIdParent,
} from '../../types/id';

@Injectable({
	providedIn: 'root',
})
export class FudisIdService {
	private _componentList: FudisIdComponentAmounts = {
		alert: 0,
		autocomplete: 0,
		button: 0,
		'autocomplete-multi-select': 0,
		datepicker: 0,
		daterange: 0,
		dropdown: 0,
		expandable: 0,
		fieldset: 0,
		form: 0,
		heading: 0,
		'input-with-language-options': 0,
		section: 0,
		'text-area': 0,
		'text-input': 0,
	};

	private _familyData: FudisIdFamilyData = {
		breadcrumbs: [],
		'checkbox-group': [],
		'radio-button-group': [],
	};

	public addNewParentId(componentType: FudisIdParent, id: string) {
		const newItem: FudisIdFamily = {
			parent: id,
			children: [],
		};

		this._familyData[componentType].push(newItem);
	}

	public addNewChildId(parentType: FudisIdParent, parentId: string, newId: string) {
		this._familyData[parentType].forEach((item) => {
			if (item.parent === parentId) {
				item.children.push(newId);
			}
		});
	}

	public getNewParentId(componentType: FudisIdParent): string {
		const orderNumber = this._familyData[componentType].length + 1;

		const newId = `fudis-${componentType}-${orderNumber}`;

		const newItem: FudisIdFamily = {
			parent: newId,
			children: [],
		};

		this._familyData[componentType].push(newItem);

		return newId;
	}

	public getNewChildId(parentType: FudisIdParent, parentId: string): string {
		let newId = '';
		this._familyData[parentType].forEach((item) => {
			if (item.parent === parentId) {
				const orderNumber = item.children.length + 1;
				newId = `${parentId}-item-${orderNumber}`;
				item.children.push(newId);
			}
		});

		return newId;
	}

	public getFamilyData(): FudisIdFamilyData {
		return this._familyData;
	}

	public getNewId(componentType: FudisIdComponentType): string {
		const orderNumber = this._componentList[componentType] + 1;

		this._componentList = { ...this._componentList, [componentType]: orderNumber };

		const idToReturn = `fudis-${componentType}-${orderNumber}`;

		return idToReturn;
	}

	public getComponentAmounts(): FudisIdComponentAmounts {
		return this._componentList;
	}
}
