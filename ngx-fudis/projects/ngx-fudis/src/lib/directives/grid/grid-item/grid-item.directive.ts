import { BreakpointObserver } from '@angular/cdk/layout';
import { Directive, ElementRef, OnChanges } from '@angular/core';

import { GridItemApiDirective } from './grid-item-api.directive';

@Directive({
	selector: '[fudisGridItem]',
})
export class GridItemDirective extends GridItemApiDirective implements OnChanges {
	constructor(private gridBreakpointObserver: BreakpointObserver, private gridItemElement: ElementRef) {
		super();
	}

	ngOnInit(): void {
		(this.gridItemElement.nativeElement as HTMLElement).classList.add('fudis-grid-item');

		(this.gridItemElement.nativeElement as HTMLElement).classList.add(`fudis-grid-item__justify-self__${this.alignX}`);

		(this.gridItemElement.nativeElement as HTMLElement).classList.add(`fudis-grid-item__align-self__${this.alignY}`);
	}

	ngOnChanges(): void {
		console.log('moi');
	}
}
