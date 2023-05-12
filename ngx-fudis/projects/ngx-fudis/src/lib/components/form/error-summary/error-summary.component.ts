import { Component, Input, OnInit } from '@angular/core';
import { ErrorSummaryService } from './error-summary.service';
import { TFudisFormErrorSummaryItem } from '../../../types/forms';

@Component({
	selector: 'fudis-error-summary',
	templateUrl: './error-summary.component.html',
	styleUrls: ['./error-summary.component.scss'],
})
export class ErrorSummaryComponent implements OnInit {
	@Input() parentComponent: HTMLFieldSetElement | undefined;

	@Input() helpText: string | null | undefined;

	constructor(private errorSummaryService: ErrorSummaryService) {}

	errorList: TFudisFormErrorSummaryItem[];

	getErrors(): void {
		// eslint-disable-next-line no-return-assign
		this.errorSummaryService.getErrors().subscribe((message) => (this.errorList = message));
	}

	ngOnInit(): void {
		this.getErrors();
	}

	getVisibleErrors(): TFudisFormErrorSummaryItem[] {
		return this.errorList.filter((item) => {
			if (this.parentComponent?.querySelector(`#${item.id}`)) {
				return item;
			}
			return undefined;
		});
	}
}
