import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class FudisFocusService {
	constructor(@Inject(DOCUMENT) private _document: Document) {}

	private _focusTarget: HTMLElement | null = null;

	public getFocusTarget(): HTMLElement | null {
		return this._focusTarget;
	}

	public setFocusTarget(target: EventTarget | null): void {
		if (target) {
			const element = target as HTMLElement;
			if (!element.classList.contains('fudis-alert__close')) {
				this._focusTarget = element;
			}
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
}
