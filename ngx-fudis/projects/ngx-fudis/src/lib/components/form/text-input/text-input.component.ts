// eslint-disable-next-line max-classes-per-file
import { Component, Input, ViewChild, ElementRef, ViewEncapsulation, HostBinding, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { InputBaseDirective } from '../../../directives/form/input-base/input-base.directive';
import { checkRequiredAttributes } from '../../../utilities/form/errorsAndWarnings';
import { FudisTextInputType } from '../../../types/forms';

@Component({
	selector: 'fudis-text-input[id][label]',
	templateUrl: './text-input.component.html',
	styleUrls: ['./text-input.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class TextInputComponent extends InputBaseDirective implements OnInit {
	@ViewChild('fudisTextInput') input: ElementRef<HTMLInputElement>;

	@HostBinding('class') classes = 'fudis-text-input-host';

	/**
	 * FormControl for the input.
	 */
	@Input() control: FormControl<FudisTextInputType>;

	/**
	 * Available sizes for the input - defaults to large. Recommended size for number input is small.
	 */
	@Input() size?: 's' | 'm' | 'l' = 'l';

	/**
	 * Type of the input - defaults to 'text'
	 */
	@Input() type: 'email' | 'number' | 'password' | 'tel' | 'text' | 'url' = 'text';

	/**
	 * Minimium number of characters allowed by minLength
	 */
	@Input() minLength: number;

	/**
	 * Maximum number of characters allowed by maxLength
	 */
	@Input() maxLength: number;

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
