import { Component, Input, ViewEncapsulation, EventEmitter, Output, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FudisDropdownOption, FudisDropdownLanguageOption, FudisInputWidth } from '../../../types/forms';
import { InputBaseDirective } from '../../../directives/form/input-base/input-base.directive';
import { FudisIdService } from '../../../utilities/id-service.service';
import { FudisTranslationConfigService } from '../../../utilities/translation-config.service';

@Component({
	selector: 'fudis-dropdown',
	templateUrl: './dropdown.component.html',
	styleUrls: ['./dropdown.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class DropdownComponent extends InputBaseDirective implements OnInit {
	constructor(private _idService: FudisIdService, _configService: FudisTranslationConfigService) {
		super(_configService);
	}

	/*
	 * FormControl for the input.
	 */
	@Input({ required: true }) control: FormControl<
		FudisDropdownOption | FudisDropdownOption[] | FudisDropdownLanguageOption[] | null
	>;

	/**
	 * Dropdown options
	 */
	@Input() options: FudisDropdownOption[];

	/**
	 * If true, user can choose multiple checkbox options from dropdown
	 */
	@Input() multipleOption = false;

	/**
	 * Custom placeholder text to show when no selection has been made
	 */
	@Input() placeholder: string;

	/**
	 * Available sizes for the dropdown - defaults to large.
	 */
	@Input() size: 'xs' | FudisInputWidth = 'lg';

	/**
	 * Hide select option checkmark in option list
	 */

	@Input() hideSingleSelectionIndicator: boolean = false;

	/**
	 * Value output event on selectoion change
	 */
	@Output() selectionUpdate: EventEmitter<FudisDropdownOption> = new EventEmitter<FudisDropdownOption>();

	handleSelectionChange(value: FudisDropdownOption): void {
		this.selectionUpdate.emit(value);
	}

	ngOnInit(): void {
		this._id = this.id ?? this._idService.getNewId('dropdown');
	}
}
