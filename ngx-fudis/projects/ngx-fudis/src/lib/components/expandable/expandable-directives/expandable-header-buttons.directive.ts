import { Directive, TemplateRef } from '@angular/core';

/**
 * A marker directive used to tag the extra buttons rendered in the `ExpandableComponent` header.
 */
@Directive({ selector: '[fudisExpandableHeaderButtons]' })
export class ExpandableHeaderButtonsDirective {
	constructor(public templateRef: TemplateRef<unknown>) {}
}
