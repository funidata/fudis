/**
 * Targets strings which start with underscore or with 'ng'. E.g. _internalStuff or ngOnInit.
 *
 * This has been set as default value for Storybook stories controls in preview.js
 * To use this with ArgTypes tables in stories, add it like this:
 * import {excludeReges} from "../../path/to/utilities/storybook";
 * <ArgTypes of={YourComponent} exclude={excludeRegex} />
 *
 */

export const excludeRegex = /^(?:_|ng)[a-zA-Z0-9]\w+/;
