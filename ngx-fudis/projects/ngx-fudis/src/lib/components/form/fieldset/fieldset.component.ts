import {
	AfterContentInit,
	Component,
	ContentChild,
	ElementRef,
	Input,
	OnChanges,
	ViewEncapsulation,
} from '@angular/core';

import { FieldsetContentDirective } from './fieldset-directives';
import { FieldsetBaseDirective } from '../../../directives/form/fieldset-base/fieldset-base.directive';
import { ErrorSummaryService } from '../error-summary/error-summary.service';

@Component({
	selector: 'fudis-fieldset',
	templateUrl: './fieldset.component.html',
	styleUrls: ['./fieldset.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class FieldsetComponent extends FieldsetBaseDirective implements AfterContentInit, OnChanges {
	@ContentChild(FieldsetContentDirective) fieldsetContent: FieldsetContentDirective;

	constructor(private elementRef: ElementRef, private errorSummaryService: ErrorSummaryService) {
		super();
	}

	fieldsetElement: HTMLFieldSetElement | undefined;

	@Input() errorSummary: boolean = false;

	@Input() errorSummaryHelpText: string | null = null;

	@Input() errorSummaryScreenReaderHelpText: string | null = null;

	ngOnChanges(): void {
		if (this.errorSummary) {
			this.errorSummaryService.reloadErrors();
		}
	}

	ngAfterContentInit(): void {
		this.fieldsetElement = this.elementRef.nativeElement as HTMLFieldSetElement;
	}
}
