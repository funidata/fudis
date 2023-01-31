import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { RadioButtonOption } from '../../../types/forms';

@Component({
	selector: 'fudis-radio-button-group[options][id][legend]',
	templateUrl: './radio-button-group.component.html',
	styleUrls: ['./radio-button-group.component.scss'],
})
export class RadioButtonGroupComponent implements OnInit {
	/*
	 * FormControl for Radio Button group
	 */
	@Input() control: UntypedFormControl;

	/*
	 * Array of options for group of radio buttons
	 */
	@Input() options: RadioButtonOption[];

	/*
	 * Legend label for the group
	 */
	@Input() legend: string;

	/*
	 * Unique id of the form group, used for improved accessibility
	 */
	@Input() id: string;

	/*
	 * Message to show when FormControl is invalid, e. g. group is required and touched, but user has not made a selection
	 */
	@Input() errorMessage: string | undefined;

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
				`From @Input array of options to fudis-radio-button-group value 'name' should be identical for all options.`
			);
		}

		this.legendId = `${this.id}-legend`;

		this.required = this.radioButtonFormControl.hasValidator(Validators.required);
	}
}
