import { Directive, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { GuidanceComponent } from '../../../components/form/guidance/guidance.component';
import { TFudisFormErrorMessages, IFudisFormErrorSummaryItem } from '../../../types/forms';

@Directive({
	selector: '[fudisFieldsetBase]',
})
export class FieldsetBaseDirective {
	@ViewChild(GuidanceComponent) guidanceToUpdate: GuidanceComponent;

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
	 * Error messages shown when form control validators are invalid
	 */
	@Input() errorMsg: TFudisFormErrorMessages;

	/**
	 * TBD. Possibly used later for FudisErrorSummary
	 */

	@Output() errorOutput: EventEmitter<IFudisFormErrorSummaryItem> = new EventEmitter<IFudisFormErrorSummaryItem>();

	/**
	 * Check & update errors after user blurs focus from the autocomplete input
	 */
	updateErrors(): void {
		this.guidanceToUpdate.checkErrors();
	}

	requiredValidator = Validators.required;
}
