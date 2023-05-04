import { Component, Input, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormBaseDirective } from '../../../directives/form/form-base.directive';

@Component({
	selector: 'fudis-checkbox[id][label]',
	templateUrl: './checkbox.component.html',
	styleUrls: ['./checkbox.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class CheckboxComponent extends FormBaseDirective {
	@ViewChild('checkboxRef') input: ElementRef;

	/*
	 * FormControl for checkbox
	 */
	@Input() control: FormControl;

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
