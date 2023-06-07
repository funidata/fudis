/* eslint-disable no-underscore-dangle */
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Injectable, OnDestroy, signal } from '@angular/core';
import { Subject } from 'rxjs';

import { GridColumns } from '../../../types/grid';
import { breakpointsToObserve, breakpointsMinWidthToObserve } from '../gridUtils';

@Injectable()
export class GridService implements OnDestroy {
	private _defaultGridColumns = signal<GridColumns>({});

	defaultGridColumns = this._defaultGridColumns.asReadonly();

	setGridDefaultColumns(defaultColumns: GridColumns): void {
		this._defaultGridColumns.set(defaultColumns);
	}

	getGridDefaultColumns(): GridColumns {
		return this.defaultGridColumns();
	}

	destroyed = new Subject<void>();

	private _currentScreenSize = signal<BreakpointState | null>(null);

	currentScreenSize = this._currentScreenSize.asReadonly();

	getBreakpointState(): BreakpointState | null {
		return this.currentScreenSize();
	}

	private _currentScreenMinWidth = signal<BreakpointState | null>(null);

	currentScreenMinWidth = this._currentScreenMinWidth.asReadonly();

	getBreakpointMinWidthState(): BreakpointState | null {
		return this.currentScreenMinWidth();
	}

	constructor(private gridBreakpointObserver: BreakpointObserver) {
		gridBreakpointObserver.observe(breakpointsToObserve).subscribe((state: BreakpointState) => {
			/*
			 * When hitting a breakpoint, save results to a Signal
			 */
			this._currentScreenSize.set(state);
		});

		gridBreakpointObserver.observe(breakpointsMinWidthToObserve).subscribe((state: BreakpointState) => {
			/*
			 * When hitting a breakpoint, save results to a Signal
			 */
			this._currentScreenMinWidth.set(state);
		});
	}

	ngOnDestroy() {
		this.destroyed.next();
		this.destroyed.complete();
	}
}
