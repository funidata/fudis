/* eslint-disable max-classes-per-file */
import { Directive, TemplateRef } from '@angular/core';

/**
 * A marker directive used to tag the template that will be rendered inside of components. Used in e. g. `ExpandableComponent`.
 */
@Directive({ selector: '[fudisContent]' })
export class ContentDirective {
	constructor(public templateRef: TemplateRef<unknown>) {}
}
