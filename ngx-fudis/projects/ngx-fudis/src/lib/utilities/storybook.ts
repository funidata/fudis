/**
 * Targets strings which start with underscore or with 'ng'. E.g. _internalStuff or ngOnInit.
 *
 * This has been set as default value for Storybook stories controls in preview.js
 * To use this with ArgTypes tables in stories, add it like this:
 * import {excludeReges} from "../../path/to/utilities/storybook";
 * <ArgTypes of={YourComponent} exclude={excludeRegex} />
 *
 * If you need to append the list, just provide a string[] with list of props to exclude.
 */

export const excludeRegex = (array?: string[]): RegExp => {
  const joined: string | null = array ? array.join('|') : null;

  const joinedWithRegexOr: string = joined ? `|(${joined})` : '';

  const regex = new RegExp(`(^(?:_|ng)[a-zA-Z0-9]\\w+)${joinedWithRegexOr}`);

  return regex;
};

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

export const expandableExclude: RegExp = excludeRegex([
  'ref',
  'setClosedStatus',
  'content',
  'headerButtons',
  'errorSummaryBreadcrumb',
  'addToErrorSummary',
  'removeFromErrorSummary',
]);
