import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Injectable, Signal, signal } from '@angular/core';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FudisGridAttributes, FudisGridResponsiveData } from '../../../types/grid';
import { breakpointsMinWidthToObserve } from '../gridUtils';

@Injectable()
export class FudisGridService {
	/**
	 * Observe breakpoints and when hitting one, save results to Signal.
	 */
	constructor(gridBreakpointObserver: BreakpointObserver) {
		gridBreakpointObserver
			.observe(breakpointsMinWidthToObserve)
			.pipe(takeUntilDestroyed())
			.subscribe((state: BreakpointState) => {
				this._currentScreenSize.set(state);
			});
	}

	private _defaultGridValues = signal<FudisGridAttributes>({});

	private _currentScreenSize = signal<BreakpointState | null>(null);

	private _screenSize = this._currentScreenSize.asReadonly();

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
		return this._screenSize();
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
					if (this._screenSize()?.breakpoints[item.breakpoint]) {
						elementToModify.style.gridColumn = item.value;
					}
				});
			}
		} else if (typeof columns === 'string') {
			elementToModify.style.gridTemplateColumns = columns;
		} else {
			columns.forEach((item) => {
				if (this._screenSize()?.breakpoints[item.breakpoint]) {
					elementToModify.style.gridTemplateColumns = item.value;
				}
			});
		}
	}

	setGridItemAlignX(element: HTMLElement, alignX: string | FudisGridResponsiveData[]): void {
		const elementToModify = element;

		if (typeof alignX === 'string') {
			elementToModify.style.justifySelf = alignX;
		} else {
			alignX.forEach((item) => {
				if (this._screenSize()?.breakpoints[item.breakpoint]) {
					elementToModify.style.justifySelf = item.value;
				}
			});
		}
	}

	setGridItemAlignY(element: HTMLElement, alignY: string | FudisGridResponsiveData[]): void {
		const elementToModify = element;

		if (typeof alignY === 'string') {
			elementToModify.style.alignSelf = alignY;
		} else {
			alignY.forEach((item) => {
				if (this._screenSize()?.breakpoints[item.breakpoint]) {
					elementToModify.style.alignSelf = item.value;
				}
			});
		}
	}
}
