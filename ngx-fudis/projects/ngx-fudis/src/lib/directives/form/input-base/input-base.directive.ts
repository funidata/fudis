import { Directive, Input, EventEmitter, Output } from '@angular/core';

import { TFudisInputErrorMessages } from '../../../types/forms';
import { TooltipApiDirective } from '../../tooltip/tooltip-api.directive';

@Directive({
	selector: '[fudisInputBase]',
})
export class InputBaseDirective extends TooltipApiDirective {
	/**
	 * Label for input.
	 */
	@Input() label: string;

	/**
	 * For screen reader users for providing additional information by extending text content in normal label. Used in e. g. input with language options for providing info about currently selected language.
	 */
	@Input() ariaLabel: string;

	/**
	 * Unique id for input.
	 */
	@Input() id: string;

	/**
	 * Option for disabling the input.
	 */
	@Input() disabled: boolean = false;

	/**
	 * Text to indicate compulsory.
	 */
	@Input() requiredText: string | undefined;

	/**
	 * Help text, aligned underneath the input.
	 */
	@Input() helpText: string;

	/**
	 * Error messages shown when form control validators are invalid
	 */

	@Input() errorMsg: TFudisInputErrorMessages;

	/**
	 * Set input's visual style and attributes as invalid. Does not override if control.invalid is true.
	 */
	@Input() invalidState: boolean = false;

	/**
	 * To ignore initial check if input has both requiredText and control Validators.required
	 */
	@Input() ignoreRequiredCheck: boolean = false;

	/**
	 * To listen for input's blur event.
	 */
	@Output() handleBlur: EventEmitter<Event> = new EventEmitter<Event>();

	onBlur(event: Event): void {
		this.handleBlur.emit(event);
	}
}
