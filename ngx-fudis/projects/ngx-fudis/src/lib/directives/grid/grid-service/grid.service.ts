/* eslint-disable no-underscore-dangle */
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Injectable, OnDestroy, signal } from '@angular/core';
import { Subject } from 'rxjs';

import { BreakpointKey, GridColumnsResponsive, GridResponsiveData } from '../../../types/grid';
import { breakpointsMinWidthToObserve, getGridBreakpointRules, validateColumnInputArray } from '../gridUtils';

@Injectable()
export class GridService implements OnDestroy {
	destroyed = new Subject<void>();

	private _defaultGridColumns: GridColumnsResponsive | null = null;

	setGridDefaultColumns(defaultColumns: GridColumnsResponsive): void {
		this._defaultGridColumns = defaultColumns;
	}

	private _currentScreenSize = signal<BreakpointState | null>(null);

	private currentScreenSize = this._currentScreenSize.asReadonly();

	getBreakpointState(): BreakpointState | null {
		return this.currentScreenSize();
	}

	constructor(private gridBreakpointObserver: BreakpointObserver) {
		gridBreakpointObserver.observe(breakpointsMinWidthToObserve).subscribe((state: BreakpointState) => {
			/*
			 * When hitting a breakpoint, save results to a Signal
			 */
			this._currentScreenSize.set(state);
		});
	}

	ngOnDestroy() {
		this.destroyed.next();
		this.destroyed.complete();
	}

	createGridBreakpointObject(value?: GridColumnsResponsive, isGridItem?: boolean): GridResponsiveData[] {
		if (value) {
			const combinedValues: GridColumnsResponsive = isGridItem ? value : { ...this._defaultGridColumns, ...value };

			const columnsArray: GridResponsiveData[] = getGridBreakpointRules(combinedValues, isGridItem);

			const sortOrder: BreakpointKey[] = ['default', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'];

			const sortedColumnsArray = columnsArray.sort((a, b) => {
				return sortOrder.indexOf(a.name) - sortOrder.indexOf(b.name);
			});

			validateColumnInputArray(sortedColumnsArray);

			return sortedColumnsArray;
		}
		return [];
	}

	setGridAttributes(element: HTMLElement, columns: string | GridResponsiveData[], isGridItem?: boolean): void {
		const elementToModify = element;

		if (isGridItem) {
			if (typeof columns === 'string') {
				elementToModify.style.gridColumn = columns;
			} else {
				columns.forEach((item) => {
					if (this.currentScreenSize()?.breakpoints[item.breakpoint]) {
						elementToModify.style.gridColumn = item.value;
					}
				});
			}
		} else if (typeof columns === 'string') {
			console.log(columns);
			elementToModify.style.gridTemplateColumns = columns;
		} else {
			columns.forEach((item) => {
				if (this.currentScreenSize()?.breakpoints[item.breakpoint]) {
					elementToModify.style.gridTemplateColumns = item.value;
				}
			});
		}
	}
}
