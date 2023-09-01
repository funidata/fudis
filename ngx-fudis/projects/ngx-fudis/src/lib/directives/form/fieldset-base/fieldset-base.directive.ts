import { Directive, Input, Signal, effect } from '@angular/core';
import { TooltipApiDirective } from '../../tooltip/tooltip-api.directive';
import { FudisTranslationConfig } from '../../../types/miscellaneous';
import { FudisTranslationService } from '../../../services/translation/translation.service';

@Directive({
	selector: '[fudisFieldSetBase]',
})
export class FieldSetBaseDirective extends TooltipApiDirective {
	constructor(private _translationService: FudisTranslationService) {
		super();

		effect(() => {
			this._translations = this._translationService.getTranslations();

			this._requiredText = this._translations().REQUIRED;
		});
	}

	/**
	 * Title legend for fieldset
	 */
	@Input({ required: true }) title: string;

	/**
	 * Unique id for fieldset
	 */
	@Input() id: string;

	/**
	 * Additional guidance text, aligned underneath the main title legend text
	 */
	@Input() helpText: string;

	/**
	 * Visual size of title legend. Default 'md' and 'sm' is similar to standard input label, used in e. g. RadioButtonGroup.
	 */
	@Input() titleSize: 'md' | 'sm' = 'md';

	/**
	 * Internal id to generate unique id
	 */
	protected _id: string;

	/**
	 * Fudis translation key for required text
	 */
	protected _requiredText: string;

	/**
	 * Set requiredText based on this boolean value
	 */
	protected _required: boolean = false;

	/**
	 * Basic Fudis translation keys
	 */
	protected _translations: Signal<FudisTranslationConfig>;
}
