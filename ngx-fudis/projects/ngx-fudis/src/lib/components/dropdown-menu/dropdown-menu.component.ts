import {
	AfterContentInit,
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	HostListener,
	Input,
	ViewChild,
} from '@angular/core';

@Component({
	selector: 'fudis-dropdown-menu',
	templateUrl: './dropdown-menu.component.html',
	styleUrls: ['./dropdown-menu.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownMenuComponent implements AfterContentInit {
	@ViewChild('dropdownMenu') dropdownMenu: ElementRef<HTMLElement>;

	/**
	 * Dropdown-menu is aligned to open left side of the button by default but can be aligned to open right side if necessary
	 */
	@Input() align: 'left' | 'right' = 'left';

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

	ngAfterContentInit(): void {
		this.getMaxWidth();
	}
}
