import {
	AfterViewInit,
	Component,
	ElementRef,
	EventEmitter,
	HostListener,
	Input,
	OnChanges,
	OnInit,
	Output,
	ViewChild,
	ViewEncapsulation,
	effect,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { FudisFocusService } from '../../../services/focus/focus.service';
import { FudisIdService } from '../../../services/id/id.service';
import { FudisTranslationService } from '../../../services/translation/translation.service';
import { InputBaseDirective } from '../../../directives/form/input-base/input-base.directive';
import { FudisDropdownOption, FudisInputSize } from '../../../types/forms';
import { hasRequiredValidator } from '../../../utilities/form/getValidators';

import { SelectDropdownComponent } from './select-dropdown/select-dropdown.component';

@Component({
	selector: 'fudis-select',
	templateUrl: './select.component.html',
	styleUrls: ['./select.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class SelectComponent extends InputBaseDirective implements OnInit, AfterViewInit, OnChanges {
	constructor(
		private _focusService: FudisFocusService,
		_idService: FudisIdService,
		_translationService: FudisTranslationService
	) {
		super(_translationService, _idService);

		effect(() => {
			this._openAriaLabel = this._translations().AUTOCOMPLETE.MULTISELECT.OPEN_DROPDOWN;
			this._closeAriaLabel = this._translations().AUTOCOMPLETE.MULTISELECT.CLOSE_DROPDOWN;
			this._noResultsFound = this._translations().AUTOCOMPLETE.MULTISELECT.NO_RESULTS;
			this._removeItemText = this._translations().AUTOCOMPLETE.MULTISELECT.REMOVE_ITEM;
		});
	}

	@ViewChild('dropdownRef') dropdownRef: SelectDropdownComponent;

	@ViewChild('selectRef') selectElementRef: ElementRef;

	@ViewChild('inputWrapperRef') inputWrapperRef: ElementRef;

	/*
	 * FormControl for the dropdown
	 */
	@Input({ required: true }) control: FormControl<FudisDropdownOption | FudisDropdownOption[] | null>;

	/**
	 * If true, user can choose multiple checkbox options from dropdown
	 */
	@Input() multiselect: boolean = false;

	/**
	 * Placeholder text for the dropdown input when no selection has been made
	 */
	@Input() placeholder: string;

	/**
	 * Available sizes for the dropdown
	 */
	@Input() size: 'xs' | FudisInputSize = 'lg';

	@Input() variant: 'dropdown' | 'autocomplete' = 'dropdown';

	@Input() openOnFocus: boolean = true;

	/**
	 * Value output event on selection change
	 */
	@Output() selectionUpdate: EventEmitter<FudisDropdownOption> = new EventEmitter<FudisDropdownOption>();

	public inputLabel: string | null = null;

	/**
	 * Internal property for toggle dropdown visibility
	 */
	protected _dropdownOpen: boolean;

	/**
	 * Internal property for icon-only button aria-label when opening dropdown
	 */
	protected _openAriaLabel: string;

	/**
	 * Internal property for icon-only button aria-label when closing dropdown
	 */
	protected _closeAriaLabel: string;

	/**
	 * Internal property label for situations where no results with current filters were found
	 */
	protected _noResultsFound: string;

	/**
	 * Internal property to indicate deleting item chip aria-label
	 */
	protected _removeItemText: string;

	protected _firstOpenDone: boolean = false;

	private _preventClick: boolean = false;

	handleSelectionChange(value: FudisDropdownOption): void {
		this.selectionUpdate.emit(value);
		this.control.patchValue(value);

		this.inputLabel = value.label;
	}

	ngOnInit(): void {
		this._setParentId();
	}

	ngAfterViewInit(): void {
		if (this.initialFocus && !this._focusService.isIgnored(this.id)) {
			this.focusToInput();
		}
	}

	ngOnChanges(): void {
		this._required = this.required ?? hasRequiredValidator(this.control);
	}

	public handleMultiSelectionChange(option: FudisDropdownOption, removeSelection: boolean): void {
		const currentControlValue = this.control.value;

		if (removeSelection && currentControlValue) {
			const newControlValue = currentControlValue.filter((item: FudisDropdownOption) => {
				return item.value !== option.value;
			});

			this._sortAndPatchValue(newControlValue, true);
		} else if (currentControlValue === null || currentControlValue.length === 0) {
			this._sortAndPatchValue([option], false);
		} else {
			currentControlValue.push(option);
			this._sortAndPatchValue(currentControlValue as FudisDropdownOption[], true);
		}
	}

	public closeDropdown(): void {
		this._dropdownOpen = false;
	}

	protected _inputBlur(event: FocusEvent): void {
		if (
			!(event.relatedTarget as HTMLElement)?.classList.contains('fudis-dropdown-menu-item__single-select') &&
			!(event.relatedTarget as HTMLElement)?.classList.contains(
				'fudis-dropdown-menu-item__multiselect__label__checkbox__input'
			)
		) {
			this._dropdownOpen = false;
		}

		this.control.markAsTouched();
	}

	protected _inputFocus(): void {
		if (this.openOnFocus && !this._dropdownOpen) {
			this._openDropdown();
			this._preventClick = true;
		}
	}

	protected _clickInput(): void {
		if (this._preventClick) {
			this._preventClick = false;
		} else {
			this._toggleDropdown();
		}

		this.inputRef.nativeElement.focus();
	}

	protected _handleKeypress(event: KeyboardEvent): void {
		if (this.variant !== 'autocomplete') {
			const { key } = event;

			switch (key) {
				case ' ':
				case 'Enter':
					event.preventDefault();
					this._toggleDropdown();
					break;
				case 'ArrowDown':
					if (!this._dropdownOpen) {
						this._toggleDropdown();
					}
					this._focusToFirstOption();
					break;
				case 'Tab':
					break;
				default:
					event.preventDefault();
			}
		}
	}

	private _openDropdown(): void {
		this._dropdownOpen = true;
		this._firstOpenDone = true;
	}

	private _toggleDropdown(): void {
		this._dropdownOpen = !this._dropdownOpen;
		this._firstOpenDone = true;
	}

	private _focusToFirstOption(): void {
		const firstOption: HTMLInputElement = this.dropdownRef?.dropdownElement.nativeElement.querySelector(
			'.fudis-dropdown-menu-item__multiselect__label__checkbox__input'
		) as HTMLInputElement;
		if (firstOption) {
			firstOption.focus();
			this._focusTryCounter = 0;
		} else if (this._focusTryCounter < 100) {
			setTimeout(() => {
				this._focusTryCounter += 1;
				this._focusToFirstOption();
			}, 100);
		}
	}

	private _setParentId(): void {
		if (this.id) {
			this._idService.addNewParentId('select', this.id);
		} else {
			this.id = this._idService.getNewParentId('select');
		}
	}

	private _sortAndPatchValue(value: FudisDropdownOption[], sort: boolean): void {
		if (sort) {
			const label: string[] = [];

			const sortedOptions = value.sort((a: FudisDropdownOption, b: FudisDropdownOption) => {
				if (a['htmlId'] < b['htmlId']) {
					return -1;
				}
				if (a['htmlId'] > b['htmlId']) {
					return 1;
				}
				return 0;
			});

			sortedOptions.forEach((item: FudisDropdownOption) => {
				label.push(item.label);
			});
			this.inputLabel = label.join(', ');
			this.control.patchValue(sortedOptions);
		} else {
			this.inputLabel = value[0].label;
			this.control.patchValue(value);
		}
	}

	@HostListener('document:click', ['$event.target'])
	private _handleWindowClick(targetElement: HTMLElement) {
		if (
			!this.inputWrapperRef.nativeElement.contains(targetElement) &&
			!this.dropdownRef?.dropdownElement?.nativeElement.contains(targetElement)
		) {
			this._dropdownOpen = false;
		}
	}

	@HostListener('window:keydown.escape', ['$event'])
	private _handleEscapePress(event: KeyboardEvent) {
		if (this._dropdownOpen) {
			event.preventDefault();

			(event.target as HTMLElement).closest('fudis-select')?.querySelector('input')?.focus();

			this._dropdownOpen = false;
		}
	}
}
