import { Component, Input, OnChanges, OnInit } from '@angular/core';

import { FormControl, Validators } from '@angular/forms';
import { InputBaseDirective } from '../../../directives/form/input-base/input-base.directive';

import { FudisInputWidth } from '../../../types/forms';
import { FudisIdService } from '../../../utilities/id-service.service';
import { FudisTranslationConfigService } from '../../../utilities/translation-config.service';

@Component({
	selector: 'fudis-text-area',
	templateUrl: './text-area.component.html',
	styleUrls: ['./text-area.component.scss'],
})
export class TextAreaComponent extends InputBaseDirective implements OnInit, OnChanges {
	constructor(private _idService: FudisIdService, _configService: FudisTranslationConfigService) {
		super(_configService);
	}

	/**
	 * FormControl for the input.
	 */
	@Input({ required: true }) control: FormControl<string | null | number>;

	/**
	 * Minimum length for text area, unset by default
	 */
	@Input() minLength: number | undefined = undefined;

	/**
	 * Maximum length for text area, unset by default. When set displays also a character count indicator.
	 */
	@Input() maxLength: number | undefined = undefined;

	/**
	 * Assistive text of max character count for screen readers
	 */
	@Input() maxLengthText: string;

	/**
	 * Fixed size options for text area
	 */
	@Input() size: FudisInputWidth = 'lg';

	ngOnInit(): void {
		this._id = this.id ?? this._idService.getNewId('textArea');
		this.subscribeToRequiredText();
	}

	ngOnChanges(): void {
		this._required = this.control.hasValidator(Validators.required);
	}
}
