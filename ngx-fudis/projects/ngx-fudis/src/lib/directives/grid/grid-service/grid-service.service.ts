/* eslint-disable no-underscore-dangle */
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Injectable, OnDestroy, signal } from '@angular/core';
import { Subject } from 'rxjs';
import { breakpointsToObserve } from '../gridUtils';

@Injectable({
	providedIn: 'root',
})
export class GridService implements OnDestroy {
	destroyed = new Subject<void>();

	private _currentScreenSize = signal<BreakpointState | null>(null);

	currentScreenSize = this._currentScreenSize.asReadonly();

	getBreakpointState(): BreakpointState | null {
		return this.currentScreenSize();
	}

	constructor(private gridBreakpointObserver: BreakpointObserver) {
		gridBreakpointObserver.observe(breakpointsToObserve).subscribe((state: BreakpointState) => {
			/*
			 * When hitting a breakpoint, Loop through given column values for each breakpoint and if there are no given value e.g. for @Input columnsXs, apply general @Input columns value
			 */

			this._currentScreenSize.set(state);
		});
	}

	ngOnDestroy() {
		this.destroyed.next();
		this.destroyed.complete();
	}
}
