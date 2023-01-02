import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'fudis-radio-button',
	templateUrl: './radio-button.component.html',
	styleUrls: ['./radio-button.component.scss'],
})
export class RadioButtonComponent implements OnInit {
	@Input() id: string;

	@Input() name: string;

	@Input() disabled: boolean;

	@Input() required: boolean;

	checked: boolean;

	@Input() value: string;

	@Input() label: string;

	@Input() ctrl: FormControl;

	ngOnInit() {
		console.log('HELLOOOOO ctrl', this.ctrl);
	}

	// onChange() {
	// 	if (this.ctrl.disabled) {
	// 		return;
	// 	}
	// 	this.checked = !this.checked;
	// }

	// public get classes(): string[] {
	// 	if (this.ctrl.touched && this.ctrl.invalid) {
	// 		return ['fudis-radio-button-group--invalid'];
	// 	}
	// 	return [];
	// }
}
