import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
	selector: 'app-dialog-test-content',
	template: `
		<fudis-heading fudisDialogTitle tag="h2">Welcome to a Dialog!</fudis-heading>
		<form>
			<fudis-dialog-content>
				<fudis-legend>This is an important form</fudis-legend>
				<fudis-text-input
					[id]="'example-input-power-animal'"
					[label]="'What is your power animal?'"
					[control]="dialogFormGroup.controls['powerAnimal']"
					[requiredText]="'Required'"
					[helpText]="'Please add some values here above!'"
					[errorMsg]="{ required: 'This is required field.' }"></fudis-text-input>
			</fudis-dialog-content>
			<fudis-dialog-actions>
				<fudis-button fudisDialogClose label="Cancel"></fudis-button>
				<fudis-button cdkFocusInitial label="Ok"></fudis-button>
			</fudis-dialog-actions>
		</form>
	`,
	styles: [],
})
export class DialogTestContentComponent {
	chosenPowerAnimal: string;

	constructor(private formBuilder: FormBuilder) {}

	dialogFormGroup = this.formBuilder.group({
		powerAnimal: new FormControl('', Validators.required),
	});
}
