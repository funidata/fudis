import { AfterViewInit, Component, ElementRef, Input, OnInit, Signal, ViewChild, effect } from '@angular/core';

import { ErrorSummaryService } from './error-summary.service';
import { FudisFormErrorSummaryObject, FudisFormErrorSummaryList } from '../../../types/forms';

@Component({
	selector: 'fudis-error-summary',
	templateUrl: './error-summary.component.html',
	styleUrls: ['./error-summary.component.scss'],
})
export class ErrorSummaryComponent implements OnInit, AfterViewInit {
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

	constructor(private _errorSummaryService: ErrorSummaryService) {
		effect(() => {
			this.getErrors();
		});
	}

	protected _visibleErrorList: FudisFormErrorSummaryList[] = [];

	private _numberOfFocusTries: number = 0;

	getErrors(): void {
		const fetchedErrors: Signal<FudisFormErrorSummaryObject> = this._errorSummaryService.getVisibleErrors();

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

		/**
		 * Focus to Error Summary element when visible error list gets updated.
		 */

		this.focusToErrorSummary();
	}

	ngOnInit(): void {
		this.getErrors();
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

	ngAfterViewInit(): void {
		/**
		 * Initial focus when Error Summary is loaded first time
		 * */
		this.focusToErrorSummary();
	}
}
