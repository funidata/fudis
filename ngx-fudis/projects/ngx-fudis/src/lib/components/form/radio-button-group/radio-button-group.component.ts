import { Component, Input, OnInit } from '@angular/core';

import { FormControl, FormGroup } from '@angular/forms';
import { RadioButtonOption } from '../../../types/forms';

@Component({
	selector: 'fudis-radio-button-group',
	templateUrl: './radio-button-group.component.html',
	styleUrls: ['./radio-button-group.component.scss'],
})
export class RadioButtonGroupComponent implements OnInit {
	@Input() parentFormGroup: FormGroup;

	selectedId: string | number | undefined = undefined;

	@Input() radioButtonFormControl: FormControl;

	@Input() options: RadioButtonOption[];

	@Input() label: string;

	ngOnInit() {
		if (this.options.length < 2) {
			throw new Error('Radio button needs value more than 2');
		}
	}

	setSelected(event: any) {
		this.selectedId = event.target.id;
	}
}
