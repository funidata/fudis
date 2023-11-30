import { Directive, Input, TemplateRef } from '@angular/core';

/**
 * A marker directive used to tag action buttons that will be rendered inside the components.
 */

@Directive({ selector: '[fudisActions]' })
export class ActionsDirective {
	constructor(public templateRef: TemplateRef<unknown>) {}

	/**
	 * Component type to protect wrong content projection to nested components
	 */
	@Input({ required: true }) type: 'fieldset' | 'expandable' | 'form' | 'dd' | 'section';

	/**
	 * Alignment of actions container, used in Fieldset Component
	 */
	@Input() align: 'bottom' | 'end' | 'start' = 'start';

	/**
	 * Action button alignment, should be used if fudis-form is inside fudis-dialog
	 */
	@Input() bottomButtons: boolean = false;
}
