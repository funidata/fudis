import { Directive, ElementRef, EventEmitter, Input, Output } from '@angular/core';

@Directive({
	selector: '[fudisDropdownItemBase]',
})
export class DropdownItemBaseDirective {
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

	// eslint-disable-next-line class-methods-use-this
	protected _focusedOutFromComponent(event: FocusEvent, element: ElementRef): boolean {
		if (!event.relatedTarget) {
			setTimeout(() => {
				if (!document.activeElement?.classList.contains('fudis-dropdown-menu-item__focusable')) {
					return false;
				}
				const menuButton = element.nativeElement.closest('fudis-button')?.querySelector('.fudis-button');

				if (
					!(event.relatedTarget as HTMLElement)?.classList?.contains('fudis-dropdown-menu-item__focusable') &&
					(event.relatedTarget as HTMLElement) !== menuButton
				) {
					return true;
				}
				return false;
			}, 100);
		} else {
			const parentSelect = element.nativeElement.closest('fudis-select');

			const menuButton = element.nativeElement.closest('fudis-button')?.querySelector('.fudis-button');

			const selectInput = parentSelect?.querySelector('.fudis-select__input');

			const autocompleteChevronButton = parentSelect?.querySelector('.fudis-select__input-wrapper__icon-button button');

			if (
				!(event.relatedTarget as HTMLElement)?.classList?.contains('fudis-dropdown-menu-item__focusable') &&
				(event.relatedTarget as HTMLElement) !== selectInput &&
				(event.relatedTarget as HTMLElement) !== menuButton &&
				(event.relatedTarget as HTMLElement) !== autocompleteChevronButton
			) {
				return true;
			}
		}

		return false;
	}
}
