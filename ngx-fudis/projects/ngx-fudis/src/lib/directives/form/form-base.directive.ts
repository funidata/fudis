import { Directive, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { Validators } from '@angular/forms';
import { GuidanceComponent } from '../../components/form/guidance/guidance.component';
import { IFudisFormErrorSummaryItem, TFudisFormErrorMessages } from '../../types/forms';
import { TooltipApiDirective } from '../tooltip/tooltip-api.directive';

@Directive({
	selector: '[fudisFormBase]',
})
export class FormBaseDirective extends TooltipApiDirective {
	@ViewChild(GuidanceComponent, { static: true }) guidanceToUpdate: GuidanceComponent;

	/**
	 * Label for autocomplete
	 */
	@Input() label: string;

	/**
	 * Unique id for autocomplete
	 */
	@Input() id: string;

	/**
	 * Option for disabling the input
	 */
	@Input() disabled: boolean = false;

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
