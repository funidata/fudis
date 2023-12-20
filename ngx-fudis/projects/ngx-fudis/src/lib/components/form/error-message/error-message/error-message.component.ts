import { Component, Host, OnChanges, OnDestroy, OnInit, Optional } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { FudisValidatorFn, FudisValidatorMessage } from 'projects/ngx-fudis/src/lib/utilities/form/validators';
import { FudisFormErrorSummaryRemoveItem } from '../../../../types/forms';
import { FudisIdService } from '../../../../services/id/id.service';
import { FudisTranslationService } from '../../../../services/translation/translation.service';
import { FudisInternalErrorSummaryService } from '../../../../services/form/error-summary/internal-error-summary.service';
import { ErrorMessageBaseDirective } from '../error-message-base/error-message-base.directive';
import { TextInputComponent } from '../../text-input/text-input.component';
import { TextAreaComponent } from '../../text-area/text-area.component';
import { DropdownComponent } from '../../dropdown/dropdown.component';
import { DatepickerComponent } from '../../date/datepicker/datepicker.component';
import { AutocompleteComponent } from '../../autocomplete/autocomplete.component';

@Component({
	selector: 'fudis-error-message',
	templateUrl: './error-message.component.html',
	styleUrls: ['./error-message.component.scss'],
})
export class ErrorMessageComponent extends ErrorMessageBaseDirective implements OnInit, OnChanges, OnDestroy {
	constructor(
		_errorSummaryService: FudisInternalErrorSummaryService,
		_translationService: FudisTranslationService,
		_idService: FudisIdService,
		@Host() @Optional() private _textInput: TextInputComponent,
		@Host() @Optional() private _textArea: TextAreaComponent,

		@Host() @Optional() private _dropdown: DropdownComponent,
		@Host() @Optional() private _datePicker: DatepickerComponent,
		@Host() @Optional() private _autocomplete: AutocompleteComponent
	) {
		super(_errorSummaryService, _translationService, _idService);

		if (_textInput) {
			this._parent = _textInput;
		} else if (_textArea) {
			this._parent = _textArea;
		} else if (_dropdown) {
			this._parent = _dropdown;
		} else if (_datePicker) {
			this._parent = _datePicker;
		} else if (_autocomplete) {
			this._parent = _autocomplete;
		}

		this._id = _idService.getNewId('error-message');
	}

	protected _control: FormControl<any>;

	protected _parent:
		| TextInputComponent
		| TextAreaComponent
		| DropdownComponent
		| AutocompleteComponent
		| DatepickerComponent;

	ngOnInit(): void {
		if (this._parent) {
			if (typeof this.message !== 'string') {
				this._subscribtion = this.message!.subscribe((value: string) => {
					this._currentMessage = value;
				});
			} else {
				this._currentMessage = this.message;
			}
			this._createCustomError();
		}
	}

	ngOnChanges(): void {
		if (this._parent && typeof this.message === 'string') {
			this._currentMessage = this.message;
			this._createCustomError();
		}
	}

	ngOnDestroy(): void {
		if (this._subscribtion) {
			this._subscribtion.unsubscribe();
		}
		this._removeCustomError();
	}

	private _smallTest(message: FudisValidatorMessage): FudisValidatorFn {
		return (control: AbstractControl) => {
			if (!control) {
				return null;
			}
			return { [this._id]: { message } };
		};
	}

	private _createCustomError(): void {
		this._parent.control.addValidators(this._smallTest(this.message));
	}

	private _removeCustomError(): void {
		if (this._errorSent) {
			const errorToRemove: FudisFormErrorSummaryRemoveItem = {
				id: this._parent.id,
				type: this._id,
				controlName: this.controlName,
			};

			this._errorSummaryService.removeError(errorToRemove);

			this.handleRemoveError.emit(errorToRemove);
			this._errorSent = false;
		}
	}
}
