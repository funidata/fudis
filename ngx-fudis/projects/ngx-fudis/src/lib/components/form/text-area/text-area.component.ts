import { AfterViewInit, Component, Input, OnChanges, OnInit } from '@angular/core';

import { FormControl, Validators } from '@angular/forms';
import { InputBaseDirective } from '../../../directives/form/input-base/input-base.directive';

import { FudisInputWidth } from '../../../types/forms';
import { FudisIdService } from '../../../services/id/id.service';
import { FudisTranslationService } from '../../../services/translation/translation.service';

@Component({
	selector: 'fudis-text-area',
	templateUrl: './text-area.component.html',
	styleUrls: ['./text-area.component.scss'],
})
export class TextAreaComponent extends InputBaseDirective implements OnInit, OnChanges, AfterViewInit {
	constructor(
		private _idService: FudisIdService,
		_translationService: FudisTranslationService
	) {
		super(_translationService);
	}

	/**
	 * FormControl for text-area
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
	 * Text-area size option
	 */
	@Input() size: FudisInputWidth = 'lg';

	ngOnInit(): void {
		this._id = this.id ?? this._idService.getNewId('textArea');
	}

	ngOnChanges(): void {
		this._required = this.required ?? this.control.hasValidator(Validators.required);
	}

	ngAfterViewInit(): void {
		if (this.initialFocus) {
			this.focusToInput();
		}
	}
}
