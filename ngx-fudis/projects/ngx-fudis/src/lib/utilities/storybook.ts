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

  console.log(regex);

  return regex;
};

export const excludeAllRegex: RegExp = /.*/;

export const bodyTextExclude: RegExp = excludeRegex(['classes']);

export const breadcrumbsExclude: RegExp = excludeRegex(['classes']);

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

export const headingExclude: RegExp = excludeRegex(['getHeadingMarginBottom', 'getHeadingSize']);

export const iconExclude: RegExp = excludeRegex(['classes']);

