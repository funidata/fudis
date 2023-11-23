import { AfterViewInit, Component, Input, OnChanges, OnInit } from '@angular/core';

import { AbstractControl, FormControl } from '@angular/forms';
import { InputBaseDirective } from '../../../directives/form/input-base/input-base.directive';

import { FudisInputSize } from '../../../types/forms';
import { FudisIdService } from '../../../services/id/id.service';
import { FudisTranslationService } from '../../../services/translation/translation.service';
import { FudisFocusService } from '../../../services/focus/focus.service';

@Component({
	selector: 'fudis-text-area',
	templateUrl: './text-area.component.html',
	styleUrls: ['./text-area.component.scss'],
})
export class TextAreaComponent extends InputBaseDirective implements OnInit, OnChanges, AfterViewInit {
	constructor(
		private _focusService: FudisFocusService,
		_idService: FudisIdService,
		_translationService: FudisTranslationService
	) {
		super(_translationService, _idService);
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
	@Input() size: FudisInputSize = 'lg';

	ngOnInit(): void {
		this._setInputId('text-area');
	}

	ngOnChanges(): void {
		this._required = this.required ?? !!this.control.validator?.('' as any as AbstractControl);
	}

	ngAfterViewInit(): void {
		if (this.initialFocus && !this._focusService.isIgnored(this.id)) {
			this.focusToInput();
		}
	}
}
