# `@funidata/ngx-fudis`

Fudis is a design system implemented as an Angular component library. Created by [Funidata Ltd](https://funidata.fi/).

## Usage

Fudis can be used with Angular 13.3 and newer.

### Installation

Install Angular Material peer dependency:

```bash
ng add @angular/material
```

Choose these options when prompted:

```
? Choose a prebuilt theme name, or "custom" for a custom theme: Custom
? Set up global Angular Material typography styles? No
? Set up browser animations for Angular Material? Yes
```

Then install Fudis:

```bash
ng add @funidata/ngx-fudis 
```

### Import Core Styles

The core styles from Angular Material must be imported in your application for the components to work properly. The easiest way to do this is to have a `styles.scss` file in project root with the following content:

```scss
@use "@angular/material" as mat;

@include mat.core();
```

Fudis does not include the Material core styles for you because [they should be included exactly once](https://material.angular.io/guide/theming#the-core-mixin) in your application.
