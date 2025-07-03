/**
 * Targets strings which start with underscore or with 'ng'. E.g. _internalStuff or ngOnInit.
 *
 * This has been set as default value for Storybook stories controls in preview.js If you need to
 * append the list, just provide a string[] with list of props to exclude.
 */

export const excludeRegex = (array?: string[]): RegExp => {
  const joined: string | null = array ? array.join('|') : null;

  const joinedWithRegexOr: string = `|^(${joined})$`;

  const regex = new RegExp(`(^(?:_|ng)[a-zA-Z0-9]\\w+)${joinedWithRegexOr}`);

  return regex;
};

/**
 * Regex for excluding everything except given strings. E. g. to exclude everything but variant
 * property: excludeEverythingExceptRegex(['variant'])
 */
export const excludeEverythingExceptRegex = (array?: string[]): RegExp => {
  const joined: string | null = array ? array.join('|') : null;

  const joinedWithRegexOr: string = `|^(${joined})$`;

  const regex = new RegExp(`^(?!(^(${joinedWithRegexOr})$)).*$`);

  return regex;
};

export const excludeAllRegex: RegExp = /.*/;

/**
 * Alert
 */
export const alertGroupExclude: RegExp = excludeRegex(['insideDialog', 'getVisibleStatus']);

/**
 * Common Form Component excludes
 */
const formCommonControlsExclude: string[] = [
  'tooltip',
  'tooltipPosition',
  'tooltipToggle',
  'control',
  'group',
  'handleFocus',
  'handleKeyUp',
  'handleViewInit',
  'handleChange',
  'handleBlur',
  'focusToInput',
  'onFocus',
  'id',
  'formGroup',
  'ariaLabel',
  'disableGuidance',
  'errorSummaryReloadOnInit',
  'disabled',
  'nullControlOnEmptyString',
  'initialFocus',
];

/**
 * Common Form Component excludes
 */
const formCommonDocsExclude: string[] = [
  'onFocus',
  'focusToInput',
  'tooltip',
  'tooltipPosition',
  'tooltipToggle',
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
  'tooltip',
  'tooltipPosition',
  'tooltipToggle',
  'popoverTriggerLabel',
  'popoverPosition',
  'popoverText',
  'id',
];

export const buttonExclude: RegExp = excludeRegex([...buttonCommonExclude]);

export const buttonControlsExclude: RegExp = excludeRegex([
  ...buttonCommonExclude,
  'handleClick',
  'labelHidden',
  'asMenuButton',
  'type',
  'handleFocus',
  'handleDestroy',
]);

export const buttonIconOnlyExclude: RegExp = excludeRegex([
  ...buttonCommonExclude,
  'handleClick',
  'asMenuButton',
  'type',
  'handleFocus',
  'handleDestroy',
]);

export const checkboxControlsExclude: RegExp = excludeRegex([
  'id',
  'control',
  'checkedChange',
  'toggleCheckbox',
]);

/**
 * CheckboxGroup and Checkbox
 */
export const checkboxGroupExclude: RegExp = excludeRegex([
  ...formCommonDocsExclude,
  'groupBlurredOut',
  'setGroupBlurredOut',
  'triggerEmit',
  'tooltip',
  'tooltipPosition',
  'tooltipToggle',
]);

export const checkboxGroupControlsExclude: RegExp = excludeRegex([
  ...formCommonControlsExclude,
  'setGroupBlurredOut',
  'triggerEmit',
  'tooltip',
  'tooltipPosition',
  'tooltipToggle',
]);

/**
 * Datepicker and Date Range
 */
const datepickerCommonExcludes: string[] = [
  ...formCommonControlsExclude,
  'endDateError',
  'startDateError',
];

export const datepickerControlsExclude: RegExp = excludeRegex([
  ...datepickerCommonExcludes,
  'dateRangeType',
]);

export const datepickerExclude: RegExp = excludeRegex([...formCommonDocsExclude]);

export const dateRangeExclude: RegExp = excludeRegex([
  'checkDateCrossings',
  'showDateComparisonErrors',
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

export const descriptionListItemTermExclude: RegExp = excludeRegex([
  'tooltip',
  'tooltipPosition',
  'tooltipToggle',
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
  'openOnErrorSummaryReload',
]);

export const expandableLiteExclude: RegExp = excludeRegex([
  ...expandableCommonExclude,
  'closedChange',
  'errorSummaryBreadcrumb',
  'openOnErrorSummaryReload',
  'subTitle',
  'badge',
  'badgeText',
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
  'handleUpdatedErrorList',
  'rowGap',
  'serviceDefaults',
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
export const headingControlsExclude: RegExp = excludeRegex(['id', 'headingRef']);

/**
 * LocalizedTextGroup
 */
export const LocalizedTextGroupStoryExclude: RegExp = excludeRegex([
  ...formCommonControlsExclude,
  'options',
]);

export const LocalizedTextGroupDocsExclude: RegExp = excludeRegex([...formCommonDocsExclude]);

/**
 * Language Badge Group
 */
const languageBadgeGroupCommonExclude: string[] = [
  'tooltip',
  'tooltipPosition',
  'tooltipToggle',
  'popoverPosition',
  'popoverText',
  'popoverTriggerLabel',
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
export const notificationExclude: RegExp = excludeRegex(['articleElement', 'focus']);

export const notificationArgsTableExclude: RegExp = excludeRegex(['articleElement']);

/**
 * Radio Button Group
 */
export const radioButtonGroupControlsExclude: RegExp = excludeRegex([
  ...formCommonControlsExclude,
  'triggerEmit',
]);

export const radioButtonGroupExclude: RegExp = excludeRegex([...formCommonDocsExclude]);

/**
 * Section
 */
export const sectionPropertiesExclude: RegExp = excludeRegex([
  'tooltip',
  'tooltipPosition',
  'tooltipToggle',
]);
export const sectionExclude: RegExp = excludeRegex([
  'tooltip',
  'tooltipPosition',
  'tooltipToggle',
  'classes',
  'errorSummaryBreadcrumb',
  'id',
]);

/**
 * Select and Multiselect
 */
export const selectArgsTableExclude: RegExp = excludeRegex([
  'activeDescendant',
  'componentFocused',
  'setFocusedOption',
  'autocompleteRef',
  'focusSelector',
  'handleSelectionChange',
  'getAutocompleteFilterText',
  'closeDropdown',
  'openDropdown',
  'selectCVA',
  'setOptionVisibility',
  'focusToInput',
  'handleCheckedSort',
  'handleMultiSelectionChange',
  'tooltip',
  'tooltipPosition',
  'tooltipToggle',
]);

export const selectStoryControlExclude: RegExp = excludeRegex([
  ...formCommonControlsExclude,
  'activeDescendant',
  'autocompleteFilter',
  'autocompleteNoResultsText',
  'selectionUpdate',
  'filterTextUpdate',
  'focusSelector',
  'visibleOptionsUpdate',
  'handleSelectionChange',
  'clearParentOptionVisibility',
  'closeDropdown',
  'componentFocused',
  'getAutocompleteFilterText',
  'openDropdown',
  'selectCVA',
  'selectedOptionsFromLangChange',
  'setAutocompleteFilterText',
  'setFocusedOption',
  'setOptionVisibility',
  'autocompleteRef',
  'handleCheckedSort',
  'handleMultiSelectionChange',
  'handleChecked',
  'handleClick',
  'checked',
  'close',
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
  'id',
  'label',
  'labelHidden',
  'popoverPosition',
  'popoverText',
  'popoverTriggerLabel',
  'size',
  'toggleMenu',
  'tooltip',
  'tooltipPosition',
  'tooltipToggle',
  'type',
  'variant',
]);

/**
 * Text Input
 */
export const textInputExclude: RegExp = excludeRegex([...formCommonDocsExclude]);

export const textInputControlsExclude: RegExp = excludeRegex([...formCommonControlsExclude]);

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
  'toggleMenu',
  'closeMenu',
  'dropdownOpen',
  'dropdownMenuId',
  'asMenuButton',
  'popoverText',
  'popoverPosition',
  'popoverTriggerLabel',
]);

/**
 * Popover
 */
export const popoverExclude: RegExp = excludeRegex([
  'id',
  'popoverTriggerLabel',
  'tooltip',
  'tooltipPosition',
  'tooltipToggle',
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
  'toggleMenu',
  'closeMenu',
  'dropdownOpen',
  'dropdownMenuId',
  'asMenuButton',
  'clickSubscription',
  'keydownSubscription',
  'scrollSubscription',
]);

/**
 * Tab Navigation Bar
 */
export const tabNavigationBarExclude: RegExp = excludeRegex([
  'assertScroll',
  'getAriaControls',
  'isScrollable',
  'scrollContainer',
  'scrollLeft',
  'scrollRight',
  'tabNavigation',
  'updateActiveLink',
]);

export const tabNavigationBarExampleExclude: RegExp = excludeRegex([
  'activeLink',
  'id',
  'setLink',
  'tabs',
]);

export const tabNavigationPanelExclude: RegExp = excludeRegex(['setActiveTabId']);
