import { Directive, Input, EventEmitter, Output, Signal, effect, ViewChild, ElementRef } from '@angular/core';

import { FudisFormErrors } from '../../../types/forms';
import { TooltipApiDirective } from '../../tooltip/tooltip-api.directive';
import { FudisTranslationService } from '../../../services/translation/translation.service';
import { FudisTranslationConfig } from '../../../types/miscellaneous';

@Directive({
	selector: '[fudisInputBase]',
})
export class InputBaseDirective extends TooltipApiDirective {
	constructor(protected _translationService: FudisTranslationService) {
		super();

		effect(() => {
			this._translations = this._translationService.getTranslations();

			this._requiredText = this._translations().REQUIRED;
		});
	}

	/**
	 * Template reference for input. Used in e. g. initialFocus
	 */
	@ViewChild('inputRef') inputRef: ElementRef;

	/**
	 * Label for input.
	 */
	@Input({ required: true }) label: string;

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
	 * Help text, aligned underneath the input.
	 */
	@Input() helpText: string | undefined;

	/**
	 * Error messages shown when form control validators are invalid
	 */

	@Input() errorMsg: FudisFormErrors | undefined;

	/**
	 * Set input's visual style and attributes as invalid. Does not override if control.invalid is true.
	 */
	@Input() invalidState: boolean = false;

	/**
	 * Set form input as required. By default set to 'undefined' and this attribute is determined to true / false depending on if FormControl has Validators.required. This setting will override that.
	 */
	@Input() required: boolean | undefined = undefined;

	/**
	 * Set browser focus to input on first load.
	 */
	@Input() initialFocus: boolean = false;

	/**
	 * To listen for input's blur event.
	 */
	@Output() handleBlur: EventEmitter<Event> = new EventEmitter<Event>();

	/**
	 * Internal id to generate unique id
	 */
	protected _id: string;

	/**
	 * Basic Fudis translation keys
	 */
	protected _translations: Signal<FudisTranslationConfig>;

	/**
	 * Fudis translation key for required text
	 */
	protected _requiredText: string;

	/**
	 * Set requiredText based on this boolean value
	 */
	protected _required: boolean = false;

	private _focusTryCounter: number = 0;

	public onBlur(event: Event): void {
		this.handleBlur.emit(event);
	}

	focusToInput(): void {
		if (this.inputRef?.nativeElement) {
			this.inputRef.nativeElement.focus();
		} else if (this._focusTryCounter < 100) {
			setTimeout(() => {
				this._focusTryCounter += 1;
				this.focusToInput();
			}, 100);
		}
	}
}
