import { Directive, Input, EventEmitter, Output, Signal, effect } from '@angular/core';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FudisFormErrors, FudisTranslationConfig } from '../../../types/forms';
import { TooltipApiDirective } from '../../tooltip/tooltip-api.directive';
import { FudisTranslationConfigService } from '../../../utilities/config.service';

@Directive({
	selector: '[fudisInputBase]',
})
export class InputBaseDirective extends TooltipApiDirective {
	constructor(protected _configService: FudisTranslationConfigService) {
		super();

		effect(() => {
			this._configs = this._configService.getConfig();
		});
	}

	/* *
	 * Label for input.
	 */
	@Input({ required: true }) label: string;

	/* *
	 * For screen reader users for providing additional information by extending text content in normal label. Used in e. g. input with language options for providing info about currently selected language.
	 */
	@Input() ariaLabel: string;

	/* *
	 * Unique id for input.
	 */
	@Input() id: string;

	/* *
	 * Option for disabling the input.
	 */
	@Input() disabled: boolean = false;

	/* *
	 * Text to indicate compulsory.
	 */
	@Input() requiredText: string | undefined;

	/* *
	 * Help text, aligned underneath the input.
	 */
	@Input() helpText: string | undefined;

	/* *
	 * Error messages shown when form control validators are invalid
	 */

	@Input() errorMsg: FudisFormErrors | undefined;

	/* *
	 * Set input's visual style and attributes as invalid. Does not override if control.invalid is true.
	 */
	@Input() invalidState: boolean = false;

	/* *
	 * To ignore initial check if input has both requiredText and control Validators.required
	 */
	@Input() ignoreRequiredCheck: boolean = false;

	/* *
	 * To listen for input's blur event.
	 */
	@Output() handleBlur: EventEmitter<Event> = new EventEmitter<Event>();

	/* *
	 * Internal id to generate unique id
	 */
	protected _id: string;

	protected _configs: Signal<FudisTranslationConfig>;

	protected _requiredText: string;

	protected _required: boolean = false;

	protected subscribeToRequiredText(): void {
		this._configs()
			.requiredText!.pipe(takeUntilDestroyed())
			.subscribe((value) => {
				this._requiredText = value;
			});
	}

	public onBlur(event: Event): void {
		this.handleBlur.emit(event);
	}
}
