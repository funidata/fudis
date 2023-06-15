import { Component, Input, OnInit } from '@angular/core';

import { FormControl } from '@angular/forms';
import { InputBaseDirective } from '../../../directives/form/input-base/input-base.directive';
import { checkRequiredAttributes } from '../../../utilities/form/errorsAndWarnings';

@Component({
	selector: 'fudis-text-area[id][label]',
	templateUrl: './text-area.component.html',
	styleUrls: ['./text-area.component.scss'],
})
export class TextAreaComponent extends InputBaseDirective implements OnInit {
	/**
	 * FormControl for the input.
	 */
	@Input({ required: true }) control: FormControl<string | null>;

	/**
	 * Minimum length for text area, unset by default
	 */
	@Input() minLength: number;

	/**
	 * Maximum length for text area, unset by default. When set displays also a character count indicator.
	 */
	@Input() maxLength: number;

	/**
	 * Assistive text of max character count for screen readers
	 */
	@Input() maxLengthText: string;

	/**
	 * Fixed size options for text area
	 */
	@Input() size: 's' | 'm' | 'l' = 'l';

	ngOnInit(): void {
		checkRequiredAttributes(this.id, this.requiredText, this.control, undefined, this.ignoreRequiredCheck);
	}
}
