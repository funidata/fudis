import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormBaseDirective } from '../../../directives/form/form-base.directive';

@Component({
	selector: 'fudis-fieldset',
	templateUrl: './fieldset.component.html',
	styleUrls: ['./fieldset.component.scss'],
})
export class FieldsetComponent extends FormBaseDirective {
	/*
	 * Legend label for the group
	 */
	@Input() legend: string;

	@Input() control: FormControl;
}
