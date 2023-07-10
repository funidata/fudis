import { Directive, Input, EventEmitter, Output, Signal, effect } from '@angular/core';

import { FudisFormErrors, FudisTranslationConfig } from '../../../types/forms';
import { TooltipApiDirective } from '../../tooltip/tooltip-api.directive';
import { FudisTranslationService } from '../../../utilities/translation/translation.service';

@Directive({
	selector: '[fudisInputBase]',
})
export class InputBaseDirective extends TooltipApiDirective {
	constructor(protected _configService: FudisTranslationService) {
		super();

		effect(() => {
			this._configs = this._configService.getConfig();

			this._requiredText = this._configs().required;
		});
	}

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
	 * To listen for input's blur event.
	 */
	@Output() handleBlur: EventEmitter<Event> = new EventEmitter<Event>();

	/**
	 * Internal id to generate unique id
	 */
	protected _id: string;

	protected _configs: Signal<FudisTranslationConfig>;

	protected _requiredText: string;

	protected _required: boolean = false;

	public onBlur(event: Event): void {
		this.handleBlur.emit(event);
	}
}
