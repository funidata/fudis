import { Injectable } from '@angular/core';

type ComponentType =
	| 'alert'
	| 'autocomplete'
	| 'breadcrumbs'
	| 'button'
	| 'autocompleteMultiSelect'
	| 'checkboxGroup'
	| 'checkbox'
	| 'datepicker'
	| 'daterange'
	| 'dropdown'
	| 'expandable'
	| 'fieldset'
	| 'form'
	| 'heading'
	| 'inputWithLanguageOptions'
	| 'radioButton'
	| 'radioButtonGroup'
	| 'section'
	| 'textArea'
	| 'textInput';

type ParentType = 'breadcrumbs' | 'checkboxGroup' | 'radiobuttonGroup';

type FamilyIdItem = {
	parent: string;
	children: string[];
};

type FamilyIdInformation = {
	[key in ParentType]: FamilyIdItem[];
};

type IdInformation = {
	[key in ComponentType]: number;
};

@Injectable({
	providedIn: 'root',
})
export class FudisIdService {
	private _idList: IdInformation = {
		alert: 0,
		autocomplete: 0,
		breadcrumbs: 0,
		button: 0,
		autocompleteMultiSelect: 0,
		checkboxGroup: 0,
		checkbox: 0,
		datepicker: 0,
		daterange: 0,
		dropdown: 0,
		expandable: 0,
		fieldset: 0,
		form: 0,
		heading: 0,
		inputWithLanguageOptions: 0,
		radioButton: 0,
		radioButtonGroup: 0,
		section: 0,
		textArea: 0,
		textInput: 0,
	};

	private _familyIdList: FamilyIdInformation = {
		breadcrumbs: [],
		checkboxGroup: [],
		radiobuttonGroup: [],
	};

	public addNewParentId(componentType: ParentType, id: string) {
		const newItem: FamilyIdItem = {
			parent: id,
			children: [],
		};

		this._familyIdList[componentType].push(newItem);
	}

	public addNewChildId(parentType: ParentType, parentId: string, newId: string) {
		this._familyIdList[parentType].forEach((item) => {
			if (item.parent === parentId) {
				item.children.push(newId);
			}
		});
	}

	public getNewParentId(componentType: ParentType): string {
		const orderNumber = this._familyIdList[componentType].length + 1;

		const newId = `fudis-${componentType}-${orderNumber}`;

		const newItem: FamilyIdItem = {
			parent: newId,
			children: [],
		};

		this._familyIdList[componentType].push(newItem);

		return newId;
	}

	public getNewChildId(parentType: ParentType, parentId: string): string {
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

	public getNewId(componentType: ComponentType): string {
		const orderNumber = this._idList[componentType] + 1;

		this._idList = { ...this._idList, [componentType]: orderNumber };

		const idToReturn = `fudis-${componentType}-${orderNumber}`;

		return idToReturn;
	}
}
