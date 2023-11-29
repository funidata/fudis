import {
	AfterContentInit,
	OnInit,
	Directive,
	ElementRef,
	HostBinding,
	HostListener,
	Input,
	ViewChild,
} from '@angular/core';
import { FudisInputSize } from '../../../types/forms';

@Directive({
	selector: '[fudisDropdownBase]',
})
export class DropdownBaseDirective implements OnInit, AfterContentInit {
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
	 * Dropdown-menu is aligned to open left side of the button by default but can be aligned to open right side if necessary
	 */
	@Input() align: 'left' | 'right' | 'center' = 'left';

	/**
	 * Assign dropdown as single-select or multiselect (with checkboxes)
	 */
	@Input() variant: 'single-select' | 'multiselect' = 'single-select';

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

	@HostListener('window:click', ['$event'])
	getMaxWidth(): void {
		const elementInViewWidth = this.dropdownElement?.nativeElement?.getBoundingClientRect()?.width;

		const elementInViewX = this.dropdownElement?.nativeElement?.getBoundingClientRect()?.x;

		if (elementInViewX && elementInViewWidth && elementInViewWidth !== 0 && this.align === 'left') {
			this._maxWidth = `${elementInViewWidth + elementInViewX}px`;
		} else if (window?.innerWidth && elementInViewX) {
			this._maxWidth = `${window.innerWidth - elementInViewX}px`;
		} else {
			this._maxWidth = 'initial';
		}
	}

	ngOnInit(): void {
		if (this.variant === 'multiselect') {
			this._isMultiselect = true;
		}
	}

	ngAfterContentInit(): void {
		this.getMaxWidth();
	}
}
