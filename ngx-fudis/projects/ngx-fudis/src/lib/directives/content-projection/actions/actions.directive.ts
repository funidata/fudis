/* eslint-disable max-classes-per-file */
import { Directive, Input, TemplateRef } from '@angular/core';

/**
 * A marker directive used to tag the for action buttons that will be rendered inside of components. Used in e. g. `ExpandableComponent` and 'Form'.
 */
@Directive({ selector: '[fudisExpandableActions]' })
export class ExpandableActionsDirective {
	constructor(public templateRef: TemplateRef<unknown>) {}
}

@Directive({ selector: '[fudisFieldsetActions]' })
export class FieldsetActionsDirective {
	constructor(public templateRef: TemplateRef<unknown>) {}

	@Input() align: 'bottom' | 'end' | 'start' = 'start';
}

@Directive({ selector: '[fudisFormActions]' })
export class FormActionsDirective {
	constructor(public templateRef: TemplateRef<unknown>) {}
}
