/**
 * Targets strings which start with underscore or with 'ng'. E.g. _internalStuff or ngOnInit.
 *
 * This has been set as default value for Storybook stories controls in preview.js
 * If you need to append the list, just provide a string[] with list of props to exclude.
 */

export const excludeRegex = (array?: string[]): RegExp => {
  const singleValue = array && array.length === 1;

  const joined: string | null = array ? array.join('|') : null;

  const joinedWithRegexOr: string = singleValue ? `|${joined}` : joined ? `|(${joined})` : '';

  const regex = new RegExp(`(^(?:_|ng)[a-zA-Z0-9]\\w+)${joinedWithRegexOr}`);

  return regex;
};

export const excludeAllRegex: RegExp = /.*/;

export const buttonExclude: RegExp = excludeRegex([
  'classes',
  'dropdownMenuId',
  'dropdownOpen',
  'buttonEl',
  'handleBlur',
  'buttonClick',
  'openMenu',
  'closeMenu',
  'toggleMenu',
]);

export const checkboxGroupExclude: RegExp = excludeRegex(['groupBlurredOut', 'setGroupBlurredOut']);

export const linkExclude: RegExp = excludeRegex(['handleBlur', 'handleFocus']);

export const dialogExclude: RegExp = excludeRegex(['closeButtonPositionAbsolute']);

export const expandableExclude: RegExp = excludeRegex([
  'ref',
  'setClosedStatus',
  'content',
  'headerButtons',
  'errorSummaryBreadcrumb',
  'addToErrorSummary',
  'removeFromErrorSummary',
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

export const headingExclude: RegExp = excludeRegex(['getHeadingMarginBottom', 'getHeadingSize']);