/**
 * File containing types used in FudisIdService
 */

export const fudisIdComponents = [
  'alert',
  'autocomplete',
  'body-text',
  'button',
  'autocomplete-multi-select',
  'datepicker',
  'dialog',
  'dropdown',
  'error-message',
  'expandable',
  'fieldset',
  'form',
  'guidance',
  'heading',
  'input-with-language-options',
  'link',
  'section',
  'text-area',
  'text-input',
  'validator-error-message',
] as const;

export const fudisIdParents = [
  'breadcrumbs',
  'checkbox-group',
  'language-badge-group',
  'radio-button-group',
] as const;

export const fudisIdGrandParents = [
  'description-list',
  'select',
  'multiselect',
  'dropdown-menu',
] as const;

export type FudisIdComponent = (typeof fudisIdComponents)[number];

export type FudisIdParent = (typeof fudisIdParents)[number];

export type FudisIdGrandParent = (typeof fudisIdGrandParents)[number];

/**
 * Select and Multiselect component ids and its grouped and non-grouped options
 */
export type FudisIdSelectFamily = {
  id: string;
  nonGroupedOptions: string[];
  groups: {
    [groupId: string]: string[];
  };
};

/**
 * Description List Item component id and its child term and details ids
 */
export type FudisIdDlItem = {
  term: string[];
  details: string[];
};

/**
 * Description List component id and its child items
 */
export type FudisIdDlFamily = {
  id: string;
  items: {
    [itemId: string]: FudisIdDlItem;
  };
};

/**
 * Dropdown Menu component id and its grouped and non-grouped items
 */
export type FudisIdDropdownMenuFamily = {
  id: string;
  nonGroupedOptions: string[];
  groups: {
    [groupId: string]: string[];
  };
};

/**
 * Collection of all ids
 */
export type FudisIdData = {
  components: {
    [key in FudisIdComponent]: string[];
  };
  parents: {
    [key in FudisIdParent]: {
      [parentId: string]: string[];
    };
  };
  grandParents: {
    'description-list': {
      [parentId: string]: FudisIdDlFamily;
    };
    'dropdown-menu': {
      [parentId: string]: FudisIdDropdownMenuFamily;
    };
    select: {
      [parentId: string]: FudisIdSelectFamily;
    };
    multiselect: {
      [parentId: string]: FudisIdSelectFamily;
    };
  };
};
