import { AfterViewInit, Component, Input, HostBinding, OnInit, OnChanges } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { InputBaseDirective } from '../../../directives/form/input-base/input-base.directive';

import { FudisInputSize } from '../../../types/forms';
import { FudisIdService } from '../../../services/id/id.service';
import { FudisTranslationService } from '../../../services/translation/translation.service';

@Component({
	selector: 'fudis-text-input',
	templateUrl: './text-input.component.html',
	styleUrls: ['./text-input.component.scss'],
})
export class TextInputComponent extends InputBaseDirective implements OnInit, OnChanges, AfterViewInit {
	constructor(
		private _idService: FudisIdService,
		_translationService: FudisTranslationService
	) {
		super(_translationService);
	}

	@HostBinding('class') classes = 'fudis-text-input-host';

	/**
	 * FormControl for text-input
	 */
	@Input({ required: true }) control: FormControl<string | null | number>;

	/**
	 * Available sizes for the input - defaults to large. Recommended size for number input is 'sm'.
	 */
	@Input() size: FudisInputSize = 'lg';

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
	 * Minimum number allowed by number input's minNumber
	 */
	@Input() minNumber: number;

	/**
	 * Maximum number allowed by number input's maxNumber
	 */
	@Input() maxNumber: number;

	ngOnInit(): void {
		this._id = this.id ?? this._idService.getNewId('textInput');
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
