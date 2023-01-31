// eslint-disable-next-line max-classes-per-file
import {
	Component,
	Input,
	Output,
	OnInit,
	EventEmitter,
	ViewChild,
	ElementRef,
	ChangeDetectionStrategy,
} from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';

type Error = {
	id: string;
	message: string;
};
@Component({
	selector: 'fudis-text-input[id][label]',
	templateUrl: './text-input.component.html',
	styleUrls: ['./text-input.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextInputComponent implements OnInit {
	// Bind input field
	@ViewChild('fudisTextInput') input: ElementRef<HTMLInputElement>;

	@Output() errorOutput: EventEmitter<Error> = new EventEmitter<Error>();

	/**
	 *	Label is mandatory for every input
	 */
	@Input() label: string;

	@Input() id: string;

	@Input() size?: 's' | 'm' | 'l' = 'l';

	/**
	 *	Helper or info text for the input, aligned underneath the input
	 */
	@Input() helpText?: string;

	@Input() minLength?: number;

	@Input() maxLength?: number;

	@Input() characterLimitIndicatorValue?: number;

	@Input() control: UntypedFormControl;

	/**
	 *	Type of the input
	 */
	@Input() type: 'email' | 'number' | 'password' | 'tel' | 'text' | 'url' = 'text';

	validatorArray: Array<any> = [];

	required: boolean = false;

	ngOnInit() {
		if (this.control.hasValidator(Validators.required)) {
			this.required = true;
		}
	}

	checkErrors(): void {
		// Emit error to parent
		if (this.control.invalid) {
			this.getErrorOutput(this.id, 'An error happened in this input!');
		}
	}

	getErrorOutput(id: string, error: string) {
		this.errorOutput.emit({ id, message: error });
	}

	isTouchedAndInvalid(): boolean {
		console.log('ajoa!');
		if (this.control.touched && this.control.invalid) {
			return true;
		}
		return false;
	}
}
