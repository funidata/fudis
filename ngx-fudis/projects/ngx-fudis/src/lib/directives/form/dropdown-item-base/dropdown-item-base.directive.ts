import { Directive, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { FudisDropdownMenuItemService } from '../../../components/dropdown-menu/dropdown-menu-item/dropdown-menu-item.service';

@Directive({
	selector: '[fudisDropdownItemBase]',
})
export class DropdownItemBaseDirective {
	constructor(protected _menuService: FudisDropdownMenuItemService) {}

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
	 * Output for blur event in dropdown-menu-item with checkbox
	 */
	@Output() handleBlur = new EventEmitter<FocusEvent>();

	/**
	 * Id generated with FudisIdService
	 */
	protected _id: string;

	protected _closeDropdown(): void {
		if (this.close === true) {
			this._menuService.setMenuStatus({ id: this._id, open: false });
		}
	}

	// eslint-disable-next-line class-methods-use-this
	protected _baseHandleKeyDown(event: KeyboardEvent, element: ElementRef, selector: string) {
		if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
			const focusElement = document.querySelector(':focus');
			const tabElements = document.querySelectorAll(selector);
			const tabElementsCount = tabElements.length - 1;
			event.preventDefault();

			const focusIndex = Array.prototype.indexOf.call(tabElements, focusElement);

			let elementToFocus = element.nativeElement;
			if (event.key === 'ArrowUp') {
				elementToFocus = tabElements[focusIndex > 0 ? focusIndex - 1 : tabElementsCount];
			}
			if (event.key === 'ArrowDown') {
				elementToFocus = tabElements[focusIndex < tabElementsCount ? focusIndex + 1 : 0];
			}
			elementToFocus.focus();
		}
	}

	protected _baseHandleButtonBlur(event: FocusEvent, element: ElementRef, id: string): void {
		const menuButton = element.nativeElement.closest('fudis-button')?.querySelector('.fudis-button');

		if (
			!(event.relatedTarget as HTMLElement)?.classList?.contains('fudis-dropdown-menu-item') &&
			(event.relatedTarget as HTMLElement) !== menuButton
		) {
			this._menuService.setMenuStatus({ id, open: false });
		}
	}
}
