import { Directive, ViewChild, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { GuidanceComponent } from '../../../components/form/guidance/guidance.component';
import { IFudisFormErrorSummaryItem, TFudisFormErrorMessages } from '../../../types/forms';
import { TooltipApiDirective } from '../../tooltip/tooltip-api.directive';

@Directive({
	selector: '[fudisInputBase]',
})
export class InputBaseDirective extends TooltipApiDirective implements OnInit {
	@ViewChild(GuidanceComponent) guidanceToUpdate: GuidanceComponent;

	/**
	 * FormControl for the input
	 */
	@Input() control: FormControl;

	/**
	 * Label for input
	 */
	@Input() label: string;

	/**
	 * For screen reader users for providing additional information. Used in e. g. input with language options for providing info about currently selected language.
	 */
	@Input() ariaLabel: string;

	/**
	 * Unique id for input
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
	 * Help text, aligned underneath the input
	 */
	@Input() helpText: string;

	/**
	 * If input is in invalid state, show provided error messages on component load without need for a blur event. Requires that input control has been touched.
	 */

	@Input() updateErrorsOnLoad: boolean = false;

	/**
	 * Error messages shown when form control validators are invalid
	 */
	@Input() errorMsg: TFudisFormErrorMessages;

	/**
	 * TBD. Possibly used later for FudisErrorSummary
	 */

	@Output() errorOutput: EventEmitter<IFudisFormErrorSummaryItem> = new EventEmitter<IFudisFormErrorSummaryItem>();

	/**
	 * Check & update errors. Currently mostly binded to onBlur event.
	 */
	updateErrors(): void {
		this.guidanceToUpdate.checkErrors();
	}

	ngOnInit(): void {
		if (this.updateErrorsOnLoad) {
			this.guidanceToUpdate.checkErrors();
		}
	}

	isRequired(): boolean | null {
		if (this.control?.hasValidator(Validators.required) && this.requiredText) {
			return true;
		}
		return null;
	}
}
