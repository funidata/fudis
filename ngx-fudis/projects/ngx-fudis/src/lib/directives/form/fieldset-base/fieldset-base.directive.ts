import { Directive, Input, Signal, effect } from '@angular/core';
import { TooltipApiDirective } from '../../tooltip/tooltip-api.directive';
import { FudisTranslationConfig } from '../../../types/forms';
import { untilDestroyed } from '../../../utilities/untilDestroyed';
import { FudisTranslationConfigService } from '../../../utilities/translation-config.service';

@Directive({
	selector: '[fudisFieldSetBase]',
})
export class FieldSetBaseDirective extends TooltipApiDirective {
	constructor(private _configService: FudisTranslationConfigService) {
		super();

		effect(() => {
			this._configs = this._configService.getConfig();
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

	protected _untilDestroyed = untilDestroyed();

	protected subscribeToRequiredText(): void {
		this._configs()
			.requiredText!.pipe(this._untilDestroyed())
			.subscribe((value) => {
				this._requiredText = value;
			});
	}
}
