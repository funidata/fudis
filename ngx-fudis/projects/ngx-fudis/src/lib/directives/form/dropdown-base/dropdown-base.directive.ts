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
	 * Id for Dropdown Menu parent. Generated with FudisIdService
	 */
	public id: string;

	/**
	 * Determine dropdown max-width
	 */
	protected _maxWidth: string = 'initial';

	@HostListener('window:keydown.arrowDown', ['$event'])
	handleKeyDown(event: KeyboardEvent) {
		event.preventDefault();
		const firstChildElement = this.dropdownElement.nativeElement.children[0];

		// If focus is on the menu button, only then listen keydown and focus on the first child
		if (firstChildElement.closest('fudis-button')?.querySelector('.fudis-button') === document.activeElement) {
			const firstChildButtonElement = firstChildElement.querySelector('button');
			firstChildButtonElement?.focus();
		}
	}
}
