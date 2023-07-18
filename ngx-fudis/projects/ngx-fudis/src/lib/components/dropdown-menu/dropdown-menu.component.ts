import {
	AfterContentInit,
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	HostBinding,
	HostListener,
	Input,
	OnInit,
	ViewChild,
	ViewEncapsulation,
} from '@angular/core';
import { FudisInputWidth } from '../../types/forms';

@Component({
	selector: 'fudis-dropdown-menu',
	templateUrl: './dropdown-menu.component.html',
	styleUrls: ['./dropdown-menu.component.scss'],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownMenuComponent implements AfterContentInit, OnInit {
	@ViewChild('dropdownMenu') dropdownMenu: ElementRef<HTMLElement>;

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
	@Input() size: FudisInputWidth = 'lg';

	/**
	 * Determine dropdown max-width
	 */
	protected _maxWidth: string = 'initial';

	@HostListener('window:keydown.arrowDown', ['$event'])
	handleKeyDown(event: KeyboardEvent) {
		event.preventDefault();
		const firstChildElement = this.dropdownMenu.nativeElement.children[0];

		// If focus is on the menu button, only then listen keydown and focus on the first child
		if (firstChildElement.closest('fudis-button')?.querySelector('.fudis-button') === document.activeElement) {
			const firstChildButtonElement = firstChildElement.querySelector('button');
			firstChildButtonElement?.focus();
		}
	}

	@HostListener('window:click', ['$event'])
	getMaxWidth(): void {
		const elementInViewWidth = this.dropdownMenu?.nativeElement?.getBoundingClientRect()?.width;

		const elementInViewX = this.dropdownMenu?.nativeElement?.getBoundingClientRect()?.x;

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
