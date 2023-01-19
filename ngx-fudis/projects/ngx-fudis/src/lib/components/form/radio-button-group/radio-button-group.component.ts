import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RadioButtonOption } from '../../../types/forms';

@Component({
	selector: 'fudis-radio-button-group[options][id]',
	templateUrl: './radio-button-group.component.html',
	styleUrls: ['./radio-button-group.component.scss'],
})
export class RadioButtonGroupComponent implements OnInit {
	@Input() parentFormGroup: FormGroup;

	selectedId: string | number | undefined = undefined;

	@Input() radioButtonFormControl: FormControl;

	@Input() options: RadioButtonOption[];

	@Input() label: string;

	@Input() id: string;

	@Input() errorMessage: string | undefined;

	groupName: string;

	required: boolean = false;

	legendId: string;

	ngOnInit() {
		if (this.options.length < 2) {
			throw new Error(
				`Fudis-radio-button-group should have minimum of two options for radio buttons! Now it only got ${this.options.length} options`
			);
		}

		const optionNames = this.options.map((item) => {
			return item.name;
		});

		const namesAreIdentical = optionNames.some((item, index) => {
			return optionNames.indexOf(item) === index;
		});

		if (!namesAreIdentical) {
			throw new Error(
				`For radio button options for fudis-radio-button-group 'name' should be identical for all options.`
			);
		} else {
			this.groupName = this.options[0].name;
		}

		this.legendId = `${this.id}-legend`;

		this.required = this.radioButtonFormControl.hasValidator(Validators.required);
	}
}
