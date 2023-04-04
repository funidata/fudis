import { Component, Input, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { IFudisErrorMessages } from '../../../types/forms';
import { GuidanceComponent } from '../guidance/guidance.component';
import { TooltipApiDirective } from '../../../directives/tooltip/tooltip-api.directive';

@Component({
	selector: 'fudis-text-area[id][label]',
	templateUrl: './text-area.component.html',
	styleUrls: ['./text-area.component.scss'],
})
export class TextAreaComponent extends TooltipApiDirective {
	@ViewChild(GuidanceComponent, { static: true }) guidanceToUpdate: GuidanceComponent;

	/**
	 * Unique id for text area
	 */
	@Input() id: string;

	/**
	 * Label shown above the text area
	 */
	@Input() label: string;

	/**
	 * Help text, aligned underneath the text area
	 */
	@Input() helpText?: string;

	/**
	 * Minimum length for text area, unset by default
	 */
	@Input() minLength?: number;

	/**
	 * Maximum length for text area, unset by default. When set displays also a character count indicator.
	 */
	@Input() maxLength?: number;

	/**
	 * FormControl for the text area
	 */
	@Input() control: FormControl;

	/**
	 * Fixed size options for text area
	 */
	@Input() size?: 's' | 'm' | 'l' = 'l';

	/**
	 * Error messages shown when form control validators are invalid
	 */
	@Input() errorMsg: IFudisErrorMessages;

	/**
	 * Text visible, if form control has a required validator
	 */
	@Input() requiredText: string;

	requiredValidator = Validators.required;

	handleBlur(): void {
		this.guidanceToUpdate.checkErrors();
	}
}
