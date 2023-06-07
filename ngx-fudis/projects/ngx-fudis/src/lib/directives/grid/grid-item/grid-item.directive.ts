/* eslint-disable no-underscore-dangle */
import { Directive, ElementRef, OnChanges, OnInit, Input, effect } from '@angular/core';
import { BreakpointState } from '@angular/cdk/layout';
import { GridService } from '../grid-service/grid.service';
import { gridBreakpoints } from '../gridUtils';
import { GridInputColumnObject } from '../../../types/grid';

type GridItemAlignment = 'start' | 'end' | 'center' | 'stretch';

type GridItemWidth = number | string | 'stretch' | 'auto';

interface GridItemColumn {
	default: GridItemWidth;
	xs: GridItemWidth;
	sm: GridItemWidth;
	md: GridItemWidth;
	lg: GridItemWidth;
	xl: GridItemWidth;
	xxl: GridItemWidth;
}

@Directive({
	selector: '[fudisGridItem]',
})
export class GridItemDirective implements OnInit, OnChanges {
	private _gridColumnDefault = 'auto';

	private _currentBreakpoints: BreakpointState | null;

	private _columns: GridItemWidth | GridInputColumnObject[];

	@Input() set columns(value: GridItemWidth | GridItemColumn) {
		if (!value) {
			this._columns = this._gridColumnDefault;
		} else if (typeof value === 'string') {
			this._columns = value;
		} else if (typeof value === 'number') {
			this._columns = `span ${value}`;
		} else {
			const columnsArray: GridInputColumnObject[] = [];

			if (!value.default) {
				columnsArray.push({
					name: 'default',
					value: this._gridColumnDefault,
					breakpoint: gridBreakpoints.default,
				});
			}

			Object.keys(value).forEach((item) => {
				columnsArray.push({
					name: item,
					value: this.setValue(value[item as keyof GridItemColumn]),
					breakpoint: gridBreakpoints[item as keyof GridItemColumn],
				});
			});
			this._columns = columnsArray;
		}
	}

	setValue(value: string | number): string {
		if (typeof value === 'number') {
			return `span ${value}`;
		}
		return value;
	}

	@Input() alignX: GridItemAlignment = 'stretch';

	@Input() alignY: GridItemAlignment = 'stretch';

	constructor(private gridItemElement: ElementRef, private gridService: GridService) {
		effect(() => {
			this.setColumns();
		});
	}

	setAlign(): void {
		(this.gridItemElement.nativeElement as HTMLElement).classList.add(`fudis-grid-item__justify-self__${this.alignX}`);

		(this.gridItemElement.nativeElement as HTMLElement).classList.add(`fudis-grid-item__align-self__${this.alignY}`);
	}

	setColumns(): void {
		this._currentBreakpoints = this.gridService.getBreakpointState();
		if (typeof this._columns === 'string') {
			(this.gridItemElement.nativeElement as HTMLElement).style.gridColumn =
				this._columns === 'stretch' ? '1/-1' : this._columns;
		} else if (this._columns && typeof this._columns !== 'number') {
			console.log(this._columns);
			this._columns.forEach((item) => {
				if (this._currentBreakpoints?.breakpoints[item.breakpoint] && item.name !== 'default') {
					(this.gridItemElement.nativeElement as HTMLElement).style.gridColumn =
						item.value === 'stretch' ? '1/-1' : item.value;
				} else if (this._currentBreakpoints?.breakpoints[item.breakpoint] && item.name === 'default') {
					(this.gridItemElement.nativeElement as HTMLElement).style.gridColumn =
						item.value === 'stretch' ? '1/-1' : item.value;
				}
			});
		}
	}

	ngOnInit(): void {
		(this.gridItemElement.nativeElement as HTMLElement).classList.add('fudis-grid-item');

		this.setAlign();

		this.setColumns();
	}

	ngOnChanges(): void {
		this.setAlign();

		this.setColumns();
	}
}
