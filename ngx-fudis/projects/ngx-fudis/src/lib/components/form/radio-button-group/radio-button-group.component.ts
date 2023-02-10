import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { IFudisRadioButtonOption, IFudisErrorSummaryItem, IFudisErrorMessages } from '../../../types/forms';

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
	@Input() options: IFudisRadioButtonOption[];

	/**
	 * Error message shown below the input
	 */
	@Input() errorMsg: IFudisErrorMessages;

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

	@Output() errorOutput: EventEmitter<IFudisErrorSummaryItem> = new EventEmitter<IFudisErrorSummaryItem>();

	required: boolean = false;

	legendId: string;

	showError: boolean = false;

	requiredValidator = Validators.required;

	errorMsgToShow: string[] = [];

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

		this.required = this.control.hasValidator(Validators.required);
	}

	checkErrors(): boolean {
		this.errorMsgToShow = [];
		if (this.control.touched && this.control.errors) {
			this.showError = true;

			Object.keys(this.control.errors).forEach((item) => {
				const message = this.errorMsg[item as keyof IFudisErrorMessages];
				if (message) {
					this.errorMsgToShow.push(message);
					this.getErrorOutput(this.id, message);
				}
			});
			return true;
		}
		this.showError = false;
		return false;
	}

	getErrorOutput(id: string, error: string) {
		this.errorOutput.emit({ id, message: error });
	}
}
