import { Component, Output, EventEmitter, Input, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { IFudisErrorMessages, IFudisErrorSummaryItem } from '../../../types/forms';

@Component({
	selector: 'fudis-checkbox[id][label]',
	templateUrl: './checkbox.component.html',
	styleUrls: ['./checkbox.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class CheckboxComponent {
	@ViewChild('checkboxRef') input: ElementRef;

	/*
	 * FormControl for checkbox
	 */
	@Input() control: UntypedFormControl;

	/*
	 * Id for checkbox
	 */
	@Input() id: string;

	/*
	 * FormControl for checkbox
	 */
	@Input() label: string;

	/*
	 * Name for checkbox
	 */
	@Input() name: string;

	/*
	 * FormControl for checkbox
	 */
	@Input() errorMessage: string;

	/**
	 * Error message shown below the input
	 */
	@Input() errorMsg: IFudisErrorMessages;

	/**
	 * Help text shown below the checkbox
	 */
	@Input() helpText?: string;

	/**
	 * TBD. Possibly used later for FudisErrorSummary
	 */

	@Output() errorOutput: EventEmitter<IFudisErrorSummaryItem> = new EventEmitter<IFudisErrorSummaryItem>();

	showError: boolean = false;

	requiredValidator = Validators.requiredTrue;

	errorMsgToShow: string[] = [];

	handleCheckboxClick(): void {
		this.input.nativeElement.focus();
		if (!this.control.disabled) {
			this.control.patchValue(!this.control.value);
			this.control.markAsTouched();
			this.control.markAsDirty();
			this.checkErrors();
		}
	}

	handleBlur(): void {
		this.control.markAsTouched();
		this.checkErrors();
	}

	checkErrors(): void {
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
		} else {
			this.showError = false;
		}
	}

	getErrorOutput(id: string, error: string) {
		this.errorOutput.emit({ id, message: error });
	}
}
