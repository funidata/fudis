import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Injectable, signal } from '@angular/core';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { breakpointsMinWidthToObserve } from '../../directives/spacing/spacing-utils';
import { FudisSpacingResponsiveData } from '../../types/spacing';

@Injectable()
export class FudisSpacingService {
	/**
	 * Observe breakpoints and when hitting one, save results to Signal.
	 */
	constructor(spacingBreakpointObserver: BreakpointObserver) {
		spacingBreakpointObserver
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
	setSpacingAttributes(
		element: HTMLElement,
		marginTop?: string | FudisSpacingResponsiveData[],
		marginBottom?: string | FudisSpacingResponsiveData[],
		marginRight?: string | FudisSpacingResponsiveData[],
		marginLeft?: string | FudisSpacingResponsiveData[]
	): void {
		const elementToModify = element;

		if (typeof marginTop === 'string') {
			elementToModify.style.marginTop = marginTop;
		} else {
			marginTop?.forEach((item) => {
				if (this._screenSize()?.breakpoints[item.breakpoint]) {
					elementToModify.style.marginTop = item.value;
				}
			});
		}

		if (typeof marginBottom === 'string') {
			elementToModify.style.marginBottom = marginBottom;
		} else {
			marginBottom?.forEach((item) => {
				if (this._screenSize()?.breakpoints[item.breakpoint]) {
					elementToModify.style.marginBottom = item.value;
				}
			});
		}

		if (typeof marginRight === 'string') {
			elementToModify.style.marginRight = marginRight;
		} else {
			marginRight?.forEach((item) => {
				if (this._screenSize()?.breakpoints[item.breakpoint]) {
					elementToModify.style.marginRight = item.value;
				}
			});
		}

		if (typeof marginLeft === 'string') {
			elementToModify.style.marginLeft = marginLeft;
		} else {
			marginLeft?.forEach((item) => {
				if (this._screenSize()?.breakpoints[item.breakpoint]) {
					elementToModify.style.marginLeft = item.value;
				}
			});
		}
	}
}
