import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class FudisFocusService {
	private _focusTarget: HTMLElement | null = null;

	private _focusCloseButton: HTMLElement | null = null;

	public getFocusTarget(): HTMLElement | null {
		return this._focusTarget;
	}

	public getAlertCloseButtonTarget(): HTMLButtonElement | null {
		if (!this._focusCloseButton) {
			return null;
		}
		return this._focusCloseButton as HTMLButtonElement;
	}

	public setFocusTarget(target: EventTarget | null): void {
		if (target) {
			const element = target as HTMLElement;
			if (element.classList.contains('fudis-alert__close')) {
				this._focusCloseButton = element;
			} else if (!element.classList.contains('fudis-link__anchor')) {
				this._focusTarget = element;
			}
		}
	}
}
