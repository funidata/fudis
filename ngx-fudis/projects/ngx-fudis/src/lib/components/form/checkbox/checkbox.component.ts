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
	@Input() checkboxControl: UntypedFormControl;

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
	 * If checkbox is disabled
	 */
	@Input() disabled: boolean;

	/*
	 * FormControl for checkbox
	 */
	@Input() errorMessage: string;

	required: string | boolean = false;

	requiredValidator = Validators.requiredTrue;

	formControlIsInvalid: boolean;

	// ngAfterViewChecked(): void {
	// 	(this.input.nativeElement as HTMLInputElement).removeAttribute('disabled');
	// }

	handleCheckboxClick(event: any): void {
		// if ((this.input.nativeElement as HTMLInputElement).getAttribute('aria-disabled') === 'true') {
		// 	event.preventDefault();
		// }

		console.log(event);

		this.input.nativeElement.focus();
		// if (!this.checkboxControl.disabled) {
		// 	this.checkboxControl.patchValue(!this.checkboxControl.value);
		// }
	}

	setInputTouched(): void {
		this.checkboxControl.markAsTouched();
	}
}
