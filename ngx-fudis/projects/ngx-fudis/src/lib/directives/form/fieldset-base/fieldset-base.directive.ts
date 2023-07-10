import { Directive, Input, Signal, effect } from '@angular/core';
import { TooltipApiDirective } from '../../tooltip/tooltip-api.directive';
import { FudisTranslationConfig } from '../../../types/forms';
import { FudisTranslationService } from '../../../utilities/translation/translation.service';

@Directive({
	selector: '[fudisFieldSetBase]',
})
export class FieldSetBaseDirective extends TooltipApiDirective {
	constructor(private _configService: FudisTranslationService) {
		super();

		effect(() => {
			this._configs = this._configService.getConfig();

			this.requiredText = this._configs().required;
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
	 * Text to indicate compulsory
	 */
	@Input() requiredText: string | undefined;

	/**
	 * Additional guidance text, aligned underneath the main title legend text
	 */
	@Input() helpText: string;

	/**
	 * Visual size of title legend. Default 'md' and 'sm' is similar to standard input label, used in e. g. RadioButtonGroup.
	 */
	@Input() titleSize: 'md' | 'sm' = 'md';

	/**
	 * Internal id for component
	 */
	protected _id: string;

	protected _requiredText: string;

	protected _required: boolean = false;

	protected _configs: Signal<FudisTranslationConfig>;
}
