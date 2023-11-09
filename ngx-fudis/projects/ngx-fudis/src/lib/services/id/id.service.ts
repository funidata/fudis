import { Injectable } from '@angular/core';
import {
	FudisIdComponentData,
	FudisIdComponent,
	FudisIdFamily,
	FudisIdFamilyData,
	FudisIdParent,
} from '../../types/id';

@Injectable({
	providedIn: 'root',
})
export class FudisIdService {
	/**
	 * TODO: refactor to store exact id: both generated and customs
	 */
	private _componentList: FudisIdComponentData = {
		alert: [],
		autocomplete: [],
		button: [],
		'autocomplete-multi-select': [],
		datepicker: [],
		daterange: [],
		dropdown: [],
		expandable: [],
		fieldset: [],
		form: [],
		heading: [],
		'input-with-language-options': [],
		section: [],
		'text-area': [],
		'text-input': [],
	};

	/**
	 * To store family id data
	 */
	private _familyData: FudisIdFamilyData = {
		breadcrumbs: [],
		'checkbox-group': [],
		'dropdown-menu': [],
		'radio-button-group': [],
	};

	/**
	 * Generate and get a new id for a single component
	 */
	public getNewId(componentType: FudisIdComponent): string {
		const orderNumber = this._componentList[componentType].length + 1;

		const newId = `fudis-${componentType}-${orderNumber}`;

		this._componentList[componentType].push(newId);

		return newId;
	}

	/**
	 * Generate and get a new parent id in family
	 */
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

	/**
	 * Generate and get a new child id in family
	 */
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

	/**
	 * To add custom id for a parent in family
	 */
	public addNewParentId(componentType: FudisIdParent, id: string) {
		const newItem: FudisIdFamily = {
			parent: id,
			children: [],
		};

		this._familyData[componentType].push(newItem);
	}

	/**
	 * To add custom id for a child in family
	 */
	public addNewChildId(parentType: FudisIdParent, parentId: string, newId: string) {
		this._familyData[parentType].forEach((item) => {
			if (item.parent === parentId) {
				item.children.push(newId);
			}
		});
	}

	public addNewId(componentType: FudisIdComponent, customId: string): void {
		this._componentList[componentType].push(customId);
	}

	/**
	 * Get list of component amounts
	 */
	public getComponentIdList(): FudisIdComponentData {
		return this._componentList;
	}

	/**
	 * Get family data
	 */
	public getFamilyIdData(): FudisIdFamilyData {
		return this._familyData;
	}
}
