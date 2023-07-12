import { OnInit, Component, ElementRef, EventEmitter, Host, Input, Output, ViewChild } from '@angular/core';
import { FudisDropdownMenuItemService } from './dropdown-menu-item.service';
import { DropdownMenuComponent } from '../dropdown-menu.component';

@Component({
	selector: 'fudis-dropdown-menu-item',
	templateUrl: './dropdown-menu-item.component.html',
	styleUrls: ['./dropdown-menu-item.component.scss'],
})
export class DropdownMenuItemComponent implements OnInit {
	constructor(
		private clickService: FudisDropdownMenuItemService,
		@Host() private _parentComponent: DropdownMenuComponent
	) {}

	@ViewChild('dropdownItem') dropdownItem: ElementRef;

	/**
	 * Label for dropdown item
	 */
	@Input({ required: true }) label: string;

	/**
	 * Option for disabling dropdown item
	 */
	@Input() disabled: boolean = false;

	/**
	 * Option for closing or leaving dropdown open after clicking an item. Closes by default.
	 */
	@Input() close: boolean = true;

	/**
	 * Checked state for dropdown-menu-item with checkbox
	 */
	@Input() checked: boolean;

	/**
	 * Optional click handler
	 */
	@Output() handleClick = new EventEmitter<Event>();

	/**
	 * Output for handling checked state in dropdown-menu-item with checkbox
	 */
	@Output() handleChecked = new EventEmitter<boolean>();

	/**
	 * Determine whether option is displayed as single-select or multiselect (with checkbox).
	 * Multiselect is used e.g in autocomplete-multi-select.
	 */
	protected _isMultiselectOption: boolean = false;

	ngOnInit(): void {
		// Check parent component's public HostBinding for multiselect usage
		if (this._parentComponent._isMultiselect) {
			this._isMultiselectOption = true;
		}
	}

	// eslint-disable-next-line class-methods-use-this
	handleKeyDown(event: KeyboardEvent) {
		if (event.key !== 'ArrowUp' && event.key !== 'ArrowDown') return;

		const focusElement = document.querySelector(':focus');
		const tabElements = document.querySelectorAll('fudis-dropdown-menu-item button');
		const tabElementsCount = tabElements.length - 1;
		event.preventDefault();

		const focusIndex = Array.prototype.indexOf.call(tabElements, focusElement);

		let elementToFocus = this.dropdownItem.nativeElement;
		if (event.key === 'ArrowUp') {
			elementToFocus = tabElements[focusIndex > 0 ? focusIndex - 1 : tabElementsCount];
		}
		if (event.key === 'ArrowDown') {
			elementToFocus = tabElements[focusIndex < tabElementsCount ? focusIndex + 1 : 0];
		}
		elementToFocus.focus();
	}

	handleBlur(event: FocusEvent): void {
		const menuButton = this.dropdownItem.nativeElement.closest('fudis-button').querySelector('.fudis-button');

		if (
			!(event.relatedTarget as HTMLElement)?.classList?.contains('fudis-dropdown-menu-item') &&
			(event.relatedTarget as HTMLElement) !== menuButton
		) {
			this.clickService.setMenuStatus(false);
		}
	}

	closeDropdown(): void {
		if (this.close === true) {
			this.clickService.setMenuStatus(false);
		}
	}
}
