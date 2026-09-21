---
name: fudis
description: Load context for implementing @funidata/ngx-fudis Angular components. Invoke before writing any Fudis component code.
---

You are helping implement Angular components from `@funidata/ngx-fudis`. Load the following context in order before writing any code.

## Step 1 — API reference (required)

Read `node_modules/@funidata/ngx-fudis/AGENTS.md`.

This is the primary reference: component selectors, all inputs and outputs, composition rules, required validators, directives, services, and code examples for every component.

If the file does not exist, tell the user to run `npm install` and confirm `@funidata/ngx-fudis` is in their `package.json` dependencies.

## Step 2 — Design guidelines (required)

Read `node_modules/@funidata/ngx-fudis/guidelines.md`.

This file contains UX and design intent for each component: when to use each variant, accessibility requirements, layout rules, and usage patterns. Note: the guidelines are written in Finnish.

## Step 3 — Storybook (optional, best-effort)

Read the installed version from `node_modules/@funidata/ngx-fudis/package.json`, then fetch:
`https://fudis.funidata.fi/ngx/v/{version}/`

If the response is a JavaScript application shell with no readable component documentation, skip this step — Steps 1 and 2 already cover the full API and design intent.

## Implementation checklist

After loading context, implement the component(s) requested. Always verify:

- **Validators**: Use `FudisValidators` and `FudisGroupValidators` — never Angular's built-in `Validators`
- **Dialogs**: Open via `FudisDialogService.open()` — never place `fudis-dialog` as inline HTML
- **Content projection**: Use the named directives listed in AGENTS.md (e.g. `fudis-form-content`, `ng-template fudisExpandableContent`)
- **Composition rules**: Some components enforce parent–child relationships at runtime — check the Composition Rules section in AGENTS.md before nesting components
