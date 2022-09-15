# Development Guidelines

## Styles

- Theme-first: Start applying themes to a Fudis component by using Material's theming API to make sure our custom theme is complete with regards to the component you are working on.
  - This provides style safety for your component and the whole library by having a more complete theme to fallback on whenever component-specific styling comes short.
  - **Do not** try to achieve too specific effects – _theme is a global high-level definition of styles!_
- After exhausting your options to style a component via theming, apply component-level styles.
  - Prefer building on existing Fudis components, if possible.
  - Use globally defined colors, spacing, etc. rather than introducing hard-to-maintain local values.
  - _**Do not override or modify Angular Material's CSS or DOM!**_ This will make upstream minor and patch changes potentially breaking changes for Fudis.
