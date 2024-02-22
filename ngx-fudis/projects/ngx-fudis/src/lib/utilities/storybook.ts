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

export const linkExclude: RegExp = excludeRegex([
  'fragmentId',
  'handleBlur',
  'handleFocus',
  'link',
]);

export const notificationExclude: RegExp = excludeRegex(['link']);

export const dialogExclude: RegExp = excludeRegex(['closeButtonPositionAbsolute']);

export const headingControlsExclude: RegExp = excludeRegex(['id']);

export const expandableExclude: RegExp = excludeRegex([
  'ref',
  'setClosedStatus',
  'content',
  'headerButtons',
  'errorSummaryBreadcrumb',
  'addToErrorSummary',
  'removeFromErrorSummary',
];

export const expandableExclude: RegExp = excludeRegex([...expandableCommonExclude]);
export const expandableControlExclude: RegExp = excludeRegex([
  ...expandableCommonExclude,
  'closedChange',
]);

// This is for additional Grid example tabs (Equally Wide Columns and Unequally Wide Columns).
// For some reason the default regex does not affect them.
export const gridExclude: RegExp = excludeRegex([
  'align',
  'alignItemsX',
  'alignItemsY',
  'classes',
  'columnGap',
  'ignoreDefaults',
  'marginBottom',
  'marginSides',
  'marginTop',
  'rowGap',
  'width',
  '_columns',
  '_element',
  '_gridDefaults',
  '_gridInputObject',
  '_gridService',
  '_applyGridCss',
  '_defineColumns',
  '_setColumns',
  'ngOnChanges',
  'ngOnInit',
]);

export const textInputExclude: RegExp = excludeRegex(['focusToInput', 'onBlur']);

export const iconExclude: RegExp = excludeRegex(['classes']);

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
  'onMouseEnter',
  'onMouseLeave',
  'onFocus',
  'onBlur',
  'onClick',
  'onKeyUp',
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
]);
