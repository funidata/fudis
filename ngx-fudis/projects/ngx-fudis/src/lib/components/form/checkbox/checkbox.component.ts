import { Component, Input, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { InputBaseDirective } from '../../../directives/form/input-base/input-base.directive';
import { FudisRadioButtonType } from '../../../types/forms';

@Component({
	selector: 'fudis-checkbox[id][label]',
	templateUrl: './checkbox.component.html',
	styleUrls: ['./checkbox.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class CheckboxComponent extends InputBaseDirective {
	@ViewChild('checkboxRef') input: ElementRef;

	/**
	 * FormControl for the input.
	 */
	@Input() control: FormControl<FudisRadioButtonType>;

	/*
	 * Name for checkbox
	 */
	@Input() name: string;

	isChecked: boolean;

	handleCheckboxClick(): void {
		this.input.nativeElement.focus();
	}
}
