import { Component, Input, ViewEncapsulation, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { InputBaseDirective } from '../../../directives/form/input-base/input-base.directive';
import { checkRequiredAttributes } from '../../../utilities/form/errorsAndWarnings';

@Component({
	selector: 'fudis-checkbox[id][label]',
	templateUrl: './checkbox.component.html',
	styleUrls: ['./checkbox.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class CheckboxComponent extends InputBaseDirective implements OnInit {
	@ViewChild('checkboxRef') input: ElementRef;

	/*
	 * FormControl for Radio Button group
	 */
	@Input() control: FormControl<boolean | null>;

	/*
	 * Name for checkbox
	 */
	@Input() name: string;

	isChecked: boolean;

	handleCheckboxClick(): void {
		this.input.nativeElement.focus();
	}

	ngOnInit(): void {
		checkRequiredAttributes(this.id, this.requiredText, this.control, undefined, this.ignoreRequiredCheck);
	}
}
