import {
	Component,
	Input,
	ViewEncapsulation,
	EventEmitter,
	Output,
	OnInit,
	OnChanges,
	AfterViewInit,
	ViewChild,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
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
export class DropdownComponent extends InputBaseDirective implements OnInit, OnChanges, AfterViewInit {
	constructor(
		private _idService: FudisIdService,
		_translationService: FudisTranslationService
	) {
		super(_translationService);
	}

	/**
	 * Template reference for input. Used in e. g. initialFocus
	 */
	@ViewChild('matSelect') matSelect: MatSelect;

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
	 * Pre-selected dropdown options.
	 * Expects an array if 'multipleOption' is true and if 'multipleOption' is false, expects a single FudisDropdownOption.
	 * It searches given 'options' input array for matching 'value' and 'viewValue' with selectedOptions and updates formControl value with items from 'options' input.
	 */
	@Input() selectedOptions: FudisDropdownOption | FudisDropdownOption[];

	/**
	 * Value output event on selection change
	 */
	@Output() selectionUpdate: EventEmitter<FudisDropdownOption> = new EventEmitter<FudisDropdownOption>();

	handleSelectionChange(value: FudisDropdownOption): void {
		this.selectionUpdate.emit(value);
	}

	ngOnInit(): void {
		this._id = this.id ?? this._idService.getNewId('dropdown');

		this._setInitialValues();
	}

	ngAfterViewInit(): void {
		if (this.initialFocus) {
			this.matSelect.focus();
		}
	}

	ngOnChanges(): void {
		this._required = this.required ?? this.control.hasValidator(Validators.required);
	}

	private _setInitialValues(): void {
		if (this.selectedOptions?.length >= 1 && this.multipleOption) {
			const foundOptions: FudisDropdownOption[] = [];

			this.selectedOptions.forEach((selectedOption: FudisDropdownOption) => {
				const foundIndex = this.options.findIndex((option) => {
					return option.value === selectedOption.value && option.viewValue === selectedOption.viewValue;
				});

				if (foundIndex !== -1) {
					foundOptions.push(this.options[foundIndex]);
				}
			});

			this.control.patchValue(foundOptions);
		} else if (!Array.isArray(this.selectedOptions) && !this.multipleOption) {
			const valueToFind: FudisDropdownOption = this.selectedOptions;

			const foundIndex = this.options.findIndex((option) => {
				return option.value === valueToFind?.value && option.viewValue === valueToFind?.viewValue;
			});

			if (foundIndex !== -1) {
				this.control.patchValue(this.options[foundIndex]);
			}
		}
	}
}
