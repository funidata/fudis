import {
	AfterViewInit,
	Component,
	Input,
	HostBinding,
	OnInit,
	OnChanges,
	ViewChild,
	ContentChild,
	AfterContentInit,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { InputBaseDirective } from '../../../directives/form/input-base/input-base.directive';

import { FudisInputSize } from '../../../types/forms';
import { FudisIdService } from '../../../services/id/id.service';
import { FudisTranslationService } from '../../../services/translation/translation.service';
import { FudisFocusService } from '../../../services/focus/focus.service';
import {
	getMaxFromValidator,
	getMaxLengthFromValidator,
	getMinFromValidator,
	getMinLengthFromValidator,
	hasRequiredValidator,
} from '../../../utilities/form/getValidators';
import { GuidanceComponent } from '../guidance/guidance.component';
import { ErrorMessageComponent } from '../error-message/error-message.component';

@Component({
	selector: 'fudis-text-input',
	templateUrl: './text-input.component.html',
	styleUrls: ['./text-input.component.scss'],
})
export class TextInputComponent
	extends InputBaseDirective
	implements OnInit, OnChanges, AfterViewInit, AfterContentInit
{
	constructor(
		private _focusService: FudisFocusService,
		_idService: FudisIdService,
		_translationService: FudisTranslationService
	) {
		super(_translationService, _idService);
	}

	@ViewChild('fudisGuidance') _guidance: GuidanceComponent;

	@ContentChild(ErrorMessageComponent) _errorMessage: ErrorMessageComponent;

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
	 * Prefer FudisValidators.minLength over this
	 * Minimium number of characters allowed by minLength.
	 */
	@Input() minLength: number | undefined = undefined;

	/**
	 * * Prefer FudisValidators.maxLength over this
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
		this._setInputId('text-input');
	}

	ngOnChanges(): void {
		this._required = this.required ?? hasRequiredValidator(this.control);
		if (this.type === 'number') {
			this.minNumber = this.minNumber ?? getMinFromValidator(this.control);
			this.maxNumber = this.maxNumber ?? getMaxFromValidator(this.control);
		} else {
			this.maxLength = this.maxLength ?? getMaxLengthFromValidator(this.control);
			this.minLength = this.minLength ?? getMinLengthFromValidator(this.control);
		}
	}

	ngAfterViewInit(): void {
		if (this.initialFocus && !this._focusService.isIgnored(this.id)) {
			this.focusToInput();
		}
	}

	ngAfterContentInit(): void {
		if (this._errorMessage) {
			this._errorMessage.parent = this._guidance;
		}
	}
}
