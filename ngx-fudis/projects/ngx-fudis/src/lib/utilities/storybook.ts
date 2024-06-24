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

/**
 * Button
 */
const buttonCommonExclude: string[] = [
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

/**
 * CheckboxGroup and Checkbox
 */
export const checkboxGroupExclude: RegExp = excludeRegex([
  'groupBlurredOut',
  'setGroupBlurredOut',
  'titleVariant',
  'triggerEmit',
]);

export const checkboxGroupControlsExclude: RegExp = excludeRegex([
  'groupBlurredOut',
  'setGroupBlurredOut',
  'titleVariant',
  'id',
  'formGroup',
  'triggerEmit',
  'errorSummaryReloadOnInit',
]);

/**
 * Datepicker and Date-range
 */
const datepickerCommonExcludes: string[] = [
  'control',
  'ariaLabel',
  'disableGuidance',
  'initialFocus',
  'invalidState',
  'id',
  'errorSummaryReloadOnInit',
  'handleBlur',
  'handleKeyUp',
  'parseDateValidator',
  'endDateError',
  'startDateError',
];

export const datepickerControlsExclude: RegExp = excludeRegex([
  ...datepickerCommonExcludes,
  'focusToInput',
  'onBlur',
]);

export const datepickerExclude: RegExp = excludeRegex(['focusToInput', 'onBlur']);

export const daterangeExclude: RegExp = excludeRegex([
  'endDate',
  'startDate',
  'id',
  'initialFocus',
]);

/**
 * Description List
 */
const descriptionListCommonExclude: string[] = [
  'addChildId',
  'align',
  'alignItemsX',
  'alignItemsY',
  'childDlItems',
  'getDisabledGridStatus',
  'getVariant',
  'classes',
  'columnGap',
  'columns',
  'id',
  'serviceDefaults',
  'marginBottom',
  'marginTop',
  'removeChildId',
  'rowGap',
  'tag',
  'width',
];

export const descriptionListArgsTypesExclude: RegExp = excludeRegex([
  'id',
  'getVariant',
  'addChildId',
  'childDlItems',
  'getDisabledGridStatus',
  'removeChildId',
  'serviceDefaults',
]);

export const descriptionListExclude: RegExp = excludeRegex([...descriptionListCommonExclude]);

/**
 * Dialog
 */
export const dialogExclude: RegExp = excludeRegex(['closeButtonPositionAbsolute']);

/**
 * Error Message and Error Summary
 */
export const errorMessageExclude: RegExp = excludeRegex(['handleAddError', 'handleRemoveError']);

/**
 * Expandable
 */
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

/**
 * Form
 */
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

export const formArgTypesExclude: RegExp = excludeRegex(['rowGap', 'columns', 'classes']);

/**
 * Grid
 */
export const gridExampleExclude: RegExp = excludeRegex(['classes', 'serviceDefaults']);

/**
 * Heading
 */
export const headingControlsExclude: RegExp = excludeRegex(['id']);

/**
 * Link
 */
export const linkExclude: RegExp = excludeRegex([
  'fragmentId',
  'handleClick',
  'handleBlur',
  'handleFocus',
  'link',
  'id',
]);

/**
 * Notification
 */
export const notificationExclude: RegExp = excludeRegex(['link', 'linkTitle', 'externalLink']);

/**
 * Section
 */
export const sectionExclude: RegExp = excludeRegex(['classes', 'errorSummaryBreadcrumb', 'id']);

/**
 * Select and Multiselect
 */

export const selectArgsTableExclude: RegExp = excludeRegex([
  'componentFocused',
  'translationOptionDisabledText',
  'setFocusedOption',
  'autocompleteRef',
  'focusSelector',
  'handleSelectionChange',
  'getAutocompleteFilterText',
  'closeDropdown',
  'openDropdown',
  'setOptionVisibility',
  'focusToInput',
  'onBlur',
  'handleCheckedSort',
  'handleMultiSelectionChange',
]);

export const selectStoryControlExclude: RegExp = excludeRegex([
  'control',
  'autocomplete',
  'ariaLabel',
  'disableGuidance',
  'id',
  'initialFocus',
  'invalidState',
  'tooltip',
  'tooltipPosition',
  'tooltipToggle',
  'classes',
  'focusSelector',
  'selectionUpdate',
  'handleBlur',
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
  'checked',
  'close',
  'errorSummaryReloadOnInit',
  'handleKeyUp',
  'componentFocused',
  'setFocusedOption',
  'autocompleteRef',
  'filterTextUpdate',
  'visibleOptionsUpdate',
]);

/**
 * Text Input
 */
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

/**
 * Tooltip
 */
export const tooltipExclude: RegExp = excludeRegex([
  'handleClick',
  'handleBlur',
  'handleDestroy',
  'handleFocus',
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
