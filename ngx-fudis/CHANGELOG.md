# Changelog

All notable changes to `@funidata/ngx-fudis` are documented in this file.

For full details and PR links, see [GitHub Releases](https://github.com/funidata/fudis/releases).

---

## [8.3.3] - 2026-01-30

### Improvements

- [Documentation, VersionSelectorComponent]: Version selector improvements

### Fixes

- [Documentation, VersionSelectorComponent]: Fix the version selector's url redirect and move the selector to iframe

## [8.3.2] - 2026-01-22

### Fixes

- [Documentation, VersionSelectorComponent]: Revert version selector to earlier patch

## [8.3.1] - 2026-01-22

### Fixes

- [Documentation, VersionSelectorComponent]: Fix version selector redirect and styling

## [8.3.0] - 2026-01-21

### Features

- [DescriptionListItemDetails]: Empty state display
- [Documentation, VersionSelectorComponent]: Version selector for docs

### Improvements

- [Select, Multiselect]: Style enhancements for accessibility

### Fixes

- [Guidance]: Fix timing issue with queueMicrotask
- [Select]: Aria-live region disappears from the DOM
- [Button, IconButton, ButtonBase]: Resolve circular dependencies

## [8.2.1] - 2026-01-07

### Fixes

- [Pagination]: Fix focus handling bug
- [DialogComponent]: Fix dialog Esc key press handling
- [Dialog]: Add aria-modal attribute to MatDialogConfig

## [8.1.0] - 2025-12-02

### Features

- [DatePicker]: DateFilter input for disabling specific dates

### Fixes

- [LocalizedTextGroup]: Empty strings are no longer accepted as input
- [Footer]: Remove margin-top
- [SelectBaseDirective]: Fixed bug in mouseUp event
- [Guidance]: Remove redundant ariaLive input
- [Multiselect]: Add distinct aria descriptions for multiselect chips

## [8.0.1] - 2025-11-07

### Fixes

- [IconButton]: Add host styles
- [Multiselect]: Click event not working in Safari

## [8.0.0] - 2025-11-05

### BREAKING CHANGES

- **[Select, MultiSelect]**: Implement hovering menu — dropdown now uses a floating overlay instead of inline expansion. Review any custom positioning or styling.
- **[Footer]**: Removed Grid and Footer content directives — footer content is now placed directly without directive wrappers.
- **[Modules]**: Use `NgxFudisModule.forRoot()` in your root module to ensure singleton services. Child modules use `NgxFudisModule`.
- **[CheckboxGroup]**: `formGroup` is now a required input — was previously optional.
- **[Button]**: Removed `'icon-only'` size — use the new `fudis-icon-button` component instead.
- **[Core]**: Updated to fudis-core 2.2.0 — update your `@funidata/fudis-core` dependency.

### Features

- [Pagination]: New component for paginated navigation
- [IconButton]: New component (replaces icon-only Button size)

### Improvements

- [Breadcrumbs]: Remove styles which come from Core
- [DescriptionList]: Remove styles which come from Core

### Fixes

- [ErrorSummary]: Submit attempt counter
- [Select]: Aria-controls/aria-haspopup accessibility fixes
- [ErrorSummary]: Fix NVDA support
- [Select, MultiSelect]: Label `for` attribute

---

## [7.0.0] - 2025-08-22

### BREAKING CHANGES

- **[Components, Foundations]**: Component and Foundation styles now come from `@funidata/fudis-core`. Add `@funidata/fudis-core` as a dependency and import its styles.
- **[BodyText]**: Removed unwanted style for consecutive body-text elements.
- **[Dependencies]**: `@funidata/fudis-core` is now a required dependency.
- **[Tooltip]**: Removed deprecated tooltip directive — use `fudisPopover` directive instead.

### Improvements

- [Notification, ErrorSummary]: New aria-describedby attribute
- [Fieldset, CheckboxGroup, RadioButtonGroup]: New `'full-width'` input size option

### Fixes

- Circular dependencies resolved in several components
- [MultiSelectOption]: Identical option label handling

---

## [6.0.0] - 2025-07-14

### BREAKING CHANGES

- **[LabelHeightService, Label, Fieldset]**: Removed LabelHeightService — baseline styling is now handled by the consuming application.
- **[Checkbox]**: New standalone `fudis-checkbox` component. The checkbox used inside `fudis-checkbox-group` is renamed to `fudis-checkbox-group-option` with type `FudisCheckboxGroupOption`.
- **[Icons]**: Deleted `check-circle` and `minus-circle` icons; introduced `check-circle-fill` and `minus-circle-fill`.

### Features

- [DescriptionListItemDetails]: Empty state display
- [Checkbox]: New standalone Checkbox component for single boolean controls

---

## [5.1.2] - 2025-06-17

### Improvements

- [CheckboxGroup, RadioButtonGroup]: Screenreader error messages

### Fixes

- [DescriptionList]: Hide compact list commas from DOM
- [Datepicker, DateRange]: Date input parsing fix
- [DateRange]: Trigger date crossing check properly
- [Public API]: Expose types from public-api
- [Select, MultiSelect]: Made disabled options focusable
- [MultiSelect]: Change MultiSelect role to application

## [5.1.1] - 2025-05-12

### Fixes

- [Form Components]: Add control's touched check
- [DropdownMenu]: Fix circular dependency

## [5.1.0] - 2025-04-29

### Features

- [TabNavigation]: New tab navigation component

### Improvements

- [TextInput]: New HTML autocomplete attribute
- [Datepicker]: Updated placeholder date abbreviations
- [DialogService]: Add typings to functions

### Fixes

- [Guidance]: Unify maxLength indicator screen reader prompts
- [RadioButtonGroup, CheckboxGroup, Fieldset]: Add help text to Fieldset legend
- [Button]: CSS class fix for icon-only button
- [Notification]: Replace attention text from ARIA to its own hidden paragraph
- [LocalizedTextGroup, Select]: Aria-descendants value

## [5.0.0] - 2025-03-24

### BREAKING CHANGES

- **[Dependencies]**: Updated to Angular 19 — update your Angular dependencies accordingly.
- **[Popover]**: New `fudisPopover` directive replaces the old tooltip directive. The tooltip directive is now deprecated and will be removed in v7.

---

## [4.3.0] - 2025-03-04

### Features

- [Expandable]: Possibility to add Badge
- [DescriptionList]: Enable Tooltip in Description List Item Term

### Fixes

- [Grid]: Correct the type of columns field
- [Fieldset]: Legend does not get focused when clicking link in ErrorSummary
- [Tooltip]: Hide Tooltip when scrolled out of view
- [Dialog]: Prevent closing a dialog if the button is disabled
- [Checkbox, CheckboxGroup]: Checkbox value not read correctly by screenreaders on Firefox and Edge

## [4.2.0] - 2025-02-14

### Improvements

- [Datepicker, DateRange]: Remove hyphen, updated VR tests
- [LocalizedTextGroup]: Group label
- [DescriptionList, BodyText]: Lang attribute

### Fixes

- [DropdownMenu]: Opened menu overflows the viewport on small screen
- [AlertGroup]: Screen overflow fix
- [Dialog]: Add current dialogs length check
- [Select, Multiselect]: Usability fixes
- [SelectOption, MultiSelectOption]: Language change does not update the input value

## [4.1.0] - 2025-01-16

### Features

- [Loading Spinner]: New component

### Improvements

- [Icon]: Paperclip icon

### Fixes

- [Select, Multiselect]: Accessibility fixes (part 2)
- [Label]: Height calculation not working properly

## [4.0.0] - 2025-01-08

### BREAKING CHANGES

- **[Checkbox Group, Checkbox]**: Adjusted FormGroup and FormControl types — update your `FudisCheckboxGroupFormGroup` generics.
- **[Error Message]**: Changed from component to directive — use `[fudisValidators]` directive instead of `<fudis-error-message>`.
- **[ErrorSummary, Form, Notification]**: Property renaming — `errorSummaryTitle` renamed, Notification accessibility improvements.
- **[Expandable]**: Removed default `level` value — you must now explicitly set `[level]`.
- **[Localized Text Group]**: Type change for option values.
- **[Section, Form]**: Removed default `level` and `titleVariant` values — both `title` and `level` are now required.
- **[Section, Form, Fieldset, Notification]**: Refactored Content and Action directives — use `fudisActions` and `fudisContent` directives.
- **[Select, Expandable]**: Refactored content projection directives.

### Features

- [FudisValidatorUtilities]: Exposed utility functions for custom validation

### Improvements

- [Label, Fieldset]: Automatic Label height calculation and DOM refactoring
- [Typography]: Added empty state mixin

### Fixes

- [DescriptionList]: Screen reader detects content that should be hidden
- [DialogService]: Add chaining check for Dialog refs
- [Dialog]: Detect if dialog is scrollable
- [ErrorSummary]: Load issue after life cycle hook changes
- [LinkDirective]: Adjust rendering logic

---

## [3.2.1] - 2024-11-27

### Chore

- [Services]: General singleton service adjustments

## [3.2.0] - 2024-11-25

### Improvements

- [Dialog, Form]: Unify Dialog's header and footer positions when content includes Form
- [Error Summary Service]: Add and Remove Errors exposed in public API

### Fixes

- [Select, Multiselect]: Adjust visible label update logic for language changes
- [RadioButton]: Unify aria-invalid state

## [3.1.0] - 2024-11-07

### Improvements

- [Select, Multiselect]: New `autocompleteFilter` and `autocompleteNoResultsText` input properties
- [Dialog]: Identified read-only dialog content

### Fixes

- [DescriptionList]: Add min-height for regular DescriptionListItemDetails element
- [ErrorSummary]: Fixing sync issues with TranslationService

## [3.0.0] - 2024-10-23

### BREAKING CHANGES

- **[Angular Material]**: Updated to Material 3.
- **[Dependencies]**: Updated library peer dependencies (Angular 18).
- **[DescriptionList]**: Removed HTML selector, `marginTop` and `marginBottom` Inputs — use CSS spacing classes instead.
- **[Dialog]**: New responsive screen sizes and renamed spacing token input widths.
- **[Fieldset, Form, Section]**: Removed `marginTop` and `marginBottom` Inputs — use CSS spacing classes instead.
- **[Form Common API]**: Removed `invalidState` properties.
- **[FudisLocalizedTextGroupOption]**: Changed default `controlName` values.
- **[Grid, Section, DL]**: Removed `marginTop` and `marginBottom` from Grid; `classes` input type changed from array to string.
- **[Heading]**: Removed `marginBottom` property — use CSS spacing classes.
- **[HorizontalRule]**: New component replaces existing style class and mixin.
- **[LinkDirective, Breadcrumbs]**: Refactored Link Directive; removed Link Component — use `fudisLink` directive.
- **[RadioButton, Checkbox]**: Unified output naming; refactored blur and change events.
- **[SCSS]**: Style import optimizations — review your SCSS imports.
- **[Typography]**: Unified size syntax across all typography types.
- **[Validators]**: Renamed `FudisGroupValidators.atLeastOneRequired` to `FudisGroupValidators.oneRequired`.

### Features

- [Alert, Alert Group, Alert Service]: New components and service for application-level alerts
- [LocalizedTextGroup]: New component for multilingual text input

### Improvements

- [Dialog]: Enhanced support for multiple dialogs open simultaneously
- [Form Components]: Added `disabled` Input
- [Form, Form Field Components]: Refactored to support nested Form Field components

### Fixes

- [Checkbox]: Changed checkbox height to min height
- [Datepicker, Tooltip]: Angular Material based components style fix
- [Footer]: Too big focus area
- [RadioButton]: Long label breaks layout

---

## [2.2.0] - 2024-09-04

### Features

- [Date Range]: New component
- [Language Badge Group]: New component
- [RadioButtonGroup, RadioButton]: New components
- [Spacing]: CSS helper classes

## [2.1.0] - 2024-08-06

### Features

- [DropdownMenu]: New Dropdown Menu component

### Improvements

- [Description List]: Add classified content example, add ariaLabel input for DLItemDetails

### Fixes

- [DescriptionList]: Add font-weight for compact list colon
- [Button]: Adjust left padding, remove visible focus from disabled
- [Datepicker]: Accessibility fixes (disabled state, color contrast)
- [Checkbox, CheckboxGroup]: Accessibility fixes (disabled state, aria-describedby)

## [2.0.1] - 2024-06-28

### Fixes

- [CheckboxGroup, Datepicker, SelectBase]: Add dynamic validator updates
- [Notification]: Revert CSS width to its original state
- [Dialog, TextArea]: Fix double scrollbar and validity observable subscribe

## [2.0.0] - 2024-06-25

### BREAKING CHANGES

- **[BodyText]**: Renamed `size` Input to `variant`; removed `color` Input.
- **[Dependencies]**: Updated Angular 16 to 17.
- **[Description List]**: Refactored; removed `fudisActions` slot from DescriptionListDetailsComponent.
- **[Description List Details, Term]**: Renamed `textContent` input to `contentText`.
- **[Form, ErrorSummary]**: Removed `errorSummaryLinkType`.
- **[Form, Section]**: Renamed `titleLevel` to `level`; added badge option for Section.
- **[Heading, Section, Form]**: Renamed `size` to `variant`, `titleSize` to `titleVariant`.
- **[Link]**: Removed `color` input; link text and external icon color always `primary-dark`.
- **[Notification]**: Removed `link`, `externalLink`, and `linkTitle` inputs — use content projection instead.

### Features

- [Datepicker, DateAdapter]: Exposed to public API
- [Select, Multiselect]: Exposed to public API

### Improvements

- [Form components]: Dynamic property check on controls' `updateValueAndValidity`
- [Select, Multiselect]: Add filter help text features
- [Typography]: Add table caption mixin

---

## [1.3.1] - 2024-05-07

### Fixes

- [Grid, FormSubmit]: Adjustments for Safari

## [1.3.0] - 2024-04-30

### Features

- [Section]: Exposed component to Public API

## [1.2.1] - 2024-04-18

### Fixes

- [Spacing Classes, DL docs]: Minor fixes
- [GridUtils]: Adjust replaceAll logic

## [1.2.0] - 2024-04-16

### Features

- [DescriptionList]: Exposed DL component family to public API, support for single DL Item and multiple DD elements

### Fixes

- [Footer, Fieldset, FormSubmitDirective]: Footer logo refactor and bug fixes

## [1.1.0] - 2024-03-27

### Features

- [Checkbox Group, Checkbox]: Exposed in public API with documentation and tests

### Fixes

- [Dialog]: Fixed Dialog bugs
- [TextArea, Tooltip]: Bug fixes

## [1.0.0] - 2024-03-18

### BREAKING CHANGES

- **[Fieldset]**: Renamed `title` property.

### Improvements

- [Checkbox, CheckboxGroup]: Added formControl option to Checkbox

### Fixes

- [Text Input]: Fix character indicator for maxLength validator

---

[8.3.3]: https://github.com/funidata/fudis/releases/tag/v8.3.3
[8.3.2]: https://github.com/funidata/fudis/releases/tag/v8.3.2
[8.3.1]: https://github.com/funidata/fudis/releases/tag/v8.3.1
[8.3.0]: https://github.com/funidata/fudis/releases/tag/v8.3.0
[8.2.1]: https://github.com/funidata/fudis/releases/tag/v8.2.1
[8.1.0]: https://github.com/funidata/fudis/releases/tag/v8.1.0
[8.0.1]: https://github.com/funidata/fudis/releases/tag/v8.0.1
[8.0.0]: https://github.com/funidata/fudis/releases/tag/v8.0.0
[7.0.0]: https://github.com/funidata/fudis/releases/tag/v7.0.0
[6.0.0]: https://github.com/funidata/fudis/releases/tag/v6.0.0
[5.1.2]: https://github.com/funidata/fudis/releases/tag/v5.1.2
[5.1.1]: https://github.com/funidata/fudis/releases/tag/v5.1.1
[5.1.0]: https://github.com/funidata/fudis/releases/tag/v5.1.0
[5.0.0]: https://github.com/funidata/fudis/releases/tag/v5.0.0
[4.3.0]: https://github.com/funidata/fudis/releases/tag/v4.3.0
[4.2.0]: https://github.com/funidata/fudis/releases/tag/v4.2.0
[4.1.0]: https://github.com/funidata/fudis/releases/tag/v4.1.0
[4.0.0]: https://github.com/funidata/fudis/releases/tag/v4.0.0
[3.2.1]: https://github.com/funidata/fudis/releases/tag/v3.2.1
[3.2.0]: https://github.com/funidata/fudis/releases/tag/v3.2.0
[3.1.0]: https://github.com/funidata/fudis/releases/tag/v3.1.0
[3.0.0]: https://github.com/funidata/fudis/releases/tag/v3.0.0
[2.2.0]: https://github.com/funidata/fudis/releases/tag/v2.2.0
[2.1.0]: https://github.com/funidata/fudis/releases/tag/v2.1.0
[2.0.1]: https://github.com/funidata/fudis/releases/tag/v2.0.1
[2.0.0]: https://github.com/funidata/fudis/releases/tag/v2.0.0
[1.3.1]: https://github.com/funidata/fudis/releases/tag/v1.3.1
[1.3.0]: https://github.com/funidata/fudis/releases/tag/v1.3.0
[1.2.1]: https://github.com/funidata/fudis/releases/tag/v1.2.1
[1.2.0]: https://github.com/funidata/fudis/releases/tag/v1.2.0
[1.1.0]: https://github.com/funidata/fudis/releases/tag/v1.1.0
[1.0.0]: https://github.com/funidata/fudis/releases/tag/v1.0.0
