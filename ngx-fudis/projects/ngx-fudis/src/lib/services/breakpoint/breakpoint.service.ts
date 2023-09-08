import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { breakpointsMinWidthToObserve } from '../../types/breakpoints';

@Injectable()
export class FudisBreakpointService {
	/**
	 * Observe breakpoints and when hitting one, save results to Signal.
	 */
	constructor(fudisBreakpointObserver: BreakpointObserver) {
		fudisBreakpointObserver
			.observe(breakpointsMinWidthToObserve)
			.pipe(takeUntilDestroyed())
			.subscribe((state: BreakpointState) => {
				this._currentScreenSize.set(state);
			});
	}

	public _currentScreenSize = signal<BreakpointState | null>(null);

	public _screenSize = this._currentScreenSize.asReadonly();

	/**
	 * Get current state of Breakpoints
	 */
	getBreakpointState(): BreakpointState | null {
		return this._screenSize();
	}
}
