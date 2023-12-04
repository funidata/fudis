import { Directive, ElementRef, HostBinding, HostListener, Input, ViewChild } from '@angular/core';
import { FudisInputSize } from '../../../types/forms';

@Directive({
	selector: '[fudisDropdownBase]',
})
export class DropdownBaseDirective {
	@ViewChild('dropdownElement') dropdownElement: ElementRef<HTMLElement>;

	/**
	 * Binding fudis-dropdown-menu-host class to component wrapper
	 */
	@HostBinding('class') classes = 'fudis-dropdown-menu-host';

	/**
	 * Binding public variable for querying variant type
	 */
	@HostBinding('class.fudis-dropdown-menu-host') public _isMultiselect = false;

	/**
	 * Assign dropdown as single-select or multiselect (with checkboxes)
	 */
	@Input() multiselect: boolean = false;

	/**
	 * Set dropdown size (should follow the given input element size)
	 */
	@Input() size: FudisInputSize | 'xs' = 'lg';

	/**
	 * Set dropdown open
	 */
	@Input() open: boolean = false;

	/**
	 * Id for Dropdown Menu parent. Generated with FudisIdService
	 */
	public id: string;

	/**
	 * Determine dropdown max-width
	 */
	protected _maxWidth: string = 'initial';

	@HostListener('window:keydown.arrowDown', ['$event'])
	handleArrowDownPress(event: KeyboardEvent) {
		event.preventDefault();

		if (this.open) {
			const firstChildElement = this.dropdownElement.nativeElement.children[0];

			const focusOnMenuButton =
				firstChildElement.closest('fudis-button')?.querySelector('.fudis-button') === document.activeElement;

			const focusOnSelectInput =
				firstChildElement.closest('fudis-select')?.querySelector('.fudis-select__input') === document.activeElement;

			// If focus is on the menu button, only then listen keydown and focus on the first child
			if (focusOnMenuButton || focusOnSelectInput) {
				const firstChildButtonElement = firstChildElement.querySelector('button');
				firstChildButtonElement?.focus();
			}
		}
	}
}
