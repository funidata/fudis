import {
	AfterViewInit,
	Component,
	EventEmitter,
	Input,
	OnInit,
	Output,
	ViewEncapsulation,
	effect,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { areObjectsDeepEquals } from '../../../../utilities/areObjectsDeepEquals';
import { FudisTranslationService } from '../../../../services/translation/translation.service';
import { FudisFocusService } from '../../../../services/focus/focus.service';
import { FudisIdService } from '../../../../services/id/id.service';
import { SelectBaseDirective } from '../select-base/select-base.directive';
import { FudisSelectOption } from '../../../../types/forms';

@Component({
	selector: 'fudis-select',
	templateUrl: './select.component.html',
	styleUrls: ['./select.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class SelectComponent extends SelectBaseDirective implements OnInit, AfterViewInit {
	constructor(
		_idService: FudisIdService,
		_translationService: FudisTranslationService,
		_focusService: FudisFocusService
	) {
		super(_focusService, _translationService, _idService);

		effect(() => {
			this.translationOptionDisabledText = this._translations().SELECT.DISABLED;
		});
	}

	/*
	 * FormControl for the dropdown
	 */
	@Input({ required: true }) override control: FormControl<FudisSelectOption | null>;

	/**
	 * Value output event on selection change
	 */
	@Output() selectionUpdate: EventEmitter<FudisSelectOption | null> = new EventEmitter<FudisSelectOption | null>();

	/**
	 * Internal translated text for disabled select option
	 */
	public translationOptionDisabledText: string;

	ngOnInit(): void {
		this._setParentId();

		this._controlValueSubscription = this.control.valueChanges.subscribe((value) => {
			console.log(value);
			if (!this.controlValueChangedInternally) {
				this._updateSelectionFromControlValue();
			}

			this.controlValueChangedInternally = false;
		});
	}

	ngAfterViewInit(): void {
		if (this.initialFocus && !this._focusService.isIgnored(this.id)) {
			this.focusToInput();
		}

		if (this.control.value) {
			this._updateSelectionFromControlValue();
		}
	}

	public handleSelectionChange(value: FudisSelectOption, disableSignalEmit?: boolean): void {
		const equalValues = areObjectsDeepEquals(value, this.control.value!);

		if (!equalValues) {
			this.selectionUpdate.emit(value);
			this.controlValueChangedInternally = true;
			this.control.patchValue(value);

			if (this.autocomplete) {
				(this._autocompleteRef.inputRef.nativeElement as HTMLInputElement).value = (
					this.control.value as FudisSelectOption
				).label;
			} else {
				this.dropdownSelectionLabelText = value?.label ? value.label : '';
			}

			if (value && this.autocomplete && !disableSignalEmit) {
				this._autocompleteFilterText.set(value.label);
			}
		}
	}

	protected _inputBlur(event: FocusEvent): void {
		if (!(event.relatedTarget as HTMLElement)?.classList.contains('fudis-select-option__focusable')) {
			this.closeDropdown(false);
		}

		this._inputFocused = false;

		this.control.markAsTouched();
	}

	protected _setInputValueOnBlur(): void {
		if (this.control.value) {
			(this.inputRef.nativeElement as HTMLInputElement).value = this.control.value.label;
		}
	}

	protected _checkIfValueNull(text: string): void {
		if (this.control.value && text.toLowerCase() !== (this.control.value as FudisSelectOption).label.toLowerCase()) {
			this.controlValueChangedInternally = true;
			this.selectionUpdate.emit(null);
			this.control.patchValue(null);
		}
	}

	private _updateSelectionFromControlValue(): void {
		if (this.control.value) {
			this.dropdownSelectionLabelText = this.control.value.label;

			if (this.autocomplete) {
				(this._autocompleteRef.inputRef.nativeElement as HTMLInputElement).value = this.control.value.label;
				this._autocompleteFilterText.set(this.control.value.label);

				this._visibleOptionsValues = [this.control.value.value];
			}
		} else {
			this._autocompleteFilterText.set('');
			this.dropdownSelectionLabelText = '';
		}
	}
}
