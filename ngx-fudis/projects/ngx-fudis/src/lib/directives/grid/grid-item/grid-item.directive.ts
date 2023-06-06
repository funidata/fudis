/* eslint-disable no-underscore-dangle */
import { Directive, ElementRef, OnChanges, OnInit, Input } from '@angular/core';

type GridItemAlignment = 'start' | 'end' | 'center' | 'strecth';
@Directive({
	selector: '[fudisGridItem]',
})
export class GridItemDirective implements OnInit, OnChanges {
	@Input() gridColumn: string | 'stretch' | 'auto' = 'auto';

	private _alignX = 'fudis-grid-item__justify-self__stretch';

	private _alignY = 'fudis-grid-item__align-self__stretch';

	@Input() set alignX(value: GridItemAlignment) {
		const valueToSet = value ? `fudis-grid-item__justify-self__${value}` : `fudis-grid-item__justify-self__stretch`;

		this._alignX = valueToSet;
	}

	@Input() alignY: GridItemAlignment = 'strecth';

	constructor(private gridItemElement: ElementRef) {}

	ngOnInit(): void {
		(this.gridItemElement.nativeElement as HTMLElement).classList.add('fudis-grid-item');

		(this.gridItemElement.nativeElement as HTMLElement).classList.add(this._alignX);

		(this.gridItemElement.nativeElement as HTMLElement).classList.add(`fudis-grid-item__align-self__${this.alignY}`);

		(this.gridItemElement.nativeElement as HTMLElement).style.gridColumn =
			this.gridColumn === 'stretch' ? '1/-1' : this.gridColumn;
	}

	ngOnChanges(): void {
		(this.gridItemElement.nativeElement as HTMLElement).classList.add(this._alignX);

		(this.gridItemElement.nativeElement as HTMLElement).classList.add(`fudis-grid-item__align-self__${this.alignY}`);

		(this.gridItemElement.nativeElement as HTMLElement).style.gridColumn =
			this.gridColumn === 'stretch' ? '1/-1' : this.gridColumn;
	}
}
