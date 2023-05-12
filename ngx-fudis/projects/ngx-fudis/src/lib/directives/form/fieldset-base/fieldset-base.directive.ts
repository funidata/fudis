import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { Validators } from '@angular/forms';

import { TFudisFormErrorSummaryItem } from '../../../types/forms';

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
	 * Additional guidance text, aligned underneath the main legend text
	 */
	@Input() helpText: string;

	/**
	 * If fieldset is in invalid state, show provided error messages on component load without need for a blur event. Requires that input control has been touched.
	 */

	@Input() updateErrorsOnLoad: boolean = false;

	/**
	 * TBD. Possibly used later for FudisErrorSummary
	 */

	@Output() errorOutput: EventEmitter<TFudisFormErrorSummaryItem> = new EventEmitter<TFudisFormErrorSummaryItem>();

	requiredValidator = Validators.required;
}
