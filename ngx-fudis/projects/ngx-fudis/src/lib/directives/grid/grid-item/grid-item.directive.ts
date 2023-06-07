/* eslint-disable no-underscore-dangle */
import { Directive, ElementRef, OnChanges, OnInit, Input, effect } from '@angular/core';
import { BreakpointState } from '@angular/cdk/layout';
import { GridService } from '../grid-service/grid.service';
import { gridBreakpoints, gridBreakpointsMinWidth } from '../gridUtils';
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

	private _currentBreakpointsMinWidth: BreakpointState | null;

	private _columns: GridItemWidth | GridInputColumnObject[];

	private _hasDefault: boolean = false;

	@Input() set columns(value: GridItemWidth | GridItemColumn) {
		if (!value) {
			this._columns = this._gridColumnDefault;
		} else if (typeof value === 'string') {
			this._columns = value;
		} else if (typeof value === 'number') {
			this._columns = `span ${value}`;
		} else {
			const columnsArray: GridInputColumnObject[] = [];

			const sortOrder = ['default', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'];

			this._hasDefault = !!value.default;

			Object.keys(value).forEach((item) => {
				const breakpoint = this._hasDefault
					? gridBreakpoints[item as keyof GridItemColumn]
					: gridBreakpointsMinWidth[item as keyof GridItemColumn];

				columnsArray.push({
					name: item,
					value: this.setValue(value[item as keyof GridItemColumn]),
					breakpoint,
				});
			});

			const sortedColumnsArray = columnsArray.sort((a, b) => {
				return sortOrder.indexOf(a.name) - sortOrder.indexOf(b.name);
			});

			this._columns = sortedColumnsArray;
		}
	}

	// eslint-disable-next-line class-methods-use-this
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

		this._currentBreakpointsMinWidth = this.gridService.getBreakpointMinWidthState();

		if (typeof this._columns === 'string') {
			(this.gridItemElement.nativeElement as HTMLElement).style.gridColumn =
				this._columns === 'stretch' ? '1/-1' : this._columns;
		} else if (this._columns && typeof this._columns !== 'number') {
			const breakpointsToLoop = this._hasDefault ? this._currentBreakpoints : this._currentBreakpointsMinWidth;

			this._columns.forEach((item) => {
				if (breakpointsToLoop?.breakpoints[item.breakpoint] && item.name !== 'default') {
					(this.gridItemElement.nativeElement as HTMLElement).style.gridColumn =
						item.value === 'stretch' ? '1/-1' : item.value;
				} else if (breakpointsToLoop?.breakpoints[item.breakpoint] && item.name === 'default') {
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
