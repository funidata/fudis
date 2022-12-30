import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'fudis-radio-button',
	templateUrl: './radio-button.component.html',
	styleUrls: ['./radio-button.component.scss'],
})
export class RadioButtonComponent {
	@Input() id: string;

	@Input() name: string;

	@Input() disabled: boolean;

	@Input() required: boolean;

	@Input() checked: boolean = false;

	@Input() value: string;

	@Input() label: string;

	@Input() control: FormControl;

	@ViewChild('radioList') ul: ElementRef;

	public get classes(): string[] {
		if (this.control.touched && this.control.invalid) {
			return ['fudis-radio-button-group--invalid'];
		}
		return [];
	}
}
