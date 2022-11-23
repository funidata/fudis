import { Component, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
	selector: 'fudis-text-input',
	templateUrl: './text-input.component.html',
	styleUrls: ['./text-input.component.scss'],
})
export class TextInputComponent {
	@Input() id: string;

	@Input() label: string;

	@Input() type: 'email' | 'number' | 'password' | 'tel' | 'text' | 'url' = 'text';

	control = new FormControl('', Validators.required);
}
