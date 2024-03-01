/**
 * Targets strings which start with underscore or with 'ng'. E.g. _internalStuff or ngOnInit.
 *
 * This has been set as default value for Storybook stories controls in preview.js
 * If you need to append the list, just provide a string[] with list of props to exclude.
 */

export const excludeRegex = (array?: string[]): RegExp => {
  const joined: string | null = array ? array.join('|') : null;

  const joinedWithRegexOr: string = `|^(${joined})$`;

  const regex = new RegExp(`(^(?:_|ng)[a-zA-Z0-9]\\w+)${joinedWithRegexOr}`);

  return regex;
};

/**
 * Regex for excluding everything except given strings. E. g. to exclude everything but marginTop and variant properties: excludeEverythingExceptRegex(['marginTop', 'variant'])
 */
export const excludeEverythingExceptRegex = (array?: string[]): RegExp => {
  const joined: string | null = array ? array.join('|') : null;

  const joinedWithRegexOr: string = `|^(${joined})$`;

  const regex = new RegExp(`^(?!(^(${joinedWithRegexOr})$)).*$`);

  return regex;
};

export const excludeAllRegex: RegExp = /.*/;

const buttonCommonExclude: string[] = [
  'classes',
  'dropdownMenuId',
  'dropdownOpen',
  'buttonEl',
  'handleBlur',
  'buttonClick',
  'openMenu',
  'closeMenu',
  'toggleMenu',
];

export const buttonExclude: RegExp = excludeRegex([...buttonCommonExclude]);

export const buttonControlsExclude: RegExp = excludeRegex([
  ...buttonCommonExclude,
  'handleClick',
  'labelHidden',
]);

export const buttonIconOnlyExclude: RegExp = excludeRegex([...buttonCommonExclude, 'handleClick']);

export const checkboxGroupExclude: RegExp = excludeRegex([
  'groupBlurredOut',
  'setGroupBlurredOut',
  'titleSize',
]);

export const checkboxGroupControlsExclude: RegExp = excludeRegex([
  'groupBlurredOut',
  'setGroupBlurredOut',
  'titleSize',
  'id',
  'formGroup',
]);

export const formExclude: RegExp = excludeRegex([
  'id',
  'align',
  'alignItemsX',
  'alignItemsY',
  'classes',
  'columnGap',
  'columns',
  'marginBottom',
  'marginTop',
  'rowGap',
  'width',
]);

export const formArgTypesExclude: RegExp = excludeRegex([
  'rowGap',
  'columns',
  'classes',
]);

export const linkExclude: RegExp = excludeRegex([
  'fragmentId',
  'handleBlur',
  'handleFocus',
  'link',
]);

export const notificationExclude: RegExp = excludeRegex(['link']);

export const dialogExclude: RegExp = excludeRegex(['closeButtonPositionAbsolute']);

export const headingControlsExclude: RegExp = excludeRegex(['id']);

export const errorMessageExclude: RegExp = excludeRegex(['handleAddError', 'handleRemoveError']);

const expandableCommonExclude: string[] = [
  'ref',
  'setClosedStatus',
  'content',
  'headerButtons',
  'addToErrorSummary',
  'removeFromErrorSummary',
];

export const expandableExclude: RegExp = excludeRegex([...expandableCommonExclude]);

export const expandableControlExclude: RegExp = excludeRegex([
  ...expandableCommonExclude,
  'closedChange',
  'errorSummaryBreadcrumb',
]);

export const gridExampleExclude: RegExp = excludeRegex(['classes', 'serviceDefaults']);

export const selectCommonExclude: RegExp = excludeRegex([
  'control',
  'autocomplete',
  'autocompleteClearButton',
  'ariaLabel',
  'disableGuidance',
  'id',
  'initialFocus',
  'invalidState',
  'tooltip',
  'tooltipPosition',
  'tooltipToggle',
  'classes',
  'controlValueChangedInternally',
  'dropdownSelectionLabelText',
  'focusSelector',
  'noResultsFound',
  'selectionUpdate',
  'handleBlur',
  'getSelectedOptions',
  'handleCheckedSort',
  'handleMultiSelectionChange',
  'closeDropdown',
  'getAutocompleteFilterText',
  'openDropdown',
  'setOptionVisibility',
  'focusToInput',
  'onBlur',
  'translationOptionDisabledText',
  'handleSelectionChange',
  'handleChecked',
  'handleClick',
  'optionInputRef',
  'checked',
  'close',
]);

export const selectAndMultiselectExclude: RegExp = excludeRegex([
  'translationOptionDisabledText',
  'controlValueChangedInternally',
  'dropdownSelectionLabelText',
  'focusSelector',
  'noResultsFound',
  'handleSelectionChange',
  'closeDropdown',
  'getAutocompleteFilterText',
  'openDropdown',
  'setOptionVisibility',
  'focusToInput',
  'onBlur',
  'getSelectedOptions',
  'handleCheckedSort',
  'handleMultiSelectionChange',
]);

export const textInputExclude: RegExp = excludeRegex(['focusToInput', 'onBlur']);

export const textInputControlsExclude: RegExp = excludeRegex([
  'control',
  'focusToInput',
  'handleBlur',
  'onBlur',
  'ariaLabel',
  'disableGuidance',
  'id',
  'initialFocus',
]);

export const tooltipExclude: RegExp = excludeRegex([
  'handleClick',
  'handleBlur',
  'buttonEl',
  'label',
  'labelHidden',
  'ariaLabel',
  'disabled',
  'icon',
  'iconRotate',
  'size',
  'type',
  'variant',
  'buttonClick',
]);
