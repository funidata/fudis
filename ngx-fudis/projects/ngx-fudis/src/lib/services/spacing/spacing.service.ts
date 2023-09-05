import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Injectable, signal } from '@angular/core';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { breakpointsMinWidthToObserve } from '../../directives/grid/gridUtils';
import { FudisSpacingResponsiveData } from '../../types/spacing';

@Injectable()
export class FudisSpacingService {
	/**
	 * Observe breakpoints and when hitting one, save results to Signal.
	 */
	constructor(marginBreakpointObserver: BreakpointObserver) {
		marginBreakpointObserver
			.observe(breakpointsMinWidthToObserve)
			.pipe(takeUntilDestroyed())
			.subscribe((state: BreakpointState) => {
				this._currentScreenSize.set(state);
			});
	}

	private _currentScreenSize = signal<BreakpointState | null>(null);

	private _screenSize = this._currentScreenSize.asReadonly();

	/**
	 * Get current state of Breakpoints
	 */
	getBreakpointState(): BreakpointState | null {
		return this._screenSize();
	}

	/**
	 * Function which applies CSS attributes of margins
	 */
	// eslint-disable-next-line class-methods-use-this
	setSpacingAttributes(
		element: HTMLElement,
		marginTop: string | FudisSpacingResponsiveData[],
		marginBottom: string | FudisSpacingResponsiveData[],
		marginRight: string | FudisSpacingResponsiveData[],
		marginLeft: string | FudisSpacingResponsiveData[]
	): void {
		const elementToModify = element;

		if (typeof marginTop === 'string') {
			elementToModify.style.marginTop = marginTop;
		}
		if (typeof marginBottom === 'string') {
			elementToModify.style.marginBottom = marginBottom;
		}
		if (typeof marginRight === 'string') {
			elementToModify.style.marginRight = marginRight;
		}
		if (typeof marginLeft === 'string') {
			elementToModify.style.marginLeft = marginLeft;
		}
		// else {
		// 	marginTop.forEach((item) => {
		// 		if (this._screenSize()?.breakpoints[item.breakpoint]) {
		// 			elementToModify.style.marginTop = item.value;
		// 		}
		// 	});
		// }
	}
}
