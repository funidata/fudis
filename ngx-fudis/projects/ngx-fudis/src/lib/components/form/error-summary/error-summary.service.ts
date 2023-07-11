import { Injectable, Signal, signal } from '@angular/core';
import {
	FudisFormErrorSummaryObject,
	FudisFormErrorSummaryItem,
	FudisFormErrorSummarySection,
} from '../../../types/forms';

@Injectable({ providedIn: 'root' })
export class FudisErrorSummaryService {
	private _currentErrorList: FudisFormErrorSummaryObject = {};

	private _signalCurrentErrorList = signal<FudisFormErrorSummaryObject>({});

	private _signalDynamicCurrentErrorList = signal<FudisFormErrorSummaryObject>({});

	private _currentFieldsets: FudisFormErrorSummarySection[] = [];

	private _currentSections: FudisFormErrorSummarySection[] = [];

	private _focusToErrors: boolean = true;

	private _firstLoadDone: boolean = false;

	getFocusToErrors(): boolean {
		return this._focusToErrors;
	}

	getFieldsetList(): FudisFormErrorSummarySection[] {
		return this._currentFieldsets;
	}

	getSectionList(): FudisFormErrorSummarySection[] {
		return this._currentSections;
	}

	getVisibleErrors(): Signal<FudisFormErrorSummaryObject> {
		return this._signalCurrentErrorList.asReadonly();
	}

	getDynamicErrors(): Signal<FudisFormErrorSummaryObject> {
		return this._signalDynamicCurrentErrorList.asReadonly();
	}

	// eslint-disable-next-line class-methods-use-this
	private defineErrorId(id: string, controlName: string | undefined): string {
		return controlName ? `${id}_${controlName}` : id;
	}

	public addNewError(newError: FudisFormErrorSummaryItem): void {
		let currentErrors = this._currentErrorList;

		const errorId = this.defineErrorId(newError.id, newError.controlName);

		const langUpdated = currentErrors[errorId] && currentErrors[errorId]?.language !== newError.language;

		if (!currentErrors[errorId]) {
			currentErrors = {
				...currentErrors,
				[errorId]: {
					id: newError.id,
					errors: { [newError.type]: newError.error },
					label: newError.label,
					language: newError.language,
				},
			};
		} else {
			currentErrors = {
				...currentErrors,
				[errorId]: {
					id: newError.id,
					errors: { ...currentErrors[errorId].errors, [newError.type]: newError.error },
					label: newError.label,
					language: newError.language,
				},
			};
		}

		this._currentErrorList = currentErrors;

		if (langUpdated) {
			this.reloadErrors(0, false);
		}
	}

	public removeError(error: { id: string; controlName: string | undefined; type: string }): void {
		const currentErrors = this._currentErrorList;

		const errorId = error.controlName ? `${error.id}_${error.controlName}` : error.id;

		if (currentErrors?.[errorId]?.errors[error.type]) {
			delete currentErrors[errorId].errors[error.type];

			this._currentErrorList = currentErrors;

			this._signalDynamicCurrentErrorList.set(currentErrors);
		}
	}

	public addFieldset(fieldset: FudisFormErrorSummarySection): void {
		const existingItem = this._currentFieldsets.find((item) => {
			return item.id === fieldset.id;
		});

		if (existingItem) {
			const index = this._currentFieldsets.indexOf(existingItem);
			this._currentFieldsets[index] = fieldset;
		} else {
			this._currentFieldsets.push(fieldset);
		}
	}

	public removeFieldset(fieldset: FudisFormErrorSummarySection): void {
		const indexToRemove = this._currentFieldsets.indexOf(fieldset);

		this._currentFieldsets.splice(indexToRemove, 1);
	}

	public addSection(section: FudisFormErrorSummarySection): void {
		const existingItem = this._currentSections.find((item) => {
			return item.id === section.id;
		});

		if (existingItem) {
			const index = this._currentSections.indexOf(existingItem);
			this._currentSections[index] = section;
		} else {
			this._currentSections.push(section);
		}
	}

	public removeSection(section: FudisFormErrorSummarySection): void {
		const indexToRemove = this._currentSections.indexOf(section);

		this._currentSections.splice(indexToRemove, 1);
	}

	public reloadErrors(delay: number = 0, focusToErrors: boolean = true): void {
		this._focusToErrors = focusToErrors;

		setTimeout(() => {
			this._signalCurrentErrorList.set(this._currentErrorList);
			this._signalDynamicCurrentErrorList.set(this._currentErrorList);
		}, delay);
	}
}
