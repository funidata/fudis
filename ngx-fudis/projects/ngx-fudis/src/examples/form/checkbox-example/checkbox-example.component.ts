import { Component } from '@angular/core';

import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'example-checkbox',
	templateUrl: './checkbox-example.component.html',
})

// eslint-disable-next-line @angular-eslint/component-class-suffix
export class CheckboxComponentExample {
	/**
	 * Options for testing purposes
	 */

	checkboxFirst: UntypedFormControl = new UntypedFormControl({ value: true, disabled: true });

	checkboxSecond: UntypedFormControl = new UntypedFormControl(false, Validators.requiredTrue);

	mainFormGroup: UntypedFormGroup = this.formBuilder.group({
		checkboxFirst: this.checkboxFirst,
		checkboxSecond: this.checkboxSecond,
	});

	constructor(private formBuilder: UntypedFormBuilder) {}

	changeValueFromOutside(): void {
		this.checkboxSecond.patchValue(!this.checkboxSecond.value);
	}
}
