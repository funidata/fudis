import { Injectable } from '@angular/core';

type ComponentType =
	| 'autocomplete'
	| 'button'
	| 'checkbox'
	| 'datepicker'
	| 'daterange'
	| 'dlItemDetails'
	| 'dropdown'
	| 'expandable'
	| 'fieldset'
	| 'form'
	| 'heading'
	| 'inputWithLanguageOptions'
	| 'languageBadgeGroup'
	| 'radioButtonGroup'
	| 'section'
	| 'textArea'
	| 'textInput';

type IdInformation = {
	[key in ComponentType]: number;
};

@Injectable({
	providedIn: 'root',
})
export class FudisIdService {
	private _idList: IdInformation = {
		autocomplete: 0,
		button: 0,
		languageBadgeGroup: 0,
		checkbox: 0,
		datepicker: 0,
		daterange: 0,
		dlItemDetails: 0,
		dropdown: 0,
		expandable: 0,
		fieldset: 0,
		form: 0,
		heading: 0,
		inputWithLanguageOptions: 0,
		radioButtonGroup: 0,
		section: 0,
		textArea: 0,
		textInput: 0,
	};

	public getNewId(componentType: ComponentType): string {
		const orderNumber = this._idList[componentType] + 1;

		this._idList = { ...this._idList, [componentType]: orderNumber };

		const idToReturn = `fudis-${componentType}-${orderNumber}`;

		return idToReturn;
	}
}
