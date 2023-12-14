import { AfterViewInit, Component, Input, OnInit, Signal, WritableSignal, effect, signal } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FudisTranslationService } from '../../../../services/translation/translation.service';
import { FudisFocusService } from '../../../../services/focus/focus.service';
import { FudisIdService } from '../../../../services/id/id.service';
import { SelectBaseDirective } from '../select-base/select-base.directive';
import { FudisSelectOption } from '../../../../types/forms';
import { joinInputValues, sortValues } from '../selectUtilities';

@Component({
	selector: 'fudis-multiselect',
	templateUrl: './multiselect.component.html',
	styleUrls: ['../select/select.component.scss'],
})
export class MultiselectComponent extends SelectBaseDirective implements OnInit, AfterViewInit {
	constructor(
		_idService: FudisIdService,
		_translationService: FudisTranslationService,
		_focusService: FudisFocusService
	) {
		super(_focusService, _translationService, _idService);

		effect(() => {
			this._removeItemText = this._translations().SELECT.MULTISELECT.REMOVE_ITEM;
		});
	}

	@Input({ required: true }) override control: FormControl<FudisSelectOption[] | null>;

	/**
	 * Internal translated text to indicate deleting item chip aria-label
	 */
	protected _removeItemText: string;

	private _sortedSelectedOptionsSignal: WritableSignal<FudisSelectOption[]> = signal<FudisSelectOption[]>([]);

	ngOnInit(): void {
		this._setParentId();

		this._controlValueSubscription = this.control.valueChanges.subscribe(() => {
			if (!this.controlValueChangedInternally) {
				this._updateMultiselectionFromControlValue();
			}

			this.controlValueChangedInternally = false;
		});
	}

	ngAfterViewInit(): void {
		if (this.initialFocus && !this._focusService.isIgnored(this.id)) {
			this.focusToInput();
		}

		if (this.control.value) {
			this._updateMultiselectionFromControlValue();
		}
	}

	public getSelectedOptions(): Signal<FudisSelectOption[]> {
		return this._sortedSelectedOptionsSignal.asReadonly();
	}

	public handleMultiSelectionChange(option: FudisSelectOption, type: 'add' | 'remove'): void {
		let updatedValue = this.control.value as FudisSelectOption[] | null;

		if (type === 'remove' && updatedValue) {
			updatedValue = updatedValue.filter((item: FudisSelectOption) => {
				return item.value !== option.value;
			});
		} else if (!updatedValue) {
			updatedValue = [option];
		} else if (type === 'add') {
			updatedValue.push(option);
		}

		this._sortedSelectedOptions = sortValues(updatedValue);

		this.dropdownSelectionLabelText = joinInputValues(this._sortedSelectedOptions);

		this.controlValueChangedInternally = true;

		this.control.patchValue(this._sortedSelectedOptions);
	}

	public handleCheckedSort(checkedOption: FudisSelectOption): void {
		const foundIndex: number = this._sortedSelectedOptions.findIndex((option) => {
			return option.value === checkedOption.value && option.label === checkedOption.label;
		});

		if (foundIndex !== -1) {
			this._sortedSelectedOptions[foundIndex] = checkedOption;

			this._sortedSelectedOptions = sortValues(this._sortedSelectedOptions);

			this.dropdownSelectionLabelText = joinInputValues(this._sortedSelectedOptions);
		}
	}

	protected _updateMultiselectionFromControlValue(): void {
		if (this.control.value) {
			this._sortedSelectedOptions = sortValues(this.control.value);
			this._sortedSelectedOptionsSignal.set(this._sortedSelectedOptions);

			if (this.variant === 'dropdown') {
				this.dropdownSelectionLabelText = joinInputValues(this._sortedSelectedOptions);
			} else {
				this._visibleOptionsValues = this.control.value.map((option) => option.value);
			}
		} else {
			this.dropdownSelectionLabelText = null;
		}
	}

	protected _inputBlur(event: FocusEvent): void {
		if (!event.relatedTarget) {
			setTimeout(() => {
				if (!document.activeElement?.classList.contains('fudis-multiselect-option__focusable')) {
					this.closeDropdown(false);
				}
			}, 150);
		} else if (!(event.relatedTarget as HTMLElement)?.classList.contains('fudis-multiselect-option__focusable')) {
			this.closeDropdown(false);
		}

		this._inputFocused = false;

		this.control.markAsTouched();
	}

	protected _autocompleteMultiselectKeypress(event: any): void {
		this._autocompleteBaseKeypress(event, '.fudis-multiselect-option__focusable');
	}

	/**
	 * Handle chip item remove by index. If there are no selections done, focus back to input on last item removal.
	 */
	protected _handleRemoveChip(index: number): void {
		const currentValue = this.control.value as FudisSelectOption[];

		if (currentValue) {
			currentValue.splice(index, 1);
			if (currentValue!.length === 0) {
				this.inputRef.nativeElement.focus();
			}

			this.dropdownSelectionLabelText = joinInputValues(currentValue);
			this._sortedSelectedOptionsSignal.set(currentValue);
			this.controlValueChangedInternally = true;
			this.control.patchValue(currentValue);
		}
	}
}
