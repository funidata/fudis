import { Directive, Input } from '@angular/core';
import { Validators } from '@angular/forms';

@Directive({
	selector: '[fudisFieldsetBase]',
})
export class FieldsetBaseDirective {
	/**
	 * Legend for fieldset
	 */
	@Input() legend: string;

	/**
	 * Unique id for fieldset
	 */
	@Input() id: string;

	/**
	 * Text to indicate compulsory
	 */
	@Input() requiredText: string;

	/**
	 * Additional guidance text, aligned underneath the main legend text
	 */
	@Input() helpText: string;

	requiredValidator = Validators.required;
}
