import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class FudisFocusService {
	constructor(@Inject(DOCUMENT) private _document: Document) {}

	private _ignoreInitialFocusArray: string[] = [];

	private _focusTarget: HTMLElement;

	public getFocusTarget(): HTMLElement {
		return this._focusTarget;
	}

	public setFocusTarget(target: HTMLElement): void {
		if (!target.classList.contains('fudis-alert__close')) {
			this._focusTarget = target;
		}
	}

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

	public addToIgnoreInitialFocus(id: string): void {
		if (!this._ignoreInitialFocusArray.includes(id)) {
			this._ignoreInitialFocusArray.push(id);
		}
	}

	public removeFromIgnoreInitialFocus(id: string): void {
		if (this._ignoreInitialFocusArray.includes(id)) {
			this._ignoreInitialFocusArray = this._ignoreInitialFocusArray.filter((item) => {
				return item !== id;
			});
		}
	}

	public getIgnoreInitialFocusArray(): string[] {
		return this._ignoreInitialFocusArray;
	}

	public isInitialFocusIgnored(id: string): boolean {
		if (this._ignoreInitialFocusArray.includes(id)) {
			return true;
		}
		return false;
	}
}
