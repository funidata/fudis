/* eslint-disable no-underscore-dangle */
import { Signal, signal } from '@angular/core';
import { TFudisFormErrorSummaryObject, TFudisFormErrorSummaryItem } from '../../../types/forms';

export class ErrorSummaryService {
	private _currentErrorList: TFudisFormErrorSummaryObject = {};

	private _signalCurrentErrorList = signal<TFudisFormErrorSummaryObject>({});

	getVisibleErrors(): Signal<TFudisFormErrorSummaryObject> {
		return this._signalCurrentErrorList.asReadonly();
	}

	// eslint-disable-next-line class-methods-use-this
	defineErrorId(id: string, controlName: string | undefined): string {
		return controlName ? `${id}_${controlName}` : id;
	}

	addNewError(newError: TFudisFormErrorSummaryItem): void {
		let currentErrors = this._currentErrorList;

		const errorId = this.defineErrorId(newError.id, newError.controlName);

		if (!currentErrors[errorId]) {
			currentErrors = {
				...currentErrors,
				[errorId]: {
					id: newError.id,
					errors: { [newError.type]: newError.error },
					label: newError.label,
				},
			};
		} else {
			currentErrors = {
				...currentErrors,
				[errorId]: {
					id: newError.id,
					errors: { ...currentErrors[errorId].errors, [newError.type]: newError.error },
					label: newError.label,
				},
			};
		}

		this._currentErrorList = currentErrors;
	}

	removeError(error: { id: string; controlName: string | undefined; type: string }): void {
		const currentErrors = this._currentErrorList;

		const errorId = error.controlName ? `${error.id}_${error.controlName}` : error.id;

		delete currentErrors[errorId].errors[error.type];

		this._currentErrorList = currentErrors;
	}

	reloadErrors() {
		this._signalCurrentErrorList.set(this._currentErrorList);
	}
}
