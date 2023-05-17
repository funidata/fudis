import { Directive, Input } from '@angular/core';
import { Validators } from '@angular/forms';

@Directive({
	selector: '[fudisFieldSetBase]',
})
export class FieldSetBaseDirective {
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

	/**
	 * To disable Field Set content as Fudis Grid. Used in e. g. Radio Button Group.
	 */
	@Input() disableGrid: boolean = false;

	requiredValidator = Validators.required;
}
