import { Component, Input, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { InputBaseDirective } from '../../../directives/form/input-base/input-base.directive';
import { checkRequiredAttributes } from '../../../utilities/form/errorsAndWarnings';

@Component({
	selector: 'fudis-checkbox[id][label]',
	templateUrl: './checkbox.component.html',
	styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent extends InputBaseDirective implements OnInit {
	@ViewChild('checkboxRef') input: ElementRef;

	/*
	 * FormControl for Radio Button group
	 */
	@Input({ required: true }) control: FormControl<boolean | null>;

	/*
	 * Name for checkbox
	 */
	@Input() name: string;

	handleCheckboxClick(): void {
		this.input.nativeElement.focus();
	}

	ngOnInit(): void {
		checkRequiredAttributes(this.id, this.requiredText, this.control, undefined, this.ignoreRequiredCheck);
	}
}
