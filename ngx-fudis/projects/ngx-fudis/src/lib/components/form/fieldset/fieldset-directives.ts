/* eslint-disable @angular-eslint/directive-selector */
/* eslint-disable max-classes-per-file */
import { Directive, TemplateRef } from '@angular/core';

/**
 * A marker directive used to tag the template that will be rendered inside an `FieldsetComponent`.
 */
@Directive({ selector: '[fudisFieldsetGuidance]' })
export class FieldsetGuidanceDirective {
	constructor(public templateRef: TemplateRef<unknown>) {}
}

@Directive({ selector: '[fudisFieldsetContent]' })
export class FieldsetContentDirective {
	// constructor(public contentRef: ViewRef) {}
	constructor(public templateRef: TemplateRef<unknown>) {}
}
