import { Component, Output, EventEmitter, Input, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { IFudisErrorMessages, IFudisErrorSummaryItem } from '../../../types/forms';
import isRequired from '../../../utilities/errors/errors.utility';
import { GuidanceComponent } from '../guidance/guidance.component';

@Component({
	selector: 'fudis-checkbox',
	templateUrl: './checkbox.component.html',
	styleUrls: ['./checkbox.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class CheckboxComponent {
	@ViewChild('checkboxRef') input: ElementRef;

	@ViewChild(GuidanceComponent, { static: true }) guidanceToUpdate: GuidanceComponent;

	/*
	 * FormControl for checkbox
	 */
	@Input() control: FormControl;

	/*
	 * Id for checkbox
	 */
	@isRequired
	@Input()
	id: string;

	/*
	 * FormControl for checkbox
	 */
	@isRequired
	@Input()
	label: string;

	/*
	 * Name for checkbox
	 */
	@Input() name: string;

	/**
	 * Error message shown below the input
	 */
	@Input() errorMsg: IFudisErrorMessages;

	/**
	 * Help text shown below the checkbox
	 */
	@Input() helpText: string;

	/**
	 * TBD. Possibly used later for FudisErrorSummary
	 */

	@Output() errorOutput: EventEmitter<IFudisErrorSummaryItem> = new EventEmitter<IFudisErrorSummaryItem>();

	showError: boolean = false;

	requiredValidator = Validators.requiredTrue;

	handleCheckboxClick(): void {
		this.input.nativeElement.focus();
		if (!this.control.disabled) {
			this.control.patchValue(!this.control.value);
			this.control.markAsTouched();
			this.control.markAsDirty();
			this.guidanceToUpdate.checkErrors();
		}
	}

	handleBlur(): void {
		this.control.markAsTouched();
		this.guidanceToUpdate.checkErrors();
	}
}
