import { AfterContentInit, Component, ContentChild, ElementRef, ViewEncapsulation } from '@angular/core';

import { FieldsetContentDirective, FieldsetGuidanceDirective } from './fieldset-directives';
import { FieldsetBaseDirective } from '../../../directives/form/fieldset-base/fieldset-base.directive';

@Component({
	selector: 'fudis-fieldset',
	templateUrl: './fieldset.component.html',
	styleUrls: ['./fieldset.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class FieldsetComponent extends FieldsetBaseDirective implements AfterContentInit {
	@ContentChild(FieldsetGuidanceDirective) fieldsetGuidanceContent: FieldsetGuidanceDirective;

	@ContentChild(FieldsetContentDirective) fieldsetContent: FieldsetContentDirective;

	constructor(private elementRef: ElementRef) {
		super();
	}

	fieldsetElement: HTMLFieldSetElement | undefined;

	ngAfterContentInit(): void {
		this.fieldsetElement = this.elementRef.nativeElement as HTMLFieldSetElement;
	}
}
