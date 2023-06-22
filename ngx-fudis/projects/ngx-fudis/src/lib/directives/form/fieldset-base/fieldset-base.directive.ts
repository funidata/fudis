import { Directive, Input } from '@angular/core';
import { TooltipApiDirective } from '../../tooltip/tooltip-api.directive';

@Directive({
	selector: '[fudisFieldSetBase]',
})
export class FieldSetBaseDirective extends TooltipApiDirective {
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
	@Input() requiredText: string;

	/**
	 * Additional guidance text, aligned underneath the main title legend text
	 */
	@Input() helpText: string;

	/**
	 * Visual size of title legend. Default 'md' and 'sm' is similar to standard input label, used in e. g. RadioButtonGroup.
	 */
	@Input() titleSize: 'md' | 'sm' = 'md';
}
