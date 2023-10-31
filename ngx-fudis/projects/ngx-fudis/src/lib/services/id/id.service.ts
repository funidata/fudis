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
	private _idList: FudisIdComponentAmounts = {
		alert: 0,
		autocomplete: 0,
		button: 0,
		autocompleteMultiSelect: 0,
		datepicker: 0,
		daterange: 0,
		dropdown: 0,
		expandable: 0,
		fieldset: 0,
		form: 0,
		heading: 0,
		inputWithLanguageOptions: 0,
		section: 0,
		textArea: 0,
		textInput: 0,
	};

	private _familyIdList: FudisIdFamilyData = {
		breadcrumbs: [],
		checkboxGroup: [],
		radiobuttonGroup: [],
	};

	public addNewParentId(componentType: FudisIdParent, id: string) {
		const newItem: FudisIdFamily = {
			parent: id,
			children: [],
		};

		this._familyIdList[componentType].push(newItem);
	}

	public addNewChildId(parentType: FudisIdParent, parentId: string, newId: string) {
		this._familyIdList[parentType].forEach((item) => {
			if (item.parent === parentId) {
				item.children.push(newId);
			}
		});
	}

	public getNewParentId(componentType: FudisIdParent): string {
		const orderNumber = this._familyIdList[componentType].length + 1;

		const newId = `fudis-${componentType}-${orderNumber}`;

		const newItem: FudisIdFamily = {
			parent: newId,
			children: [],
		};

		this._familyIdList[componentType].push(newItem);

		return newId;
	}

	public getNewChildId(parentType: FudisIdParent, parentId: string): string {
		let newId = '';
		this._familyIdList[parentType].forEach((item) => {
			if (item.parent === parentId) {
				const orderNumber = item.children.length + 1;
				newId = `${parentId}-item-${orderNumber}`;
				item.children.push(newId);
			}
		});

		return newId;
	}

	public getNewId(componentType: FudisIdComponentType): string {
		const orderNumber = this._idList[componentType] + 1;

		this._idList = { ...this._idList, [componentType]: orderNumber };

		const idToReturn = `fudis-${componentType}-${orderNumber}`;

		return idToReturn;
	}
}
