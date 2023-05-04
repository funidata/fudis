import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IFudisRadioButtonOption } from '../../../types/forms';
import { FormBaseDirective } from '../../../directives/form/form-base.directive';

@Component({
	selector: 'fudis-radio-button-group[options][id][legend]',
	templateUrl: './radio-button-group.component.html',
	styleUrls: ['./radio-button-group.component.scss'],
})
export class RadioButtonGroupComponent extends FormBaseDirective implements OnInit {
	/*
	 * FormControl for Radio Button group
	 */
	@Input() control: FormControl;

	/*
	 * Array of options for group of radio buttons
	 */
	@Input() options: IFudisRadioButtonOption[];

	/*
	 * Legend label for the group
	 */
	@Input() legend: string;

	/*
	 * Message to show when FormControl is invalid, e. g. group is required and touched, but user has not made a selection
	 */
	@Input() errorMessage: string | undefined;

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
	}
}
