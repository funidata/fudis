/* eslint-disable max-classes-per-file */
import { Directive, TemplateRef } from '@angular/core';

/**
 * A marker directive used to tag the for action buttons that will be rendered inside of components. Used in e. g. `ExpandableComponent` and 'Form'.
 */
@Directive({ selector: '[fudisActions]' })
export class ActionsDirective {
	constructor(public templateRef: TemplateRef<unknown>) {}
}
