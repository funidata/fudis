import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Injectable, OnDestroy, Signal, signal } from '@angular/core';
import { Subject } from 'rxjs';

import { FudisGridAttributes, FudisGridResponsiveData } from '../../../types/grid';
import { breakpointsMinWidthToObserve } from '../gridUtils';

@Injectable()
export class FudisGridService implements OnDestroy {
	destroyed = new Subject<void>();

	private _defaultGridValues = signal<FudisGridAttributes>({});

	private _currentScreenSize = signal<BreakpointState | null>(null);

	private currentScreenSize = this._currentScreenSize.asReadonly();

	/**
	 * To set from application default values for all Grids application uses.
	 */
	setGridDefaultValues(defaultValues: FudisGridAttributes): void {
		this._defaultGridValues.set(defaultValues);
	}

	/**
	 * Get application's default values for Grid
	 */
	getGridDefaultValues(): Signal<FudisGridAttributes | null> {
		return this._defaultGridValues.asReadonly();
	}

	/**
	 * Get current state of Breakpoints
	 */
	getBreakpointState(): BreakpointState | null {
		return this.currentScreenSize();
	}

	/**
	 * Observe breakpoints and when hitting one, save results to Signal.
	 */
	constructor(gridBreakpointObserver: BreakpointObserver) {
		gridBreakpointObserver.observe(breakpointsMinWidthToObserve).subscribe((state: BreakpointState) => {
			this._currentScreenSize.set(state);
		});
	}

	ngOnDestroy() {
		this.destroyed.next();
		this.destroyed.complete();
	}

	/**
	 * Function which applies CSS attributes of grid-column-template for Grid and grid-column for GridItem.
	 */
	setGridAttributes(element: HTMLElement, columns: string | FudisGridResponsiveData[], isGridItem?: boolean): void {
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
