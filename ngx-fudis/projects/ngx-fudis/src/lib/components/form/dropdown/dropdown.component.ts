import { Component, Input, ViewEncapsulation, EventEmitter, Output, OnInit, OnChanges } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FudisDropdownOption, FudisDropdownLanguageOption, FudisInputWidth } from '../../../types/forms';
import { InputBaseDirective } from '../../../directives/form/input-base/input-base.directive';
import { FudisIdService } from '../../../utilities/id-service.service';
import { FudisTranslationService } from '../../../utilities/translation/translation.service';

@Component({
	selector: 'fudis-dropdown',
	templateUrl: './dropdown.component.html',
	styleUrls: ['./dropdown.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class DropdownComponent extends InputBaseDirective implements OnInit, OnChanges {
	constructor(
		private _idService: FudisIdService,
		_translationService: FudisTranslationService
	) {
		super(_translationService);
	}

	/*
	 * FormControl for the dropdown
	 */
	@Input({ required: true }) control: FormControl<
		FudisDropdownOption | FudisDropdownOption[] | FudisDropdownLanguageOption[] | null
	>;

	/**
	 * Dropdown options
	 */
	@Input({ required: true }) options: FudisDropdownOption[];

	/**
	 * If true, user can choose multiple checkbox options from dropdown
	 */
	@Input() multipleOption: boolean = false;

	/**
	 * Placeholder text for the dropdown input when no selection has been made
	 */
	@Input() placeholder: string;

	/**
	 * Available sizes for the dropdown
	 */
	@Input() size: 'xs' | FudisInputWidth = 'lg';

	/**
	 * Hide selected option's checkmark in options list, used in input-with-language-options component
	 */
	@Input() hideSingleSelectionIndicator: boolean = false;

	/**
	 * Value output event on selection change
	 */
	@Output() selectionUpdate: EventEmitter<FudisDropdownOption> = new EventEmitter<FudisDropdownOption>();

	handleSelectionChange(value: FudisDropdownOption): void {
		this.selectionUpdate.emit(value);
	}

	ngOnInit(): void {
		this._id = this.id ?? this._idService.getNewId('dropdown');
	}

	ngOnChanges(): void {
		this._required = this.required ?? this.control.hasValidator(Validators.required);
	}
}
