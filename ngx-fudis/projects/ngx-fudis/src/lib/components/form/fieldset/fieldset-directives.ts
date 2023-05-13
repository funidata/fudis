/* eslint-disable @angular-eslint/directive-selector */
/* eslint-disable max-classes-per-file */
import { Directive, TemplateRef } from '@angular/core';

/**
 * A marker directive used to tag the template that will be rendered inside an `FieldSetComponent`.
 */

@Directive({ selector: '[fudisFieldSetContent]' })
export class FieldSetContentDirective {
	constructor(public templateRef: TemplateRef<unknown>) {}
}
