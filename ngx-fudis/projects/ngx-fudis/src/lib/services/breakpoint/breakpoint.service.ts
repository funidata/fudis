import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
	FudisBreakpointStyle,
	FudisBreakpointStyleResponsive,
	breakpointsMinWidthToObserve,
} from '../../types/breakpoints';

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

	private _screenSize = this._currentScreenSize.asReadonly();

	/**
	 * Get current state of Breakpoints
	 */
	getBreakpointState(): BreakpointState | null {
		return this._screenSize();
	}

	/**
	 * Function which applies CSS attributes
	 */
	setStyleAttributes(
		element: HTMLElement,
		attribute: FudisBreakpointStyle,
		value: string | FudisBreakpointStyleResponsive[]
	): void {
		const elementToModify = element;

		const previousStyles = elementToModify.getAttribute('style');

		if (typeof value === 'string') {
			elementToModify.style.cssText = `
					${previousStyles};
					${attribute}: ${value};
					`;
		} else {
			value?.forEach((item) => {
				if (this._screenSize()?.breakpoints[item.breakpoint]) {
					elementToModify.style.cssText = `
					${previousStyles};
					${attribute}: ${item.value};
					`;
				}
			});
		}
	}
}
