import { Component, Input, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { RadioButtonOption } from 'projects/ngx-fudis/src/lib/types/forms';

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: 'example-radio-button-group',
	templateUrl: './radio-button-group-example.component.html',
	styleUrls: ['./radio-button-group-example.component.scss'],
})

// eslint-disable-next-line @angular-eslint/component-class-suffix
export class RadioButtonGroupComponentExample implements OnInit {
	controlFormGroup: FormGroup;

	radioButtonGroup: FormControl = new FormControl();

	selectedId: string | number | undefined = undefined;

	/**
	 * Options for testing purposes
	 */

	options: RadioButtonOption[] = [
		{ value: 'omena', label: 'omena', id: '1', name: 'hedelma', checked: false },
		{ value: 'banaani', label: 'banaani', id: '2', name: 'hedelma', checked: true },
		{ value: 'kirsikka', label: 'kirsikka', id: '3', name: 'hedelma', checked: false },
	];

	constructor(private formBuilder: FormBuilder) {
		if (this.options.length < 2) {
			throw new Error('Radio button needs value more than 2');
		}
	}

	@Input() label: string;

	ngOnInit() {
		this.controlFormGroup = this.formBuilder.group({
			radioButtonGroup: this.radioButtonGroup,
		});
	}

	setSelected(event: any) {
		this.selectedId = event.target.id;
	}
}
