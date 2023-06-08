/* eslint-disable no-underscore-dangle */
import { Directive, ElementRef, OnChanges, OnInit, Input, effect } from '@angular/core';
import { GridService } from '../grid-service/grid.service';
import {
	GridResponsiveData,
	GridItemAlignment,
	GridItemResponsive,
	GridItemWidth,
	gridItemDefault,
} from '../../../types/grid';
import { getGridCssValue } from '../gridUtils';

@Directive({
	selector: '[fudisGridItem]',
})
export class GridItemDirective implements OnInit, OnChanges {
	private _columns: string | GridResponsiveData[] = gridItemDefault;

	private _element: HTMLElement;

	@Input() set columns(value: GridItemWidth | GridItemResponsive) {
		if (typeof value === 'string') {
			this._columns = value === 'stretch' ? '1/-1' : value;
		} else if (typeof value === 'number') {
			this._columns = getGridCssValue(value, true);
		} else {
			this._columns = this._gridService.createGridBreakpointObject(value, true);
		}
	}

	@Input() alignX: GridItemAlignment = 'stretch';

	@Input() alignY: GridItemAlignment = 'stretch';

	constructor(private _gridItemElement: ElementRef, private _gridService: GridService) {
		this._element = _gridItemElement.nativeElement;

		effect(() => {
			this._gridService.getBreakpointState();
			this.setColumns();
		});
	}

	setAlign(): void {
		this._element.classList.add(`fudis-grid-item__justify-self__${this.alignX}`);
		this._element.classList.add(`fudis-grid-item__align-self__${this.alignY}`);
	}

	setColumns(): void {
		this._gridService.setGridAttributes(this._element, this._columns, true);
	}

	ngOnInit(): void {
		this._element.classList.add('fudis-grid-item');
		this.setAlign();
		this.setColumns();
	}

	ngOnChanges(): void {
		this.setAlign();
		this.setColumns();
	}
}
