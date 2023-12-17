import {
	Component,
	ElementRef,
	EventEmitter,
	HostBinding,
	Input,
	Output,
	Signal,
	ViewChild,
	ViewEncapsulation,
	effect,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { FudisSelectOption } from '../../../../types/forms';

import { FudisTranslationConfig } from '../../../../types/miscellaneous';
import { FudisTranslationService } from '../../../../services/translation/translation.service';

@Component({
	selector: 'fudis-select-autocomplete',
	templateUrl: './autocomplete.component.html',
	styleUrls: ['./autocomplete.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class SelectAutocompleteComponent {
	constructor(protected _translationService: FudisTranslationService) {
		effect(() => {
			this._translationClearFilterText = _translationService.getTranslations()().SELECT.AUTOCOMPLETE.CLEAR;
		});
	}

	/**
	 * Template reference for input. Used in e. g. initialFocus
	 */
	@ViewChild('inputRef') inputRef: ElementRef;

	@HostBinding('class') classes = 'fudis-select-autocomplete-host';

	@Input({ required: true }) control: FormControl<any>;

	@Input({ required: true }) required: boolean;

	@Input({ required: true }) id: string;

	@Input({ required: true }) dropdownOpen: boolean = false;

	@Input() invalidState: boolean = false;

	@Input() placeholder: string;

	@Input() autocompleteClearButton: boolean = true;

	@Output() triggerBlur = new EventEmitter<FocusEvent>();

	@Output() triggerFocus = new EventEmitter<void>();

	@Output() triggerToggle = new EventEmitter<void>();

	@Output() triggerClose = new EventEmitter<void>();

	@Output() triggerOpen = new EventEmitter<void>();

	@Output() triggerFilterTextUpdate = new EventEmitter<string>();

	@Output() triggerFocusToFirstOption = new EventEmitter<void>();

	@Output() triggerControlValueChangedInternally = new EventEmitter<null | FudisSelectOption>();

	protected _focused: boolean = false;

	protected _filterText: string;

	/**
	 * Basic Fudis translation keys
	 */
	protected _translations: Signal<FudisTranslationConfig>;

	/**
	 * Translated aria-label for autocomplete close icon button which clears the input
	 */
	protected _translationClearFilterText: string;

	protected _inputBlur(event: FocusEvent): void {
		this._focused = false;
		this.triggerBlur.emit(event);
	}

	protected _inputFocus(): void {
		this._focused = true;
		this.triggerFocus.emit();
	}

	protected _keyUp(event: KeyboardEvent): void {
		const { key } = event;

		const inputValue = (event.target as HTMLInputElement).value;

		if (this._filterText !== inputValue) {
			this._filterText = inputValue;

			this.triggerFilterTextUpdate.emit(this._filterText);
		}

		if (key === 'Enter') {
			this.triggerToggle.emit();
		} else if (key !== 'ArrowDown' && this.autocompleteClearButton && this._filterText === '') {
			this.triggerClose.emit();
		} else if (!this.dropdownOpen && key !== 'Escape' && key !== 'Enter') {
			this.triggerOpen.emit();
		} else if (key === 'ArrowDown' && this._focused) {
			event.preventDefault();
			this.triggerFocusToFirstOption.emit();
		}
	}

	/**
	 * Clear any written or selected value in the autocomplete field
	 * @param resetControlValue reset or not control value
	 */
	protected _clearAutocompleteFilterText(resetControlValue?: boolean): void {
		// Clear input field and control value
		(this.inputRef.nativeElement as HTMLInputElement).value = '';

		this._filterText = '';
		this.triggerFilterTextUpdate.emit('');

		if (resetControlValue) {
			this.triggerControlValueChangedInternally.emit(null);
		}
	}
}
