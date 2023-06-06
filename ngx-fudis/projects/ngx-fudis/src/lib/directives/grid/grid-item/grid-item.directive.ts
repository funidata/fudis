import { Directive, ElementRef, OnChanges, OnInit, Input } from '@angular/core';

type GridItemAlignment = 'start' | 'end' | 'center' | 'strecth';

type GridItemColumnSpan = string | 'stretch' | 'auto';

interface GridItemColumn {
	default: GridItemColumnSpan;
	xs: GridItemColumnSpan;
	sm: GridItemColumnSpan;
	md: GridItemColumnSpan;
	lg: GridItemColumnSpan;
	xl: GridItemColumnSpan;
	xxl: GridItemColumnSpan;
}

@Directive({
	selector: '[fudisGridItem]',
})
export class GridItemDirective implements OnInit, OnChanges {
	@Input() columns: GridItemColumnSpan | GridItemColumn = 'auto';

	@Input() alignX: GridItemAlignment = 'strecth';

	@Input() alignY: GridItemAlignment = 'strecth';

	constructor(private gridItemElement: ElementRef) {}

	setAlignX(): void {
		if (typeof this.alignX === 'string') {
			(this.gridItemElement.nativeElement as HTMLElement).classList.add(
				`fudis-grid-item__justify-self__${this.alignX}`
			);
		}
	}

	setAlignY(): void {
		if (typeof this.alignY === 'string') {
			(this.gridItemElement.nativeElement as HTMLElement).classList.add(`fudis-grid-item__align-self__${this.alignY}`);
		}
	}

	setColumns(): void {
		if (typeof this.columns === 'string') {
			(this.gridItemElement.nativeElement as HTMLElement).style.gridColumn =
				this.columns === 'stretch' ? '1/-1' : this.columns;
		}
	}

	ngOnInit(): void {
		(this.gridItemElement.nativeElement as HTMLElement).classList.add('fudis-grid-item');

		this.setAlignX();
		this.setAlignY();
		this.setColumns();
	}

	ngOnChanges(): void {
		this.setAlignX();
		this.setAlignY();
		this.setColumns();
	}
}
