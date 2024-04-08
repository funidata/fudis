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

export const fudisIdParents = [
  'breadcrumbs',
  'checkbox-group',
  'dropdown-menu',
  'radio-button-group',
] as const;

export const fudisIdGrandParents = ['description-list', 'select', 'multiselect'];

export const fudisIdGrandParentsFirstChild = [
  'description-list-item',
  'select-group',
  'multiselect-group',
];

export type FudisIdComponent = (typeof fudisIdComponents)[number];

export type FudisIdParent = (typeof fudisIdParents)[number];

export type FudisIdGrandParent = (typeof fudisIdGrandParents)[number];

export type FudisIdGrandParentsFirstChild = (typeof fudisIdGrandParentsFirstChild)[number];

export type FudisIdSelectFamily = {
  id: string;
  nonGroupedOptions: string[];
  groups: FudisIdFamily[];
};

export type FudisIdDlItem = {
  // DL item id
  id: string;
  children: {
    // DL term id
    term: string | null;
    // DL details ids
    details: string[];
  };
};

export type FudisIdDlFamily = {
  // Main DL id
  id: string;
  // DL items
  children: FudisIdDlItem[];
};

export type FudisIdFamily = {
  id: string;
  children: string[];
};

export type FudisIdData = {
  components: {
    [key in FudisIdComponent]: string[];
  };
  parents: {
    [key in FudisIdParent]: FudisIdFamily[];
  };
  grandParents: {
    'description-list': FudisIdDlFamily[];
    select: FudisIdSelectFamily[];
    multiselect: FudisIdSelectFamily[];
  };
};
