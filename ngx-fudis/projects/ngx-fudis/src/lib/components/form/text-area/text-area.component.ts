import { Component, Input } from '@angular/core';

import { InputBaseDirective } from '../../../directives/form/input-base/input-base.directive';

@Component({
	selector: 'fudis-text-area[id][label]',
	templateUrl: './text-area.component.html',
	styleUrls: ['./text-area.component.scss'],
})
export class TextAreaComponent extends InputBaseDirective {
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
	 * Fixed size options for text area
	 */
	@Input() size?: 's' | 'm' | 'l' = 'l';
}
