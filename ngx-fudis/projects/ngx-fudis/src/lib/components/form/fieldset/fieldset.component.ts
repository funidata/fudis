import { AfterContentInit, Component, ElementRef, Input, ViewEncapsulation } from '@angular/core';

import { FieldSetBaseDirective } from '../../../directives/form/fieldset-base/fieldset-base.directive';

@Component({
	selector: 'fudis-fieldset',
	templateUrl: './fieldset.component.html',
	styleUrls: ['./fieldset.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class FieldSetComponent extends FieldSetBaseDirective implements AfterContentInit {
	constructor(private elementRef: ElementRef) {
		super();
	}

	/**
	 * If Error Summary is visible. Usually set on click of form submit button.
	 */
	@Input() errorSummaryVisible: boolean = false;

	/**
	 * Help text displayed in Error Summary before listing individual errors.
	 */
	@Input() errorSummaryHelpText: string | null = null;

	/**
	 * Additional text for screen readers added before help text. E.g. "Attention". Comparable for "alert" icon included in Error Summary.
	 */
	@Input() errorSummaryScreenReaderHelpText: string | null = null;

	fieldsetElement: HTMLFieldSetElement | undefined;

	ngAfterContentInit(): void {
		this.fieldsetElement = this.elementRef.nativeElement as HTMLFieldSetElement;
	}
}
