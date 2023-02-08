import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { IFudisErrorMessages } from '../../../types/forms';

@Component({
	selector: 'fudis-text-area[id][label]',
	templateUrl: './text-area.component.html',
	styleUrls: ['./text-area.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextAreaComponent {
	/*
	 * Unique id for text-area
	 */
	@Input() id: string;

	/**
	 *	Label text shown above the text area
	 */
	@Input() label: string;

	/**
	 *	Helper or info text, aligned underneath the text area
	 */

	@Input() helpText?: string;

	/**
	 *	Minimum length for text area, unset by default
	 */
	@Input() minLength?: number;

	/**
	 *	Maximum length for text area, unset by default. When set displays also a character count indicator.
	 */
	@Input() maxLength?: number;

	/**
	 *	FormControl for the text area
	 */
	@Input() control: UntypedFormControl;

	/**
	 * Fixed size options for text area - same what text input has
	 */
	@Input() size?: 's' | 'm' | 'l' = 'l';

	/**
	 *	Error messages shown when form control validators are invalid
	 */
	@Input() errorMsg: IFudisErrorMessages;

	/**
	 *	Text visible, if form control has a required validator
	 */
	@Input() requiredText: string;

	usedCharacters: number = 0;

	showError: boolean = false;

	requiredValidator = Validators.required;

	errorMsgToShow: string[] = [];

	checkErrors(): void {
		this.errorMsgToShow = [];
		if (this.control.touched && this.control.errors) {
			this.showError = true;

			Object.keys(this.control.errors).forEach((item) => {
				const message = this.errorMsg[item as keyof IFudisErrorMessages];
				if (message) {
					this.errorMsgToShow.push(message);
				}
			});
		} else {
			this.showError = false;
		}
	}
}
