import { Component, Input, OnInit, effect } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FudisFormErrors, FudisFormGroupErrors } from '../../../types/forms';
import { FudisTranslationService } from '../../../services/translation/translation.service';
import { FudisIdService } from '../../../services/id/id.service';

@Component({
	selector: 'fudis-guidance',
	templateUrl: './guidance.component.html',
	styleUrls: ['./guidance.component.scss'],
})
export class GuidanceComponent implements OnInit {
	constructor(
		private _translationService: FudisTranslationService,
		private _idService: FudisIdService
	) {
		this._id = _idService.getNewId('guidance');

		effect(() => {
			this._maxLengthText = _translationService.getTranslations()().TEXTINPUT.MAX_LENGTH;
		});
	}

	/**
	 * Id of input, fieldset or similar which Guidance is related to. Used in aria attributes and in emit information for Error Summary Service.
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
	 * FormGroup of related FormGroup.
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
	@Input() maxLength: number | undefined = undefined;

	/**
	 * Used if FormGroup is associated with Guidance.
	 */
	@Input() groupErrorMsg: FudisFormGroupErrors | null | undefined;

	/**
	 * Used if FormControl is associated with Guidance.
	 */
	@Input() errorMsg: FudisFormErrors | null | undefined;

	/**
	 * Used to match FormControl value for an Input Language Options component so that the component can display the length of the entered input for the connected language option.
	 */
	@Input() selectedOption: string;

	/**
	 * Used with together with Checkbox Group component, to display errors only when focus has moved outside of whole Checkbox Group.
	 */
	@Input() groupBlurredOut: boolean = true;

	/**
	 * Assistive text of max character count for screen readers. E. g. "5/20 characters used" where "characters used" is "maxLengthText".
	 */
	protected _maxLengthText: string;

	protected _maxLengthAlertThreshold: number;

	protected _id: string;

	ngOnInit(): void {
		if (this.maxLength) {
			this._maxLengthAlertThreshold = this.maxLength - 5;
		}
	}

	// eslint-disable-next-line class-methods-use-this
	asErrorkey(errorKey: any): keyof FudisFormErrors {
		return errorKey;
	}
}
