import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FudisFocusService {
  constructor(@Inject(DOCUMENT) private _document: Document) {}

  /**
   * List of ignored id's
   */
  private _ignoreInitialFocusList: string[] = [];

  /**
   * HTML element to focus
   */
  private _focusTarget: HTMLElement;

  /**
   * Get target HTML element to focus
   */
  public getFocusTarget(): HTMLElement {
    return this._focusTarget;
  }

  /**
   * Set focus target if it's not alert close button
   */
  public setFocusTarget(target: HTMLElement): void {
    if (!target.classList.contains('fudis-alert__close')) {
      this._focusTarget = target;
    }
  }

  /**
   * Focus target element by id
   */
  public focusToElementById(id: string, tryCounter: number = 100): void {
    setTimeout(() => {
      const element = this._document.getElementById(id);

      if (element) {
        element.focus();
      } else if (tryCounter > 0) {
        this.focusToElementById(id, tryCounter - 1);
      }
    }, 50);
  }

  /**
   * Add component with given id to ignore list, so that initialFocus is ignored with that.
   * Used e.g. in a form where same component is added multiple times when user clicks 'New item' or similar and focus is wanted to move there except with 'item-id-x'.
   */
  public addToIgnoreList(id: string): void {
    if (!this._ignoreInitialFocusList.includes(id)) {
      this._ignoreInitialFocusList.push(id);
    }
  }

  /**
   * Remove id from ignore initialFocus list
   */
  public removeFromIgnoreList(id: string): void {
    if (this._ignoreInitialFocusList.includes(id)) {
      this._ignoreInitialFocusList = this._ignoreInitialFocusList.filter((item) => {
        return item !== id;
      });
    }
  }

  /**
   * Get list of ignored id's
   */
  public getIgnoreList(): string[] {
    return this._ignoreInitialFocusList;
  }

  /**
   * Check if current id is in the ignored list
   */
  public isIgnored(id: string): boolean {
    if (this._ignoreInitialFocusList.includes(id)) {
      return true;
    }
    return false;
  }
}
