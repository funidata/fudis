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
import { FormControl } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { FudisSelectOption, FudisDropdownLanguageOption, FudisInputSize } from '../../../types/forms';
import { InputBaseDirective } from '../../../directives/form/input-base/input-base.directive';
import { FudisIdService } from '../../../services/id/id.service';
import { FudisTranslationService } from '../../../services/translation/translation.service';
import { FudisFocusService } from '../../../services/focus/focus.service';
import { hasRequiredValidator } from '../../../utilities/form/getValidators';

@Component({
	selector: 'fudis-dropdown',
	templateUrl: './dropdown.component.html',
	styleUrls: ['./dropdown.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class DropdownComponent extends InputBaseDirective implements OnInit, OnChanges, AfterViewInit {
	constructor(
		private _focusService: FudisFocusService,
		_idService: FudisIdService,
		_translationService: FudisTranslationService
	) {
		super(_translationService, _idService);
	}

	/**
	 * Template reference for input. Used in e. g. initialFocus
	 */
	@ViewChild('matSelect') matSelect: MatSelect;

	/*
	 * FormControl for the dropdown
	 */
	@Input({ required: true }) control: FormControl<
		FudisSelectOption | FudisSelectOption[] | FudisDropdownLanguageOption[] | null
	>;

	/**
	 * Dropdown options
	 */
	@Input({ required: true }) options: FudisSelectOption[];

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
	@Input() size: 'xs' | FudisInputSize = 'lg';

	/**
	 * Hide selected option's checkmark in options list, used in input-with-language-options component
	 */
	@Input() hideSingleSelectionIndicator: boolean = false;

	/**
	 * Pre-selected dropdown options.
	 * Expects an array if 'multipleOption' is true and if 'multipleOption' is false, expects a single FudisSelectOption.
	 * It searches given 'options' input array for matching 'value' and 'label' with selectedOptions and updates formControl value with items from 'options' input.
	 */
	@Input() selectedOptions: FudisSelectOption | FudisSelectOption[];

	/**
	 * Value output event on selection change
	 */
	@Output() selectionUpdate: EventEmitter<FudisSelectOption> = new EventEmitter<FudisSelectOption>();

	handleSelectionChange(value: FudisSelectOption): void {
		this.selectionUpdate.emit(value);
	}

	ngOnInit(): void {
		this._setInputId('dropdown');

		this._setInitialValues();
	}

	ngAfterViewInit(): void {
		if (this.initialFocus && !this._focusService.isIgnored(this.id)) {
			this.matSelect.focus();
		}
	}

	ngOnChanges(): void {
		this._required = this.required ?? hasRequiredValidator(this.control);
	}

	private _setInitialValues(): void {
		if (this.selectedOptions?.length >= 1 && this.multipleOption) {
			const foundOptions: FudisSelectOption[] = [];

			this.selectedOptions.forEach((selectedOption: FudisSelectOption) => {
				const foundIndex = this.options.findIndex((option) => {
					return option.value === selectedOption.value && option.label === selectedOption.label;
				});

				if (foundIndex !== -1) {
					foundOptions.push(this.options[foundIndex]);
				}
			});

			this.control.patchValue(foundOptions);
		} else if (!Array.isArray(this.selectedOptions) && !this.multipleOption) {
			const valueToFind: FudisSelectOption = this.selectedOptions;

			const foundIndex = this.options.findIndex((option) => {
				return option.value === valueToFind?.value && option.label === valueToFind?.label;
			});

			if (foundIndex !== -1) {
				this.control.patchValue(this.options[foundIndex]);
			}
		}
	}
}
