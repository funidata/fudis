import { Component, HostBinding, Input, OnChanges, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FudisRadioButtonOption, FudisFormErrors } from '../../../types/forms';

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

	/**
	 * Set fieldset as required. By default set to 'undefined' and this attribute is determined to true / false depending on if FormControl has Validators.required. This setting will override that.
	 */
	@Input() required: boolean | undefined = undefined;

	ngOnInit() {
		this.subscribeToRequiredText();
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

	ngOnChanges(): void {
		this._required = this.required ?? this.control.hasValidator(Validators.required);
	}
}
