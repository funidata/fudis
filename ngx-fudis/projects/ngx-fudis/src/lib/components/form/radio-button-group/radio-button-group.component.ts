import { Component, HostBinding, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IFudisRadioButtonOption, TFudisInputErrorMessages } from '../../../types/forms';

import { FieldsetBaseDirective } from '../../../directives/form/fieldset-base/fieldset-base.directive';
import { GuidanceComponent } from '../guidance/guidance.component';

@Component({
	selector: 'fudis-radio-button-group[options][id][legend]',
	templateUrl: './radio-button-group.component.html',
	styleUrls: ['./radio-button-group.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class RadioButtonGroupComponent extends FieldsetBaseDirective implements OnInit {
	@HostBinding('class') classes = 'fudis-radio-button-group-host';

	@ViewChild(GuidanceComponent) guidanceToUpdate: GuidanceComponent;

	/*
	 * FormControl for Radio Button group
	 */
	@Input() control: FormControl;

	/*
	 * Array of options for group of radio buttons
	 */
	@Input() options: IFudisRadioButtonOption[];

	/**
	 * Error messages shown when form control validators are invalid
	 */
	@Input() errorMsg: TFudisInputErrorMessages;

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

	/**
	 * Check & update errors. Currently mostly binded to onBlur event.
	 */
	updateErrors(): void {
		this.guidanceToUpdate.checkErrors();
	}
}
