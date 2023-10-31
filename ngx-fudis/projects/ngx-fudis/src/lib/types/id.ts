/**
 * File containing types used in FudisIdService
 */

export type FudisIdComponentType =
	| 'alert'
	| 'autocomplete'
	| 'button'
	| 'autocompleteMultiSelect'
	| 'datepicker'
	| 'daterange'
	| 'dropdown'
	| 'expandable'
	| 'fieldset'
	| 'form'
	| 'heading'
	| 'inputWithLanguageOptions'
	| 'section'
	| 'textArea'
	| 'textInput';

export type FudisIdParent = 'breadcrumbs' | 'checkboxGroup' | 'radiobuttonGroup';

export type FudisIdFamily = {
	parent: string;
	children: string[];
};

export type FudisIdFamilyData = {
	[key in FudisIdParent]: FudisIdFamily[];
};

export type FudisIdComponentAmounts = {
	[key in FudisIdComponentType]: number;
};
