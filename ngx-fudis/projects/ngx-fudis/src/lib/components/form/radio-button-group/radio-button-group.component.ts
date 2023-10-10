import { Component, HostBinding, Input, OnChanges, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FudisRadioButtonOption, FudisFormErrors, FudisInputSize } from '../../../types/forms';

import { FieldSetBaseDirective } from '../../../directives/form/fieldset-base/fieldset-base.directive';

@Component({
	selector: 'fudis-radio-button-group',
	templateUrl: './radio-button-group.component.html',
	styleUrls: ['./radio-button-group.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class RadioButtonGroupComponent extends FieldSetBaseDirective implements OnInit, OnChanges {
	@HostBinding('class') classes = 'fudis-radio-button-group-host';

	/*
	 * FormControl for Radio Button group
	 */
	@Input({ required: true }) control: FormControl<boolean | null>;

	/*
	 * Array of options for group of radio buttons
	 */
	@Input({ required: true }) options: FudisRadioButtonOption[];

	/**
	 * Error messages shown when form control validators are invalid
	 */
	@Input() errorMsg: FudisFormErrors;

	/**
	 * Set Radio Button Group's visual style and ARIA attribute as invalid. Does not override if control.invalid is true.
	 */
	@Input() invalidState: boolean = false;

	@Input() size: FudisInputSize = 'lg';

	/**
	 * Set fieldset as required. By default set to 'undefined' and this attribute is determined to true / false depending on if FormControl has Validators.required. This setting will override that.
	 */
	@Input() required: boolean | undefined = undefined;

	ngOnInit() {
		this._id = this.id ?? this._idService.getNewId('radioButtonGroup');

		if (this.options.length < 2) {
			throw new Error(
				`Fudis-radio-button-group should have minimum of two options for radio buttons, but it only got ${this.options.length} option.`
			);
		}

		const nameMismatch = this.options.filter((optionName) =>
			this.options.some((item) => optionName.name !== item.name)
		);

		if (nameMismatch.length > 0) {
			throw new Error(
				`In fudis-radio-button-group options array, each object's 'name' value should be identical for all options, but name mismatch was detected.`
			);
		}
	}

	ngOnChanges(): void {
		this._required = this.required ?? this.control.hasValidator(Validators.required);
	}
}
