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
			 * When hitting a breakpoint, save results to a Signal
			 */
			this._currentScreenSize.set(state);
		});
	}

	ngOnDestroy() {
		this.destroyed.next();
		this.destroyed.complete();
	}
}
