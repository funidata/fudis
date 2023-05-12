import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ErrorSummaryService } from './error-summary.service';
import { TFudisFormErrorSummaryItem } from '../../../types/forms';

@Component({
	selector: 'fudis-error-summary',
	templateUrl: './error-summary.component.html',
	styleUrls: ['./error-summary.component.scss'],
})
export class ErrorSummaryComponent implements OnInit, AfterViewInit {
	@ViewChild('focusTarget') focusTarget: ElementRef;

	@Input() parentComponent: HTMLFieldSetElement | undefined;

	@Input() helpText: string | null | undefined;

	constructor(private errorSummaryService: ErrorSummaryService) {}

	visibleErrorList: TFudisFormErrorSummaryItem[] = [];

	getErrors(): void {
		this.errorSummaryService.getVisibleErrors().subscribe((errorsFromService) => {
			this.visibleErrorList = errorsFromService.filter((item) => {
				if (this.parentComponent?.querySelector(`#${item.id}`)) {
					return item;
				}
				return undefined;
			});
			if (this.focusTarget && this.visibleErrorList.length > 0) {
				(this.focusTarget.nativeElement as HTMLDivElement).focus();
			}
		});
	}

	ngOnInit(): void {
		this.getErrors();
	}

	ngAfterViewInit(): void {
		if (this.visibleErrorList.length > 0 && this.focusTarget)
			(this.focusTarget.nativeElement as HTMLDivElement).focus();
	}
}
