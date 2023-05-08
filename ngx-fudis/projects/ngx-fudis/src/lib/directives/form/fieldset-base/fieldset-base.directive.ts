import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { Validators } from '@angular/forms';

import { IFudisFormErrorSummaryItem } from '../../../types/forms';

@Directive({
	selector: '[fudisFieldsetBase]',
})
export class FieldsetBaseDirective {
	/**
	 * Legend for fieldset
	 */
	@Input() legend: string;

	/**
	 * Unique id for fieldset
	 */
	@Input() id: string;

	/**
	 * Text to indicate compulsory
	 */
	@Input() requiredText: string;

	/**
	 * Help text, aligned underneath the autocomplete input
	 */
	@Input() helpText: string;

	/**
	 * If fieldset is in invalid state, show provided error messages on component load without need for a blur event. Requires that input control has been touched.
	 */

	@Input() updateErrorsOnLoad: boolean = false;

	/**
	 * TBD. Possibly used later for FudisErrorSummary
	 */

	@Output() errorOutput: EventEmitter<IFudisFormErrorSummaryItem> = new EventEmitter<IFudisFormErrorSummaryItem>();

	requiredValidator = Validators.required;
}
