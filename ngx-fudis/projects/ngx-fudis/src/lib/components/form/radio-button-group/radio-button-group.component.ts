import { Component, Input, Output, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { IFudisRadioButtonOption, IFudisFormErrorSummaryItem, IFudisFormErrorMessages } from '../../../types/forms';
import { GuidanceComponent } from '../guidance/guidance.component';

@Component({
	selector: 'fudis-radio-button-group[options][id][legend]',
	templateUrl: './radio-button-group.component.html',
	styleUrls: ['./radio-button-group.component.scss'],
})
export class RadioButtonGroupComponent implements OnInit {
	@ViewChild(GuidanceComponent, { static: true }) guidanceToUpdate: GuidanceComponent;

	/*
	 * FormControl for Radio Button group
	 */
	@Input() control: FormControl;

	/*
	 * Array of options for group of radio buttons
	 */
	@Input() options: IFudisRadioButtonOption[];

	/**
	 * Error message shown below the input
	 */
	@Input() errorMsg: IFudisFormErrorMessages;

	/*
	 * Legend label for the group
	 */
	@Input() legend: string;

	/*
	 * Unique id of the form group, used for improved accessibility
	 */
	@Input() id: string;

	/**
	 * Help text shown below the radio button group
	 */
	@Input() helpText?: string;

	/*
	 * Message to show when FormControl is invalid, e. g. group is required and touched, but user has not made a selection
	 */
	@Input() errorMessage: string | undefined;

	@Output() errorOutput: EventEmitter<IFudisFormErrorSummaryItem> = new EventEmitter<IFudisFormErrorSummaryItem>();

	requiredValidator = Validators.required;

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

	handleBlur(): void {
		this.guidanceToUpdate.checkErrors();
	}

	handleChange(): void {
		this.guidanceToUpdate.checkErrors();
	}
}
