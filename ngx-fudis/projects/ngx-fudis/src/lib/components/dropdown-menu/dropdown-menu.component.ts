import { Component, ContentChild, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { DropdownMenuDirective } from './dropdown-menu.directive';

@Component({
	selector: 'fudis-dropdown-menu',
	templateUrl: './dropdown-menu.component.html',
	styleUrls: ['./dropdown-menu.component.scss'],
})
export class DropdownMenuComponent implements AfterViewInit {
	@ContentChild(DropdownMenuDirective) content: DropdownMenuDirective;

	@ViewChild('dropdownContent') dropdownContent: ElementRef<HTMLElement>;

	ngAfterViewInit() {
		this.dropdownContent.nativeElement.setAttribute('tabindex', '-1');
		this.dropdownContent.nativeElement.focus();
	}
}
