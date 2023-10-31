/**
 * File containing types used in FudisIdService
 */

export const fudisIdComponents = [
	'alert',
	'autocomplete',
	'button',
	'autocomplete-multi-select',
	'datepicker',
	'daterange',
	'dropdown',
	'expandable',
	'fieldset',
	'form',
	'heading',
	'input-with-language-options',
	'section',
	'text-area',
	'text-input',
] as const;

export type FudisIdComponentType = (typeof fudisIdComponents)[number];

export const fudisIdParents = ['breadcrumbs', 'checkbox-group', 'radio-button-group'] as const;

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
