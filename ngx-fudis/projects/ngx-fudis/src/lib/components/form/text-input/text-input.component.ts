// eslint-disable-next-line max-classes-per-file
import { Component, Input, ViewChild, ElementRef, HostBinding, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { InputBaseDirective } from '../../../directives/form/input-base/input-base.directive';
import { checkRequiredAttributes } from '../../../utilities/form/errorsAndWarnings';
import { FudisInputWidth } from '../../../types/forms';

@Component({
	selector: 'fudis-text-input[id][label]',
	templateUrl: './text-input.component.html',
	styleUrls: ['./text-input.component.scss'],
})
export class TextInputComponent extends InputBaseDirective implements OnInit {
	@ViewChild('fudisTextInput') input: ElementRef<HTMLInputElement>;

	/**
	 * FormControl for the input.
	 */
	@Input() control: FormControl<string | null | number>;

	@HostBinding('class') classes = 'fudis-text-input-host';

	/**
	 * Available sizes for the input - defaults to large. Recommended size for number input is small.
	 */
	@Input() size: FudisInputWidth = 'lg';

	/**
	 * Type of the input - defaults to 'text'
	 */
	@Input() type: 'email' | 'number' | 'password' | 'tel' | 'text' | 'url' = 'text';

	/**
	 * Minimium number of characters allowed by minLength
	 */
	@Input() minLength: number | undefined = undefined;

	/**
	 * Maximum number of characters allowed by maxLength
	 */
	@Input() maxLength: number | undefined = undefined;

	/**
	 * Assistive text of max character count for screen readers
	 */
	@Input() maxLengthText: string;

	/**
	 * Minimum number allowed by number input's minNumber
	 */
	@Input() minNumber: number;

	/**
	 * Maximum number allowed by number input's maxNumber
	 */
	@Input() maxNumber: number;

	ngOnInit(): void {
		checkRequiredAttributes(this.id, this.requiredText, this.control, undefined, this.ignoreRequiredCheck);
	}
}
