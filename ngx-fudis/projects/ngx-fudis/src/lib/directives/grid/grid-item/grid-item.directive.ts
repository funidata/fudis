import { BreakpointObserver } from '@angular/cdk/layout';
import { Directive, ElementRef, OnChanges, OnInit } from '@angular/core';

import { GridItemApiDirective } from './grid-item-api.directive';

@Directive({
	selector: '[fudisGridItem]',
})
export class GridItemDirective extends GridItemApiDirective implements OnChanges, OnInit {
	constructor(private gridBreakpointObserver: BreakpointObserver, private gridItemElement: ElementRef) {
		super();
	}

	ngOnInit(): void {
		(this.gridItemElement.nativeElement as HTMLElement).classList.add('fudis-grid-item');

		(this.gridItemElement.nativeElement as HTMLElement).classList.add(`fudis-grid-item__justify-self__${this.alignX}`);

		(this.gridItemElement.nativeElement as HTMLElement).classList.add(`fudis-grid-item__align-self__${this.alignY}`);

		(this.gridItemElement.nativeElement as HTMLElement).style.gridColumn =
			this.gridColumn === 'stretch' ? '1/-1' : this.gridColumn;
	}

	// eslint-disable-next-line class-methods-use-this
	ngOnChanges(): void {
		// console.log('moi');
	}
}
