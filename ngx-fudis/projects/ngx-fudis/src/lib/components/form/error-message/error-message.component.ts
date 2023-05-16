import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { ErrorSummaryService } from '../error-summary/error-summary.service';
import { TFudisFormErrorSummaryItem } from '../../../types/forms';

@Component({
	selector: 'fudis-error-message',
	templateUrl: './error-message.component.html',
	styleUrls: ['./error-message.component.scss'],
})
export class ErrorMessageComponent implements OnInit, OnDestroy {
	/*
	 * Error message to display
	 */
	@Input() message: string | undefined | null;

	@Input() inputId: string;

	@Input() inputLabel: string;

	@Input() visible: boolean = false;

	@Input() type: string;

	errorSent: boolean = false;

	constructor(private errorSummaryService: ErrorSummaryService) {}

	ngOnInit(): void {
		this.errorSummaryService.reloadWatcher().subscribe(() => {
			if (!this.errorSent) {
				this.createError();
			}
		});
	}

	createError(): void {
		if (this.message) {
			const newError: TFudisFormErrorSummaryItem = {
				id: this.inputId,
				error: this.message,
				label: this.inputLabel,
				type: this.type,
			};
			this.errorSummaryService.addNewError(newError);
			this.errorSent = true;
		}
	}

	ngOnDestroy(): void {
		if (this.errorSent) {
			this.errorSummaryService.removeError({
				id: this.inputId,
				type: this.type,
			});
		}
	}
}
