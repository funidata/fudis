import { ArgsTable, Meta, Story, Canvas, Source } from '@storybook/addon-docs';

<Meta title="Documentation/Development/Overview" />

# Development Overview

## Styles

- Theme-first: Start applying themes to a Fudis component by using Material's theming API to make sure our custom theme is complete with regards to the component you are working on.
  - This provides style safety for your component and the whole library by having a more complete theme to fallback on whenever component-specific styling comes short.
  - **Do not** try to achieve too specific effects – _theme is a global high-level definition of styles!_
- After exhausting your options to style a component via theming, apply component-level styles.
  - Prefer building on existing Fudis components, if possible.
  - Use globally defined colors, spacing, etc. rather than introducing hard-to-maintain local values.
  - _**Do not override or modify Angular Material's CSS or DOM!**_ This will make upstream minor and patch changes potentially breaking changes for Fudis.

```
├── components
├── button                        	# Component folder
│   	├── button.component.html     # Component template
│   	├── button.component.scss    	# Style file
│   	├── button.component.spec.ts  # Unit-tests
│   	├── button.component.ts       # Component file
│   	└── button.stories.ts        	# Component story
└── ...
```
