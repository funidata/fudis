import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { DropdownMenuItemService } from './dropdown-menu-item.service';

@Component({
	selector: 'fudis-dropdown-menu-item',
	templateUrl: './dropdown-menu-item.component.html',
	styleUrls: ['./dropdown-menu-item.component.scss'],
})
export class DropdownMenuItemComponent {
	@ViewChild('dropdownItem') dropdownItem: ElementRef;

	/**
	 * Label for dropdown item
	 */
	@Input() label: string;

	/**
	 * Option for disabling dropdown item
	 */
	@Input() disabled: boolean = false;

	@Output() handleClick = new EventEmitter<Event>();

	constructor(private clickService: DropdownMenuItemService) {}

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

	closeDropdown(): void {
		this.clickService.close();
	}
}
