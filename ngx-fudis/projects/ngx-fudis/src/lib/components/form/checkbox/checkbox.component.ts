import { Component, Input, OnInit, OnChanges, AfterViewInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { InputBaseDirective } from '../../../directives/form/input-base/input-base.directive';

import { FudisIdService } from '../../../services/id/id.service';
import { FudisTranslationService } from '../../../utilities/translation/translation.service';

@Component({
	selector: 'fudis-checkbox',
	templateUrl: './checkbox.component.html',
	styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent extends InputBaseDirective implements OnInit, OnChanges, AfterViewInit {
	constructor(
		private _idService: FudisIdService,
		_translationService: FudisTranslationService
	) {
		super(_translationService);
	}

	/*
	 * FormControl for Radio Button group
	 */
	@Input({ required: true }) control: FormControl<boolean | null>;

	/*
	 * Name for checkbox
	 */
	@Input() name: string;

	handleCheckboxClick(): void {
		this.inputRef.nativeElement.focus();
	}

	ngOnInit(): void {
		this._id = this.id ?? this._idService.getNewId('checkbox');
	}

	ngAfterViewInit(): void {
		if (this.initialFocus) {
			this.focusToInput();
		}
	}

	ngOnChanges(): void {
		this._required = this.required ?? this.control.hasValidator(Validators.required);
	}
}
