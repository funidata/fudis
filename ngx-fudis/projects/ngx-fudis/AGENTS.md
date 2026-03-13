# @funidata/ngx-fudis — AI Agent Reference

> Angular component library by Funidata. This file is shipped with the npm package to help AI coding agents use Fudis components correctly.
>
> **Angular:** >=20 | **Peer deps:** `@angular/cdk`, `@angular/material`, `@funidata/fudis-core`
>
> **Source & stories:** https://github.com/funidata/fudis | **Storybook:** https://fudis.funidata.fi

---

## Table of Contents

- [Setup](#setup)
- [Validators](#validators)
- [Composition Rules](#composition-rules)
- [Components](#components)
  - [Button](#button)
  - [Icon Button](#icon-button)
  - [Icon](#icon)
  - [Heading](#heading)
  - [Body Text](#body-text)
  - [Grid](#grid)
  - [Grid Item](#grid-item)
  - [Section](#section)
  - [Expandable](#expandable)
  - [Form](#form)
  - [Fieldset](#fieldset)
  - [Text Input](#text-input)
  - [Text Area](#text-area)
  - [Select](#select)
  - [Multiselect](#multiselect)
  - [Datepicker](#datepicker)
  - [Date Range](#date-range)
  - [Checkbox](#checkbox)
  - [Checkbox Group](#checkbox-group)
  - [Radio Button Group](#radio-button-group)
  - [Localized Text Group](#localized-text-group)
  - [Dialog](#dialog)
  - [Dropdown Menu](#dropdown-menu)
  - [Notification](#notification)
  - [Alert Group](#alert-group)
  - [Badge](#badge)
  - [Description List](#description-list)
  - [Breadcrumbs](#breadcrumbs)
  - [Tab Navigation](#tab-navigation)
  - [Pagination](#pagination)
  - [Loading Spinner](#loading-spinner)
  - [Footer](#footer)
  - [Horizontal Rule](#horizontal-rule)
  - [Language Badge Group](#language-badge-group)
- [Directives](#directives)
- [Services](#services)
- [Type Quick Reference](#type-quick-reference)

---

## Setup

```typescript
import { NgxFudisModule } from "@funidata/ngx-fudis";

@NgModule({
  imports: [NgxFudisModule],
})
export class AppModule {}
```

Import in your main SCSS:

```scss
@use "@funidata/ngx-fudis" as fudis;
```

---

## Validators

Fudis uses its own validators that wrap Angular's built-in ones. **You must use `FudisValidators` instead of Angular's `Validators`** because Fudis components read error messages from the validator metadata.

```typescript
import { FudisValidators, FudisGroupValidators } from '@funidata/ngx-fudis';

// FormControl validators
control = new FormControl(null, [
  FudisValidators.required('This field is required'),
  FudisValidators.minLength(3, 'Minimum 3 characters'),
  FudisValidators.maxLength(100, 'Maximum 100 characters'),
  FudisValidators.email('Invalid email format'),
  FudisValidators.min(0, 'Must be positive'),
  FudisValidators.max(999, 'Too large'),
  FudisValidators.pattern(/^[a-z]+$/, 'Only lowercase letters'),
]);

// Datepicker validators
dateControl = new FormControl(null, [
  FudisValidators.datepickerMin({ value: new Date('2024-01-01'), message: 'Too early' }),
  FudisValidators.datepickerMax({ value: new Date('2025-12-31'), message: 'Too late' }),
]);

// FormGroup validators (for CheckboxGroup, LocalizedTextGroup)
formGroup = new FormGroup({ ... }, [
  FudisGroupValidators.oneRequired('Select at least one'),
  FudisGroupValidators.min({ value: 2, message: 'Select at least 2' }),
  FudisGroupValidators.max({ value: 5, message: 'Select at most 5' }),
]);
```

Messages can be `string` or `Observable<string>` for dynamic translations.

---

## Composition Rules

These constraints are enforced at runtime and are **not optional**:

| Child                                                | Must be inside                        | Notes                                                                                     |
| ---------------------------------------------------- | ------------------------------------- | ----------------------------------------------------------------------------------------- |
| `fudis-dropdown-menu`                                | `fudis-icon-button`                   | Parent must have `[asMenuButton]="true"`                                                  |
| `fudis-breadcrumbs-item`                             | `fudis-breadcrumbs`                   | Uses `@Host()` injection                                                                  |
| `fudis-datepicker` (in range)                        | `fudis-date-range`                    | Uses `@Host() @Optional()` — optional                                                     |
| `fudisFormSubmit`                                    | `fudis-button`                        | Directive applied on a `fudis-button`; button must be inside a `fudis-form`               |
| `fudis-select-option`                                | `fudis-select`                        | Content projected via `fudisSelectOptions` directive                                      |
| `fudis-multiselect-option`                           | `fudis-multiselect`                   | Content projected via `fudisSelectOptions` directive                                      |
| `fudis-select-group`                                 | `fudis-select` or `fudis-multiselect` | Groups options visually                                                                   |
| `fudis-checkbox-group-option`                        | `fudis-checkbox-group`                | Child provides `[controlName]` matching FormGroup key                                     |
| `fudis-radio-button`                                 | `fudis-radio-button-group`            | Child provides option value+label                                                         |
| `fudis-tab-navigation-tab`                           | `fudis-tab-navigation-bar`            | Attribute selector: `<a fudis-tab-navigation-tab>` or `<button fudis-tab-navigation-tab>` |
| Form content directives (`fudis-form-content`, etc.) | `fudis-form`                          | See [Directives](#directives)                                                             |

### Dialog must be opened via service

```typescript
// Dialog is NOT used as inline HTML. Open it via FudisDialogService:
constructor(private dialogService: FudisDialogService) {}

openDialog() {
  this.dialogService.open(MyDialogComponent, { size: 'md' });
}
```

Inside the dialog component template, use `fudis-dialog` with content directives:

```html
<fudis-dialog [size]="'md'">
  <fudis-heading fudisDialogTitle>Title here</fudis-heading>
  <fudis-dialog-content>Content here</fudis-dialog-content>
  <fudis-dialog-actions>
    <fudis-button fudisDialogClose [label]="'Close'"></fudis-button>
  </fudis-dialog-actions>
</fudis-dialog>
```

---

## Components

### Button

**Selector:** `fudis-button`

| Input             | Type                                          | Default     | Required | Description                          |
| ----------------- | --------------------------------------------- | ----------- | -------- | ------------------------------------ |
| `label`           | `string`                                      | —           | **yes**  | Text content of the button           |
| `variant`         | `'primary' \| 'secondary' \| 'tertiary'`      | `'primary'` | no       | Button style variant                 |
| `size`            | `'small' \| 'medium'`                         | `'medium'`  | no       | Button size (excludes 'extra-small') |
| `type`            | `'submit' \| 'button'`                        | `'button'`  | no       | HTML button type                     |
| `disabled`        | `boolean`                                     | `false`     | no       | Disables the button                  |
| `icon`            | `FudisIcon`                                   | `undefined` | no       | Icon displayed in button             |
| `iconRotate`      | `'flip-180' \| 'cw-90' \| 'ccw-90' \| 'none'` | `'none'`    | no       | Icon rotation                        |
| `popoverText`     | `string`                                      | —           | no       | Popover tooltip text                 |
| `popoverPosition` | `'left' \| 'right' \| 'above' \| 'below'`     | `'below'`   | no       | Popover position                     |

| Output        | Type                       | Description |
| ------------- | -------------------------- | ----------- |
| `handleClick` | `EventEmitter<Event>`      | Click event |
| `handleFocus` | `EventEmitter<FocusEvent>` | Focus event |
| `handleBlur`  | `EventEmitter<FocusEvent>` | Blur event  |

```html
<fudis-button [label]="'Save'" [variant]="'primary'" (handleClick)="onSave()"></fudis-button>
<fudis-button [label]="'Cancel'" [variant]="'secondary'" [size]="'small'"></fudis-button>
<fudis-button [label]="'Search'" [icon]="'search'" [variant]="'tertiary'"></fudis-button>
```

---

### Icon Button

**Selector:** `fudis-icon-button`

| Input          | Type                                     | Default     | Required | Description                            |
| -------------- | ---------------------------------------- | ----------- | -------- | -------------------------------------- |
| `ariaLabel`    | `string`                                 | —           | **yes**  | Accessible label for the button        |
| `icon`         | `FudisIcon`                              | —           | **yes**  | Icon to display                        |
| `asMenuButton` | `boolean`                                | `false`     | no       | Enables dropdown menu trigger behavior |
| `variant`      | `'primary' \| 'secondary' \| 'tertiary'` | `'primary'` | no       | Style variant                          |
| `size`         | `'extra-small' \| 'small' \| 'medium'`   | `'medium'`  | no       | Button size                            |
| `disabled`     | `boolean`                                | `false`     | no       | Disables the button                    |

| Output        | Type                       | Description |
| ------------- | -------------------------- | ----------- |
| `handleClick` | `EventEmitter<Event>`      | Click event |
| `handleFocus` | `EventEmitter<FocusEvent>` | Focus event |
| `handleBlur`  | `EventEmitter<FocusEvent>` | Blur event  |

```html
<fudis-icon-button
  [ariaLabel]="'Edit item'"
  [icon]="'edit'"
  [variant]="'tertiary'"
  (handleClick)="onEdit()"
>
</fudis-icon-button>

<!-- As dropdown menu trigger -->
<fudis-icon-button [ariaLabel]="'More actions'" [icon]="'three-dots'" [asMenuButton]="true">
  <fudis-dropdown-menu>
    <fudis-dropdown-menu-item [label]="'Edit'" (handleClick)="edit()"></fudis-dropdown-menu-item>
    <fudis-dropdown-menu-item
      [label]="'Delete'"
      (handleClick)="delete()"
    ></fudis-dropdown-menu-item>
  </fudis-dropdown-menu>
</fudis-icon-button>
```

---

### Icon

**Selector:** `fudis-icon`

| Input    | Type                                                                                                    | Default       | Required |
| -------- | ------------------------------------------------------------------------------------------------------- | ------------- | -------- |
| `icon`   | `FudisIcon`                                                                                             | —             | **yes**  |
| `color`  | `'yellow' \| 'red' \| 'gray-dark' \| 'gray-light' \| 'primary' \| 'primary-dark' \| 'green' \| 'white'` | `'gray-dark'` | no       |
| `rotate` | `'flip-180' \| 'cw-90' \| 'ccw-90' \| 'none'`                                                           | `'none'`      | no       |

```html
<fudis-icon [icon]="'search'" [color]="'primary'"></fudis-icon>
```

---

### Heading

**Selector:** `fudis-heading`

| Input     | Type                                                     | Default         | Required |
| --------- | -------------------------------------------------------- | --------------- | -------- |
| `level`   | `1 \| 2 \| 3 \| 4 \| 5 \| 6`                             | —               | **yes**  |
| `variant` | `'xxs' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'xxl'` | auto from level | no       |
| `align`   | `'left' \| 'right' \| 'center'`                          | `'left'`        | no       |
| `id`      | `string`                                                 | auto-generated  | no       |

```html
<fudis-heading [level]="2" [variant]="'lg'">Page Title</fudis-heading>
```

---

### Body Text

**Selector:** `fudis-body-text`

| Input     | Type                                                                       | Default        | Required |
| --------- | -------------------------------------------------------------------------- | -------------- | -------- |
| `variant` | `'lg-regular' \| 'md-regular' \| 'sm-regular' \| 'lg-light' \| 'md-light'` | `'md-regular'` | no       |
| `align`   | `'left' \| 'right' \| 'center'`                                            | `'left'`       | no       |
| `lang`    | `'fi' \| 'sv' \| 'en'`                                                     | —              | no       |

```html
<fudis-body-text>This is a paragraph of body text.</fudis-body-text>
```

---

### Grid

**Selector:** `fudis-grid` (component) or `fudisGrid` (directive on any element)

| Input         | Type                                                                            | Default        | Description                                    |
| ------------- | ------------------------------------------------------------------------------- | -------------- | ---------------------------------------------- |
| `columns`     | `string \| number \| { xs: ..., md: ..., lg: ... }`                             | `'1fr'`        | CSS grid-template-columns or responsive object |
| `align`       | `'start' \| 'end' \| 'center'`                                                  | `'start'`      | Grid alignment in parent                       |
| `alignItemsX` | `'start' \| 'center' \| 'end' \| 'stretch' \| 'baseline'`                       | `'stretch'`    | Horizontal alignment of items                  |
| `alignItemsY` | `'start' \| 'center' \| 'end' \| 'stretch' \| 'baseline'`                       | `'stretch'`    | Vertical alignment of items                    |
| `columnGap`   | `'none' \| 'xxs' \| 'xs' \| 'sm' \| 'md' \| 'lg' 'xl' \| 'xxl' \| 'responsive'` | `'responsive'` | Gap between columns                            |
| `rowGap`      | `'none' \| 'xxs' \| 'xs' \| 'sm' \| 'md' \| 'lg' 'xl' \| 'xxl' \| 'responsive'` | `'none'`       | Gap between rows                               |
| `width`       | `'xxl' \| 'xl' \| 'lg' \| 'md' \| 'sm' \| 'xs' \| 'initial'`                    | `'xxl'`        | Max width                                      |
| `classes`     | `string`                                                                        | —              | Custom CSS classes                             |

```html
<fudis-grid [columns]="{ md: '1fr 1fr', lg: '2fr 1fr 1fr' }" [rowGap]="'sm'">
  <fudis-text-input ...></fudis-text-input>
  <fudis-text-input ...></fudis-text-input>
  <fudis-text-input ...></fudis-text-input>
</fudis-grid>
```

---

### Grid Item

**Selector:** `fudis-grid-item` (component) or `fudisGridItem` (directive on any element)

| Input        | Type                                                              | Default     | Description               |
| ------------ | ----------------------------------------------------------------- | ----------- | ------------------------- |
| `columns`    | `number \| string \| 'stretch' \| 'auto' \| { xs: ..., md: ... }` | `'auto'`    | Column span               |
| `alignSelfX` | `'start' \| 'end' \| 'center' \| 'stretch'`                       | `'stretch'` | Horizontal self-alignment |
| `alignSelfY` | `'start' \| 'end' \| 'center' \| 'stretch'`                       | `'stretch'` | Vertical self-alignment   |

```html
<fudis-grid [columns]="3">
  <fudis-grid-item [columns]="2">Spans 2 columns</fudis-grid-item>
  <fudis-grid-item>Single column</fudis-grid-item>
</fudis-grid>
```

---

### Section

**Selector:** `fudis-section`

| Input                    | Type                        | Default         | Required |
| ------------------------ | --------------------------- | --------------- | -------- |
| `title`                  | `string`                    | —               | **yes**  |
| `level`                  | `1-6`                       | —               | **yes**  |
| `titleVariant`           | `FudisHeadingVariant`       | auto from level | no       |
| `width`                  | `FudisGridWidth`            | `'initial'`     | no       |
| `align`                  | `FudisGridAlign`            | `'start'`       | no       |
| `badge`                  | `FudisBadgeVariant \| null` | —               | no       |
| `badgeText`              | `string \| null`            | —               | no       |
| `errorSummaryBreadcrumb` | `boolean`                   | `false`         | no       |
| `classes`                | `string`                    | —               | no       |
| `popoverText`            | `string`                    | —               | no       |

```html
<fudis-section [title]="'Personal Info'" [level]="3">
  <fudis-section-actions>
    <fudis-button [label]="'Edit'" [variant]="'secondary'"></fudis-button>
  </fudis-section-actions>
  <fudis-section-content>
    <p>Section content here</p>
  </fudis-section-content>
</fudis-section>
```

---

### Expandable

**Selector:** `fudis-expandable`

| Input                    | Type                        | Default     | Required |
| ------------------------ | --------------------------- | ----------- | -------- |
| `title`                  | `string`                    | —           | **yes**  |
| `level`                  | `number`                    | —           | **yes**  |
| `variant`                | `'regular' \| 'lite'`       | `'regular'` | no       |
| `padding`                | `'default' \| 'small'`      | `'default'` | no       |
| `closed`                 | `boolean`                   | `true`      | no       |
| `subTitle`               | `string`                    | —           | no       |
| `badge`                  | `FudisBadgeVariant \| null` | —           | no       |
| `badgeText`              | `string \| null`            | —           | no       |
| `errorSummaryBreadcrumb` | `boolean`                   | `false`     | no       |

| Output         | Type                    |
| -------------- | ----------------------- |
| `closedChange` | `EventEmitter<boolean>` |

```html
<fudis-expandable [title]="'Additional Details'" [level]="3">
  <fudis-expandable-actions>
    <fudis-button [label]="'Additional action'"></fudis-button>
  </fudis-expandable-actions>
  <ng-template fudisExpandableContent>
    <p>Hidden content revealed on expand.</p>
  </ng-template>
</fudis-expandable>
```

---

### Form

**Selector:** `fudis-form`

Extends Grid — all Grid inputs are available (`columns`, `rowGap`, `width`, etc.).

| Input                 | Type                                                     | Default            | Required |
| --------------------- | -------------------------------------------------------- | ------------------ | -------- |
| `title`               | `string`                                                 | —                  | **yes**  |
| `level`               | `1-6`                                                    | —                  | **yes**  |
| `titleVariant`        | `'xxs' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| 'xxl'` | auto from level    | no       |
| `helpText`            | `string`                                                 | —                  | no       |
| `badge`               | `FudisBadgeVariant \| null`                              | —                  | no       |
| `badgeText`           | `string \| null`                                         | —                  | no       |
| `errorSummaryVisible` | `boolean`                                                | `false`            | no       |
| `errorSummaryTitle`   | `string`                                                 | default Fudis text | no       |
| `id`                  | `string`                                                 | auto-generated     | no       |

| Output                   | Type                                                    |
| ------------------------ | ------------------------------------------------------- |
| `handleUpdatedErrorList` | `EventEmitter<{id: string, message: string}[] \| null>` |

```html
<fudis-form [title]="'Registration'" [level]="2" [errorSummaryVisible]="showErrors">
  <fudis-form-content>
    <fudis-text-input [label]="'Name'" [control]="nameControl"></fudis-text-input>
    <fudis-text-input [label]="'Email'" [control]="emailControl"></fudis-text-input>
  </fudis-form-content>
  <fudis-form-actions>
    <fudis-button fudisFormSubmit [label]="'Submit'" [formValid]="form.valid"></fudis-button>
  </fudis-form-actions>
</fudis-form>
```

---

### Fieldset

**Selector:** `fudis-fieldset`

Groups related form fields with a `<fieldset>` and `<legend>`.

| Input      | Type     | Default | Required |
| ---------- | -------- | ------- | -------- |
| `label`    | `string` | —       | **yes**  |
| `helpText` | `string` | —       | no       |

```html
<fudis-fieldset [label]="'Address'">
  <fudis-fieldset-content>
    <fudis-text-input [label]="'Street'" [control]="streetControl"></fudis-text-input>
    <fudis-text-input [label]="'City'" [control]="cityControl"></fudis-text-input>
  </fudis-fieldset-content>
</fudis-fieldset>
```

---

### Text Input

**Selector:** `fudis-text-input`

Inherits from TextFieldComponentBase → ControlComponentBase → FormCommonApi → PopoverApi.

| Input                      | Type                                                            | Default  | Required | Description            |
| -------------------------- | --------------------------------------------------------------- | -------- | -------- | ---------------------- |
| `control`                  | `FormControl<string \| null \| number>`                         | —        | **yes**  | Reactive form control  |
| `label`                    | `string`                                                        | —        | **yes**  | Label text             |
| `type`                     | `'email' \| 'number' \| 'password' \| 'tel' \| 'text' \| 'url'` | `'text'` | no       | HTML input type        |
| `size`                     | `'sm' \| 'md' \| 'lg'`                                          | `'lg'`   | no       | Input width            |
| `helpText`                 | `string`                                                        | —        | no       | Help text below input  |
| `disabled`                 | `boolean`                                                       | `false`  | no       | Disable input          |
| `initialFocus`             | `boolean`                                                       | `false`  | no       | Auto-focus on load     |
| `autocomplete`             | `string \| string[]`                                            | `'off'`  | no       | HTML autocomplete      |
| `name`                     | `string \| null`                                                | `null`   | no       | HTML name attribute    |
| `step`                     | `number \| 'any' \| null`                                       | `null`   | no       | Step for number inputs |
| `nullControlOnEmptyString` | `boolean`                                                       | `true`   | no       | Set null instead of '' |

| Output        | Type                          |
| ------------- | ----------------------------- |
| `handleBlur`  | `EventEmitter<FocusEvent>`    |
| `handleFocus` | `EventEmitter<FocusEvent>`    |
| `handleKeyUp` | `EventEmitter<KeyboardEvent>` |

```typescript
nameControl = new FormControl<string | null>(null, [
  FudisValidators.required("Name is required"),
  FudisValidators.maxLength(100, "Max 100 characters"),
]);
```

```html
<fudis-text-input
  [label]="'Full name'"
  [control]="nameControl"
  [helpText]="'Enter your legal name'"
></fudis-text-input>
```

---

### Text Area

**Selector:** `fudis-text-area`

Same inputs as Text Input (minus `type`, `step`, `autocomplete`, `name`).

```html
<fudis-text-area
  [label]="'Description'"
  [control]="descriptionControl"
  [helpText]="'Describe the issue in detail'"
></fudis-text-area>
```

---

### Select

**Selector:** `fudis-select`

| Input                       | Type                                                         | Default      | Required |
| --------------------------- | ------------------------------------------------------------ | ------------ | -------- |
| `control`                   | `FormControl<FudisSelectOption<T> \| null>`                  | —            | **yes**  |
| `label`                     | `string`                                                     | —            | **yes**  |
| `variant`                   | `'dropdown' \| 'autocompleteDropdown' \| 'autocompleteType'` | `'dropdown'` | no       |
| `size`                      | `'xs' \| 'sm' \| 'md' \| 'lg'`                               | `'lg'`       | no       |
| `placeholder`               | `string`                                                     | —            | no       |
| `selectionClearButton`      | `boolean`                                                    | `true`       | no       |
| `autocompleteFilter`        | `boolean`                                                    | `true`       | no       |
| `autocompleteHelpText`      | `string \| false`                                            | —            | no       |
| `autocompleteNoResultsText` | `string \| null`                                             | `null`       | no       |
| `helpText`                  | `string`                                                     | —            | no       |

| Output                 | Type                                         |
| ---------------------- | -------------------------------------------- |
| `selectionUpdate`      | `EventEmitter<FudisSelectOption<T> \| null>` |
| `filterTextUpdate`     | `EventEmitter<string \| null>`               |
| `visibleOptionsUpdate` | `EventEmitter<number>`                       |

**Important:** The `FormControl` value is a `FudisSelectOption` object, not a primitive.

```typescript
import { FudisSelectOption } from '@funidata/ngx-fudis';

options: FudisSelectOption[] = [
  { value: 'fi', label: 'Finland' },
  { value: 'se', label: 'Sweden' },
  { value: 'no', label: 'Norway' },
];

countryControl = new FormControl<FudisSelectOption | null>(null, [
  FudisValidators.required('Select a country'),
]);
```

```html
<fudis-select [label]="'Country'" [control]="countryControl">
  <ng-template fudisSelectOptions>
    @for (option of options; track option.value) {
    <fudis-select-option [data]="option"></fudis-select-option>
    }
  </ng-template>
</fudis-select>
```

With option groups:

```html
<fudis-select [label]="'Country'" [control]="countryControl">
  <ng-template fudisSelectOptions>
    <fudis-select-group [label]="'Nordic'">
      <fudis-select-option [data]="{ value: 'fi', label: 'Finland' }"></fudis-select-option>
      <fudis-select-option [data]="{ value: 'se', label: 'Sweden' }"></fudis-select-option>
    </fudis-select-group>
  </ng-template>
</fudis-select>
```

---

### Multiselect

**Selector:** `fudis-multiselect`

Same inputs as Select, except:

| Input                | Type                                          | Default | Required |
| -------------------- | --------------------------------------------- | ------- | -------- |
| `control`            | `FormControl<FudisSelectOption<T>[] \| null>` | —       | **yes**  |
| `showSelectionChips` | `boolean`                                     | `true`  | no       |

| Output            | Type                                           |
| ----------------- | ---------------------------------------------- |
| `selectionUpdate` | `EventEmitter<FudisSelectOption<T>[] \| null>` |

```typescript
selectedCountries = new FormControl<FudisSelectOption[] | null>(null);
```

```html
<fudis-multiselect [label]="'Countries'" [control]="selectedCountries">
  <ng-template fudisSelectOptions>
    @for (option of options; track option.value) {
    <fudis-multiselect-option [data]="option"></fudis-multiselect-option>
    }
  </ng-template>
</fudis-multiselect>
```

---

### Datepicker

**Selector:** `fudis-datepicker`

| Input        | Type                           | Default | Required |
| ------------ | ------------------------------ | ------- | -------- |
| `control`    | `FormControl<Date \| null>`    | —       | **yes**  |
| `label`      | `string`                       | —       | **yes**  |
| `size`       | `'sm' \| 'md' \| 'lg'`         | `'md'`  | no       |
| `dateParse`  | `boolean`                      | `true`  | no       |
| `dateFilter` | `(d: Date \| null) => boolean` | —       | no       |
| `helpText`   | `string`                       | —       | no       |

```typescript
dateControl = new FormControl<Date | null>(null, [FudisValidators.required("Date is required")]);
```

```html
<fudis-datepicker [label]="'Start date'" [control]="dateControl"></fudis-datepicker>
```

---

### Date Range

**Selector:** `fudis-date-range`

Wraps two `fudis-datepicker` components and validates that start <= end.

| Input                 | Type      | Default |
| --------------------- | --------- | ------- |
| `dateComparisonParse` | `boolean` | `true`  |

```html
<fudis-date-range>
  <fudis-datepicker fudisDateStart [label]="'Start'" [control]="startDate"></fudis-datepicker>
  <fudis-datepicker fudisDateEnd [label]="'End'" [control]="endDate"></fudis-datepicker>
</fudis-date-range>
```

Use `fudisDateStart` and `fudisDateEnd` directives on the datepickers.

---

### Checkbox

**Selector:** `fudis-checkbox`

Standalone single checkbox (not part of a group).

| Input     | Type          | Default | Required |
| --------- | ------------- | ------- | -------- |
| `control` | `FormControl` | —       | **yes**  |
| `label`   | `string`      | —       | no       |

```html
<fudis-checkbox [label]="'I agree to terms'" [control]="agreeControl"></fudis-checkbox>
```

---

### Checkbox Group

**Selector:** `fudis-checkbox-group`

| Input       | Type                                   | Default | Required |
| ----------- | -------------------------------------- | ------- | -------- |
| `formGroup` | `FormGroup`                            | —       | **yes**  |
| `label`     | `string`                               | —       | **yes**  |
| `size`      | `'sm' \| 'md' \| 'lg' \| 'full-width'` | `'lg'`  | no       |
| `helpText`  | `string`                               | —       | no       |

| Output         | Type                                          |
| -------------- | --------------------------------------------- |
| `handleChange` | `EventEmitter<FudisCheckboxGroupChangeEvent>` |

```typescript
colorsGroup = new FormGroup(
  {
    red: new FormControl<boolean | null>(false),
    blue: new FormControl<boolean | null>(false),
    green: new FormControl<boolean | null>(false),
  },
  [FudisGroupValidators.oneRequired("Select at least one color")],
);
```

```html
<fudis-checkbox-group [label]="'Favorite colors'" [formGroup]="colorsGroup">
  <fudis-checkbox-group-option [controlName]="'red'" [label]="'Red'"></fudis-checkbox-group-option>
  <fudis-checkbox-group-option
    [controlName]="'blue'"
    [label]="'Blue'"
  ></fudis-checkbox-group-option>
  <fudis-checkbox-group-option
    [controlName]="'green'"
    [label]="'Green'"
  ></fudis-checkbox-group-option>
</fudis-checkbox-group>
```

---

### Radio Button Group

**Selector:** `fudis-radio-button-group`

| Input      | Type                                   | Default | Required |
| ---------- | -------------------------------------- | ------- | -------- |
| `control`  | `FormControl`                          | —       | **yes**  |
| `label`    | `string`                               | —       | **yes**  |
| `size`     | `'sm' \| 'md' \| 'lg' \| 'full-width'` | `'lg'`  | no       |
| `helpText` | `string`                               | —       | no       |

| Output         | Type                                        |
| -------------- | ------------------------------------------- |
| `handleChange` | `EventEmitter<FudisRadioButtonChangeEvent>` |

```typescript
colorControl = new FormControl<string | null>(null, [
  FudisValidators.required('Select a color'),
]);

colorOptions: FudisRadioButtonOption<object>[] = [
  { value: 'red', label: 'Red' },
  { value: 'blue', label: 'Blue' },
  { value: 'green', label: 'Green' },
];
```

```html
<fudis-radio-button-group [label]="'Color'" [control]="colorControl">
  @for (option of colorOptions; track option.value) {
  <fudis-radio-button [option]="option"></fudis-radio-button>
  }
</fudis-radio-button-group>
```

---

### Localized Text Group

**Selector:** `fudis-localized-text-group`

| Input       | Type                                        | Default                                                                                       | Required |
| ----------- | ------------------------------------------- | --------------------------------------------------------------------------------------------- | -------- |
| `formGroup` | `FormGroup`                                 | —                                                                                             | **yes**  |
| `label`     | `string`                                    | —                                                                                             | **yes**  |
| `options`   | `FudisLocalizedTextGroupFormGroupOptions[]` | `[{controlName:'fi',label:'FI'},{controlName:'sv',label:'SV'},{controlName:'en',label:'EN'}]` | no       |
| `variant`   | `'text-input' \| 'text-area'`               | `'text-input'`                                                                                | no       |
| `size`      | `'sm' \| 'md' \| 'lg'`                      | `'lg'`                                                                                        | no       |
| `helpText`  | `string`                                    | —                                                                                             | no       |

```typescript
localizedName = new FormGroup(
  {
    fi: new FormControl<string | null>(null),
    sv: new FormControl<string | null>(null),
    en: new FormControl<string | null>(null),
  },
  [FudisGroupValidators.oneRequired("Provide at least one translation")],
);
```

```html
<fudis-localized-text-group
  [label]="'Course name'"
  [formGroup]="localizedName"
></fudis-localized-text-group>
```

---

### Dialog

**Selector:** `fudis-dialog`

| Input  | Type                                   | Default |
| ------ | -------------------------------------- | ------- |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'`  |

Open dialogs using `FudisDialogService.open(ComponentClass, options)` or `FudisDialogService.open(TemplateRef, options)`.

Inside your dialog component:

```html
<fudis-dialog [size]="'md'">
  <fudis-heading fudisDialogTitle>Edit Item</fudis-heading>
  <fudis-dialog-content>
    <!-- Content here -->
  </fudis-dialog-content>
  <fudis-dialog-actions>
    <fudis-button fudisDialogClose [label]="'Cancel'" [variant]="'secondary'"></fudis-button>
    <fudis-button [label]="'Save'" (handleClick)="save()"></fudis-button>
  </fudis-dialog-actions>
</fudis-dialog>
```

Or with a form inside:

```html
<fudis-dialog [size]="'lg'">
  <fudis-dialog-content>
    <fudis-form [title]="'Edit'" [level]="2">
      <fudis-form-content>
        <!-- form fields -->
      </fudis-form-content>
      <fudis-form-actions>
        <fudis-button fudisDialogClose [label]="'Cancel'" [variant]="'secondary'"></fudis-button>
        <fudis-button fudisFormSubmit [label]="'Save'" [formValid]="form.valid"></fudis-button>
      </fudis-form-actions>
    </fudis-form>
  </fudis-dialog-content>
</fudis-dialog>
```

---

### Dropdown Menu

**Selector:** `fudis-dropdown-menu`

**Must be a direct child of `fudis-icon-button` with `[asMenuButton]="true"`.**

| Input   | Type                            | Default    |
| ------- | ------------------------------- | ---------- |
| `align` | `'left' \| 'center' \| 'right'` | `'center'` |
| `size`  | `'sm' \| 'md' \| 'lg'`          | `'lg'`     |

```html
<fudis-icon-button [ariaLabel]="'Actions'" [icon]="'three-dots'" [asMenuButton]="true">
  <fudis-dropdown-menu [align]="'right'">
    <fudis-dropdown-menu-item [label]="'Edit'" (handleClick)="edit()"></fudis-dropdown-menu-item>
    <fudis-dropdown-menu-item
      [label]="'Delete'"
      (handleClick)="delete()"
    ></fudis-dropdown-menu-item>
  </fudis-dropdown-menu>
</fudis-icon-button>
```

Use `fudis-dropdown-menu-group` to group items with a label:

```html
<fudis-dropdown-menu>
  <fudis-dropdown-menu-group [label]="'Actions'">
    <fudis-dropdown-menu-item [label]="'Edit'" (handleClick)="edit()"></fudis-dropdown-menu-item>
    <fudis-dropdown-menu-item
      [label]="'Delete'"
      (handleClick)="delete()"
    ></fudis-dropdown-menu-item>
  </fudis-dropdown-menu-group>
</fudis-dropdown-menu>
```

---

### Notification

**Selector:** `fudis-notification`

| Input     | Type                                           | Default     |
| --------- | ---------------------------------------------- | ----------- |
| `variant` | `'warning' \| 'danger' \| 'success' \| 'info'` | `'warning'` |

```html
<fudis-notification [variant]="'success'">
  <fudis-body-text>Your changes have been saved.</fudis-body-text>
</fudis-notification>
```

---

### Alert Group

**Selector:** `fudis-alert-group`

Alerts are managed via `FudisAlertService`. Place `fudis-alert-group` once in your app root.

| Input          | Type                                | Default   |
| -------------- | ----------------------------------- | --------- |
| `position`     | `'static' \| 'absolute' \| 'fixed'` | `'fixed'` |
| `insideDialog` | `boolean`                           | —         |

```typescript
constructor(private alertService: FudisAlertService) {}

showAlert() {
  this.alertService.addAlert({
    message: of('Something went wrong'),
    type: 'danger',
    id: 'my-alert',
  });
}
```

```html
<!-- In app root template -->
<fudis-alert-group></fudis-alert-group>
```

---

### Badge

**Selector:** `fudis-badge`

| Input     | Type                                                            | Default     |
| --------- | --------------------------------------------------------------- | ----------- |
| `variant` | `'accent' \| 'danger' \| 'primary' \| 'secondary' \| 'success'` | `'primary'` |
| `content` | `string`                                                        | —           |

```html
<fudis-badge [variant]="'success'" [content]="'Active'"></fudis-badge>
```

---

### Description List

**Selector:** `fudis-dl`

Extends Grid — all Grid inputs available.

| Input         | Type                     | Default     |
| ------------- | ------------------------ | ----------- |
| `variant`     | `'regular' \| 'compact'` | `'regular'` |
| `disableGrid` | `boolean`                | `false`     |
| `tag`         | `'dl' \| 'p'`            | `'dl'`      |

```html
<fudis-dl [variant]="'regular'" [columns]="{ md: '1fr 1fr' }">
  <fudis-dl-item>
    <fudis-dt>Name</fudis-dt>
    <fudis-dd>John Doe</fudis-dd>
  </fudis-dl-item>
  <fudis-dl-item>
    <fudis-dt>Email</fudis-dt>
    <fudis-dd>john@example.com</fudis-dd>
  </fudis-dl-item>
</fudis-dl>
```

---

### Breadcrumbs

**Selector:** `fudis-breadcrumbs`

| Input   | Type     | Default | Required |
| ------- | -------- | ------- | -------- |
| `label` | `string` | —       | **yes**  |

```html
<fudis-breadcrumbs [label]="'Breadcrumbs navigation'">
  @for (link of links; track link.url; let index = $index) {
  <fudis-breadcrumbs-item>
    @if (index + 1 !== links.length) {
    <a [href]="link.url">{{ link.label }}</a>
    } @if (index + 1 === links.length) {
    <fudis-body-text>{{ link.label }}</fudis-body-text>
    }
  </fudis-breadcrumbs-item>
  }
</fudis-breadcrumbs>
```

---

### Tab Navigation

Uses three components together:

**`fudis-tab-navigation-bar`** — selector for the tab bar container

| Input     | Type                          | Default     |
| --------- | ----------------------------- | ----------- |
| `panel`   | `TabNavigationPanelComponent` | —           |
| `variant` | `'primary' \| 'secondary'`    | `'primary'` |
| `id`      | `string`                      | —           |

**`fudis-tab-navigation-tab`** — inline attribute selector on `<a>` or `<button>`

| Input    | Type      | Default |
| -------- | --------- | ------- |
| `id`     | `string`  | —       |
| `active` | `boolean` | `false` |

**`fudis-tab-navigation-panel`** — content panel selector

| Input | Type     |
| ----- | -------- |
| `id`  | `string` |

```html
<fudis-tab-navigation-bar [panel]="panel">
  <a fudis-tab-navigation-tab [id]="'tab-1'" [active]="activeTab === 1" (click)="activeTab = 1"
    >Tab 1</a
  >
  <a fudis-tab-navigation-tab [id]="'tab-2'" [active]="activeTab === 2" (click)="activeTab = 2"
    >Tab 2</a
  >
</fudis-tab-navigation-bar>

<fudis-tab-navigation-panel #panel [id]="'panel'">
  @if (activeTab === 1) { <p>Tab 1 content</p> } @if (activeTab === 2) { <p>Tab 2 content</p> }
</fudis-tab-navigation-panel>
```

---

### Pagination

**Selector:** `fudis-pagination`

| Input                   | Type      | Default | Required |
| ----------------------- | --------- | ------- | -------- |
| `paginationAriaLabel`   | `string`  | —       | **yes**  |
| `pageCount`             | `number`  | —       | **yes**  |
| `pageIndex`             | `number`  | `0`     | no       |
| `autoFocusOnPageChange` | `boolean` | `true`  | no       |

| Output       | Type                   |
| ------------ | ---------------------- |
| `pageChange` | `EventEmitter<number>` |

```html
<fudis-pagination
  [paginationAriaLabel]="'Search results'"
  [pageCount]="totalPages"
  [pageIndex]="currentPage"
  (pageChange)="currentPage = $event"
></fudis-pagination>
```

---

### Loading Spinner

**Selector:** `fudis-loading-spinner`

| Input           | Type             | Default                 |
| --------------- | ---------------- | ----------------------- |
| `label`         | `string`         | Fudis default 'Loading' |
| `variant`       | `'sm' \| 'lg'`   | `'sm'`                  |
| `statusMessage` | `string \| null` | Fudis defaults          |
| `visible`       | `boolean`        | `true`                  |

```html
<fudis-loading-spinner [variant]="'lg'" [visible]="isLoading"></fudis-loading-spinner>
```

---

### Footer

**Selector:** `fudis-footer`

No inputs. Content projected. Displays Funidata logo automatically.

```html
<fudis-footer>
  <a fudisLink href="#" [external]="true" [title]="'Example link'"></a>
  <p>Custom footer content</p>
</fudis-footer>
```

---

### Horizontal Rule

**Selector:** `fudis-hr`

No inputs. Renders a styled `<hr>`.

```html
<fudis-hr></fudis-hr>
```

---

### Language Badge Group

**Selector:** `fudis-language-badge-group`

| Input                 | Type                       | Default | Required |
| --------------------- | -------------------------- | ------- | -------- |
| `translatedLanguages` | `('fi' \| 'sv' \| 'en')[]` | —       | **yes**  |

| Output        | Type                                      |
| ------------- | ----------------------------------------- |
| `handleClick` | `EventEmitter<FudisLanguageAbbr \| null>` |

```html
<fudis-language-badge-group
  [translatedLanguages]="['fi', 'en']"
  (handleClick)="onLanguageChange($event)"
></fudis-language-badge-group>
```

---

## Directives

### Content Directives (used with `ng-template`)

| Directive                | Parent Component                      |
| ------------------------ | ------------------------------------- |
| `fudisExpandableContent` | `fudis-expandable`                    |
| `fudisDialogTitle`       | `fudis-dialog`                        |
| `fudisSelectOptions`     | `fudis-select` or `fudis-multiselect` |

### Content Directives (used with HTML selector)

| Directive                  | Parent Component   |
| -------------------------- | ------------------ |
| `fudis-form-content`       | `fudis-form`       |
| `fudis-form-actions`       | `fudis-form`       |
| `fudis-form-header`        | `fudis-form`       |
| `fudis-fieldset-content`   | `fudis-fieldset`   |
| `fudis-fieldset-actions`   | `fudis-fieldset`   |
| `fudis-expandable-actions` | `fudis-expandable` |
| `fudis-section-content`    | `fudis-section`    |
| `fudis-section-actions`    | `fudis-section`    |
| `fudis-dialog-content`     | `fudis-dialog`     |
| `fudis-dialog-actions`     | `fudis-dialog`     |

### Behavioral Directives

| Directive               | Selector             | Description                                         |
| ----------------------- | -------------------- | --------------------------------------------------- |
| `LinkDirective`         | `fudisLink`          | Adds link styling + external link handling to `<a>` |
| `PopoverDirective`      | `fudisPopover`       | Adds popover on click to any element                |
| `FormSubmitDirective`   | `fudisFormSubmit`    | On `fudis-button`, triggers error summary on click  |
| `DialogCloseDirective`  | `fudisDialogClose`   | On `fudis-button`, closes the dialog                |
| `GridDirective`         | `fudisGrid`          | Adds grid layout to any element                     |
| `GridItemDirective`     | `fudisGridItem`      | Adds grid item behavior to any element              |
| `DateStartDirective`    | `fudisDateStart`     | Marks datepicker as range start                     |
| `DateEndDirective`      | `fudisDateEnd`       | Marks datepicker as range end                       |
| `ErrorMessageDirective` | Custom error display | For custom error messages on form controls          |

### Link Directive

```html
<a fudisLink [title]="'Funidata'" href="https://funidata.fi" [external]="true">Funidata</a>
<a fudisLink [title]="'Home'" routerLink="/">Home</a>
```

| Input          | Type                        | Default | Required |
| -------------- | --------------------------- | ------- | -------- |
| `title`        | `string`                    | —       | **yes**  |
| `external`     | `boolean`                   | `false` | no       |
| `size`         | `'inherit' \| 'md' \| 'lg'` | `'md'`  | no       |
| `initialFocus` | `boolean`                   | `false` | no       |

---

## Services

| Service                    | Purpose                                                                      |
| -------------------------- | ---------------------------------------------------------------------------- |
| `FudisDialogService`       | Open/close dialogs: `dialogService.open(Component)`, `dialogService.close()` |
| `FudisAlertService`        | Add/dismiss alerts: `alertService.addAlert({message, type, id})`             |
| `FudisTranslationService`  | Set language and custom translations                                         |
| `FudisErrorSummaryService` | Programmatic control of error summary                                        |
| `FudisGridService`         | Set default grid properties app-wide                                         |
| `FudisBreakpointService`   | Observe viewport breakpoint changes                                          |

---

## Type Quick Reference

```typescript
// Button
type FudisButtonVariant = 'primary' | 'secondary' | 'tertiary';
type FudisButtonSize = 'extra-small' | 'small' | 'medium';
type FudisButtonType = 'submit' | 'button';

// Typography
type FudisHeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
type FudisHeadingVariant = 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
type FudisBodyText = 'lg-regular' | 'md-regular' | 'sm-regular' | 'lg-light' | 'md-light';
type FudisTextAlign = 'left' | 'right' | 'center';

// Forms
type FudisInputSize = 'sm' | 'md' | 'lg';
type FudisInputType = 'email' | 'number' | 'password' | 'tel' | 'text' | 'url';
type FudisSelectVariant = 'dropdown' | 'autocompleteDropdown' | 'autocompleteType';
type FudisSelectOption<T = string> = { value: T; label: string; subLabel?: string; disabled?: boolean };

// Layout
type FudisGridWidth = 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs' | 'initial';
type FudisGridAlign = 'start' | 'end' | 'center';
type FudisSpacing = 'none' | 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
type FudisBreakpointKey = 'default' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

// Misc
type FudisNotification = 'warning' | 'danger' | 'success' | 'info';
type FudisBadgeVariant = 'accent' | 'danger' | 'primary' | 'secondary' | 'success';
type FudisDialogSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type FudisLanguageAbbr = 'fi' | 'sv' | 'en';
type FudisPopoverPosition = 'left' | 'right' | 'above' | 'below';
type FudisIconColor = 'yellow' | 'red' | 'gray-dark' | 'gray-light' | 'primary' | 'primary-dark' | 'green' | 'white';
type FudisIconRotate = 'flip-180' | 'cw-90' | 'ccw-90' | 'none';

// Icons (partial list — most common)
type FudisIcon = 'search' | 'edit' | 'delete' | 'close' | 'check' | 'plus' | 'minus'
  | 'alert' | 'info' | 'chevron' | 'arrow-solid' | 'calendar' | 'three-dots'
  | 'settings' | 'person' | 'mail' | 'new-tab' | 'back' | 'menu' | ... ; // 90+ icons total
```
