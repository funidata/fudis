import { Directive, Input, EventEmitter, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { TFudisInputErrorMessages } from '../../../types/forms';
import { TooltipApiDirective } from '../../tooltip/tooltip-api.directive';

@Directive({
	selector: '[fudisInputBase]',
})
export class InputBaseDirective extends TooltipApiDirective {
	/**
	 * FormControl for the input.
	 */
	@Input() control: FormControl;

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
	 * To listen for input's blur event.
	 */
	@Output() handleBlur: EventEmitter<Event> = new EventEmitter<Event>();

	onBlur(event: Event): void {
		this.handleBlur.emit(event);
	}

	// isRequired(): boolean | null {
	// 	if (this.requiredText && (this.control?.hasValidator(Validators.required) || this.required)) {
	// 		return true;
	// 	}
	// 	return null;
	// }

	checkRequiredAttributes(): void {
		if (this.requiredText && !this.control.hasValidator(Validators.required)) {
			// eslint-disable-next-line no-console
			console.warn(
				`Fudis component with id of '${this.id}' has requiredText of ${this.requiredText} but component's form control does not have 'Validators.required'`
			);
		}

		if (!this.requiredText && this.control.hasValidator(Validators.required)) {
			// eslint-disable-next-line no-console
			console.warn(
				`Fudis component with id of '${this.id}' from control has 'Validators.required' but no 'requiredText' is provided.`
			);
		}
	}
}
