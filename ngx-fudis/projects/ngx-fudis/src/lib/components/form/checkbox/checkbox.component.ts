import { Component, Input, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';

@Component({
	selector: 'fudis-checkbox',
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

	requiredValidator = Validators.requiredTrue;

	handleCheckboxClick(): void {
		this.input.nativeElement.focus();
		if (!this.control.disabled) {
			this.control.patchValue(!this.control.value);
			this.control.markAsDirty();
		}
	}

	handleBlur(): void {
		this.control.markAsTouched();
	}
}
