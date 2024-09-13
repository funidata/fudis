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
 * Common Form Component excludes
 */

const formCommonExclude: string[] = [
  'control',
  'group',
  'handleFocus',
  'handleKeyUp',
  'handleViewInit',
  'handleChange',
  'handleBlur',
  'focusToInput',
  'onFocus',
  'onBlur',
  'id',
  'formGroup',
  'ariaLabel',
  'disableGuidance',
  'invalidState',
  'errorSummaryReloadOnInit',
];

/**
 * Button
 */
const buttonCommonExclude: string[] = [
  'dropdownMenuId',
  'dropdownOpen',
  'buttonEl',
  'handleBlur',
  'buttonClick',
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
export const checkboxGroupExclude: RegExp = excludeRegex(['groupBlurredOut', 'setGroupBlurredOut']);

export const checkboxGroupControlsExclude: RegExp = excludeRegex([
  ...formCommonExclude,
  'setGroupBlurredOut',
  'triggerEmit',
]);

/**
 * Datepicker and Date Range
 */
const datepickerCommonExcludes: string[] = [...formCommonExclude, 'endDateError', 'startDateError'];

export const datepickerControlsExclude: RegExp = excludeRegex([
  ...datepickerCommonExcludes,
  'dateRangeType',
]);

export const datepickerExclude: RegExp = excludeRegex(['focusToInput', 'onBlur']);

export const dateRangeExclude: RegExp = excludeRegex([
  'checkDateCrossings',
  'showDateComparisonErrors',
  'setLabelHeight',
]);

/**
 * Description List
 */
const descriptionListCommonExclude: string[] = [
  'align',
  'alignItemsX',
  'alignItemsY',
  'getDisabledGridStatus',
  'getVariant',
  'classes',
  'columnGap',
  'columns',
  'id',
  'serviceDefaults',
  'marginBottom',
  'marginTop',
  'rowGap',
  'tag',
  'width',
];

export const descriptionListArgsTypesExclude: RegExp = excludeRegex([
  'id',
  'getVariant',
  'getDisabledGridStatus',
  'serviceDefaults',
]);

export const nestedDescriptionListExclude: RegExp = excludeRegex([
  ...descriptionListCommonExclude,
  'variant',
]);

export const descriptionListExclude: RegExp = excludeRegex([...descriptionListCommonExclude]);

/**
 * Dialog
 */
export const dialogExclude: RegExp = excludeRegex(['closeButtonPositionAbsolute']);

/**
 * Dropdown Menu and Dropdown Menu Item
 */
export const dropdownMenuExclude: RegExp = excludeRegex([
  'dropdownElement',
  'dropdownMenuElement',
  'closeDropdownMenu',
  'setFocusedOption',
  'fireMaxWidthCalcEvent',
  'id',
  'hostClass',
  'handleBlur',
  'handleFocus',
]);

export const dropdownMenuItemExclude: RegExp = excludeRegex([
  'checked',
  'close',
  'handleChecked',
  'handleBlur',
  'handleClick',
  'dropdownItem',
]);

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
 * InputWithLanguageOptions
 */
export const inputWithLanguageOptionsStoryExclude: RegExp = excludeRegex([
  ...formCommonExclude,
  'options',
]);

/**
 * Language Badge Group
 */
const languageBadgeGroupCommonExclude: string[] = [
  'tooltip',
  'tooltipPosition',
  'tooltipToggle',
  'invalidOptions',
];

export const languageBadgeGroupExclude: RegExp = excludeRegex([...languageBadgeGroupCommonExclude]);

export const languageBadgeGroupControlsExclude: RegExp = excludeRegex([
  ...languageBadgeGroupCommonExclude,
  'handleClick',
]);

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
 * Radio Button Group
 */
export const radioButtonGroupControlsExclude: RegExp = excludeRegex([
  ...formCommonExclude,
  'triggerEmit',
]);

export const radioButtonGroupExclude: RegExp = excludeRegex(['triggerEmit']);

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
  ...formCommonExclude,
  'selectionUpdate',
  'filterTextUpdate',
  'focusSelector',
  'translationOptionDisabledText',
  'visibleOptionsUpdate',
  'handleSelectionChange',
  'closeDropdown',
  'componentFocused',
  'getAutocompleteFilterText',
  'openDropdown',
  'setFocusedOption',
  'setOptionVisibility',
  'autocompleteRef',
  'handleCheckedSort',
  'handleMultiSelectionChange',
]);

/**
 * Spacing
 */
export const spacingExclude: RegExp = excludeRegex([
  'ariaLabel',
  'asMenuButton',
  'buttonClick',
  'buttonEl',
  'closeMenu',
  'disabled',
  'dropdownMenuId',
  'dropdownOpen',
  'handleClick',
  'handleBlur',
  'handleDestroy',
  'handleFocus',
  'icon',
  'iconRotate',
  'label',
  'labelHidden',
  'size',
  'type',
  'variant',
  'toggleMenu',
  'tooltip',
  'tooltipPosition',
  'tooltipToggle',
]);

/**
 * Text Input
 */
export const textInputExclude: RegExp = excludeRegex(['focusToInput', 'onBlur']);

export const textInputControlsExclude: RegExp = excludeRegex([...formCommonExclude]);

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
