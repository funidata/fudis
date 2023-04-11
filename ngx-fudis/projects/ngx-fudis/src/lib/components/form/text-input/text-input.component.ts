// eslint-disable-next-line max-classes-per-file
import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { TFudisFormErrorMessages } from '../../../types/forms';
import { GuidanceComponent } from '../guidance/guidance.component';
import { TooltipApiDirective } from '../../../directives/tooltip/tooltip-api.directive';

@Component({
	selector: 'fudis-text-input[id][label]',
	templateUrl: './text-input.component.html',
	styleUrls: ['./text-input.component.scss'],
})
export class TextInputComponent extends TooltipApiDirective {
	@ViewChild('fudisTextInput') input: ElementRef<HTMLInputElement>;

	@ViewChild(GuidanceComponent, { static: true }) guidanceToUpdate: GuidanceComponent;

	/**
	 * FormControl for the input
	 */
	@Input() control: FormControl;

	/**
	 * Error message shown below the input
	 */
	@Input() errorMsg: TFudisFormErrorMessages;

	/**
	 * Input label
	 */
	@Input() label: string;

	/**
	 * Unique input id
	 */
	@Input() id: string;

	/**
	 * Available sizes for the input - defaults to large. Recommended size for number input is small.
	 */
	@Input() size?: 's' | 'm' | 'l' = 'l';

	/**
	 * Help text shown below the input
	 */
	@Input() helpText?: string;

	/**
	 * Text to indicate that input is required, shown above the input with asterisk
	 */
	@Input() requiredText: string;

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
	 * Minimum number allowed by number input's minNumber
	 */
	@Input() minNumber: number;

	/**
	 * Maximum number allowed by number input's maxNumber
	 */
	@Input() maxNumber: number;

	requiredValidator = Validators.required;

	handleBlur(): void {
		this.guidanceToUpdate.checkErrors();
	}
}
