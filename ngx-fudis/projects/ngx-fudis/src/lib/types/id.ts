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
  'dialog',
  'dropdown',
  'error-message',
  'expandable',
  'fieldset',
  'form',
  'guidance',
  'heading',
  'input-with-language-options',
  'section',
  'text-area',
  'text-input',
  'validator-error-message',
] as const;

export type FudisIdComponent = (typeof fudisIdComponents)[number];

export const fudisIdParents = [
  'breadcrumbs',
  'checkbox-group',
  'description-list',
  'dropdown-menu',
  'radio-button-group',
  'select',
  'multiselect',
] as const;

export type FudisIdParent = (typeof fudisIdParents)[number];

type FudisIdFamilyBase = {
  parent: string;
  children: string[];
};

export type FudisIdFamily = {
  parent: string;
  children: string[];
  childrenGroups?: FudisIdFamilyBase[];
};

export type FudisIdFamilyData = {
  [key in FudisIdParent]: FudisIdFamily[];
};

export type FudisIdComponentData = {
  [key in FudisIdComponent]: string[];
};
