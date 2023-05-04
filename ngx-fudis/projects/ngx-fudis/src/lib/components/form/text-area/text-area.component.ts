import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import { FormBaseDirective } from '../../../directives/form/form-base.directive';

@Component({
	selector: 'fudis-text-area[id][label]',
	templateUrl: './text-area.component.html',
	styleUrls: ['./text-area.component.scss'],
})
export class TextAreaComponent extends FormBaseDirective {
	/**
	 * Minimum length for text area, unset by default
	 */
	@Input() minLength?: number;

	/**
	 * Maximum length for text area, unset by default. When set displays also a character count indicator.
	 */
	@Input() maxLength?: number;

	/**
	 * Assistive text of max character count for screen readers
	 */
	@Input() maxLengthText: string;

	/**
	 * FormControl for the text area
	 */
	@Input() control: FormControl;

	/**
	 * Fixed size options for text area
	 */
	@Input() size?: 's' | 'm' | 'l' = 'l';
}
