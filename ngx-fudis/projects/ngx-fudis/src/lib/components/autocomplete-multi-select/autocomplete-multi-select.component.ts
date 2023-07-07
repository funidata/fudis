import {
	Component,
	EventEmitter,
	ElementRef,
	Input,
	OnInit,
	Output,
	Signal,
	ViewChild,
	ViewEncapsulation,
	effect,
	HostListener,
} from '@angular/core';
import { InputBaseDirective } from '../../directives/form/input-base/input-base.directive';
import { FudisDropdownOption, FudisInputWidth } from '../../types/forms';
import { FudisIdService } from '../../utilities/id-service.service';
import { FudisDropdownMenuItemService } from '../dropdown-menu/dropdown-menu-item/dropdown-menu-item.service';
import { FudisTranslationConfigService } from '../../utilities/config.service';

@Component({
	selector: 'fudis-autocomplete-multi-select',
	templateUrl: './autocomplete-multi-select.component.html',
	styleUrls: ['./autocomplete-multi-select.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class AutocompleteMultiSelectComponent extends InputBaseDirective implements OnInit {
	constructor(
		private _idService: FudisIdService,
		private _clickService: FudisDropdownMenuItemService,
		_configService: FudisTranslationConfigService
	) {
		super(_configService);

		this._menuStatus = this._clickService.getMenuStatus();

		effect(() => {
			this.closeMenu(this._menuStatus());
		});
	}

	@ViewChild('autocompleteMultiSelectWrapper') wrapper: ElementRef;

	@ViewChild('autocompleteInput') input: ElementRef;

	/**
	 * Available sizes for the multi-select - defaults to large.
	 */
	@Input() size: FudisInputWidth = 'lg';

	/**
	 * Dropdown options
	 */
	@Input({ required: true }) options: FudisDropdownOption[] = [];

	/**
	 * Selected options
	 */
	@Input() selectedOptions: FudisDropdownOption[] = [];

	/**
	 * Aria-label for icon-only button when opening dropdown
	 */
	@Input() openAriaLabel: string = 'Open dropdown';

	/**
	 * Aria-label for icon-only button when closing dropdown
	 */
	@Input() closeAriaLabel: string = 'Close dropdown';

	/**
	 * Label for situations where no results with current filters were found
	 */
	@Input() noResultsFound: string = 'No results were found';

	/**
	 * Aria-label to indicate deleting item chip
	 */
	@Input() removeItemText: string = 'Remove filter';

	/**
	 * Output for item click
	 */
	@Output() itemChange = new EventEmitter<FudisDropdownOption[]>();

	/**
	 * Internal variable for toggle dropdown visibility
	 */
	protected _toggleOn: boolean;

	/**
	 * Internal variable for listening menu toggle Signal
	 */
	private _menuStatus: Signal<boolean>;

	/**
	 * Internal variable for user input filtering
	 */
	protected _filterText: string = '';

	/**
	 * Internal variable for results filtered from options
	 */
	protected _results: FudisDropdownOption[] = [];

	@HostListener('window:keydown.arrowDown', ['$event'])
	@HostListener('window:keydown.arrowUp', ['$event'])
	@HostListener('window:keydown.Escape', ['$event'])
	handleKeyDown(event: KeyboardEvent) {
		event.preventDefault();
		const dropdownMenuElement = this.wrapper.nativeElement.children[2];

		const wrapperInput = this.wrapper.nativeElement.querySelector(
			'.fudis-autocomplete-multi-select__input-wrapper__input'
		);

		const checkboxInput = dropdownMenuElement.querySelector('.fudis-dropdown-menu-item__checkbox__input');

		// TODO Keyboard arrow navigation straight from chevron button - is it necessary?
		if (wrapperInput === document.activeElement) {
			checkboxInput.focus();
		} else if (wrapperInput !== document.activeElement) {
			this.handleCheckboxFocus(event);
		}
	}

	handleCheckboxFocus(event: any) {
		const parent = event.target.closest('fudis-dropdown-menu-item');

		// eslint-disable-next-line default-case
		switch (event.key) {
			case 'ArrowDown':
				event.preventDefault();
				parent?.nextElementSibling?.querySelector('input').focus();
				break;
			case 'ArrowUp':
				event.preventDefault();
				parent?.previousElementSibling?.querySelector('input').focus();
				break;
			case 'Escape':
				this.input.nativeElement.focus();
		}
	}

	@HostListener('document:click', ['$event.target'])
	handleWindowClick(targetElement: HTMLElement) {
		// Close dropdown-menu if click is outside of the autocomple-multi-select component
		if (targetElement && !this.wrapper.nativeElement.contains(targetElement)) {
			this._toggleOn = false;
		}
		this._clickService.setMenuStatus(this._toggleOn);
	}

	ngOnInit(): void {
		this._id = this.id ?? this._idService.getNewId('autocompleteMultiSelect');
		this._results = [...this.options];
	}

	closeMenu(menuStatus: boolean): void {
		if (!menuStatus) {
			this._toggleOn = false;
		}
	}

	handleInputFocus(event: FocusEvent): void {
		if ((event.relatedTarget as HTMLElement)?.classList.contains('fudis-dropdown-menu-item__checkbox__input')) {
			this._toggleOn = false;
		} else {
			this._toggleOn = true;
		}
		this._clickService.setMenuStatus(this._toggleOn);
	}

	handleButtonClick(): void {
		this._toggleOn = !this._toggleOn;
		this._clickService.setMenuStatus(this._toggleOn);
	}

	handleDeleteItem(): void {
		if (this.selectedOptions.length === 0) {
			this.input.nativeElement.focus();
		}
	}

	selectItem(item: FudisDropdownOption): void {
		if (this.isChecked(item)) {
			this.removeItem(item);
		} else {
			this.selectedOptions.push(item);
		}
		this.itemChange.emit(this.selectedOptions);
	}

	removeItem(item: FudisDropdownOption): void {
		this.selectedOptions = this.selectedOptions.filter((option) => item.viewValue !== option.viewValue);
		this.itemChange.emit(this.selectedOptions);

		if (this.selectedOptions.length === 0) {
			this.input.nativeElement.focus();
		}
	}

	isChecked(item: FudisDropdownOption): boolean {
		return this.selectedOptions.some((e) => e.viewValue === item.viewValue);
	}

	doSearch(event: any): void {
		if (event.key !== 'Escape') {
			this._toggleOn = true;
			this._clickService.setMenuStatus(this._toggleOn);
		}

		this._filterText = event.target.value;

		this._results = this.options.filter((option) =>
			option.viewValue.toLowerCase().includes(this._filterText.toLowerCase())
		);
	}
}
