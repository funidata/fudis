import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FudisFormErrors, FudisFormGroupErrors } from '../../../types/forms';

@Component({
	selector: 'fudis-guidance',
	templateUrl: './guidance.component.html',
	styleUrls: ['./guidance.component.scss'],
})
export class GuidanceComponent {
	/**
	 * Id of input, fieldset or similar which Guidance is related to. Used in aria attributes and in emit information for Error Summary Service
	 */
	@Input({ required: true }) for: string;

	/**
	 * Label text of input, fieldset or similar Guidance is related to. Used in emit information for Error Summary service.
	 */
	@Input({ required: true }) inputLabel: string;

	/**
	 * FormControl of related input.
	 */
	@Input() control: FormControl;

	/**
	 * FormGroup of related FormGroup
	 */
	@Input() formGroup: FormGroup;

	/**
	 * Text displayed as guidance help text.
	 */
	@Input() helpText: string | undefined;

	/**
	 * If there is no Fudis FieldSet and Error Summary associated with this input and its Guidance, 'polite' can be considered so that screen reader will get notified if there are new errors related to the input.
	 */
	@Input() ariaLive: 'off' | 'polite' | 'assertive' = 'off';

	/**
	 * When set displays also a character count indicator.
	 */
	@Input() maxLength: number | undefined;

	/**
	 * Assistive text of max character count for screen readers. E. g. "5/20 characters used" where "characters used" is "maxLengthText"
	 */
	@Input() maxLengthText: string;

	/**
	 * Used if FormGroup is associated with Guidance
	 */
	@Input() groupErrorMsg: FudisFormGroupErrors | null | undefined;

	/**
	 * Used if FormControl is associated with Guidance
	 */
	@Input() errorMsg: FudisFormErrors | null | undefined;

	// eslint-disable-next-line class-methods-use-this
	asErrorkey(errorKey: any): keyof FudisFormErrors {
		return errorKey;
	}

	alertMaxLength(): boolean {
		if (this.maxLength && typeof this.control?.value === 'string' && this.control.value?.length) {
			const charactersRemaining = this.maxLength - this.control.value.length;

			if ((charactersRemaining === 5 && this.maxLength >= 5) || charactersRemaining === 0) {
				return true;
			}
		}
		return false;
	}
}
