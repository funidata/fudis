/**
 * File containing types used in FudisIdService
 */

export const fudisIdComponents = [
	'alert',
	'autocomplete',
	'button',
	'autocompleteMultiSelect',
	'datepicker',
	'daterange',
	'dropdown',
	'expandable',
	'fieldset',
	'form',
	'heading',
	'inputWithLanguageOptions',
	'section',
	'textArea',
	'textInput',
] as const;

export type FudisIdComponentType = (typeof fudisIdComponents)[number];

export const fudisIdParents = ['breadcrumbs', 'checkboxGroup', 'radiobuttonGroup'] as const;

export type FudisIdParent = (typeof fudisIdParents)[number];

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
