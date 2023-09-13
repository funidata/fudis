import {
	Component,
	Input,
	Output,
	EventEmitter,
	HostBinding,
	ViewEncapsulation,
	OnChanges,
	OnInit,
	AfterViewInit,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { InputBaseDirective } from '../../../../directives/form/input-base/input-base.directive';

import { FudisIdService } from '../../../../services/id/id.service';
import { FudisTranslationService } from '../../../../services/translation/translation.service';

@Component({
	selector: 'fudis-checkbox',
	templateUrl: './checkbox.component.html',
	styleUrls: ['./checkbox.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class CheckboxComponent extends InputBaseDirective implements OnChanges, OnInit, AfterViewInit {
	constructor(
		private _idService: FudisIdService,
		_translationService: FudisTranslationService
	) {
		super(_translationService);
	}

	@HostBinding('class') classes = 'fudis-checkbox-host';

	/*
	 * FormControl for Checkbox group
	 */
	@Input({ required: true }) control: FormControl;

	/*
	 * Selectable form value of a single Checkbox, e.g. "fair-trade-banana"
	 */
	@Input({ required: true }) value: string | boolean | null;

	/*
	 * Name for group of Checkboxes, e.g. "fruit"
	 */
	@Input({ required: true }) name: string;

	/*
	 * If Checkbox is checked
	 */
	@Input() checked: boolean;

	/**
	 * Checked input change output
	 */
	@Output() checkboxChange = new EventEmitter<boolean>();

	protected _focused = false;

	handleChange(): void {
		this.checkboxChange.emit(!this.checked);
		this._focused = !this._focused;
	}

	override onBlur(): void {
		this._focused = false;
		this.handleBlur.emit();
	}

	ngOnInit(): void {
		this._id = this.id ?? this._idService.getNewId('checkbox');
	}

	ngAfterViewInit(): void {
		if (this.initialFocus) {
			this.focusToInput();
			this._focused = true;
		}
	}

	ngOnChanges(): void {
		this._required = this.required ?? this.control.hasValidator(Validators.required);
	}
}
