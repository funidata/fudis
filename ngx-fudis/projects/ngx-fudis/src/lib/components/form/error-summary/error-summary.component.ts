import { ChangeDetectorRef, Component, ElementRef, Inject, Input, Signal, ViewChild, effect } from '@angular/core';

import { DOCUMENT } from '@angular/common';
import { FudisErrorSummaryService } from './error-summary.service';
import { FudisFormErrorSummaryObject, FudisFormErrorSummaryList } from '../../../types/forms';

@Component({
	selector: 'fudis-error-summary',
	templateUrl: './error-summary.component.html',
	styleUrls: ['./error-summary.component.scss'],
})
export class ErrorSummaryComponent {
	@ViewChild('focusTarget') focusTarget: ElementRef;

	/**
	 * FieldSet parent element of this ErrorSummaryComponent
	 */
	@Input({ required: true }) parentComponent: HTMLFormElement;

	/**
	 * Help text displayed in Error Summary before listing individual errors.
	 */
	@Input({ required: true }) helpText: string;

	/**
	 * Additional text for screen readers added before help text. E.g. "Attention". Comparable for "alert" icon included in Error Summary.
	 */
	@Input({ required: true }) screenReaderHelpText: string;

	@Input() liveRemove: boolean = false;

	constructor(
		@Inject(DOCUMENT) private _document: Document,
		private _errorSummaryService: FudisErrorSummaryService,
		private readonly _changeDetectorRef: ChangeDetectorRef
	) {
		effect(() => {
			this.getErrors();
		});
	}

	protected _visibleErrorList: FudisFormErrorSummaryList[] = [];

	private _numberOfFocusTries: number = 0;

	getErrors(): void {
		const fetchedErrors: Signal<FudisFormErrorSummaryObject> = this.liveRemove
			? this._errorSummaryService.getDynamicErrors()
			: this._errorSummaryService.getVisibleErrors();

		this._visibleErrorList = [];

		Object.keys(fetchedErrors()).forEach((item) => {
			const errorId = fetchedErrors()[item].id;
			if (this.parentComponent?.querySelector(`#${errorId}`)) {
				const { label } = fetchedErrors()[item];
				Object.values(fetchedErrors()[item].errors).forEach((error: any) => {
					this._visibleErrorList.push({ id: errorId, message: `${label}: ${error}` });
				});
			}
		});

		this._changeDetectorRef.detectChanges();

		/**
		 * Focus to Error Summary element when visible error list gets updated.
		 */
		if (this._document.activeElement?.classList.contains('fudis-button')) {
			this.focusToErrorSummary();
		}
	}

	focusToErrorSummary(): void {
		if (this.focusTarget && this._visibleErrorList.length > 0) {
			this._numberOfFocusTries = 0;
			(this.focusTarget.nativeElement as HTMLDivElement).focus();
		} else if (this._numberOfFocusTries < 100) {
			setTimeout(() => {
				this._numberOfFocusTries += 1;
				this.focusToErrorSummary();
			}, 100);
		}
	}
}
