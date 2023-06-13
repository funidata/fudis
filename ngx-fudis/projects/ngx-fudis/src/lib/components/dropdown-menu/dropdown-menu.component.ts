import { AfterViewInit, Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';

@Component({
	selector: 'fudis-dropdown-menu',
	templateUrl: './dropdown-menu.component.html',
	styleUrls: ['./dropdown-menu.component.scss'],
})
export class DropdownMenuComponent implements AfterViewInit {
	@ViewChild('dropdownMenu') dropdownMenu: ElementRef<HTMLElement>;

	/**
	 * Dropdown-menu is aligned to open left side of the button by default but can be aligned to open right side if necessary
	 */
	@Input() align: 'left' | 'right' = 'left';

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

	protected maxWidth: string = 'initial';

	@HostListener('window:click', ['$event'])
	getMaxWidth(): void {
		const elementInView = this.dropdownMenu?.nativeElement?.getBoundingClientRect();

		if (elementInView?.x !== 0 && this.align === 'left') {
			this.maxWidth = `${elementInView.width + elementInView.x}px`;
		} else if (elementInView?.x !== 0) {
			this.maxWidth = `${window.innerWidth - elementInView.x}px`;
		} else {
			this.maxWidth = 'initial';
		}
	}

	ngAfterViewInit(): void {
		this.getMaxWidth();
	}
}
