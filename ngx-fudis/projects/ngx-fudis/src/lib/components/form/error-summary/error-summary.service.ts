/* eslint-disable no-underscore-dangle */
import { Signal, signal } from '@angular/core';
import { TFudisFormErrorSummaryObject, TFudisFormErrorSummaryItem } from '../../../types/forms';

export class ErrorSummaryService {
	private currentErrorList: TFudisFormErrorSummaryObject = {};

	private _signalCurrentErrorList = signal<TFudisFormErrorSummaryObject>({});

	signalCurrentErrorList = this._signalCurrentErrorList.asReadonly();

	getVisibleErrors(): Signal<TFudisFormErrorSummaryObject> {
		return this.signalCurrentErrorList;
	}

	// eslint-disable-next-line class-methods-use-this
	defineErrorId(id: string, controlName: string | undefined): string {
		return controlName ? `${id}_${controlName}` : id;
	}

	addNewError(newError: TFudisFormErrorSummaryItem): void {
		let currentErrors = this.currentErrorList;

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

		this.currentErrorList = currentErrors;
	}

	removeError(error: { id: string; controlName: string | undefined; type: string }): void {
		const currentErrors = this.currentErrorList;

		const errorId = error.controlName ? `${error.id}_${error.controlName}` : error.id;

		delete currentErrors[errorId].errors[error.type];

		this.currentErrorList = currentErrors;
	}

	reloadErrors() {
		this._signalCurrentErrorList.set(this.currentErrorList);
	}
}
