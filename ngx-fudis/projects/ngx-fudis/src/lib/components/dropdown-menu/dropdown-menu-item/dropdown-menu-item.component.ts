import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

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

	// eslint-disable-next-line class-methods-use-this
	handleKeyDown(event: KeyboardEvent) {
		// TODO
		if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
			console.log('keydown');
			event.preventDefault();
			console.log(event);
			console.log(this.dropdownItem.nativeElement);
			this.dropdownItem.nativeElement.focus();

			// console.log(event.target);
			// (event.target as HTMLElement).focus();
		}
	}
}
