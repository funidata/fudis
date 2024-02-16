import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FudisBreakpointStyle,
  FudisBreakpointStyleResponsive,
  breakpointsMinWidthToObserve,
} from '../../types/breakpoints';

// TODO: Write tests and add Storybook documentation under Services

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

  /**
   * Current screen size/breakpoint with true/false state
   */
  private _currentScreenSize = signal<BreakpointState | null>(null);

  /**
   * Readonly value for current screen size and state
   */
  private _screenSize = this._currentScreenSize.asReadonly();

  /**
   * Get current state of Breakpoints
   */
  public getBreakpointState(): BreakpointState | null {
    return this._screenSize();
  }

  /**
   * Function to apply CSS attributes
   */
  public setStyleAttributes(
    element: HTMLElement,
    attribute: FudisBreakpointStyle,
    value: string | FudisBreakpointStyleResponsive[],
  ): void {
    const elementToModify = element;

    const previousStyles = elementToModify.getAttribute('style');

    if (typeof value === 'string') {
      elementToModify.style.cssText = `
					${previousStyles};
					${attribute}: ${value === 'none' ? '0' : value};
					`;
    } else {
      value?.forEach((item) => {
        if (this._screenSize()?.breakpoints[item.breakpoint]) {
          elementToModify.style.cssText = `
					${previousStyles};
					${attribute}: ${item.value === 'none' ? '0' : item.value};
					`;
        }
      });
    }
  }
}
