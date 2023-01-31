# `@funidata/ngx-fudis`

Fudis is a design system implemented as an Angular component library. Created by [Funidata Ltd](https://funidata.fi/).

## Usage

Fudis can be used with Angular 14 and newer.

### Installation

First install Angular Material peer dependency:

```bash
ng add @angular/material
```

Choose these options when prompted:

```
? Choose a prebuilt theme name, or "custom" for a custom theme: Custom
? Set up global Angular Material typography styles? No
? Include the Angular animations module? Include and enable animations
```

Then install Fudis:

```bash
ng add @funidata/ngx-fudis 
```

### Import Core Styles

> NOTE: If you used `ng add` to install `@angular/material`, this step should already be done for you by the library installation scripts.

The core styles from Angular Material must be imported in your application for the components to work properly. The easiest way to do this is to have a `styles.scss` file in project root with the following content:

```scss
@use "@angular/material" as mat;

@include mat.core();
```

Fudis does not include the Material core styles for you because [they should be included exactly once](https://material.angular.io/guide/theming#the-core-mixin) in your application.
