/* eslint-disable max-classes-per-file */
import { Directive, TemplateRef } from '@angular/core';

/**
 * A marker directive used to tag the template that will be rendered inside an `ExpandableComponent`.
 */
@Directive({ selector: '[fudisExpandableContent]' })
export class ExpandableContentDirective {
	constructor(public templateRef: TemplateRef<unknown>) {}
}

/**
 * A marker directive used to tag the extra buttons rendered in the `ExpandableComponent` header.
 */
@Directive({ selector: '[fudisExpandableActions]' })
export class ExpandableActionsDirective {
	constructor(public templateRef: TemplateRef<unknown>) {}
}
