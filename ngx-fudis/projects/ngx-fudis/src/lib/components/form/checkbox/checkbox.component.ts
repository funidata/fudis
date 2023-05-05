import { Component, Input, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { InputBaseDirective } from '../../../directives/form/input-base/input-base.directive';

@Component({
	selector: 'fudis-checkbox[id][label]',
	templateUrl: './checkbox.component.html',
	styleUrls: ['./checkbox.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class CheckboxComponent extends InputBaseDirective {
	@ViewChild('checkboxRef') input: ElementRef;

	/*
	 * Name for checkbox
	 */
	@Input() name: string;

	showError: boolean = false;

	isChecked: boolean;

	handleCheckboxClick(): void {
		this.input.nativeElement.focus();
	}
}
