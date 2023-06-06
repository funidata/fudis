import { Directive, ElementRef, OnInit } from '@angular/core';

import { GridItemApiDirective } from './grid-item-api.directive';

@Directive({
	selector: '[fudisGridItem]',
})
export class GridItemDirective extends GridItemApiDirective implements OnInit {
	constructor(private gridItemElement: ElementRef) {
		super();
	}

	ngOnInit(): void {
		(this.gridItemElement.nativeElement as HTMLElement).classList.add('fudis-grid-item');

		(this.gridItemElement.nativeElement as HTMLElement).classList.add(`fudis-grid-item__justify-self__${this.alignX}`);

		(this.gridItemElement.nativeElement as HTMLElement).classList.add(`fudis-grid-item__align-self__${this.alignY}`);

		(this.gridItemElement.nativeElement as HTMLElement).style.gridColumn =
			this.gridColumn === 'stretch' ? '1/-1' : this.gridColumn;
	}
}
