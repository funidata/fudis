import {
	AfterViewInit,
	Component,
	ContentChild,
	EventEmitter,
	Input,
	OnChanges,
	OnInit,
	Output,
	Signal,
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
import { FudisDropdownMenuItemService } from '../../dropdown-menu/dropdown-menu-item/dropdown-menu-item.service';
import { ContentDirective } from '../../../directives/content-projection/content/content.directive';

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
		_translationService: FudisTranslationService,
		private _menuService: FudisDropdownMenuItemService
	) {
		super(_translationService, _idService);

		this._dropdownOpenSignal = _menuService.getMenuStatus();

		effect(() => {
			this._openAriaLabel = this._translations().AUTOCOMPLETE.MULTISELECT.OPEN_DROPDOWN;
			this._closeAriaLabel = this._translations().AUTOCOMPLETE.MULTISELECT.CLOSE_DROPDOWN;
			this._noResultsFound = this._translations().AUTOCOMPLETE.MULTISELECT.NO_RESULTS;
			this._removeItemText = this._translations().AUTOCOMPLETE.MULTISELECT.REMOVE_ITEM;

			this._toggleOn = this._dropdownOpenSignal();

			console.log(this._toggleOn);
		});
	}

	@ContentChild(ContentDirective) content: ContentDirective;

	/*
	 * FormControl for the dropdown
	 */
	@Input({ required: true }) control: FormControl<FudisDropdownOption | null>;

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

	/**
	 * Pre-selected dropdown options.
	 * Expects an array if 'multipleOption' is true and if 'multipleOption' is false, expects a single FudisDropdownOption.
	 * It searches given 'options' input array for matching 'value' and 'label' with selectedOptions and updates formControl value with items from 'options' input.
	 */
	@Input() selectedOptions: FudisDropdownOption | FudisDropdownOption[];

	/**
	 * Value output event on selection change
	 */
	@Output() selectionUpdate: EventEmitter<FudisDropdownOption> = new EventEmitter<FudisDropdownOption>();

	/**
	 * Internal property for toggle dropdown visibility
	 */
	protected _toggleOn: boolean;

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

	private _dropdownOpenSignal: Signal<boolean>;

	handleSelectionChange(value: FudisDropdownOption): void {
		this.selectionUpdate.emit(value);
	}

	ngOnInit(): void {
		this._setInputId('dropdown');

		// this._setInitialValues();
	}

	ngAfterViewInit(): void {
		if (this.initialFocus && !this._focusService.isIgnored(this.id)) {
			this.focusToInput();
		}
	}

	ngOnChanges(): void {
		this._required = this.required ?? hasRequiredValidator(this.control);
	}

	protected _toggleDropdown(): void {
		this._toggleOn = !this._toggleOn;
		this._menuService.setMenuStatus(this._toggleOn);
	}

	/**
	 * Open menu / Toggle dropdown menu on
	 */
	protected _openDropdown(): void {
		this._toggleOn = true;
	}

	protected _handleKeypress(event: KeyboardEvent): void {
		if (this.variant !== 'autocomplete') {
			event.preventDefault();
		}
	}

	// private _setInitialValues(): void {
	// 	if (!Array.isArray(this.selectedOptions) && !this.multipleOption) {
	// 		const valueToFind: FudisDropdownOption = this.selectedOptions;

	// 		const foundIndex = this.options.findIndex((option) => {
	// 			return option.value === valueToFind?.value && option.label === valueToFind?.label;
	// 		});

	// 		if (foundIndex !== -1) {
	// 			this.control.patchValue(this.options[foundIndex]);
	// 		}
	// 	}
	// }
}
